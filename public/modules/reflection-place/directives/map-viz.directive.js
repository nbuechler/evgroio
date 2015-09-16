'use strict';

angular.module('logs').directive('mapViz', [
	function() {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

          console.log('here');

			}
		};
	}
]);
