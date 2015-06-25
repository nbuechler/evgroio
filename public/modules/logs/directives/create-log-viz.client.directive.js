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
                
                //TODO: 
                //Fix this so that it makes dots, or squares, or circles or something next to each
                //of the five sections.
                
                /*
                 * 1. Try to get the word count/idea length from the scope.
                 * 2. If not that, try saving the word count/idea length in localstorage
                 * 3. Take that number and do something with it visually, see above
                 * 4. Maybe combine all of the data for a big visualization
                 * 5. Or maybe bring back the idea of a nightengale graph
                 * 6. Or maybe make a mini dashboard that also includes a spider graph
                 * 7. But most importantly, try to have fun doing this!
                 */
                
                
			}
		};
	}
]);