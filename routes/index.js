var express = require('express');
var router = express.Router();
var User = require('../models/usermodel');
var Status = require('../models/statusmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    //Should probably render some sort of news feed here instead of
    //personal accounts.
    res.redirect('/statuses');
  }
  else{
    res.render('index');
  }

});

router.post('/signup', function(req, res, next) {

  var username = req.body.username.toLowerCase();
	var password = req.body.password;

  var query = {username: username};

  User.findOne(query, function (err, user) {
    if (user) {
      res.redirect('/');
    } else {

      var userData = {
        username: username,
        password: password,
        bio: 'Im the first user!',

      };

      var newUser = new User(userData).save(function (err){
        console.log("made it this far");
        req.session.user = userData;
        console.log('New user '+username+' has been created!');
        res.redirect('/account');

      });
    }
  });

  //req.session.user = username;

  //res.render('account', {user : username, pass: password});

  //console.log(req.body);
});

router.post('/signin', function(req, res, next) {

  var username = req.body.username.toLowerCase();
	var password = req.body.password;

  var query = {username: username, password: password};

	User.findOne(query, function (err, user) {

		if (err || !user) {
			res.redirect('/');
		} else {
			req.session.user = user;
			console.log(username+' has logged in');
			res.redirect('/account');
		}

	});
});

router.get('/account', function (req, res) {

	if (req.session.user) {
    username = req.session.user.username;
    password = req.session.user.password;
    bio      = req.session.user.bio;
    res.render('account',{user : username, pass: password, bio : bio });
	}
  else {
    res.redirect('/');
  }


});

router.post('/account', function (req, res) {

	if (req.session.user) {
    var username = req.session.user.username;
    var newbio = req.body.newbio;

		var query = {username: username};

    var change = {bio: newbio};

    User.update(query, change, function (err, user) {

				console.log(username+' has updated their profile');
				req.session.user.bio = newbio;
			    res.redirect('/account');
		});
    //console.log(newBio);
	}
  else {
    res.redirect('/');
  }

});

router.post('/statuses', function(req, res, next) {

  if (req.session.user) {
      var status = req.body.status;
      var username = req.session.user.username;

      var statusData = {
        status: status,
        username: username,
        timestamp: new Date().getTime()
      };

      var newStatus = new Status(statusData).save(function (err) {
        console.log(username+' has posted a new status');
        res.redirect('/statuses');
      });
  } else {
    res.redirect('/');
  }

  //console.log(req.body.status);

  //res.send(req.body.status);

});

router.get('/statuses', function(req, res, next) {

  if (req.session.user) {
      //Get most recent statuses.
      let query = Status.find({}).sort({timestamp: -1});

      let promise = query.exec();

      promise.then(statuses =>{
  			res.render('wall', {statuses: statuses});
  		});

  } else {
    res.redirect('/login');
  }

  //console.log(req.body.status);

  //res.send(req.body.status);

});


router.get('/logout', function (req, res) {

	if (req.session.user) {
		console.log(req.session.user.username+' has logged out');
		delete req.session.user;
	}

	res.redirect('/');

});


module.exports = router;
