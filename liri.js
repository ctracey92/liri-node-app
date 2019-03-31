//Require spotyf
var Spotify = require('node-spotify-api');
//Require the dotenv package
require('dotenv').config()

//Requiring the keys, and setting it to the keys variable.
var keys = require("./keys.js");

//Now we are able to access our keys info...
function Spotify(id,secret){
    this.id = id;
    this.secret = secret;
}
//use the constructor to make the spotify keys from the .env 
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret}
    );
// spotify

//Require axios,fs, and moment
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
moment().format();

var divider = "\n======================";
var command = process.argv[2];
var searchParameter = process.argv.slice(3).join("+");
var spotifySearch = process.argv.slice(3).join(" ");


//Concert-this
function concert(){
    //If the search parameter is not blank run the code
    if(searchParameter != ""){
        //Query url variable
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchParameter + "/events?app_id=codingbootcamp"

    //Axios request using query url
    axios.get(queryUrl).then(function(response){
        
        //define the response variable as the response data
        var response = response.data;
        //If the response isnt blank execute the code
        if(response != ""){
            //For each entry in the response...
            for(var i = 0; i < response.length; i++){

                //Define the concert date variable and convert it to the recomended format
                var concertDate = response[i].datetime;
                var convertedDate = moment(concertDate);
                
                //Define the concertData variable as an array with the info, and join each entry with a line break
                var concertData = [
                    "Venue Name: " + response[i].venue.name,
                    "Venue Location: " + response[i].venue.region + "," + response[i].venue.city,
                    "Date: " + convertedDate.format("MM/DD/YY"),
                ].join("\n\n");
            
                //Console log it with a divider after
                console.log(concertData,divider)
            }
        }
        //Else let them know no concerts available
        else{
            console.log("No concerts available")
        }
        
    }) 
    }
    //Else if the search parameter is blank ask for them to enter a band or artist
    else{
        console.log("Please enter a band or artist")
    }
    
}

//Spotify-this-song
function spotifyThis(){
    //If the search is blank use the default variable
    if(spotifySearch == ""){
        spotifySearch = "The Sign by Ace of Base"
    }

    //Spotify API request
    spotify
    .search({ type: 'track', query: spotifySearch })
    .then(function(response) {
        //Define the response variable to the first entry
        var response = response.tracks.items[0]; 
        //Define teh artists variable as an empty array
        var artists = [];
        //Fill the array with the artists
        for(var i = 0; i<response.artists.length; i++){
           artists.push(response.artists[i].name); 
        }
        //Define the variable as an array and fill it
        var songData = [
            "Track Name: " + response.name,
            "Preview URL: " + response.preview_url,
            "Album: " + response.album.name,
            "Artist(s): " + artists,
          ].join("\n\n");
      
        //Print the songData and divider
        console.log(songData,divider);

    })
    //If there is an error, log it
    .catch(function(err) {
      console.log(err);
    });
    
}

//Movie-this
function movie(){
    //If a search parameter wasnt given use this default
    if (searchParameter == ""){
        searchParameter = "Mr+Nobody"
    }
    //Define the query URL
    var queryUrl = "https://www.omdbapi.com/?t=" + searchParameter + "&y=&plot=short&apikey=trilogy";
    //Axios request with the query URL
    axios.get(queryUrl).then(function(response){
        //Define the response as the response data
        var response = response.data;
        //Define the variable as an array and fill it
        var movieData = [
            "Title: " + response.Title,
            "Release Year: " + response.Year,
            "IMDB Rating: " + response.imdbRating,
            "Rotten Tomatoes Rating: " + response.Ratings[1].Value,
            "Country: " + response.Country,
            "Language: " + response.Language,
            "Plot: " + response.Plot,
            "Actors: " + response.Actors,
          ].join("\n\n");
        //Print the movieData and a divider  
        console.log(movieData,divider);
    })
}

//do-what-it-says
function doThis(){
    //Read the text file to grab the info for the variables
    fs.readFile("random.txt","utf8", function (error, data) {
        //If error then return it
        if (error) {
            return console.log(error)
        }
        
        //Split the data to call it later
        var total = data.split(",");
        
        //Re-define the variables so that Liri will run spotify
        command = total[0];
        spotifySearch = total[1];
        
        //Re-run Liri with the new commands
        liri();
          
    })

}

//Liri Commands
function liri(){
  switch(command){
    case "concert-this": concert()
    break;
    case "spotify-this-song": spotifyThis()
    break;
    case "movie-this": movie()
    break;
    case "do-what-it-says": doThis()
    break;
}  
}
liri();