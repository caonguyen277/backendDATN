const Comment = require("../models/comment");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.commentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
      if (err || !comment) {
        return res.status(404).json({
          error: "comment does not exist",
        });
      }
      req.comment = comment;
      next();
    });
  };
  
  exports.createComment = (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, data) => {
      if (!err) {
        Comment.find({product : req.body.product}).populate("user","name").populate("product","_id").exec((err, data) => {
          if (!err) {
            res.status(200).json(data);
          } else {
            res.status(400).json({ error: errorHandler(err) });
          }
        });
      } else {
        res.status(400).json({ error: errorHandler(err) });
      }
    });
  };
  exports.listAllComment = (req, res) => {
    
    Comment.find({product : req.product._id}).populate("user","name").populate("product","_id").exec((err, data) => {
        if (!err) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ error: errorHandler(err) });
        }
      });
  };