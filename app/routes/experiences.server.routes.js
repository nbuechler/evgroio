'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var experiences = require('../../app/controllers/experiences.server.controller');

	// Experiences Routes
	app.route('/experiences')
		.get(experiences.listByLogedInUser)
		.post(users.requiresLogin, experiences.create);

	app.route('/publicexperiences')
		.get(experiences.listPublic)
		.post(users.requiresLogin, experiences.create);

	app.route('/experiences/:experienceId')
		.get(experiences.read)
		.put(users.requiresLogin, experiences.hasAuthorization, experiences.update)
		.delete(users.requiresLogin, experiences.hasAuthorization, experiences.delete);

	// Finish by binding the Experience middleware
	app.param('experienceId', experiences.experienceByID);
};
