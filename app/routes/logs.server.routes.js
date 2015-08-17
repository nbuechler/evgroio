'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var logs = require('../../app/controllers/logs.server.controller');

	// Logs Routes
	app.route('/logs')
		.get(logs.listByLogedInUser)
		.post(users.requiresLogin, logs.create);

	app.route('/publicLogs')
		.get(logs.listPublic)
		.post(users.requiresLogin, logs.create);

	app.route('/logs/:logId')
		.get(logs.read)
		.put(users.requiresLogin, logs.hasAuthorization, logs.update)
		.delete(users.requiresLogin, logs.hasAuthorization, logs.delete);

	// Finish by binding the Log middleware
	app.param('logId', logs.logByID);
};
