// 引用linebot SDK
var linebot = require('linebot');
let receive = require('./helper/receive_helper');
let log2Sheet = require('./helper/logSheet_helper');

const config = require('./config/config');

// 用於辨識Line Channel的資訊
var bot = linebot({
    channelId: config.channelId,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken

});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {

    getDisplayName(event, cb => {
        if (cb && cb != 'error') {
            const eve = {
                author: cb,
                msg: event.message.text

            }
            //log2Sheet.addLog(eve.author.eve.msg, cb);
            // event.message.text是使用者傳給bot的訊息
            // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
            receive.runService(eve, result => {
                replyMsg(event, result);
            })
        }
        if (cb == 'error') {
            replyMsg(event, '發生錯誤');
        }
    })



});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', process.env.PORT || 3000, function () {
    console.log('[BOT已準備就緒]');
});

const replyMsg = (event, msg) => {
    event.reply(msg).then(function (data) {
        // 當訊息成功回傳後的處理
    }).catch(function (error) {
        // 當訊息回傳失敗後的處理
    });
}

//取得user的使用者名稱
function getDisplayName(eve, cb) {
    bot.getUserProfile(eve.source.userId);
    eve.source.profile().then(function (profile) {
        console.log(profile.displayName);

        cb(profile.displayName);
    }).catch(function (error) {
        cb('error');
    });
}