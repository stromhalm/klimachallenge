klimaChallenge.directive('allActions', function (projects, filepickerService) {
	function link($scope, element, filepickerService) {

		$scope.projects = projects.db;
	}
	return {
		templateUrl: 'views/allActions.html',
		link: link
	};
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
}).filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
