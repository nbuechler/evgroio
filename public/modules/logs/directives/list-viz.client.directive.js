'use strict';

angular.module('logs').directive('listViz', [
	function() {
		return {
			templateUrl: 'modules/logs/templates/listVizTemplate.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                
//                console.log(element);
//                console.log(scope.log.$$hashKey);
                
                var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                
                function getRandomArbitrary(min, max) {
                    return Math.random() * (max - min) + min;
                }
                
                //TODO: Make this more robust -- since duplicates will break the visualization... like maybe check an array to see if a random hash is already used.
                var random1 =(Math.floor(getRandomArbitrary(0,25))),
                    random2 =(Math.floor(getRandomArbitrary(0,25))),
                    random3 =(Math.floor(getRandomArbitrary(0,25))),
                    random4 =(Math.floor(getRandomArbitrary(0,25))),
                    random5 =(Math.floor(getRandomArbitrary(0,25))),
                    random6 =(Math.floor(getRandomArbitrary(0,25)));
                
                var randomHash = alpha[random1] + alpha[random2] + alpha[random3] + alpha[random4] + alpha[random5] + alpha[random6];
//                console.log(randomHash);
                
                //TODO: Come up with a better way to do this
                element.append('<div>').attr('id', randomHash);
                
                
                var dataset = {
                  content: [scope.log.physicContent.length, scope.log.emotionContent.length, scope.log.academicContent.length, scope.log.communeContent.length, scope.log.etherContent.length],
                };

                var width = 350,
                    height = 400,
                    radius = Math.min(width, height) / 2;

                
                var color = ['#56222E', '#262561', '#632F5F', '#296A52', '#775923'];

                var pie = d3.layout.pie()
                    .sort(null);

                var arc = d3.svg.arc()
                    .innerRadius(radius - 100)
                    .outerRadius(radius - 50);

                var svg = d3.select("#" + randomHash).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var path = svg.selectAll("path")
                    .data(pie(dataset.content))
                  .enter().append("path")
                    .attr("fill", function(d, i) { return color[i]; })
                    .attr("stroke" , "black")
                    .attr("stroke-width" , "3px")
                    .attr("d", arc)
                    .on('mouseenter', function(d) {
                        console.log('in');
                    })

                    .on("mouseout", function(d) {
                        console.log('out');
                    });


			}
		};
	}
]);