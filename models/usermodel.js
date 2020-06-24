//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema ({
  username: String,
	password: String,
	bio: String,
});

module.exports = mongoose.model('User', User);
