klimaChallenge.directive('action', function () {

	function link($scope) {
	}

	return {
		templateUrl: 'views/action.html',
		link: link,
		$scope: {
			project: '=projectData'
		}
	};
});
