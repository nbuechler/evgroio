'use strict';

angular.module('logs').directive('newActivityQuick', [
	function() {
		return {
			templateUrl: 'modules/activities/templates/newActivityQuickTemplate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
