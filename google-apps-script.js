var SECRET = "eMv_7Kx9pQ2r-Wt4nJu";

function fmtCell(val) {
  if (!val) return "";
  if (val instanceof Date) {
    var y = val.getFullYear();
    var m = ("0" + (val.getMonth() + 1)).slice(-2);
    var d = ("0" + val.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  }
  return String(val);
}

function makeResponse(callback, obj) {
  var json = JSON.stringify(obj);
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Sin datos" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var data = JSON.parse(e.postData.contents);
    if (data._token !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sh.getLastRow() === 0) {
      sh.appendRow(["id","fechaVisita","nombre","negocio","email","telefono",
                    "servicio","presupuesto","proximoPaso","fechaSeg","notas","nivel","createdAt"]);
    }

    var cliente      = data.cliente      || {};
    var acuerdo      = data.acuerdo      || {};
    var cuestionario = data.cuestionario || {};

    var row = [
      data.id || "",             data.fechaVisita || "",
      cliente.nombre || "",      cliente.negocio || "",
      cliente.email || "",       cliente.telefono || "",
      acuerdo.servicio || "",    acuerdo.presupuesto || "",
      acuerdo.proximoPaso || "", acuerdo.fechaSeg || "",
      acuerdo.notas || "",       cuestionario.winnerLevel || "",
      data.createdAt || ""
    ];

    var allVals = sh.getDataRange().getValues();
    var existingIdx = -1;
    for (var i = 0; i < allVals.length; i++) {
      if (String(allVals[i][0]) === String(data.id)) { existingIdx = i; break; }
    }

    if (existingIdx >= 0) {
      sh.getRange(existingIdx + 1, 1, 1, row.length).setValues([row]);
    } else {
      sh.appendRow(row);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var token    = "";
  var callback = "";
  var json     = "";

  try {
    token    = (e && e.parameter && e.parameter.token)    ? e.parameter.token    : "";
    callback = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : "";
    if (callback && !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(callback)) callback = "";

    if (token !== SECRET) {
      return makeResponse(callback, { ok: false, error: "Unauthorized" });
    }

    var sh   = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var rows = sh.getDataRange().getValues();

    if (rows.length === 0) {
      return makeResponse(callback, { ok: true, visitas: [] });
    }

    var startIdx = (rows[0][0] === "id") ? 1 : 0;
    var visitas  = [];

    for (var i = startIdx; i < rows.length; i++) {
      var r = rows[i];
      if (!r[0]) continue;
      visitas.push({
        id:           fmtCell(r[0]),
        fechaVisita:  fmtCell(r[1]),
        cliente:      { nombre: fmtCell(r[2]), negocio: fmtCell(r[3]), email: fmtCell(r[4]), telefono: fmtCell(r[5]) },
        acuerdo:      { servicio: fmtCell(r[6]), presupuesto: fmtCell(r[7]), proximoPaso: fmtCell(r[8]), fechaSeg: fmtCell(r[9]), notas: fmtCell(r[10]) },
        cuestionario: { winnerLevel: fmtCell(r[11]), answers: [] },
        createdAt:    fmtCell(r[12])
      });
    }

    return makeResponse(callback, { ok: true, visitas: visitas });

  } catch (err) {
    return makeResponse(callback, { ok: false, error: err.toString() });
  }
}
