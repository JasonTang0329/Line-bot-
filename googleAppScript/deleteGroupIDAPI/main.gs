function doPost(e) {
    const params = e.parameter;

    const groupID = params.groupID;


    const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***

    var Sheet = SpreadSheet.getSheetByName('group');
    var lastRow = Sheet.getLastRow();

    if (lastRow < 2) {
        return ContentService.createTextOutput('done！');
    }

    for (var i = 2; i <= lastRow; i++) {
        var range = Sheet.getRange(i, 2);
        if (groupID == range.getValues()) {

            Sheet.deleteRow(i);
            break;
        }
    }

    return ContentService.createTextOutput('done');

}