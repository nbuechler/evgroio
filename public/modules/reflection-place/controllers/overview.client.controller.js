'use strict';

angular.module('reflection-place').controller('OverviewController', ['$scope', '$modal', '$log', '$stateParams', '$location', 'Authentication', 'Logs', 'Activities',
	function($scope, $modal, $log, $stateParams, $location, Authentication, Logs, Activities) {
		$scope.authentication = Authentication;

		/*
		 * Tabs used to create destinct sections of the page.
		 */

		$scope.globalTabAlignment = 'top';

		//Data objects for tab groups
		$scope.summaryTabData = {
			selectedIndex: 0
		}
		$scope.activityTabData = {
			selectedIndex: 0
		}
		$scope.experienceTabData = {
			selectedIndex: 0
		}
		$scope.logTabData = {
			selectedIndex: 0
		}

		//End tabs


        /*
         * Not used, just a good reference.
         */
//        var log = new Logs ({
//            name: this.name,
//            physicContent: this.physicContent,
//            emotionContent: this.emotionContent,
//            academicContent: this.academicContent,
//            communeContent: this.communeContent,
//            etherContent: this.etherContent,
//            physicContentLength: this.physicContent ? this.physicContent.length : 0,
//            emotionContentLength: this.emotionContent ? this.emotionContent.length : 0,
//            academicContentLength: this.academicContent ? this.academicContent.length : 0,
//            communeContentLength: this.communeContent ? this.communeContent.length : 0,
//            etherContentLength: this.etherContent ? this.etherContent.length : 0
//        });

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




		};

        // Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({
				logId: $stateParams.logId
			});
		};


        //Toggling for dashboard level 1 items
        $scope.logRollup = false;
        $scope.activitiesRollup = false;
        $scope.vizLineChartRollup = true;

        $scope.changeActiveRollup = function(num) {
             switch(num) {
                case 0:
                    $scope.logRollup = true;
                    $scope.activitiesRollup = false;
                    $scope.vizLineChartRollup = false;
                    break;
                case 1:
                    $scope.logRollup = false;
                    $scope.activitiesRollup = true;
                    $scope.vizLineChartRollup = false;
                    break;
								case 2:
                    $scope.logRollup = false;
                    $scope.activitiesRollup = false;
                    $scope.vizLineChartRollup = true;
                    break;
                default:
                        $scope.logRollup = true;
                        $scope.activitiesRollup = false;
												$scope.vizLineChartRollup = true;
                        console.error(1/0, ' --  Due to nonexisting toggle.');
            }
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
