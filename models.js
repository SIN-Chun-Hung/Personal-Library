const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const SchemaOfBook = new Schema({
  title: {type: String, required: true}, 
  comments: [String]
});

const BookModel = mongoose.model('BookModel', SchemaOfBook); 

exports.BookModel = BookModel; 