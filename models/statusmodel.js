//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Status = new Schema ({
  status  : String,
  username: String,
	timestamp: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Status', Status);
