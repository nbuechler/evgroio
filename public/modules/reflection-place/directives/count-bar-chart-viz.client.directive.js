'use strict';

angular.module('logs').directive('countBarChartViz', ['Logs', 'Authentication',
	function(Logs, Authentication) {


		return {
			templateUrl: 'modules/reflection-place/templates/countBarChartViz.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

    			Logs.query().$promise.then(function (response) {
      				var allUserLogData = [];
      				var physicContentData = [];
      				var emotionContentData = [];
      				var academicContentData = [];
      				var communeContentData = [];
      				var etherContentData = [];
      				for (var i = 0; i < response.length; i++) {
      						if (response[i].user._id === Authentication.user._id) {
      								allUserLogData.push(response[i]);
      								physicContentData.push(response[i].physicContentLength);
      								emotionContentData.push(response[i].emotionContentLength);
      								academicContentData.push(response[i].academicContentLength);
      								communeContentData.push(response[i].communeContentLength);
      								etherContentData.push(response[i].etherContentLength);
      						}
      				}
              // console.log(allUserLogData); //data

              // d3.select('#rpBarChart').text(allUserLogData);

  			});


			}
		};
	}
]);
