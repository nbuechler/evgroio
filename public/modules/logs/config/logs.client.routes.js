'use strict';

//http://stackoverflow.com/questions/24308368/how-to-manage-assets-css-in-mean-js-node-js

//Setting up route
angular.module('logs').config(['$stateProvider',
	function($stateProvider) {
		// Logs state routing
		$stateProvider.
		state('listPublicLogs', {
			url: '/publicLogs',
			templateUrl: 'modules/logs/views/list-public-logs.client.view.html',
            css: 'css/box.css'
		}).
		state('listMyLogs', {
			url: '/logs',
			templateUrl: 'modules/logs/views/list-logs.client.view.html',
            css: 'css/box.css'
		}).
		state('createLog', {
			url: '/logs/create',
			templateUrl: 'modules/logs/views/create-log.client.view.html',
            css: 'css/box.css'
		}).
		state('viewLog', {
			url: '/logs/:logId',
			templateUrl: 'modules/logs/views/view-log.client.view.html',
            css: 'css/box.css'
		}).
		state('editLog', {
			url: '/logs/:logId/edit',
			templateUrl: 'modules/logs/views/edit-log.client.view.html',
            css: 'css/box.css'
		});
	}
]);
