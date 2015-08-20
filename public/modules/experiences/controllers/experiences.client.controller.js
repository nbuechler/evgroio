'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController',
['$scope', '$stateParams', '$location', 'Authentication', 'Experiences',
'PublicExperiences', 'Activities',
	function($scope, $stateParams, $location, Authentication, Experiences, PublicExperiences, Activities) {
		$scope.authentication = Authentication;

		// Create new Experience
		$scope.create = function() {
			// Create new Experience object
			var experience = new Experiences ({
				name: this.name,
								description: this.description,
								importance: this.importance,
								privacy: this.privacy ? this.privacy : 0,
								seconds: this.seconds ? this.seconds : 0,
			});

			// Redirect after save
			experience.$save(function(response) {
				$location.path('experiences/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Experience
		$scope.remove = function(experience) {
			if ( experience ) {
				experience.$remove();

				for (var i in $scope.experiences) {
					if ($scope.experiences [i] === experience) {
						$scope.experiences.splice(i, 1);
					}
				}
			} else {
				$scope.experience.$remove(function() {
					$location.path('experiences');
				});
			}
		};

		// Update existing Experience
		$scope.update = function() {
			var experience = $scope.experience;

			experience.$update(function() {
				$location.path('experiences/' + experience._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Experiences
		$scope.find = function() {
			$scope.experiences = Experiences.query();
		};

		// Find a list of PublicExperiences
		$scope.findPublic = function() {
			$scope.experiences = PublicExperiences.query();
		};

		// Find existing Experience
		$scope.findOne = function() {
			$scope.experience = Experiences.get({
				experienceId: $stateParams.experienceId
			});
		};

		$scope.findPersonalActivities = function() {
			// Find a list of Activities
			$scope.activities = Activities.query();
		};
		// d3.select('md-select-label > span').text('foo');

		d3.selectAll('md-select-label')
			.style('background', '#00BC8C')
			.style('padding', '10px');

	}
]);
