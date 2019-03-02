let request = require('request');
const config = require('../config/config');

let helper = {};

//==============================================================================
helper.getGroupID = (cb) => {
    var options = {
        url: config.getGroupIDAPI,
        method: 'POST',
        followAllRedirects: true,
        form: ''
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