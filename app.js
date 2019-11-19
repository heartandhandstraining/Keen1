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
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://127.0.0.1:27017/keen_kamps";

mongoose.connect(url, { 
    useUnifiedTopology: true,
	useNewUrlParser: true, 
	useFindAndModify: false, 
	useCreateIndex: true 
	}).then(() => {console.log('Connected to DB');
	}).catch (err => {
	    console.log('ERROR:', err.message);
	});

// mongo db atlas for deployment data base
// mongoose.connect("mongodb+srv://dawn:<password>@cluster0-jsc8q.mongodb.net/test?retryWrites=true&w=majority". {
// mongoose.connect("mongodb+srv://Serenity:<password>@cluster0-z6en9.mongodb.net/test?retryWrites=true&w=majority", {

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

// for development or goorm database
// app.listen(3000, () => {
// 	console.log('KeenKamps development environment!');
// for heroku deployment db
app.listen(process.env.PORT || 3000, () => {
    console.log('KeenKamps environment connected');
});