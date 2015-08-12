'use strict';

angular.module('logs').directive('countLineChartViz', ['Logs', 'Authentication',
	function(Logs, Authentication) {


		return {
			templateUrl: 'modules/reflection-place/templates/countLineChartViz.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

    			Logs.query().$promise.then(function (response) {
      				var allUserLogData = [];
      				var physicContentData = [];
      				var emotionContentData = [];
      				var academicContentData = [];
      				var communeContentData = [];
      				var etherContentData = [];
      				var dateData = [];
      				for (var i = 0; i < response.length; i++) {
      						if (response[i].user._id === Authentication.user._id) {
      								allUserLogData.push(
												{
													'created' : response[i].created,
													'physicContentLength': response[i].physicContentLength,
													'academicContentLength': response[i].academicContentLength,
													'emotionContentLength': response[i].emotionContentLength,
													'communeContentLength': response[i].communeContentLength,
													'etherContentLength': response[i].etherContentLength
												}
											);
      								physicContentData.push(response[i].physicContentLength);
      								emotionContentData.push(response[i].emotionContentLength);
      								academicContentData.push(response[i].academicContentLength);
      								communeContentData.push(response[i].communeContentLength);
      								etherContentData.push(response[i].etherContentLength);
      								dateData.push(response[i].created);
      						}
      				}
              // console.log(allUserLogData); //data


							/*
							 * Inspired by : http://bl.ocks.org/mbostock/3884955
							 * This visualization tracks the length of all the passages for a
							 * give log entry.
							 */

							var margin = {top: 20, right: 80, bottom: 30, left: 50},
							    width = 700 - margin.left - margin.right,
							    height = 500 - margin.top - margin.bottom;

							// var parseDate = d3.time.format("%Y%m%d").parse;

							var x = d3.time.scale()
							    .range([0, width]);

							var y = d3.scale.linear()
							    .range([height, 0]);

							var color = d3.scale.ordinal()
														.range(['#56222E', '#262561', '#632F5F', '#296A52', '#775923']);
							// var color = d3.scale.category10();

							var xAxis = d3.svg.axis()
							    .scale(x)
							    .orient("bottom");

							var yAxis = d3.svg.axis()
							    .scale(y)
							    .orient("left");

							var line = d3.svg.line()
							    .interpolate("basis")
							    .x(function(d) { return x(d.date); })
							    .y(function(d) { return y(d.distance); });

							var svg = d3.select("#rpLineChart").append("svg")
							    .attr("width", width + margin.left + margin.right)
							    .attr("height", height + margin.top + margin.bottom)
							  .append("g")
							    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


								var data = allUserLogData

							  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "created"; }));

							  data.forEach(function(d) {
									//d.date = d3.time.format.iso.parse('2015-08-07T22:52:44.106Z')
							    d.date = d3.time.format.iso.parse(d.created);
							  });

							  var distances = color.domain().map(function(name) {
							    return {
							      name: name,
							      values: data.map(function(d) {
							        return {date: d.date, distance: +d[name]};
							      })
							    };
							  });

							  x.domain(d3.extent(data, function(d) { return d.date; }));

							  y.domain([
							    d3.min(distances, function(c) { return d3.min(c.values, function(v) { return v.distance; }); }),
							    d3.max(distances, function(c) { return d3.max(c.values, function(v) { return v.distance; }); })
							  ]);

							  svg.append("g")
							      .attr("class", "x axis")
							      .attr("transform", "translate(0," + height + ")")
							      .call(xAxis);

							  svg.append("g")
							      .attr("class", "y axis")
							      .call(yAxis)
							    .append("text")
							      .attr("transform", "rotate(-90)")
							      .attr("y", 6)
							      .attr("dy", ".71em")
							      .style("text-anchor", "end")
							      .text("Character Count (number of letters)");

// console.log(distances); //uncomment to see what data is being rendered

							  var distance = svg.selectAll(".distance")
							      .data(distances)
							    .enter().append("g")
							      .attr("class", "distance");

							  distance.append("path")
							      .attr("class", "line")
							      .attr("d", function(d) { return line(d.values); })
							      .style("stroke", function(d) { return color(d.name); });

							  distance.append("text")
							      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
							      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.distance) + ")"; })
							      .attr("x", 3)
							      // .text(function(d) { return d.name; })
							      .attr("dy", ".35em")
										.classed('white', true);


  			});


			}
		};
	}
]);
