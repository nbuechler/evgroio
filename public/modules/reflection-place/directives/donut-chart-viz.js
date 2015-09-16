'use strict';

angular.module('logs').directive('donutChartViz', [
	function() {
		return {
			restrict: 'E',
			scope: {
			   sumPrivate: '@',
			   sumPublic: '@',
			},
			link: function postLink(scope, element, attrs) {

								// console.log(scope.sumPrivate, scope.sumPublic);

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

                //TODO: Come up with a better way to do this
                element.append('<div>').attr('id', randomHash);

							attrs.$observe('sumPrivate', function(value) {
								if(value.length > 0){

	                var dataset = {
	                  content: [attrs.sumPrivate, attrs.sumPublic],
	                };

	                var width = 250,
	                    height = 300,
	                    radius = Math.min(width, height) / 2;

	                var pie = d3.layout.pie()
	                    .sort(null);

	                var arc = d3.svg.arc()
	                    .innerRadius(radius - 100)
	                    .outerRadius(radius - 50);

	                var svg = d3.select('#' + randomHash).append('svg')
	                    .attr('width', width)
	                    .attr('height', height)
	                    .append('g')
	                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

									svg.append('text')
									   .attr('text-anchor', 'middle')
									   .text(attrs.sumPublic + ':' + attrs.sumPrivate)
										 .attr('class', 'ratioText');

	                var path = svg.selectAll('path')
	                    .data(pie(dataset.content))
	                  .enter().append('path')
										  .attr('class', function(d, i) { return 'shape' + i; })
	                    .attr('stroke' , 'white')
	                    .attr('stroke-width' , '3px')
	                    .attr('d', arc)
	                    .on('mouseenter', function(d) {
	                        console.log('in');
	                    })

	                    .on('mouseout', function(d) {
	                        console.log('out');
	                    });

								}
					    });


			}
		};
	}
]);
