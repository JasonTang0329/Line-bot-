let request = require('request');
const config = require('../config/config');

let helper = {};


//==============================================================================
helper.getSituation = (sNo, cb) => {
    const data = {
        "sNo": sNo
    }



    var options = {
        url: config.getSituationAPI,
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

helper.getSituationStatusList = (status, cb) => {
    const data = {
        "status": status
    }



    var options = {
        url: config.getSituationStatusList,
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