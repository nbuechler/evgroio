'use strict';

//Setting up route
angular.module('reflection-place').config(['$stateProvider',
	function($stateProvider) {
		// Reflection place state routing
		$stateProvider.
		state('map', {
			url: '/map',
			templateUrl: 'modules/reflection-place/views/map.client.view.html'
		}).
		state('overview', {
			url: '/overview',
			templateUrl: 'modules/reflection-place/views/overview.client.view.html'
		});
	}
]);