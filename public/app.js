// Grabbing the articles as a JSON
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {

    // This was the initial approach - appending to the #articles id, but decided to make a card for it instead (see below), and because of this, this section was commented out.

    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<br />"  + "http://www.chicagotribune.com" + data[i].link + "<br />" + "--------------------------------------------------------------------------------------------------------" +"</p>");

    // Appending the id, title, and link of the articles to the card body, adding a br and an hr between the elements.
    $(".card-body").append("<p data-id='" + data[i]._id + "'>" + "Article Title: " + "<br />" + data[i].title + "<br />" + "<hr />"  + "Article Link: " + "<br />" + "http://www.chicagotribune.com" + data[i].link + "<br />" + "--------------------------------------------------------------" +"</p>");
  }
});

// Whenever someone clicks a p tag (for the headline)
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Making an jax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // Adding the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h5>" + "Article Headline: " + "<br />" + data.title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button...
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // When this finishes, do this:
    .then(function(data) {
      // Logging the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Removing the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
