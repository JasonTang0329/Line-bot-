function doPost(e) {
    const params = e.parameter;
    const sitNo = params.sNo;
    const today = new Date();
    const tDate = today.getFullYear() + '/' + Appendzero(today.getMonth() + 1) + '/' + Appendzero(today.getDate()) + ' ' + Appendzero(today.getHours()) + ':' + Appendzero(today.getMinutes()) + ':' + Appendzero(today.getSeconds());
    const reline = "\n";
    var bol = false;
    if (isNaN(sitNo) || sitNo.toString().length != 11) {
        return ContentService.createTextOutput(bol);
    }
    const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
    var sSate = sitNo.substring(0, 8);
    var Sheet = SpreadSheet.getSheetByName(sSate);
    if (!Sheet) {
        return ContentService.createTextOutput(bol);
    }

    var msg = '';

    var lastRow = Sheet.getLastRow();
    if (lastRow < 2) {
        return ContentService.createTextOutput(bol);
    }

    for (var i = 2; i <= lastRow; i++) {
        var range = Sheet.getRange(i, 1);
        if (sitNo == range.getValues()) {
            bol = true;

            break;
        }

    }

    return ContentService.createTextOutput(bol);

}