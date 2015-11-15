// jshint ignore: start

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		var scene = document.getElementById('scene');
		var parallax = new Parallax(scene);

	}
]);
