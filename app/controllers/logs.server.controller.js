'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Log = mongoose.model('Log'),
	_ = require('lodash');

/**
 * Create a Log
 */
exports.create = function(req, res) {
	var log = new Log(req.body);
	log.user = req.user;

	// TODO: Use a utility function or express something or other to make this
	// part of the array building modular

	//Create items in the logs physicArray, and others like it.

	log.physicArray = log.physicContent.split(' ');
	log.emotionArray = log.emotionContent.split(' ');
	log.academicArray = log.academicContent.split(' ');
	log.communeArray = log.communeContent.split(' ');
	log.etherArray = log.etherContent.split(' ');

	log.physicArrayLength = log.physicArray.length;
	log.emotionArrayLength = log.emotionArray.length;
	log.academicArrayLength = log.academicArray.length;
	log.communeArrayLength = log.communeArray.length;
	log.etherArrayLength = log.etherArray.length;

	log.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(log);
		}
	});
};

/**
 * Show the current Log
 */
exports.read = function(req, res) {
	res.jsonp(req.log);
};

/**
 * Update a Log
 */
exports.update = function(req, res) {
	var log = req.log ;

	log = _.extend(log , req.body);

	log.physicArray = log.physicContent.split(' ');
	log.emotionArray = log.emotionContent.split(' ');
	log.academicArray = log.academicContent.split(' ');
	log.communeArray = log.communeContent.split(' ');
	log.etherArray = log.etherContent.split(' ');

	log.physicArrayLength = log.physicArray.length;
	log.emotionArrayLength = log.emotionArray.length;
	log.academicArrayLength = log.academicArray.length;
	log.communeArrayLength = log.communeArray.length;
	log.etherArrayLength = log.etherArray.length;

	log.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(log);
		}
	});
};

/**
 * Delete an Log
 */
exports.delete = function(req, res) {
	var log = req.log ;

	log.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(log);
		}
	});
};

/**
 * List of Logs
 */
exports.list = function(req, res) {
	Log.find().sort('-created').populate('user', 'displayName').exec(function(err, logs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(logs);
		}
	});
};

exports.listPublic = function(req, res) {
	Log.find({'privacy': 1}).sort('-created').populate('user', 'displayName').exec(function(err, logs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(logs);
		}
	});
};

exports.listByLogedInUser = function(req, res) {
	Log.find({'user': req.user}).sort('-created').populate('user', 'displayName').exec(function(err, logs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(logs);
		}
	});
};

/**
 * Log middleware
 */
exports.logByID = function(req, res, next, id) {
	Log.findById(id).populate('user', 'displayName').populate('firstExperience').exec(function(err, log) {
		if (err) return next(err);
		if (! log) return next(new Error('Failed to load Log ' + id));

		req.log = log ;

		if(log.firstExperience){
			/**
			 * Does the user id of the experience of the log match the current user?
			 * If it does, then nothing happens, but if it doesn't then the firstExperience
			 * might be set to null so that people can't see it. Here's how:
			 * If the firstExperience.privacy is less than 1, then the it is private.
			 */
			var doesActivityUserMatch = false;
		 	if(req.user){
				var doesExperienceUserMatch = log.firstExperience.user.toString() === req.user._id.toString();
					if(log.firstExperience.privacy < 1 && !doesExperienceUserMatch) {
							req.log.firstExperience = null;
					}
			}
		}
		next();
	});
};

/**
 * Log authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.log.user.id !== req.user.id) {
		// TODO: Add logic that creates an alert log if someone is this is true
		if(req.log.privacy < 1){
			return res.status(403).send('User is not authorized');
		}
	}
	next();
};
