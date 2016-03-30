var express = require('express');
var router = express.Router();

//Get Home page
router.get('/',function(req,res,next){
	console.log('apps');
		res.render('index',{title:"Book List"});
	});
module.exports = router;
