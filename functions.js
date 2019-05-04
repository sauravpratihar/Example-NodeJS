const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');
const request = require('request');
const fs = require('fs');

const protectedRouteConf = (req, res, next) => {
    let token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, CONSTANTS.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'invalid token',
                response_code: 401
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
    } else {
        res.status(401).send({
            message: 'no token provided',
            response_code: 401
        });
    }
}

checkParamsGET = (arr) => {
    return (req, res, next) => {
        var missing_params = []
        for (var i = 0; i < arr.length; i++) {
            if (!eval('req.query.' + arr[i])) {
            missing_params.push(arr[i])
        }
    }
        if (missing_params.length == 0) {
            next()
        } else {
            next(res.json({ response_code: 302, message: 'Parameter(s) missing: ' + missing_params.join(',') }))
        }
    }
}

checkParamsPOST = (arr) => {
    return (req, res, next) => {
        var missing_params = []
        for (var i = 0; i < arr.length; i++) {
            if (!eval('req.body.' + arr[i])) {
                missing_params.push(arr[i])
            }
        }
    
        if (missing_params.length == 0) {
            next()
        } else {
            next(res.json({ response_code: 302, message: 'Parameter(s) missing: ' + missing_params.join(',') }))
        }
    }
}


const uploadURL = async (url, filename, callback) => {
    request.get({ url: url, encoding: 'binary' }, function (err, response, body) {
        fs.writeFile(`uploads/${filename}`, body, 'binary', function (err) {
            if (err) {
                callback(err);
            }
            else {
                callback(null);
            }
        });
    });
}
module.exports = {
  protectedRouteConf,
  checkParamsGET,
  checkParamsPOST,
  uploadURL
}