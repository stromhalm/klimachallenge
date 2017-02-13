klimaChallenge.directive('action', function () {

	function link($scope) {
	}

	return {
		templateUrl: 'views/action.html?ver=2',
		link: link,
		$scope: {
			project: '=projectData'
		}
	};
});
