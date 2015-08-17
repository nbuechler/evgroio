'use strict';

// Configuring the Articles module
angular.module('activities').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Activities', 'activities', 'dropdown', '/activities(/create)?');
		Menus.addSubMenuItem('topbar', 'activities', 'Only my activities', 'activities');
		Menus.addSubMenuItem('topbar', 'activities', 'Public activities', 'publicActivities');
		Menus.addSubMenuItem('topbar', 'activities', 'New Activity', 'activities/create');
	}
]);
