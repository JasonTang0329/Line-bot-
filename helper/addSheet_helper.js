let request = require('request');
const config = require('../config/config');
 

let helper = {};

//==============================================================================
helper.situation = (author, sType, msg, fDate, note, cb) => {
    const data = {
        "author": author,
        "situation": msg,
        "sType": sType,
        "fDate": fDate,
        "note": note
    }



    var options = {
        url: config.addSituationAPI,
        method: 'POST',
        followAllRedirects: true,
        form: data
    }
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(body)
            cb(body);
        } else {
            cb('error');
        }
    });
}


//==============================================================================
module.exports = helper;