klimaChallenge.controller('fastenCtrl', function($scope, projects, Auth, $firebaseArray) {

	$scope.auth = Auth;

   $scope.offers = [
		'Ich ernähre mich vegetarisch',
		'Ich ernähre mich vegan',
		'Ich wechsle zu Ökostrom',
		'Ich lege eine Shopping-Pause ein',
		'Ich fahre überall mit dem Fahrrad hin',
		'Ich vermeide Plastik/Müll, wo es geht',
		'Sonstiges',
		'Ich lass mich erstmal inspirieren'
	];

	// any time auth status updates, add the user data to scope
   $scope.auth.$onAuth(function(authData) {
		if (authData) {
			$scope.authData = authData;
			$scope.messengerParticipants = $firebaseArray(projects.klimafasten.child('messenger'));
			$scope.emailParticipants = $firebaseArray(projects.klimafasten.child('email'));
		}
   });

   $scope.addMessenger = function() {

		if ($scope.messengerType) {
			projects.klimafasten.child('messenger').push(
				{
					fullName: $scope.fullName,
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
				fullName: $scope.fullName,
				email: $scope.email,
				selectedOffer: $scope.selectedOffer,
				customOffer: $scope.customOffer ? $scope.customOffer : ""
			}
		);
      $scope.emailSubmitted = true;
   };
});
