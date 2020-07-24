const express = require('express')
const app = express()
//const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const flash = require("connect-flash");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const methodOverride = require("method-override");

//REQUIRING ROUTES
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// seedDB(); //seed the database
//mongoose.connect('mongodb://localhost:27017/CarvalhoCamp', 
	mongoose.connect('mongodb+srv://Ezekiel:Ezekiel@cluster0.yta16.mongodb.net/goorm?retryWrites=true&w=majority',			 
	{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//app.listen(port, () => console.log(`The CarvalhoCamp Server has started!`))

var port = process.env.PORT || 3000;
app.listen(port, function () {  
  console.log("Server Has Started!");
});