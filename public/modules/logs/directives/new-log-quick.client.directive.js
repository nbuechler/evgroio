'use strict';

angular.module('logs').directive('newLogQuick', [
	function() {
		return {
			templateUrl: 'modules/logs/templates/newLogQuickTemplate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// New log quick directive logic
				// ...
                
                console.log('here');

			}
		};
	}
]);