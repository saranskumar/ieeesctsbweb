/******************************************************************************
 * IEEE SCT SB Contact Form Handler
 * Based on work by Martin Hawksey
 ******************************************************************************/

var TO_ADDRESS = "ieeesctsbtech@gmail.com";

function doPost(e) {
  try {
    Logger.log(e);
    record_data(e);
    
    var mailData = e.parameters;
    var sendEmailTo = TO_ADDRESS;
    
    if (sendEmailTo) {
      MailApp.sendEmail({
        to: String(sendEmailTo),
        subject: "Contact Form Submission: " + (mailData.subject ? mailData.subject[0] : "No Subject"),
        htmlBody: formatMailBody(mailData)
      });
    }

    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatMailBody(obj) {
  var result = "<div style='font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;'>";
  result += "<h2 style='color: #00629b; border-bottom: 1px solid #eee; padding-bottom: 10px;'>New Contact Form Submission</h2>";
  result += "<table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>";

  // Define preferred order for common fields
  var order = ["name", "email", "phone", "subject", "message"];
  var keys = Object.keys(obj);
  
  // Add ordered fields first
  for (var i in order) {
    var key = order[i];
    if (obj[key]) {
      result += "<tr>" +
                "<td style='padding: 10px 0; font-weight: bold; width: 100px; vertical-align: top; text-transform: capitalize; color: #666;'>" + key + "</td>" +
                "<td style='padding: 10px 0; vertical-align: top;'>" + sanitizeInput(obj[key][0]) + "</td>" +
                "</tr>";
    }
  }
  
  // Add any other fields not in the order list
  for (var j in keys) {
    var key = keys[j];
    if (order.indexOf(key) === -1 && key !== 'formDataNameOrder' && key !== 'formGoogleSheetName' && key !== 'formGoogleSendEmail' && key !== 'honeypot') {
      result += "<tr>" +
                "<td style='padding: 10px 0; font-weight: bold; width: 100px; vertical-align: top; text-transform: capitalize; color: #666;'>" + key + "</td>" +
                "<td style='padding: 10px 0; vertical-align: top;'>" + sanitizeInput(obj[key][0]) + "</td>" +
                "</tr>";
    }
  }
  
  result += "</table>";
  result += "<div style='margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #999;'>Sent via IEEE SCT SB Website</div>";
  result += "</div>";
  
  return result;
}

function sanitizeInput(rawInput) {
   var placeholder = HtmlService.createHtmlOutput(" ");
   placeholder.appendUntrusted(rawInput);
   return placeholder.getContent();
}

function record_data(e) {
  var lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameters.formGoogleSheetName || "responses";
    var sheet = doc.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
    }
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = [new Date()];
    
    for (var i = 1; i < headers.length; i++) {
      var header = headers[i].toLowerCase();
      var value = "";
      
      // Try to find matching parameter
      for (var param in e.parameters) {
        if (param.toLowerCase() === header) {
          value = e.parameters[param][0];
          break;
        }
      }
      row.push(value);
    }
    
    sheet.appendRow(row);
  } catch(error) {
    Logger.log(error);
  } finally {
    lock.releaseLock();
  }
}
