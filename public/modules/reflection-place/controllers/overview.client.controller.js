'use strict';

angular.module('reflection-place').controller('OverviewController', ['$scope', '$modal', '$log', '$stateParams', '$location', 'Authentication', 'Logs', 'Activities', 'Experiences',
	function($scope, $modal, $log, $stateParams, $location, Authentication, Logs, Activities, Experiences) {
		$scope.authentication = Authentication;

		/*
		 * Tabs used to create destinct sections of the page.
		 */

		$scope.globalTabAlignment = 'top';

		//Data objects for tab groups
		$scope.summaryTabData = {
			selectedIndex: 0
		};
		$scope.activityTabData = {
			selectedIndex: 0
		};
		$scope.experienceTabData = {
			selectedIndex: 0
		};
		$scope.logTabData = {
			selectedIndex: 0
		};

		//End tabs


		$scope.find = function() {
            // Find a list of Logs with information
			$scope.logs = Logs.query();

            //Counting all the totals //TODO: Store this in a database tied to user.
            var physicTotal = 0;
            var emotionTotal = 0;
            var academicTotal = 0;
            var communeTotal = 0;
            var etherTotal = 0;

            for( var i in $scope.logs) {

                physicTotal += $scope.logs[i].physicContentLength;
                emotionTotal += $scope.logs[i].emotionContentLength;
                academicTotal += $scope.logs[i].academicContentLength;
                communeTotal += $scope.logs[i].communeContentLength;
                etherTotal += $scope.logs[i].etherContentLength;
            }


            $scope.totals = {
                physicTotal: physicTotal,
                emotionTotal: emotionTotal,
                academicTotal: academicTotal,
                communeTotal: communeTotal,
                etherTotal: etherTotal
            };

      // Find a list of Activities
      $scope.activities = Activities.query();

      // Find a list of Experiences
      $scope.experiences = Experiences.query();


			//Get some basic key figure data.
			$scope.activities.$promise.then(function(response) {
				$scope.activityTotals = {
					'sumAll' : response.length,
					'sumPrivate' : 0,
					'sumPublic' : 0,
				}

				for (var i = 0; i < response.length; i++) {
					if(response[i].privacy > 0){
						$scope.activityTotals.sumPublic++;
					} else {
						$scope.activityTotals.sumPrivate++;
					}

				}
			});
			$scope.experiences.$promise.then(function(response) {
				$scope.experienceTotals = {
					'sumAll' : response.length,
					'sumPrivate' : 0,
					'sumPublic' : 0,
					'sumBefore' : 0,
					'sumWhile' : 0,
					'sumAfter' : 0
				}

				for (var i = 0; i < response.length; i++) {
					if(response[i].privacy > 0){
						$scope.experienceTotals.sumPublic++;
					} else {
						$scope.experienceTotals.sumPrivate++;
					}

					if(response[i].experienceTime == 'Before'){
						$scope.experienceTotals.sumBefore++;
					} else if(response[i].experienceTime == 'While') {
						$scope.experienceTotals.sumWhile++;
					} else if(response[i].experienceTime == 'After') {
						$scope.experienceTotals.sumAfter++;
					}
				}
			});
			$scope.logs.$promise.then(function(response) {
				$scope.logTotals = {
					'sumAll' : response.length,
					'sumPrivate' : 0,
					'sumPublic' : 0
				}

				for (var i = 0; i < response.length; i++) {
					if(response[i].privacy > 0){
						$scope.logTotals.sumPublic++;
					} else {
						$scope.logTotals.sumPrivate++;
					}
				}
			});

		};

        // Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({
				logId: $stateParams.logId
			});
		};


        //Modal window code
        $scope.animationsEnabled = true;

        $scope.open = function (size, log) {
        $scope.items = [];

            //Logic to improve UX for log understanding
            if(log.physicContentLength > 0) {
                $scope.items.push({'id': 0, 'entry': log.physicContent});
            }
            if(log.academicContentLength > 0) {
                $scope.items.push({'id': 1, 'entry': log.academicContent});
            }
            if(log.emotionContentLength > 0) {
                $scope.items.push({'id': 2, 'entry': log.emotionContent});
            }
            if(log.communeContentLength > 0) {
                $scope.items.push({'id': 3, 'entry': log.communeContent});
            }
            if(log.etherContentLength > 0) {
                $scope.items.push({'id': 4, 'entry': log.etherContent});
            }


        $scope.logTitle = log.name;

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modules/reflection-place/templates/myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            logTitle: function () {
                return $scope.logTitle;
            },
            items: function () {
                return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
        };

        $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
        };


	}
]);
