'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Experience = mongoose.model('Experience'),
	_ = require('lodash');

/**
 * Create an Experience
 */
exports.create = function(req, res) {
	var experience = new Experience(req.body);
	experience.user = req.user;

	experience.descriptionArray = experience.description.split(' ');
	experience.descriptionArrayLength = experience.descriptionArray.length;

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

	experience.descriptionArray = experience.description.split(' ');
	experience.descriptionArrayLength = experience.descriptionArray.length;

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

exports.listPublic = function(req, res) {
	Experience.find({'privacy': 1}).sort('-created').populate('user', 'displayName').exec(function(err, experiences) {
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
 * List of Experiences by user
 */
exports.listByLogedInUser = function(req, res) {
	Experience.find({'user': req.user}).sort('-created').populate('user', 'displayName').exec(function(err, experiences) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(experiences);
		}
	});
};

// /**
//  * List of Experience by activity
//  */
// exports.experienceByActivity = function(req, res) {
// 	Experience.find({'firstActivity': req.firstActivity}).sort('-created').populate('user', 'displayName').exec(function(err, experiences) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(experiences);
// 		}
// 	});
// };

/**
 * Experience middleware
 */
exports.experienceByID = function(req, res, next, id) {
	Experience.findById(id).populate('user', 'displayName').populate('firstActivity').exec(function(err, experience) {
		if (err) return next(err);
		if (! experience) return next(new Error('Failed to load Experience ' + id));
		req.experience = experience ;

		if(experience.firstActivity){
			/**
			 * Does the user id of the activity of the experience match the current user?
			 * If it does, then nothing happens, but if it doesn't then the firstActivity
			 * might be set to null so that people can't see it. Here's how:
			 * If the firstActivity.privacy is less than 1, then the it is private.
			 */

			var doesActivityUserMatch = experience.firstActivity.user.toString() === req.user._id.toString();
				if(experience.firstActivity.privacy < 1 && !doesActivityUserMatch) {
						req.experience.firstActivity = null;
				}
		}

		next();
	});
};

/**
 * Experience authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.experience.user.id !== req.user.id) {
		// TODO: Add logic that creates an alert log if someone is this is true
		if(req.experience.privacy < 1){
			return res.status(403).send('User is not authorized');
		}
	}
	next();
};
