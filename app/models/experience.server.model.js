'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Experience Schema
 */
var ExperienceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Experience name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Experience', ExperienceSchema);