'use strict';

angular.module('logs').directive('countBarChartViz', [
	function() {
		return {
			// templateUrl: 'modules/logs/templates/countBarChartViz.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

          window.alert('here');

			}
		};
	}
]);
