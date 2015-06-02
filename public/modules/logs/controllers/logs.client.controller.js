'use strict';

// Logs controller
angular.module('logs').controller('LogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Logs',
	function($scope, $stateParams, $location, Authentication, Logs) {
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
                etherContent: this.etherContent
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
			var log = $scope.log;

			log.$update(function() {
				$location.path('logs/' + log._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        // Set marker for creating new log... for first time users
        $scope.displayFirstTime = true;
        
		// Find a list of Logs
		$scope.find = function() {
			$scope.logs = Logs.query();
		};

        for(var i in $scope.find) {
            if(i._id === $scope.authentication.user._id) {
                $scope.displayFirstTime = false;
            }
        }
        
		// Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({ 
				logId: $stateParams.logId
			});
		};
        
        // Show Public Log defaults to false
        $scope.hidePublic = true;
        
        // Toggle Public Log
        $scope.togglePublic = function() {
            if($scope.hidePublic){
                $scope.hidePublic = false;
            } else {
                $scope.hidePublic = true;
            }
        }
        
	}
]);