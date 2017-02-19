klimaChallenge.controller('fastenCtrl', function($scope, projects, filepickerService, $firebaseArray) {

   $scope.offers = [
		'Ich ernähre mich vegetarisch',
		'Ich ernähre mich vegan',
		'Ich wechsle zu Ökostrom',
		'Ich lege eine Shopping-Pause ein',
		'Ich fahre überall mit dem Fahhrad hin',
		'Ich vermeide Plastik/Müll, wo es geht',
		'Sonstiges',
		'Ich lass mich erstmal inspirieren'
	]

   $scope.addMessenger = function() {

		if ($scope.messengerType) {
			projects.klimafasten.child('messenger').push(
				{
					mobile: $scope.mobile,
					messengerType: $scope.messengerType,
					selectedOffer: $scope.selectedOffer,
					customOffer: $scope.customOffer ? $scope.customOffer : ""
				}
			);
	      $scope.messengerSubmitted = true;
		}
   };

	$scope.addEmail = function() {

      projects.klimafasten.child('email').push(
			{
				email: $scope.email,
				selectedOffer: $scope.selectedOffer,
				customOffer: $scope.customOffer ? $scope.customOffer : ""
			}
		);
      $scope.emailSubmitted = true;
   };
});
