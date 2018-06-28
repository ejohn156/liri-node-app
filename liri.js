//[Twitter](https://www.npmjs.com/package/twitter)
   
//[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
//[Request](https://www.npmjs.com/package/request)

     //You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

//[DotEnv](https://www.npmjs.com/package/dotenv)

//above are npm and api that are necessary for this hw
require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);