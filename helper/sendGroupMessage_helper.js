let request = require('request');
const config = require('../config/config');
let linebot = require('linebot');

let helper = {};
const bot = linebot({
    channelId: config.channelId,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken

});

//==============================================================================
helper.sendMessage2All = (message, cb) => {
    var options = {
        url: config.getGroupIDAPI,
        method: 'POST',
        followAllRedirects: true,
        form: ''
    }
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var obj = JSON.parse(body);

            if (obj.length > 0) {
                const data = {
                    type: 'text',
                    text: message
                }
                console.log(obj);
                obj.forEach(function (item) {
                    console.log(item);
                    bot.push(item.ID, data);
                });

            }
            cb(body);
        } else {
            cb('error');
        }
    });
}


//==============================================================================
module.exports = helper;