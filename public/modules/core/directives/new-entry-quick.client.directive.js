'use strict';

angular.module('logs').directive('newEntryQuick', [ '$location',
	function(location) {
		return {
			templateUrl: 'modules/core/templates/newEntryQuickTemplate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var self = scope;

	      self.hidden = false;

	      self.items = [
	        {name: 'New Activity',
						icon: 'archive',
						color: '#EBEB92',
						direction: 'left',
						url: 'activities/create'},
	        {name: 'New Experience',
						icon: 'extension',
						color: '#8A9ABE',
						direction: 'left',
						url: 'experiences/create'},
	        {name: 'New Log',
						icon: 'speaker_notes',
						color: '#EB9292',
						direction: 'left',
						url: 'logs/create'}
	      ];

				self.changeLocation = function(item) {
	        location.url(item.url);
	      };

			}
		};
	}
]);
