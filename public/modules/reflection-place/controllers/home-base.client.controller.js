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