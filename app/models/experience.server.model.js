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
	description: {
		type: String,
		default: '',
		required: 'Please fill in a description of the experience',
		trim: true
	},
	descriptionArray: {
		type: Array,
		default: []
	},
	descriptionArrayLength: {
		type: Number,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	privacy: {
		type: Number,
		default: 0
	},
	seconds: { //Lenght of time the experience happened
		type: Number,
		default: 0
	},
	firstActivityId: {
		type: Schema.ObjectId,
		ref: 'Activity'//,
		// required: 'Please choose an activity'
	}
});

mongoose.model('Experience', ExperienceSchema);
