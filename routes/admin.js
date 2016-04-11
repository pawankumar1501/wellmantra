var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var fs = require('fs');

router.route('/add-event')
	  .post(function(req,res){
	  	var imgPath = 'public/images/placeholder.png';
		// console.log(req.files + ' asdfhkjds');
		// console.log(req.file + ' asdfhkjds');
		var book = new Book();
		book.coverImage = 'images/placeholder.png';
		book.title = req.body.title;
		book.author= req.body.author;
		book.releaseDate =req.body.releaseDate;
		book.keywords =req.body.keywords;
		book.img.data = fs.readFileSync(imgPath);
    	book.img.contentType = 'image/png';
		book.save(function (err,book) {
			console.log('book save');
			if (err) {
			console.log('error save');
				return res.send(500,err);
			}
			console.log(' book ' + book);
			return res.json(book);
		});
	});

	  router.route('/delete-item/:book')
  			.post(function (req,res) {
				console.log('in delete function');	
				console.log(req.book);	
  			})

module.exports = router;