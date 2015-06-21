'use strict';

angular.module('logs').directive('createLogViz', [
	function() {
		return {
			templateUrl: 'modules/logs/templates/createLogVizTemplate.html',
			restrict: 'E',
            scope: {
                data: '='
            },
			link: function postLink(scope, element, attrs) {
                
                d3.select('#physicalDZViz');
			}
		};
	}
]);