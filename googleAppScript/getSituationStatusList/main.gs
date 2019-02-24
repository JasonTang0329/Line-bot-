function doPost(e) {
    const params = e.parameter;
    const status = params.status;
    const reline = "\n";
    const SpreadSheet = SpreadsheetApp.openById("Your google sheet's ID,PLS Sharing And Collaboration Editing"); //*** Need to change ***
    var total = 0;
    var msg = convertStatus(status) + reline + '=========================================' + reline;

    SpreadSheet.getSheets().map(function (sheet) {
        const Sheet = SpreadSheet.getSheetByName(sheet.getName());
        const maxColumns = Sheet.getMaxColumns();

        for (var i = 2; i <= maxColumns; i++) {
            if (Sheet.getRange(i, 7).getValues() == status){
                msg += Sheet.getRange(i, 1).getValues() + reline;
                total ++;
            }

        }

    });
    msg += '共' + total + '件'+ reline;
    msg += '=========================================';
    return ContentService.createTextOutput(msg);
}

function convertStatus(code) {
    switch (code) {
        case 'Y':
            return '已完成問題代號列表如下';
        case 'C':
            return '處理中問題代號列表如下';
        case 'N':
            return '待處理問題代號列表如下';

        default:
            return '';
    }
}