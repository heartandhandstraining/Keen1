require('dotenv').config();

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	flash		=require("connect-flash-plus"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// mongo db atlas for development data base
mongoose.connect("mongodb://localhost:27017/keen_kamps", { 
	useNewUrlParser: true, 
	useFindAndModify: false, 
	useCreateIndex: true 
	}).then(() => {console.log('Connected to DB via local development database!');
	}).catch (err => {
		console.log('ERROR:', err.message);
	});;
// mongo db atlas for deployment data base
// mongoose.connect("mongodb+srv://Serenity:Hyonni00!@cluster0-z6en9.mongodb.net/test?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useFindAndModify: false,
// 	useCreateIndex: true 
// 	}).then(() => {console.log('Connected to DB via deployment database!');
// }).catch (err => {
// 	console.log('ERROR:', err.message);
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success")
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// for development goorm database
app.listen(3000, () => {
// for heroku deployment db
	console.log('KeenKamps via development database!');
// app.listen(process.env.PORT || 5000, () => {
    // console.log('KeenKamps via deployment database!');
});
