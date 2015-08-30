'use strict';

// Logs controller
angular.module('logs').controller('LogsController',
['$scope', '$stateParams', '$location', 'Authentication', 'Logs',
'PublicLogs', 'Experiences',
	function($scope, $stateParams, $location, Authentication, Logs, PublicLogs, Experiences) {
		$scope.authentication = Authentication;

		// Create new Log
		$scope.create = function() {
			// Create new Log object
			var log = new Logs ({
				name: this.name,
                physicContent: this.physicContent,
                emotionContent: this.emotionContent,
                academicContent: this.academicContent,
                communeContent: this.communeContent,
                etherContent: this.etherContent,
                physicContentLength: this.physicContent ? this.physicContent.length : 0,
                emotionContentLength: this.emotionContent ? this.emotionContent.length : 0,
                academicContentLength: this.academicContent ? this.academicContent.length : 0,
                communeContentLength: this.communeContent ? this.communeContent.length : 0,
                etherContentLength: this.etherContent ? this.etherContent.length : 0,
                privacy: this.privacy ? this.privacy : 0,
								firstExperience: $scope.selectedExperience ? $scope.selectedExperience._id : null,
			});

			// Redirect after save
			log.$save(function(response) {
				$location.path('logs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Log
		$scope.remove = function(log) {
			if ( log ) {
				log.$remove();

				for (var i in $scope.logs) {
					if ($scope.logs [i] === log) {
						$scope.logs.splice(i, 1);
					}
				}
			} else {
				$scope.log.$remove(function() {
					$location.path('logs');
				});
			}
		};

		// Update existing Log
		$scope.update = function() {

      //Calculate log lengths for logs that don't have log lengths
      $scope.log.physicContentLength = $scope.log.physicContent ? $scope.log.physicContent.length : 0;
      $scope.log.emotionContentLength = $scope.log.emotionContent ? $scope.log.emotionContent.length : 0;
      $scope.log.academicContentLength = $scope.log.academicContent ? $scope.log.academicContent.length : 0;
      $scope.log.communeContentLength = $scope.log.communeContent ? $scope.log.communeContent.length : 0;
      $scope.log.etherContentLength = $scope.log.etherContent ? $scope.log.etherContent.length : 0;

			$scope.log.privacy = $scope.log.privacy ? $scope.log.privacy : 0;

      var log = $scope.log;
					log.firstExperience = $scope.selectedExperience ? $scope.selectedExperience._id : null;

			log.$update(function() {

				$location.path('logs/' + log._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        // Set marker for creating new log... for first time users
        $scope.displayFirstTime = true;

		$scope.find = function() {
			$scope.logs = Logs.query();
		};


		// Find a list of PublicActivities
		$scope.findPublic = function() {
			$scope.logs = PublicLogs.query();
		};

		// Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({
				logId: $stateParams.logId
			});
			
			$scope.log.$promise.then(function(theLog) {
				$scope.selectedExperience = theLog.firstExperience;
			});
		};

		$scope.findPersonalExperiences = function() {
			// Find a list of Activities
			$scope.experiences = Experiences.query();
		};

		d3.selectAll('select')
			.style('background', '#00BC8C')
			.style('padding', '10px');

		//TODO: Remove this code below because I think it is dead. It served its purpose well.

        // Show Public Log defaults to false
        $scope.hidePublic = true;

        // Toggle Public Log
        $scope.togglePublic = function() {
            if($scope.hidePublic){
                $scope.hidePublic = false;
            } else {
                $scope.hidePublic = true;
            }
        };

	}
]);
