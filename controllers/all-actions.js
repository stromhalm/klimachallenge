klimaChallenge.directive('allActions', function (projects, filepickerService) {
	function link($scope, element, filepickerService) {

		// Link projects to scope
		$scope.projects = projects.db;
	}
	return {
		templateUrl: 'views/all-actions.html?ver=2',
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
}).filter('orderByStartDate', function() {
	return function(items) {
		items.sort(function(a, b) {
			var aTag = a.formal.date.split(".")[0];
			var aMonth = a.formal.date.split(".")[1];
			var aYear = a.formal.date.split(".")[2];
			var bTag = b.formal.date.split(".")[0];
			var bMonth = b.formal.date.split(".")[1];
			var bYear = b.formal.date.split(".")[2];

			if (aYear < bYear) {
				return -1;
			} else if (aYear > bYear) {
				return 1
			} else {
				if (aMonth < bMonth) {
					return -1;
				} else if (aMonth > bMonth) {
					return 1;
				} else {
					if (aTag < bTag) {
						return -1;
					} else if (aTag > bTag) {
						return 1;
					} else {
						return 0;
					}
				}
			}
		});
		return items;
	};
});
