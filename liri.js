var keys = require("keys.js");
var inquirer = require("inquirer");
var fs = require("fs");

var input = process.argv;

function twitter(){
	if (input[2] === "my-tweets"){

	}
}

function spotify(){
	if (input[2] === "spotify-this-song"){
		inquirer.prompt([
		{
			type: "input",
			message: "What song do you want information about?",
			name: "song"
		}
			]);
	}

}

function movie(){
	if (input[2] === "movie-this"){

	}
}

function dwis(){
	if (input[2] === "do-what-it-says"){

	}
}