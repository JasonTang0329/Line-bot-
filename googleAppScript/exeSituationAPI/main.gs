function doPost(e) {
  const params = e.parameter;
  const today = new Date();
  const tDate = today.getFullYear() + Appendzero(today.getMonth() + 1) + Appendzero(today.getDate());
  const author = params.author;
  const situation = params.situation;
  const fDate = params.fDate;
  const sType = params.sType;
  const note = (params.note == '' ? '' : (tDate + ' ' + author + '  ' + params.note));
  
  const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
  var Sheet = SpreadSheet.getSheetByName(tDate);
  var sitNo;
  
  //處理活頁簿頁籤
  if (!Sheet) {
    SpreadSheet.insertSheet(tDate.toString());
    
    //sitNo = tDate + '0001';
    Sheet = SpreadSheet.getSheetByName(tDate);
    Sheet.getRange(1, 1).setValue('問題編號');
    Sheet.getRange(1, 2).setValue('時間');
    Sheet.getRange(1, 3).setValue('反映人');
    Sheet.getRange(1, 4).setValue('問題類型');    
    Sheet.getRange(1, 5).setValue('事件描述');
    Sheet.getRange(1, 6).setValue('希望完成日');
    Sheet.getRange(1, 7).setValue('處理狀態');
    Sheet.getRange(1, 8).setValue('處理情形');
    Sheet.getRange(1, 9).setValue('處理人員');
    Sheet.getRange(1, 10).setValue('完成日');
    Sheet.getRange(1, 11).setValue('備註');

  }

  //處理編號
  const LastRow = Sheet.getLastRow();
  var range = Sheet.getRange(LastRow, 1);
  if (LastRow == 1) {
    sitNo = tDate + '001'
  } else {
    sitNo = parseInt(range.getValues()) + 1;
  }

  Sheet.getRange(LastRow + 1, 1).setValue(sitNo);
  Sheet.getRange(LastRow + 1, 2).setValue(today);
  Sheet.getRange(LastRow + 1, 3).setValue(author);
  Sheet.getRange(LastRow + 1, 4).setValue(sType);
  Sheet.getRange(LastRow + 1, 5).setValue(situation);
  Sheet.getRange(LastRow + 1, 6).setValue(fDate);
  Sheet.getRange(LastRow + 1, 7).setValue('N');
  Sheet.getRange(LastRow + 1, 11).setValue(note);
  return ContentService.createTextOutput('問題回報序號為：' + sitNo);

}

