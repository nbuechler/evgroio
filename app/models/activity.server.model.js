'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Activity Schema
 */

 // TODO: Add an event of the activity -as in an event schema
var ActivitySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Activity name',
		trim: true
	},
  importance: {
		type: Number,
		default: 50
	},
  description: {
		type: String,
		default: '',
		required: 'Please fill in a description of the activity',
		trim: true
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
	}
});

mongoose.model('Activity', ActivitySchema);
