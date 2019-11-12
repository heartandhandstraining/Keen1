var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
	//find name of campground by id 
	console.log(req.params.id);
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//Comments Create
router.post('/', middleware.isLoggedIn, (req, res) => {
	//lookup campground using ID
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		} else {
		//create new coment
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					req.flash("error", "Something went wrong.");
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					//save comment
					comment.save();
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					//redirect to that campground show page
					req.flash("success", "Successfully added comment.");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// COMMENT EDIT
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});

// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//    Comment.findById(req.params.comment_id, function(err, foundComment){
//       if(err){
//           res.redirect("back");
//       } else {
//         res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
//       }
//    });
// });

//COMMENT UPDATE
router.put("/:comment_id",  middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err){
			res.redirect("back");
		}else{
            res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY COMMENT ROUTE 
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
