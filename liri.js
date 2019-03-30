require('dotenv').config()

//Requiring the keys, and setting it to the keys variable.
var keys = require("./keys.js");

//Now we are able to access our keys info...
function Spotify(id,secret){
    this.id = id;
    this.secret = secret;
}

var spotify = new Spotify(keys.spotify.id,keys.spotify.secret);

 
// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

var axios = require("axios");
var moment = require('moment');
moment().format();

var searchParameter = ""

function parameters (){
    for (i = 3; i < process.argv.length; i++){
        searchParameter = searchParameter + process.argv[i];
    }
}

var command = process.argv[2];



//Concert-this
function concert(){
    parameters();

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


function liri(){
  switch(command){
    case "concert-this": concert()
    break;
    case "spotify-this-song": console.log('spotify not there yet')
    break;
    case "movie-this": console.log("movie not there yet")
    break;
    case "do-what-it-says": console.log("almost there but not yet")
    break;
}  
}

liri();