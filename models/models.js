var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	coverImage:String,
	title:String,
	author:String,
	releaseDate:{type:Date, default:Date.now},
	keywords:String 
});	


var userSchema = new mongoose.Schema({
	username:String,
	password:String
})
//declare book model with schema bookSchema
mongoose.model('Book', bookSchema);
mongoose.model('User', userSchema);
