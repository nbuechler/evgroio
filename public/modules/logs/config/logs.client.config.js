'use strict';

// Configuring the Logs module
angular.module('logs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Logs', 'logs', 'dropdown', '/logs(/create)?');
		Menus.addSubMenuItem('topbar', 'logs', 'List Logs', 'logs');
		Menus.addSubMenuItem('topbar', 'logs', 'New Log', 'logs/create');
	}
]);