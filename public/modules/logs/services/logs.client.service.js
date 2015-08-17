'use strict';

//Logs service used to communicate Logs REST endpoints
angular.module('logs')
.factory('Logs', ['$resource',
	function($resource) {
		return $resource('logs/:logId', { logId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
//PublicActivities service used to communicate Activities REST endpoints
.factory('PublicLogs', ['$resource',
	function($resource) {
		return $resource('publicLogs');
	}
]);
