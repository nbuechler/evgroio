'use strict';

angular.module('logs').directive('countBarChartViz', [ 'LogService',
	function(LogService) {

    console.log(LogService.getAllLogsForUser(), 'indirect');

		return {
			// templateUrl: 'modules/logs/templates/countBarChartViz.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {






			}
		};
	}
]);
