function doPost(e) {
  const params = e.parameter;
  const sitNo = params.sNo;
  const reline = "\n";
  if (isNaN(sitNo) || sitNo.toString().length != 11) {
    return ContentService.createTextOutput('你輸入的問題序號是： ' + sitNo + ' ，並非合法的序號喔！');
  }
  const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
  var sSate = sitNo.substring(0, 8);
  var Sheet = SpreadSheet.getSheetByName(sSate);
  if (!Sheet) {
    return ContentService.createTextOutput('你輸入的問題序號是： ' + sitNo + ' ，並無該筆紀錄哦，請確認編號是否正確！');
  }

  var msg = '';
  var bol = false;
  var maxColumns = Sheet.getMaxColumns();

  if (maxColumns < 2) {
    return ContentService.createTextOutput('你輸入的問題序號是： ' + sitNo + ' ，並無該筆紀錄哦，請確認編號是否正確2！');
  }

  for (var i = 2; i <= maxColumns; i++) {
    var range = Sheet.getRange(i, 1);
    if (sitNo == range.getValues()) {
      bol = true;

      msg = '你輸入的問題序號是： ' + sitNo + reline + reline;
      msg += '================================================================' + reline;
      msg += '反應時間為： ' + Sheet.getRange(i, 2).getValues() + reline;
      msg += '反應人員為： ' + Sheet.getRange(i, 3).getValues() + reline;
      msg += '反應類型為： ' + Sheet.getRange(i, 4).getValues() + reline;
      msg += '反應內容為： ' + Sheet.getRange(i, 5).getValues() + reline;
      msg += '希望完成日為： ' + Sheet.getRange(i, 6).getValues() + reline;
      msg += '================================================================' + reline;
      msg += '問題的處理狀況如下：' + reline;
      msg += '處理狀態為： ' + (Sheet.getRange(i, 7).getValues() == 'Y' ? '處理完成' : Sheet.getRange(i, 7).getValues() == 'C' ? '處理中' : '尚未承接') + reline;
      msg += '處理情形為： ' + Sheet.getRange(i, 8).getValues() + reline;
      msg += Sheet.getRange(i, 9).getValues() != '' ? ('處理人員為： ' + Sheet.getRange(i, 9).getValues() + reline) : '';
      msg += Sheet.getRange(i, 10).getValues() != '' ? ('處理完成日為： ' + Sheet.getRange(i, 10).getValues() + reline) : '';
      msg += '================================================================' + reline;
      msg += Sheet.getRange(i, 11).getValues() != '' ? ('備註： ' + reline + Sheet.getRange(i, 11).getValues() + reline) : '';
      msg += '================================================================' + reline;
      break;
    }

  }
  if (!bol) {
    msg = '你輸入的問題序號是： ' + sitNo + ' ，並無該筆紀錄哦，請確認編號是否正確！';
  }
  return ContentService.createTextOutput(msg);

}