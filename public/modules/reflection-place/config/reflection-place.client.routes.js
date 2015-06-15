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
		state('home-base', {
			url: '/home-base',
			templateUrl: 'modules/reflection-place/views/home-base.client.view.html'
		});
	}
]);