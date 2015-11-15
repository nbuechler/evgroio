// jshint ignore: start

angular.module('reflection-place').directive('mapViz', [ 'Activities', 'Experiences',
	function(Activities, Experiences) {

		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

        var activities = Activities.query();

        // console.log(activities);

        //Inspired by http://bl.ocks.org/mbostock/3750558
        activities.$promise.then(function(response) {

					var activities = [];
					var experiences = [],
							logs = [],
							expResponse = null,
							logResponse = null;

          var iso = {
						'name': 'everything',
						'_id': null,
						'children': activities
					};

					for (var actInd = 0; actInd < response.length; actInd++) {
						experiences = [];
						expResponse = response[actInd].experiencesList;
						console.log(response[actInd].experiencesList);
						for (var expInd = 0; expInd < expResponse.length; expInd++) {
							logs = [];
							logResponse = expResponse[expInd].logsList;
							for (var logInd = 0; logInd < logResponse.length; logInd++) {
								logs.push({
									'name': logResponse[logInd].name,
									'_id': logResponse[logInd]._id,
									'children': null
								});
							}
							experiences.push({
								'name': expResponse[expInd].name,
								'description': expResponse[expInd].description,
								'_id': expResponse[expInd]._id,
								'children': logs
							});
						}
						activities.push({
							'name': response[actInd].name,
							'_id': response[actInd]._id,
							'children': experiences
						});
					}

					console.log(iso);

          // console.log(response);
            // var graph = {
            //   'nodes': response,
            //   'links': [
            //     // {'source':  0, 'target':  1}
            //     // {'source':  1, 'target':  2},
            //     // {'source':  2, 'target':  0},
            //     // {'source':  1, 'target':  3},
            //     // {'source':  3, 'target':  2},
            //     // {'source':  3, 'target':  4},
            //     // {'source':  4, 'target':  5},
            //     // {'source':  5, 'target':  6},
            //     // {'source':  5, 'target':  7},
            //     // {'source':  6, 'target':  7},
            //     // {'source':  6, 'target':  8},
            //     // {'source':  7, 'target':  8},
            //     // {'source':  9, 'target':  4},
            //     // {'source':  9, 'target': 11},
            //     // {'source':  9, 'target': 10},
            //     // {'source': 10, 'target': 11},
            //     // {'source': 11, 'target': 12},
            //     // {'source': 12, 'target': 10}
            //   ]
            // };


            // var width = 1260,
            //     height = 500;
						//
            // var force = d3.layout.force()
            //   .size([width, height])
            //   .charge(-400)
            //   .linkDistance(40)
            //   .on('tick', tick);
						//
            // var drag = force.drag()
            //   .on('dragstart', dragstart);
						//
            // var svg = d3.select('body').append('svg')
            //   .attr('width', width)
            //   .attr('height', height);
						//
            // var link = svg.selectAll('.link'),
            //   node = svg.selectAll('.node');
						//
            // force
            //     .nodes(graph.nodes)
            //     .links(graph.links)
            //     .start();
						//
            // link = link.data(graph.links)
            //   .enter().append('line')
            //     .attr('class', 'link');
						//
            // node = node.data(graph.nodes)
            //   .enter().append('circle')
            //     .attr('class', 'node')
            //     .attr('r', function(d) {
            //       // console.log(d);
            //       return d.importance/3;
            //     })
            //     .on('dblclick', dblclick)
            //     .call(drag);
						//
            // function tick() {
            // link.attr('x1', function(d) { return d.source.x; })
            //     .attr('y1', function(d) { return d.source.y; })
            //     .attr('x2', function(d) { return d.target.x; })
            //     .attr('y2', function(d) { return d.target.y; });
						//
            // node.attr('cx', function(d) { return d.x; })
            //     .attr('cy', function(d) { return d.y; });
            // }
						//
            // function dblclick(d) {
            // d3.select(this).classed('fixed', d.fixed = false);
            // }
						//
            // function dragstart(d) {
            // d3.select(this).classed('fixed', d.fixed = true);
            // }


						var margin = {top: 20, right: 120, bottom: 20, left: 120},
						    width = 960 - margin.right - margin.left,
						    height = 800 - margin.top - margin.bottom;

						var i = 0,
						    duration = 750,
						    root;

						var tree = d3.layout.tree()
						    .size([height, width]);

						var diagonal = d3.svg.diagonal()
						    .projection(function(d) { return [d.y, d.x]; });

						var svg = d3.select('#tree').append('svg')
						    .attr('width', width + margin.right + margin.left)
						    .attr('height', height + margin.top + margin.bottom)
						  .append('g')
						    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

						  root = iso;
						  root.x0 = height / 2;
						  root.y0 = 0;

						  function collapse(d) {
						    if (d.children) {
						      d._children = d.children;
						      d._children.forEach(collapse);
						      d.children = null;
						    }
						  }

						  // root.children.forEach(collapse);
						  update(root);

						d3.select(self.frameElement).style('height', '800px');

						function update(source) {

						  // Compute the new tree layout.
						  var nodes = tree.nodes(root).reverse(),
						      links = tree.links(nodes);

						  // Normalize for fixed-depth.
						  nodes.forEach(function(d) { d.y = d.depth * 180; });

						  // Update the nodes…
						  var node = svg.selectAll('g.node')
						      .data(nodes, function(d) { return d.id || (d.id = ++i); });

						  // Enter any new nodes at the parent's previous position.
						  var nodeEnter = node.enter().append('g')
						      .attr('class', 'node')
						      .attr('transform', function(d) { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
						      .on('click', click);

						  nodeEnter.append('circle')
						      .attr('r', 1e-6)
						      .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });

						  nodeEnter.append('text')
						      .attr('x', function(d) { return d.children || d._children ? -10 : 10; })
						      .attr('dy', '.35em')
						      .attr('text-anchor', function(d) { return d.children || d._children ? 'end' : 'start'; })
						      .text(function(d) { return d.name; })
						      .style('fill-opacity', 1e-6);

						  // Transition nodes to their new position.
						  var nodeUpdate = node.transition()
						      .duration(duration)
						      .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

						  nodeUpdate.select('circle')
						      .attr('r', 4.5)
						      .style('fill', function(d) { return d._children ? 'lightsteelblue' : '#fff'; });

						  nodeUpdate.select('text')
						      .style('fill-opacity', 1);

						  // Transition exiting nodes to the parent's new position.
						  var nodeExit = node.exit().transition()
						      .duration(duration)
						      .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
						      .remove();

						  nodeExit.select('circle')
						      .attr('r', 1e-6);

						  nodeExit.select('text')
						      .style('fill-opacity', 1e-6);

						  // Update the links…
						  var link = svg.selectAll('path.link')
						      .data(links, function(d) { return d.target.id; });

						  // Enter any new links at the parent's previous position.
						  link.enter().insert('path', 'g')
						      .attr('class', 'link')
						      .attr('d', function(d) {
						        var o = {x: source.x0, y: source.y0};
						        return diagonal({source: o, target: o});
						      });

						  // Transition links to their new position.
						  link.transition()
						      .duration(duration)
						      .attr('d', diagonal);

						  // Transition exiting nodes to the parent's new position.
						  link.exit().transition()
						      .duration(duration)
						      .attr('d', function(d) {
						        var o = {x: source.x, y: source.y};
						        return diagonal({source: o, target: o});
						      })
						      .remove();

						  // Stash the old positions for transition.
						  nodes.forEach(function(d) {
						    d.x0 = d.x;
						    d.y0 = d.y;
						  });
						}

						// Toggle children on click.
						function click(d) {
						  if (d.children) {
						    d._children = d.children;
						    d.children = null;
						  } else {
						    d.children = d._children;
						    d._children = null;
						  }
						  update(d);
						}



        });


			}
		};
	}
]);
