var topic = ["Planes", "Trains", "Automobiles", "Terry Crews", "Sports", "Chickens", "Run", "Groot"];

function getGiphyWitIt() {

  $("#dangerZone").empty();

  for (var i = 0; i < topic.length; i++) {

    var gifButton = $("<button>");
    gifButton.addClass("action");
    gifButton.attr("data-name", topic[i]);
    gifButton.text(topic[i]);
    $("#dangerZone").append(gifButton);
  }
}

$("#startOver").on("click", function (event) {
  event.preventDefault();

  var newGif = $("#gifInput").val().trim();
  topic.push(newGif);
  var sumthin = $("<button>").text(newGif);
  sumthin.attr("data-name", newGif);
  sumthin.addClass("nowShowing");

  getGiphyWitIt();

});



getGiphyWitIt();

$(document).on("click", ".action", gifUp);



function gifUp() {
  var choice = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "&api_key=D0TKJpYNj7EKAf1EfhDlOmlsfqFbPJLp&limit=10";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    $("#gifTiles").empty();

    var gifs = response.data;

    for (var i = 0; i < gifs.length; i++) {
      var gifPane = $("<div>");
      var rating = gifs[i].rating;
      var displayRating = $("<p>").html("Rating: " + rating);
      var playGIF = $("<img class='gif'>");
      playGIF.attr('src', gifs[i].images.fixed_height_still.url);
      playGIF.attr("data-state", "still");
      playGIF.attr("data-still", gifs[i].images.fixed_height_still.url);
      playGIF.attr("data-animate", gifs[i].images.fixed_height.url);

      gifPane.append(displayRating).append(playGIF);

      $('#gifTiles').prepend(gifPane);
    }


  });
}




$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});