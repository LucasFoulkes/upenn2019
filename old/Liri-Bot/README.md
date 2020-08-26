![](assets/gifs/terminal.gif)
# Liri-Bot
is an attempt at creating a text based clone of siri

## Technologies
makes use of ajax to handle api's
dotenv to handle api's keys

## Api's
Spotify
BandsInTown
GoogleMaps: to get the addresses
Omdbapi


## Libraries
moment.js
fs.js
say.js : for speech generation. not yet implemented

# Use
there are 5 comands
## node liri.js concert-this
using the [bandsintown] api it looks for concerts of that artist or band, then using the [googleMapsApi] it gives you their address 
## node liri.js spotify-this-song-all
using the [spotify] api it gives you informatino of [all] the instances of that song
## node liri.js spotify-this-song
using the [spotify] api gives you the first result
## node liri.js movie-this
using the [omdb] api it gives you information for you searcg
## node liri.js do-what-it-says
using the fs.js library it opens the random.txt file and randmly selects one function to run

## tts branch 1
making use of say.js I can play a sound file on the terminal... somehow
