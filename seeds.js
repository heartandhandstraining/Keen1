// var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");//
 
var data = [
	{
        name: "Canyon Floor", 
        image: "https://www.keepandshare.com/userpics/h/e/a/r/tnhandstraining/2019-09/sb/freakyscanyonfloor-46389264.jpg?ts=1567813797",
        description: "rah rah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web 		designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of 				Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d2aa2f3e8b614229ed89702",
			username: "Harry"
		}
    },
    {
        name: "Cloud's Rest", 
        image: "https://www.keepandshare.com/userpics/h/e/a/r/tnhandstraining/2019-09/sb/harryscloudrest-9011697.jpg?ts=1567813798",
        description: "blah blah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d2aa2f3e8b614229ed89702",
			username: "Harry"
		}
    },
    {
        name: "Desert Mesa", 
        image: "https://www.keepandshare.com/userpics/h/e/a/r/tnhandstraining/2019-09/sb/candysdesertmesa-76930710.jpg?ts=1567813797",
        description: "hah hah...Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web 		designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of 				Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
		author: 
			{id: "5d2aa2f3e8b614229ed89702",
			username: "Harry"
		}
    },
];
 
function seedDB(){
//    Remove all campgrounds
//    Campground.deleteMany({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.deleteMany({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {text: "HOMER: This place is great, but I wish there was internet.",
//                             	// author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("Created new comment");
//                             }
//                         });
//                     }
//                 });
//             });
//         });
//     }); 
}
 
module.exports = seedDB;