var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: '../public/uploads/' });

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
router.route('/books')
	.get(function(req,res){
		Book.find(function(err, books){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,books);
		});
	})

	.post(function(req,res){
		// var imgPath = 'public/images/placeholder.png';
		console.log(req.files);
		console.log(req.file);
		var book = new Book();
		book.coverImage = 'images/placeholder.png';
		book.title = req.body.title;
		book.author= req.body.author;
		book.releaseDate =req.body.releaseDate;
		book.keywords =req.body.keywords;
		// book.img.data = fs.readFileSync(imgPath);
    	// book.img.contentType = 'image/png';
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

module.exports = router;
