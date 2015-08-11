'use strict';

angular.module('reflection-place').factory('LogService', ['Logs', 'Authentication',
	function(Logs, Authentication) {
		// Log service service logic

		//In this method...
		/*
		 *
		 * I need to figure out how to pull back the following information:
		 * 1) Information regarding the totals of all logs
		 * 2) Information regarding the totals of all logs with regard to a user!
		 *
		 */

	// Public API
	return {
		getAllLogsForUser: function() {
			// TODO: When I get a chance to get better with express.js...
			//      figure out how to return back just the authenticated users' logs
			var userLogs = [];
			var logs = Logs.query(function(response) {
				for (var i = 0; i < response.length; i++) {
						if (response[i].user._id === Authentication.user._id) {
								userLogs.push(response[i]);
						}
				}
			});
			return userLogs;
		}
	};
	}
]);
