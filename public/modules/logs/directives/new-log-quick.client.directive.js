'use strict';

angular.module('logs').directive('newLogQuick', [
	function() {
		return {
			templateUrl: 'modules/logs/templates/newLogQuickTemplate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// New log quick directive logic
				// ...
                
                d3.select('#newLogQuickButton')
                .on('mouseover', function() {
                    d3.select('#newLogQuickButton').style('background-color', '#00A379');
                })
                .on('mouseout', function() {
                    console.log('bye');
                })

			}
		};
	}
]);