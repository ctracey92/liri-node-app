# liri-node-app

Student Contributors
@ctracey92

* Technology
 Javascript, Moment.js, Spotify API, Bands in Town API, OMDB API, DotEnv, Axios.

* About
A psuedo siri, just without the voice recognition. This application runs in the command line of your computer, and takes in 4 commands and search paramters and runs them.
In order to run this program you will need to do a few things first:
    1.Download the [spotifyNPM] (https://www.npmjs.com/package/node-spotify-api)
    1.Get Spotify keys and save them in a dotenv package using the format below
        -SPOTIFY_ID=YOUR ID HERE
        -SPOTIFY_SECRET=YOUR SECRET HERE
    1.Next install the [axiosNPM] (https://www.npmjs.com/package/axios)
    1.Afterwards install the [DotEnvNPM] (https://www.npmjs.com/package/dotenv)
Now we are ready to run the application!
    -"node liri.js concert-this artist or band name here" - will search for concerts of that artist and print them, or let you know there are none.
    -"node liri.js spotify-this-song song name here" - will search spotify for the song.
    -"node liri.js movie-this movie name here" - will search OMDB for the movie.
    -"node liri.js do-what-it-says" - Will run the grab the contents of a text file and search spotify for it.

*Video Demonstrations*
[DemoVideo](https://drive.google.com/open?id=1U3fl4AWHi_GbbtLA94565TtSRgy1_LG2)

* Objective
    - The main point of this objective is to demonstrate the mastery of JS applicaiton building in NODE. 

* Approach
    -The step was to set up the commands to be recognized (accomplished using a switch statement, and a process.argv statement)
    -Following this I decided to tackle the commands in order (concert-this, spotify-this-song,movie-this,do-what-it-says)
        -The first was was perhaps the most straight forward with a simple axios statement, and printing the data to the console.
        -The spotify was the most difficult as it was different style of API, and took a little working to get the keys working properly.
        -The movie-this was similar to the concert-this and fell along quickly.
        -This one required some jerry-rigging as to prevent an infinite loop in the console. When run it then redefines the command, and search-parameter variables using the text grabbed via fs and runs the liri function again.
    -The final (main) step was to refactor the code and see where I was repeating myself or making it more difficult than needed.

* Contributing Guidelines
All contributions and suggestions are welcome! For direct contributions, please fork the repository and file a pull request.

## Contact \(soon to be\) Developer/Full-stack Web Software Developer
* Homepage: https://github.com/ctracey92/
* e-mail: cody.tracey92@gmail.com
* LinkedIn: https://www.linkedin.com/in/cody-tracey-353432179