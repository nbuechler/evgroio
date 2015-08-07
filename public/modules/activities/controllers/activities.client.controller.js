'use strict';

// Activities controller
angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities',
	function($scope, $stateParams, $location, Authentication, Activities) {
		$scope.authentication = Authentication;

		// Create new Activity
		$scope.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
                description: this.description,
                importance: this.importance,
								privacy: this.privacy
			});

			// Redirect after save
			activity.$save(function(response) {
				$location.path('activities/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Activity
		$scope.remove = function(activity) {
			if ( activity ) {
				activity.$remove();

				for (var i in $scope.activities) {
					if ($scope.activities [i] === activity) {
						$scope.activities.splice(i, 1);
					}
				}
			} else {
				$scope.activity.$remove(function() {
					$location.path('activities');
				});
			}
		};

		// Update existing Activity
		$scope.update = function() {
			var activity = $scope.activity;

			activity.$update(function() {
				$location.path('activities/' + activity._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        // Set marker for creating new activity... for first time users
        $scope.displayFirstTime = true; //not used

		// Find a list of Activities
		$scope.find = function() {
			$scope.activities = Activities.query();
		};

		// Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({
				activityId: $stateParams.activityId
			});
		};

        /*
         * Toggle button not used currently... but there is logic that can be used to toggle.
         */

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

//Change the html background to match due to styling of angular-material on the height style of body.
d3.select('html').style('background-color', '#222222');
