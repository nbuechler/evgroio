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
    etherContentLength: {
        type: String,
        default: '',
        trim: true,
    },
    physicContentLength: {
        type: Number,
        default: 0
    },
    emotionContentLength: {
        type: Number,
        default: 0
    },
    academicContentLength: {
        type: Number,
        default: 0
    },
    communeContentLength: {
        type: Number,
        default: 0
    },
    etherContent: {
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
	}
});

mongoose.model('Log', LogSchema);