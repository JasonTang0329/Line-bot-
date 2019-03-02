let request = require('request');
const config = require('../config/config');

let helper = {};

//==============================================================================
helper.addGroupID = (groupID,  cb) => {
    const data = {
        "groupID": groupID
    }



    var options = {
        url: config.addGroupIDAPI,
        method: 'POST',
        followAllRedirects: true,
        form: data
    }
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            //console.log(body)
            cb(body);
        } else {
            cb('error');
        }
    });
}
helper.deleteGroupID = (groupID,  cb) => {
    const data = {
        "groupID": groupID
    }



    var options = {
        url: config.deleteGroupIDAPI,
        method: 'POST',
        followAllRedirects: true,
        form: data
    }
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            //console.log(body)
            cb(body);
        } else {
            cb('error');
        }
    });
}


//==============================================================================
module.exports = helper;