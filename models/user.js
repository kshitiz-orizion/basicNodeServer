var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = require('bluebird');


var User = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
       default: false
    }
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);