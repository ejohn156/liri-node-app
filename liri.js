//[Twitter](https://www.npmjs.com/package/twitter)

//[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

//[Request](https://www.npmjs.com/package/request)

//You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

//[DotEnv](https://www.npmjs.com/package/dotenv)

//above are npm and api that are necessary for this hw
require("dotenv").config();
var keys = require("./keys")
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var request = require("request")
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var twitterSearch = "@BarackObama"
var spotifySearch = ""

var command = process.argv[2]

if (command === "my-tweets") {
    
    myTweets(process.argv.slice(3).join("+"))
}
else if (command === "spotify-this-song") {
    if (process.argv[3] === undefined)
    spotifySearch = "humble"
    else
    spotifySearch = process.argv.slice(3).join("%20");

    songSearch(spotifySearch)

}



else if (command === "movie-this") {
    var movie
    if (process.argv[3] === undefined)
        movie = "Mr. Nobody"
    else
        movie = process.argv.slice(3).join("+")
    movieSearch(movie)
    
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            if (data.length === "")
                console.log("you haven't told me to do anything")
            else{
                var instructions = data.split(",");
            command = instructions[0]
            input = instructions[1].replace(" ", "+")
            }

            switch (command){
                case "my-tweets":
                myTweets(input)
                break;
                case "spotify-this-song":
                songSearch(input)
                break;
                case "movie-this":
                movieSearch(input)
                break;
            }
            
        }
    })
    
}


function myTweets(x)
{
    if (x === undefined)
    twitterSearch = ""
    else
    
    twitterSearch = x.replace(/"/g, '')
    
    
    var params = {
        screen_name: twitterSearch,
        count: 20
    }
    console.log(params.screen_name)
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error)
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text)
                console.log(tweets[i].created_at)
                console.log("----------------------")
            }

    });
}
function songSearch(x){
spotify
  .search({ type: 'track', query: x, limit: 1 })
  .then(function(response) {
    console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Preview Link: " + response.tracks.items[0].href);
    console.log("Album: " + response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}
function movieSearch(movie){
request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings.imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });}