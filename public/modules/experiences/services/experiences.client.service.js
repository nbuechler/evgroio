'use strict';

//Experiences service used to communicate Experiences REST endpoints
angular.module('experiences').factory('Experiences', ['$resource',
	function($resource) {
		return $resource('experiences/:experienceId', { experienceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
//PublicExperiences service used to communicate Experiences REST endpoints
.factory('PublicExperiences', ['$resource',
	function($resource) {
		return $resource('publicExperiences');
	}
]);
