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
	Log.findById(id).populate('user', 'displayName').exec(function(err, log) {
		if (err) return next(err);
		if (! log) return next(new Error('Failed to load Log ' + id));
		req.log = log ;
		next();
	});
};

/**
 * Log authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.log.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
