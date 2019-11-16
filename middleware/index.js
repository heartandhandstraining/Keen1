var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	// if(req.isAuthenticated()){
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err || !foundCampground){
			console.log(err);
			req.flash("error", "Campground not found.")
			res.redirect("/campgrounds");
		} else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
			req.campground = foundCampground;
			next();
		} else {
			req.flash("error", "You do not have credentials to do that.")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	// if(req.isAuthenticated()){
	Comment.findById(req.params.comment_id, function(err, foundComment){
	   if(err || !foundComment){
		   console.log(err);
			req.flash("error", "Comment not found");
			res.redirect("/campgrounds");
		} else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
			req.comment = foundComment;
			next();
		} else {
			req.flash("error", "You do not have credentials to do that.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	req.flash("error", "Please LOGIN first.");
	res.redirect("/login");
}

module.exports = middlewareObj