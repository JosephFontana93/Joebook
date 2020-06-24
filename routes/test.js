var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if(req.session.user){
    res.send('You are logged in.');
  }
  else{
    res.redirect('/');
  }

});

router.post('/', function(req, res, next) {
  req.session.user = "myname";
  res.render('signup');
  console.log(req.body);
});


module.exports = router;
