'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController',
['$scope', '$stateParams', '$location', 'Authentication', 'Experiences',
'PublicExperiences', 'Activities',
	function($scope, $stateParams, $location, Authentication, Experiences, PublicExperiences, Activities) {
		$scope.authentication = Authentication;

		$scope.name ='name';

		$scope.updateName = function() {
			//Set the experience name to the sum of its parts
			console.log($scope.selectedTime, $scope.selectedActivity, $scope.selectedPronoun, $scope.selectedVerb);

			if($scope.selectedTime && $scope.selectedActivity && $scope.selectedPronoun && $scope.selectedVerb) {
				$scope.name =
					$scope.selectedTime.name + ' ' +
					$scope.selectedActivity.name + ' ' +
					$scope.selectedPronoun.name + ' ' +
					$scope.selectedVerb;

			};

		};

		// Create new Experience
		$scope.create = function() {

			/*
			 * calculatedSeconds is the amount of seconds for the experience.
			 */
			var calculatedSeconds = 0,
 					h = ($scope.hours ? $scope.hours : 0),
 					m = ($scope.minutes ? $scope.minutes : 0),
 					s = ($scope.secs ? $scope.secs : 0);
 					calculatedSeconds = calculatedSeconds + (h * 60 * 60);
 					calculatedSeconds = calculatedSeconds + (m * 60);
 					calculatedSeconds = calculatedSeconds + (s);

			// Create new Experience object
			var experience = new Experiences ({
				name: $scope.name,
								description: this.description,
								importance: this.importance,
								privacy: this.privacy ? this.privacy : 0,
								firstActivity: $scope.selectedActivity ? $scope.selectedActivity._id : null,
								seconds: calculatedSeconds ? calculatedSeconds : 0
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

			/*
			 * calculatedSeconds is the amount of seconds for the experience.
			 */
			var calculatedSeconds = 0,
					h = ($scope.hours ? $scope.hours : 0),
					m = ($scope.minutes ? $scope.minutes : 0),
					s = ($scope.secs ? $scope.secs : 0);
					calculatedSeconds = calculatedSeconds + (h * 60 * 60);
					calculatedSeconds = calculatedSeconds + (m * 60);
					calculatedSeconds = calculatedSeconds + (s);


			var experience = $scope.experience;
					experience.firstActivity = $scope.selectedActivity ? $scope.selectedActivity._id : null;
					experience.seconds = calculatedSeconds;

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

			$scope.experience.$promise.then(function(exp) {
				$scope.selectedActivity = exp.firstActivity;
				$scope.selectedTime = 'foo';
				$scope.selectedPronoun = 'foo';
				$scope.selectedVerb = 'foo';
				/*
				 * calculatedSeconds is the amount of seconds for the experience.
				 */
				var calculatedSeconds = exp.seconds,
						h = Math.floor(calculatedSeconds / 60 / 60),
						m = Math.floor((calculatedSeconds - (3600 * h)) / 60 ),
						s = (calculatedSeconds - (3600 * h) - (60 * m));
						$scope.hours = h;
						$scope.minutes = m;
						$scope.secs = s;
			});
		};

		$scope.findTimePrepositions = function() {
		  //Find a list TimePrepositions
			$scope.timePrepositions = [
				{"name": "Before", "_id": 1},
				{"name": "While", "_id": 2},
				{"name": "After", "_id": 3}
			];
		};

		$scope.findPersonalActivities = function() {
			// Find a list of Activities
			$scope.activities = Activities.query();
		};

		$scope.findPronouns = function() {
		  //Find a list Pronouns
			$scope.pronouns = [
				{"name": "I", "_id": 1},
				{"name": "You", "_id": 2},
				{"name": "He", "_id": 3},
				{"name": "She", "_id": 4},
				{"name": "It", "_id": 5},
				{"name": "You all", "_id": 6},
				{"name": "We", "_id": 7},
				{"name": "They", "_id": 8}
			];
		};

		d3.selectAll('select')
			.style('background', '#00BC8C')
			.style('padding', '10px');


	}
]);
