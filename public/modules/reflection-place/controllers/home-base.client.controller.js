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
            etherContent: this.etherContent
        });
        
        // Find a list of Logs
		$scope.find = function() {
			$scope.logs = Logs.query();
		};
        
        // Find existing Log
		$scope.findOne = function() {
			$scope.log = Logs.get({ 
				logId: $stateParams.logId
			});
		};
        
	}
]);