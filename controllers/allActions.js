klimaChallenge.directive('allActions', function (projects, filepickerService) {
	function link($scope, element, filepickerService) {

		// Link projects to scope
		$scope.projects = projects.db;
	}
	return {
		templateUrl: 'views/allActions.html',
		link: link
	};

	// only filter the nth (1st, 2nd, 3rd, ...) element
}).filter('nthFilter', function() {
	return function(items, nth, offset) {
		var filtered = [];
		angular.forEach(items, function(item, key) {
			if(key % nth == offset) {
				filtered.push(item);
			}
		});
		return filtered;
	};

	// Reverse a given array
}).filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});
