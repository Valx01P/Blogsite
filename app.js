//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//our global array
let posts = []; //STEP 3


app.get("/", function(req, res) {
//renders the ejs "home" route for your starting route and defines the constant
//homeStartingContent so we can use it in ejs scriplet tags, we define it using
//a key value pair, (key: value)
  res.render("home", {
    startingContent: homeStartingContent,
    //defines posts as newPosts in the html form, it can be posts, but this
    //makes it easy to differentiate
    posts: posts //STEP 4
  });
  // to console log the array inputs -> console.log(posts);
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = { //STEP 1
    title: req.body.postTitle,
    content: req.body.postBody
  };
//add new items to the global array
  posts.push(post); //STEP 2
  res.redirect("/")
});
//Store the information of the
//requested title the user tries to access
app.get("/posts/:postName", function(req, res){ //STEP 5
	const requestedTitle = _.lowerCase(req.params.postName); //use lodash to make Lowercase
//Loop through each post and store the values as constants
  posts.forEach(function(post){
	  const storedTitle = _.lowerCase(post.title); //use Lodash to make lowerCase
//check the requested data against the stored data we have
    if (storedTitle === requestedTitle) {
      console.log("Match found!")
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
