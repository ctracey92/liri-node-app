var Spotify = require('node-spotify-api');
require('dotenv').config()

//Requiring the keys, and setting it to the keys variable.
var keys = require("./keys.js");

//Now we are able to access our keys info...
function Spotify(id,secret){
    this.id = id;
    this.secret = secret;
}

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret}
    );
// spotify


var axios = require("axios");
var moment = require('moment');
moment().format();

var command = process.argv[2];
var searchParameter = process.argv.slice(3).join("+");
var spotifySearch = process.argv.slice(3).join(" ");




//Concert-this
function concert(){
    
    if(searchParameter != ""){
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchParameter + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(function(response){
        
        var response = response.data;
        if(response != "[]"){
            for(var i = 0; i < response.length; i++){


            var concertDate = response[i].datetime;
            var convertedDate = moment(concertDate);
        
  

                console.log(response[i].venue.name);
                console.log(response[i].venue.region , "," , response[i].venue.city )
                console.log(convertedDate.format("MM/DD/YY"));
                console.log("=================")
            }
        }
        else{
            console.log("No concerts available")
        }
        
    }) 
    }
    else{
        console.log("Please enter a band or artist")
    }
    
}

function spotifyThis(){
    if(spotifySearch == ""){
        spotifySearch = "The Sign by Ace of Base"
    }
    console.log(spotifySearch + "*****");
    spotify
    .search({ type: 'track', query: spotifySearch })
    .then(function(response) {
        var response = response.tracks.items[0];
        for(var i = 0; i<response.artists.length; i++){
           console.log(response.artists[i].name); 
        }
      
      console.log(response.name)
      console.log(response.preview_url)
      console.log(response.album.name)
    //   console.log(response)
    })
    .catch(function(err) {
      console.log(err);
    });
    
}

function movie(){
    if (searchParameter == ""){
        searchParameter = "Mr+Nobody"
    }
    var queryUrl = "https://www.omdbapi.com/?t=" + searchParameter + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response){
        var response = response.data;
        console.log(response.Title);
        console.log(response.Year);
        console.log(response.imdbRating);
        console.log(response.Ratings[1].Value);
        console.log(response.Country);
        console.log(response.Language);
        console.log(response.Plot);
        console.log(response.Actors);
    })
}


function liri(){
  switch(command){
    case "concert-this": concert()
    break;
    case "spotify-this-song": spotifyThis()
    break;
    case "movie-this": movie()
    break;
    case "do-what-it-says": console.log("almost there but not yet")
    break;
}  
}
liri();