let request = require('request');
const config = require('../config/config');

let helper = {};

//==============================================================================
helper.addLog = (author, msg, cb) => {
    const data = {
        "author": author,
        "situation": msg
    }



    var options = {
        url: config.logSheetAPI,
        method: 'POST',
        followAllRedirects: true,
        form: data
    }
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            
            cb(body);
        } else {
            cb('error');
        }
    });
}


//==============================================================================
module.exports = helper;