function doPost(e) {
    const params = e.parameter;
    const today = new Date();
    const groupID = params.groupID;


    const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
    var Sheet = SpreadSheet.getSheetByName('group');

    var LastRow = Sheet.getLastRow();
    Sheet.getRange(LastRow + 1, 1).setValue(today);
    Sheet.getRange(LastRow + 1, 2).setValue(groupID);
    return ContentService.createTextOutput('done');

}