'use strict';

// Configuring the Articles module
angular.module('experiences').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Experiences', 'experiences', 'dropdown', '/experiences(/create)?');
		Menus.addSubMenuItem('topbar', 'experiences', 'Personal Experiences', 'experiences');
		Menus.addSubMenuItem('topbar', 'experiences', 'Public Experiences', 'publicExperiences');
		Menus.addSubMenuItem('topbar', 'experiences', 'New Experience', 'experiences/create');
	}
]);
