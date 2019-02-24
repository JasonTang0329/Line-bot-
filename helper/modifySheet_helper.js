let request = require('request');
const config = require('../config/config');

let helper = {};


//==============================================================================
helper.backSituation = (author, sNo, reason, cb) => {
    const data = {
        "author": author,
        "sNo": sNo,
        "reason": reason
    }



    var options = {
        url:  config.backSituationAPI,
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

helper.exeSituation = (author, sNo, status, reason, fTime, cb) => {
    const data = {
        "author": author,
        "sNo": sNo,
        "status": status,
        "reason": reason,
        "fTime": fTime
    }



    var options = {
        url:  config.exeSituationAPI,
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