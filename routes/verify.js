var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');
var User = require('../models/user');
var mongoose=require('mongoose');
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    //console.log(JSON.stringify(req.body)+','+ JSON.stringify(req.headers['x-access-token'])+','+JSON.stringify(req.query.token));
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token && token != undefined && token !=null) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
exports.verifyAdmin = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // get the decoded payload and header "req.decoded._doc.admin" NOT WORKING
    var decAdmin = jwt.decode(token, { complete: true });

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err || !decAdmin.payload._doc.admin) {
                var err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

