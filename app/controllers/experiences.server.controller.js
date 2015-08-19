'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Experience = mongoose.model('Experience'),
	_ = require('lodash');

/**
 * Create a Experience
 */
exports.create = function(req, res) {
	var experience = new Experience(req.body);
	experience.user = req.user;

	experience.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(experience);
		}
	});
};

/**
 * Show the current Experience
 */
exports.read = function(req, res) {
	res.jsonp(req.experience);
};

/**
 * Update a Experience
 */
exports.update = function(req, res) {
	var experience = req.experience ;

	experience = _.extend(experience , req.body);

	experience.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(experience);
		}
	});
};

/**
 * Delete an Experience
 */
exports.delete = function(req, res) {
	var experience = req.experience ;

	experience.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(experience);
		}
	});
};

/**
 * List of Experiences
 */
exports.list = function(req, res) { 
	Experience.find().sort('-created').populate('user', 'displayName').exec(function(err, experiences) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(experiences);
		}
	});
};

/**
 * Experience middleware
 */
exports.experienceByID = function(req, res, next, id) { 
	Experience.findById(id).populate('user', 'displayName').exec(function(err, experience) {
		if (err) return next(err);
		if (! experience) return next(new Error('Failed to load Experience ' + id));
		req.experience = experience ;
		next();
	});
};

/**
 * Experience authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.experience.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
