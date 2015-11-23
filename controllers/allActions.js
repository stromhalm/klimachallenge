klimaChallenge.directive('allActions', function (projects, filepickerService) {
	function link($scope, element, filepickerService) {

		$scope.projects = projects.db;
	}

	return {
		templateUrl: 'views/allActions.html',
		link: link
	};
});
