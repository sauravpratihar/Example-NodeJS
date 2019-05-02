const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');

const protectedRouteConf = (req, res, next) => {
    let token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, CONSTANTS.JWT_SECRET_KEY, (err, decoded) =>{      
            if (err) {
                return res.json({ 
                    message: 'invalid token',
                    response_code: 403 
                });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({
            message: 'no token provided',
            response_code: 402
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
      // console.log(req)
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
module.exports = {
    protectedRouteConf,
    checkParamsGET,
    checkParamsPOST
}