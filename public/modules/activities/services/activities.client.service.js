'use strict';

//Activities service used to communicate Activities REST endpoints
angular.module('activities')
.factory('Activities', ['$resource',
	function($resource) {
		return $resource('activities/:activityId', { activityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
//PublicActivities service used to communicate Activities REST endpoints
.factory('PublicActivities', ['$resource',
	function($resource) {
		return $resource('publicActivities');
	}
]);
