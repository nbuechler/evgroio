'use strict';

angular.module('logs').directive('logViz', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Log viz directive logic
				// ...

				element.text('this is the logViz directive');
			}
		};
	}
]);