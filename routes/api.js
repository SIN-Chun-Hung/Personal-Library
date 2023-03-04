/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const BookModel = require('../models').BookModel;

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      BookModel.find({}, function(err, data) {
        if (err) {
          return res.send('Error occurs!');
        } else if (!data) {
          return res.json([]);
        } else {
          const showData = data.map((item) => {
            return {
              _id: item._id,
              title: item.title,
              comments: item.comments,
              commentcount: item.comments.length
            };
          });
          return res.json(showData);
        }
      });
    })

    .post(function(req, res) {
      let title = req.body.title;
      if (!title) {
        return res.send('missing required field title');
      }

      const newBook = new BookModel({ title: title, comments: [] });

      newBook.save(function(err, data) {
        if (err || !data) {
          return res.send('Error occurs!');
        } else {
          return res.json({ _id: data._id, title: data.title });
        }
      });
    })

    .delete(function(req, res) {
      BookModel.remove({}, function(err, data) {
        if (err || !data) {
          return res.send('Error occurs!');
        } else {
          return res.send('complete delete successful');
        }
      });
    });

  app.route('/api/books/:id')
    .get(function(req, res) {
      let bookid = req.params.id; 

      BookModel.findById(bookid, function(err, data) {
      if (err) {
        return res.send('Error occurs!');
      } else if (!data) {
        return res.send('no book exists');
      } else {
        return res.json({
        _id: data._id, 
        title: data.title, 
        comments: data.comments, 
        commentcount: data.comments.length
        });  
      } 
      });
    })

    .post(function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;

      if (!comment) {
        return res.send('missing required field comment');
      }

      BookModel.findById(bookid, function(err, data) {
       if (err) {
         return res.send('Error occurs!');
       } else if (!data) {
         return res.send('no book exists');
       } else {
         data.comments.push(comment); 
         data.save(function(err, data) {
          if (err) {
            return res.send('Error occurs!');
          } else {
            return res.json({
              _id: data._id, 
              title: data.title, 
              comments: data.comments, 
              commentcount: data.comments.length
            });
          } 
         });
       }
      });
    })

    .delete(function(req, res) {
      let bookid = req.params.id;

      BookModel.findByIdAndRemove(bookid, function (err,data) {
        if (err || !data) {
          return res.send('no book exists');
        } else {
          return res.send('delete successful');
        }      
      });
    });
};
