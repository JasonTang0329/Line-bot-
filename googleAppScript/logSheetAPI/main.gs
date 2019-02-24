function doPost(e) {
  const params = e.parameter;
  const today = new Date();
  const tDate = today.getFullYear() + Appendzero(today.getMonth() + 1) + Appendzero(today.getDate());
  const author = params.author;
  const situation = params.situation;
  
  
  const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
  var Sheet = SpreadSheet.getSheetByName(tDate);
  var sitNo;
  
  //處理活頁簿頁籤
  if (!Sheet) {
    SpreadSheet.insertSheet(tDate.toString());
    
    //sitNo = tDate + '0001';
    Sheet = SpreadSheet.getSheetByName(tDate);
    Sheet.getRange(1, 1).setValue('時間');
    Sheet.getRange(1, 2).setValue('說話人');
    Sheet.getRange(1, 3).setValue('訊息');    
  }




  const LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow + 1, 1).setValue(today);
  Sheet.getRange(LastRow + 1, 2).setValue(author);
  Sheet.getRange(LastRow + 1, 3).setValue(situation);
  return ContentService.createTextOutput('done');

}

