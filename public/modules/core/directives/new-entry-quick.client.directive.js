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
						color: '#00BC8C',
						direction: 'left',
						url: 'activities/create'},
	        {name: 'New Experience',
						icon: 'extension',
						color: '#BBBBBB',
						direction: 'left',
						url: 'experiences/create'},
	        {name: 'New Log',
						icon: 'speaker_notes',
						color: '#FF4081',
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
