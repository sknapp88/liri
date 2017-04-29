var keys = require("./keys.js");
var inquirer = require("inquirer");
var fs = require("fs");
var spotify = require("spotify");
var request = require("request");
var twitter = require("twitter");
// var omdb = require("omdb");

// var input = process.argv;
// console.log(input);

var client = new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

var twitterMe = function(){
	{
		client.get('statuses/user_timeline', function(error, tweets, response){
			if(!error) {
				for ( var i=0; i<20; i++){
					console.log(tweets[i].text);
				}
			}
		});
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
			console.log(i+1);
			console.log("artist(s): "+ songs[i].artists.map(getArtistNames));
			console.log("song name: "+ songs[i].name);
			console.log("preview song"+ songs[i].preview_url);
			console.log("album: "+ songs[i].album.name);
			console.log("----------------------------------");
		}
	});
};



var movieMe = function(movie){
	// omdb.search( movie || 'saw', function(err, movies) {
		var movieUrl = "http://www.omdbapi.com/?t=" + movie +"&y=&plot=full&r=json";

		// if (err) {
		// 	console.log(err);
		// }

		request( movieUrl, function( err, resp, body ) {
			if ( err ) throw err;

			
			var movie = JSON.parse(body);
			console.log(movie);
			// var movies = [body];
			// if (movies.length < 1) {
			// 	console.log('No movies were found!');
			// }
			// movies.forEach(function(movie) {
				console.log("-----------------------------------------");
				console.log( "Title           : " + movie.Title );
				console.log( "Year released   : " + movie.Year );
				console.log( "IMDB Rating     : " + movie.imdbRating );
				console.log( "Country         : " + movie.Country );
				console.log( "Language        : " + movie.Language );
				console.log( "Plot            : " + movie.Plot );
				console.log( "Actors          : " + movie.Actors );
				console.log( "Rotten tomatoes : " + movie.RottenTomatoes || 'Unavailable' );
				console.log( "Rotten URL      : " + movie.RottenURL || 'Unavailable' );
			// });
		});


		

    // });
};


var dwis = function(){
	var random = fs.readFile("random.txt", "UTF-8", function(err, data){
		var pieces = data.split(",");
		run(pieces[0], pieces[1]);
	});
};

var run = function(arg1,arg2){
	switch(arg1){
		case "my-tweets": 
		twitterMe();
		break;

		case "spotify-this-song":
		spotifyMe(arg2);
		break;

		case "movie-this":
		movieMe(arg2);
		break;

		case "do-what-it-says":
		dwis();
		break;

		default: 
		console.log("invalid input");
		break;
	}
};

run(process.argv[2],process.argv[3]);