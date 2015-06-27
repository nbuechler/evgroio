'use strict';

angular.module('reflection-place').controller('HomeBaseController', ['$scope', '$stateParams', '$location', 'Authentication', 'Logs',
	function($scope, $stateParams, $location, Authentication, Logs) {
		$scope.authentication = Authentication;

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
            etherContentLength: this.etherContent ? this.etherContent.length : 0
        });
        
        // Find a list of Logs with information
		$scope.find = function() {
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
            
		};
        
        //In this method...
        /*
         *
         * I need to figure out how to pull back the following information:
         * 1) Information regarding the totals of all logs
         * 2) Information regarding the totals of all logs with regard to a user!
         *
         */
        $scope.getAllLogs = Logs.query(function(response) {
            console.log('here', response[0]);
        });
        
        
        // Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({ 
				logId: $stateParams.logId
			});
		};
        
	}
]);