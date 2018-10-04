// Requiring express
var express = require("express");
// Requiring body-parser
var bodyParser = require("body-parser");
// Requiring morgan
var logger = require("morgan");
// Requring mongoose
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models from the models folder
var db = require("./models");

// Setting the port either to the PORT that mongoose wants to use or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
// This was commented out so that I could use the suggestion in the homework instructions instead
// mongoose.connect("mongodb://localhost/mongoHeadlines3");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines3";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
// Console logging what server.js is doing --- pulling Chicago Tribune headlines
console.log("\n***********************************\n" +"Grabbing every thread name and link\n" + "from the Chicago Tribune website:" + "\n***********************************\n");

// This is the GET route for scraping the Chicago Tribune website
app.get("/scrape", function(req, res) {
  // Grabbing the body of the html with request
  axios.get("http://www.chicagotribune.com/").then(function(response) {
    // Loading this into cheerio and saving it to a new var called $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Grabbing title and link information within an h3 tag
    $("h3.trb_outfit_relatedListTitle").each(function(i, element) {
      // Saving this to an empty object called result
      var result = {};
      // Adding the text and href of every link, and saving them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      // Creating a new Article using the `result` object built from scraping above
      db.Article.create(result)
        .then(function(dbArticle) {
          // Logging the added result to the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send the error to the client
          return res.json(err);
        });
    });

    // If the scrape route was hit successfully scrape the data and save an Article, then send a message to the client
    res.send("Scrape has been completed!");
  });
});

// Route for getting all Articles from the database
app.get("/articles", function(req, res) {
  // Grabbing every document in the Articles collection and sorting by newest id (so that the most recent items show when scraped) and limiting the number of results dumped to the page to 50.
  db.Article.find({}, null, {sort:{"_id":-1}}).limit(50)

    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send the error to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populating all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Starting the server
app.listen(PORT, function() {
  // Making the output brighter, and adding different color to every word. Cause...priorities
  console.log("\x1b[1m","\x1b[34m","\n-------------------------------------------------\n" + "\x1b[30m","This" +"\x1b[31m","application" + "\x1b[32m","is" + "\x1b[33m","listening" + "\x1b[34m","on" + "\x1b[35m","PORT:" + "\x1b[36m", PORT + "\x1b[34m","\n-------------------------------------------------\n");
  // Resetting console formatting to default
  console.log("\x1b[0m");
});
