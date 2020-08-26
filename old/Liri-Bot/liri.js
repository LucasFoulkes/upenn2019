require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require("fs");
var spoty = new Spotify(keys.spotify);
var commnand = process.argv[2];
var term = process.argv.slice(3);
var url = "";
term = term.join("%20");

function switchCommand(commnand, term) {
    switch (commnand) {
        case "concert-this":
            function concertThis(term) {
                var result = [];
                url = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
                axios.get(url)
                    .then(function (response) {
                        for (i in response.data) {
                            result.push([
                                response.data[i].venue.name,
                                moment(response.data[i].datetime).format('MM/DD/YYYY'),
                                response.data[i].venue.latitude + "," + response.data[i].venue.latitude,
                            ])
                        }
                    }).then(function () {
                        console.log("-----------------------------------------------------------------")
                        counter = 0;
                        function formatResult() {
                            if (counter < result.length) {
                                axios.get(
                                    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
                                    result[counter][0] + "&inputtype=textquery&fields=formatted_address&locationbias=circle:2000@" +
                                    result[counter][2] + "&key=AIzaSyA9qikTecX-esxNDO92UP1k8hdUpqg9AB8"
                                )
                                    .then(function (answer) {
                                        temp = JSON.stringify(answer.data);
                                        temp = temp.split('"');
                                        temp = temp[5];
                                        result[counter][2] = temp;
                                        counter++;
                                        formatResult();
                                    })
                            }
                            else {
                                //this be the end of it :_) so happy
                                for (i in result) {
                                    console.log(i + ":    " + result[i].join("  ,   "));
                                }
                            }
                        }
                        formatResult();
                    })
            }
            concertThis(term);
            break;

        case "spotify-this-song-all":
            function spotifyAll(term) {
                spoty.search({ type: 'track', query: term }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    for (i in data.tracks.items) {
                        console.log("------------------------------------------")
                        console.log(data.tracks.items[i].artists[0].name);
                        console.log(data.tracks.items[i].name);
                        console.log(data.tracks.items[i].external_urls.spotify);
                        console.log(data.tracks.items[i].album.name);
                    }
                });
            }
            spotifyAll(term);
            break;
        case "spotify-this-song":
            function spotify(term) {
                spoty.search({ type: 'track', query: term }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log(data.tracks.items[0].artists[0].name);
                    console.log(data.tracks.items[0].name);
                    console.log(data.tracks.items[0].external_urls.spotify);
                    console.log(data.tracks.items[0].album.name);
                });
            }
            spotify(term);
            break;

        case "movie-this":
            if (term.length === 0) {
                term = "Mr.Nobody";
            }
            function movie(term) {
                url = "http://www.omdbapi.com/?apikey=trilogy&t=" + term
                axios.get(url)
                    .then(function (response) {
                        console.log(response.data.Title);
                        console.log(response.data.Year);
                        console.log(response.data.imdbRating);
                        console.log(response.data.Country);
                        console.log(response.data.Language);
                        console.log(response.data.Plot);
                        console.log(response.data.Actors);
                    })
            }
            movie(term);
            break;

        case "do-what-it-says":
            fs.readFile("random.txt", 'utf8', function (err, data) {
                if (err) throw err;
                data = data.split("\n");
                random = data[Math.floor(Math.random() * data.length)]
                random = random.split(",");
                switchCommand(random[0], random[1].slice(1, -1))
            })
            break;
    }
}
switchCommand(commnand, term)