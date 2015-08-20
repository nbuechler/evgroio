'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var activities = require('../../app/controllers/activities.server.controller');

	// Activities Routes
	app.route('/activities')
		.get(activities.listByLogedInUser)
		.post(users.requiresLogin, activities.create);

	app.route('/publicActivities')
		.get(activities.listPublic)
		.post(users.requiresLogin, activities.create);

	app.route('/activities/:activityId')
		.get(users.requiresLogin, activities.hasAuthorization, activities.read)
		.put(users.requiresLogin, activities.hasAuthorization, activities.update)
		.delete(users.requiresLogin, activities.hasAuthorization, activities.delete);

	// Finish by binding the Activity middleware
	app.param('activityId', activities.activityByID);
};
