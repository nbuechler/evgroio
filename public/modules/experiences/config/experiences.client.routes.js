'use strict';

//Setting up route
angular.module('experiences').config(['$stateProvider',
	function($stateProvider) {
		// Experiences state routing
		$stateProvider.
		state('listPublicExperiences', {
			url: '/publicExperiences',
			templateUrl: 'modules/experiences/views/list-public-experiences.client.view.html'
		}).
		state('listMyExperiences', {
			url: '/experiences',
			templateUrl: 'modules/experiences/views/list-experiences.client.view.html'
		}).
		state('createExperience', {
			url: '/experiences/create',
			templateUrl: 'modules/experiences/views/create-experience.client.view.html'
		}).
		state('viewExperience', {
			url: '/experiences/:experienceId',
			templateUrl: 'modules/experiences/views/view-experience.client.view.html'
		}).
		state('editExperience', {
			url: '/experiences/:experienceId/edit',
			templateUrl: 'modules/experiences/views/edit-experience.client.view.html'
		});
	}
]);
