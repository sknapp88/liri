var keys = require("./keys.js");
var inquirer = require("inquirer");
var fs = require("fs");
var spotify = require("spotify");

// var input = process.argv;
// console.log(input);
var twitter = function(){
	if (input[2] === "my-tweets"){

	}
};

var getArtistNames = function(artist){
	return artist.name;
};

var spotifyMe = function(songName){
	if (songName === undefined){
		songName = "The Sign";
	}
	spotify.search({ 
		type: 'track',
		query: songName
	}, function(err, data) {
		if ( err ) {
			console.log('Error occurred: ' + err);
			return;
		}
		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++){
			console.log(i);
			console.log("artist(s): "+ songs[i].artists.map(getArtistNames));
			console.log("song name: "+ songs[i].name);
			console.log("preview song"+ songs[i].preview_url);
			console.log("album: "+ songs[i].album.name);
			console.log("----------------------------------");
		}
	});
};



var movieMe = function(movie){
	var movieUrl = "http://www.omdbapi.com/?" + movie + "&y"
};


var dwis = function(){
	if (input[2] === "do-what-it-says"){

	}
};

var run = function(arg1,arg2){
	switch(arg1){
		case "my-tweets": 
		//to do
		break;

		case "spotify-this-song":
		spotifyMe(arg2);
		break;

		case "movie-this":
		movieMe(arg2);
		break;

		case "do-what-it-says":
		// to do
		break;

		default: 
		console.log("invalid input");
		break;
	}
};

run(process.argv[2],process.argv[3]);