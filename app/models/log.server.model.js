'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Log Schema
 */
var LogSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Log name',
		trim: true
	},
    physicContent: {
        type: String,
        default: '',
        trim: true,
    },
    emotionContent: {
        type: String,
        default: '',
        trim: true,
    },
    academicContent: {
        type: String,
        default: '',
        trim: true,
    },
    communeContent: {
        type: String,
        default: '',
        trim: true,
    },
    etherContent: {
        type: String,
        default: '',
        trim: true,
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

mongoose.model('Log', LogSchema);