const mongoose = require('mongoose');

const dinausoreSchema = new mongoose.Schema({
	login: String,
	race: String,
	famille: String,
	nourriture: String,
	age: Number,
	image: String,
	amis: [{ 
			login: String,
			pwd: String,
			race: String,
			famille: String,
			nourriture: String,
			age: Number,
		}]
});

module.exports = mongoose.model('Dinausore', dinausoreSchema);