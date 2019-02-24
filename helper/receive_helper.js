let async = require('async');
var linebot = require('linebot');
const add = require('./addSheet_helper');
const getSheet = require('./getSheet_helper');
const modifySheet = require('./modifySheet_helper');

const config = require('../config/config');
const reline = "\n";
let helper = {};
//==============================================================================

helper.runService = (eve, cb) => {
    const author = eve.author;
    const msg = eve.msg;
    if (msg) {
        if (msg == '說明') {
            cb(getinstruction());
        } else if (msg == '表單網址') {
            cb('電子表單網址為' + reline + '「 ' + config.formURL + ' 」');

        } else if (msg == '承辦說明' || msg == '客服說明' || msg == '審核者說明') {
            cb(getCSR());

        } else if (msg == '維護人員說明') {
            cb(getMaintain());

        } else if (msg == '查詢待處理問題') {
            getSheet.getSituationStatusList('N', result => {
                cb(result);
            });

        } else if (msg == '查詢處理中問題') {
            getSheet.getSituationStatusList('C', result => {
                cb(result);
            });

        } else if (msg == '查詢已完成問題') {
            getSheet.getSituationStatusList('Y', result => {
                cb(result);
            });

        } else {
            const msgArr = msg.split('§');

            if (msgArr.length > 1) {
                if (msgArr[0] == '新增問題') {
                    if (msgArr.length < 4) {
                        cb('您好' + reline + '新增問題的指令為' + reline + '「新增問題§(輸入問題類型，如檔案上架、介接上架、前台、後台)§(輸入問題描述)§(希望完成日期，如2019/01/01)§(備註，選填)」' + reline + '請問是否漏掉了哪個欄位沒有填呢?');
                    } else {
                        const sType = msgArr[1];
                        const situation = msgArr[2];
                        const fDate = msgArr[3];
                        const note = msgArr[4] ? msgArr[4] : '';
                        add.situation(author, sType, situation, fDate, note, result => {
                            if (result) {
                                cb(result);
                            }
                        })

                    }
                }
                if (msgArr[0] == '查詢問題') {
                    const sNO = msgArr[1];
                    console.log(sNO.substring(0, 8));
                    getSheet.getSituation(sNO, result => {
                        if (result) {
                            cb(result);
                        }
                    })
                }
                if (msgArr[0] == '問題退回') {
                    const sNO = msgArr[1];
                    const reason = msgArr[2];
                    modifySheet.backSituation(author, sNO, reason, result => {
                        if (result) {
                            cb(result);
                        }
                    })
                }
                if (msgArr[0] == '更新處理狀態') {
                    const sNO = msgArr[1];
                    const status = msgArr[2];
                    const reason = msgArr[3];
                    const fTime = msgArr.length > 4 ? msgArr[4] : '';
                    modifySheet.exeSituation(author, sNO, status, reason, fTime, result => {
                        if (result) {
                            cb(result);
                        }
                    })
                }
            } else {
                // cb('Hi,' + author + '你好，你是不是在問我功能呢?還沒有功能哦!你想說的是「' + msg + '」嗎?請等待新功能的上線哦!');
            }
        }
    }

}


const getinstruction = () => {

    const info = '功能之間的指令分隔均使用「§」作為下一個指令的使用，系統會默認「§」作為指令的切割哦!!';
    const formurl = '本服務對應的電子表單網址為' +'「 ' + config.formURL + ' 」，歡迎直接進入查看。';
    const message = '請輸入您的使用身分別，如「承辦」、「客服」、「審核者」、「維護人員」 + 「說明」(如承辦說明)';

    return info + reline + formurl + reline + message;
}
const getCSR = () => {
    const forVerify = '==================承辦&客服&審核人員使用功能==================';

    const addInfo = '＂新增問題＂指令為' + '「 新增問題§(輸入問題類型，如檔案上架、介接上架、前台、後台)§(輸入問題描述)§(希望完成日期，如2019/01/01)§(備註) 」';
    const getInfo = '＂查詢問題＂指令為' + '「 查詢問題§(問題編號) 」';
    const getToDoList = '＂查詢待處理問題列表＂指令為' + '「 查詢待處理問題 」';
    const getDoingList = '＂查詢處理中列表＂指令為' +'「 查詢處理中問題 」';
    const getFinishList = '＂查詢處理完成列表＂指令為' + '「 查詢已完成問題 」';
    const setBack = '＂問題退回＂指令為' + '「 問題退回§(問題編號)§退回原因 」';
    const forVerifyEnd = '==============================================================';

    return forVerify + reline + reline + addInfo + reline + reline + getInfo + reline + reline + getToDoList + reline + reline + getDoingList + reline + reline + getFinishList + reline + reline + setBack + reline + reline + forVerifyEnd;
}
const getMaintain = () => {
    const forFix = '==================維護&修復人員使用功能==================';
    const getInfo = '＂查詢問題＂指令為' + '「 查詢問題§(問題編號) 」';
    const getToDoList = '＂查詢待處理問題列表＂指令為' + '「 查詢待處理問題 」';
    const getDoingList = '＂查詢處理中列表＂指令為' + '「 查詢處理中問題 」';
    const getFinishList = '＂查詢處理完成列表＂指令為' + '「 查詢已完成問題 」';
    const setSituationStatus = '＂設定案件處理狀態＂指令為' + '「 更新處理狀態§(問題編號)§(處理狀態，N:尚未處理、C：處理中、Y：處理完成)§處理情形§完成時間(選填) 」';

    const forFixEnd = '=========================================================';
    return forFix + reline + reline + getInfo + reline + reline + getToDoList + reline + reline + getDoingList + reline + reline + getFinishList + reline + reline + setSituationStatus + reline + reline + forFixEnd
}
//==============================================================================
module.exports = helper;