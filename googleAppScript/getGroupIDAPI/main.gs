function doPost(e) {
    const params = e.parameter;

    const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
    var Sheet = SpreadSheet.getSheetByName('group');
    const lastRow = Sheet.getLastRow();
    if (lastRow < 2) {
        return ContentService.createTextOutput('done！');
    }
    var arr = [];
    for (var i = 2; i <= lastRow; i++) {
        var range = Sheet.getRange(i, 2);
        const groupID = {
            ID: range.getValue()
        }
        arr.push(groupID);
    }

    return ContentService.createTextOutput(JSON.stringify(arr)).setMimeType(ContentService.MimeType.JSON);

}