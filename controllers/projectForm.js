klimaChallenge.controller('projectFormCtrl', function($scope, $timeout, projects, filepickerService) {

   // Start at page 1
   $scope.page = 1;

   // Init all input elements
   $scope.formal = {};
   $scope.potential = {};
   $scope.media = {};
   $scope.effort = {};
   $scope.custom = {};

   $scope.events = projects.events;
   $scope.carriers = projects.carriers;

   // Check if all input elements of a given form page are filled
   $scope.isValid = function(page) {

      switch (page) {
         case 1:
            if (
               $scope.formal.name &&
               $scope.formal.email &&
               $scope.formal.group &&
               $scope.formal.actionName &&
               $scope.formal.date &&
               $scope.formal.carrier &&
               $scope.formal.location &&
               $scope.formal.description &&
               $scope.formal.event)
                  return true;
            break;
         case 2:
            if (
               $scope.potential.f1 &&
               $scope.potential.f3 &&
               $scope.potential.f4 &&
               $scope.potential.f5 &&
               $scope.potential.f6)
                  return true;
            break;
         case 3:
               return true;
            break;
         case 4:
            if (
               $scope.effort.f8 &&
               $scope.effort.f9 &&
               $scope.effort.f10)
                  return true;
            break;
         case 5:

            var eventId = $scope.getEventId($scope.formal.event);

            if
            (
               (
                  // If custom question is active, the field is required
                  (eventId != null && !projects.events[eventId].question) ||
                  $scope.custom.f11 ||
                  $scope.custom.f11 == 0
               ) &&
               $scope.custom.repeat &&
               (
                  $scope.formal.imageUpload == "later" ||
                  (
                     $scope.formal.imageUpload == "upload" &&
                     $scope.formal.image &&
                     $scope.formal.confirmUpload
                  )
               )
            )
               return true;
            break;
         case 6:
            return true;
            break;
         return false;
      }
   };

   $scope.pickImage = function() {
      filepickerService.pick(
         {
            mimetype: 'image/*',
            services: ['COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'INSTAGRAM', 'DROPBOX'],
            language: 'de'
         },
         onSuccess
      );
   };

   function onSuccess(image) {
      $scope.formal.image = image;
   };

   $scope.nextPage = function() {
      // nextPage() could be triggered by key
      if ($scope.isValid($scope.page)) {
         $scope.page++;
      }
   };
   $scope.previousPage = function() {
      $scope.page--;
   };

   $scope.submitForm = function() {

      $scope.submitting = true;
      projects.db.$add({
         formal: $scope.formal,
         potential: $scope.potential,
         media: $scope.media,
         effort: $scope.effort,
         custom: $scope.custom,
         climatePoints: $scope.getClimatePoints()
      })
      .then(function(p) {
         $scope.submitting = false;
         $scope.page = 7;
      });
   };

   // Calculate the final climate points
   $scope.getClimatePoints = function() {

      var fz = parseFloat(5); // Zielzahlfaktor
      var um = parseFloat(1/0.75); // Umrechnungsfaktor
      var n2 = parseFloat(50); // Normierungsfaktor 2
      var eventId = $scope.getEventId($scope.formal.event);
      var dco2 = parseFloat(projects.events[eventId].assessment);

      try {
         var type = projects.events[eventId].type;
      } catch (e) {
         var type = 0;
      }

      var climatePoints = 0;

      if (
         $scope.isValid(1) &&
         $scope.isValid(2) &&
         $scope.isValid(3) &&
         $scope.isValid(4) &&
         $scope.isValid(5) &&
         $scope.isValid(6)
      ) {

         // Type A1
         if (type == 1) {
            climatePoints = parseFloat($scope.potential.f1) *
               (
                  parseFloat($scope.countEngagementPoints()) +
                  parseFloat($scope.potential.f3) +
                  parseFloat($scope.potential.f4) +
                  parseFloat($scope.potential.f5) +
                  parseFloat($scope.potential.f6) +
                  parseFloat($scope.countMediaPoints()) +
                  parseFloat($scope.effort.f8) +
                  parseFloat($scope.effort.f9) +
                  parseFloat($scope.effort.f10)
               ) * fz;
         } else

         // Type A2
         if (type == 2) {
            climatePoints = (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.countEngagementPoints()) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        parseFloat($scope.potential.f6) +
                        parseFloat($scope.countMediaPoints()) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9) +
                        parseFloat($scope.effort.f10)
                     ) +
                     (
                        dco2 *
                        um *
                        parseFloat($scope.potential.f1) /
                        n2
                     )
                  ) +
                  (
                     dco2 *
                     um *
                     parseFloat($scope.potential.f1)
                  )
               ) * fz;
         } else

         // Type A3
         if (type == 3) {
            climatePoints =
               (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.countEngagementPoints()) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        parseFloat($scope.potential.f6) +
                        parseFloat($scope.countMediaPoints()) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9) +
                        parseFloat($scope.effort.f10)
                     ) +
                     (
                        dco2 *
                        um *
                        parseFloat($scope.custom.f11) /
                        n2
                     )
                  ) +
                  (
                     dco2 *
                     um *
                     parseFloat($scope.custom.f11)
                  )
               ) * fz;
         } else

         // Type A4
         if (type == 4) {
            climatePoints =
               (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.countEngagementPoints()) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        parseFloat($scope.potential.f6) +
                        parseFloat($scope.countMediaPoints()) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9) +
                        parseFloat($scope.effort.f10)
                     ) +
                     (
                        dco2 *
                        um *
                        parseFloat($scope.potential.f1) *
                        parseFloat($scope.custom.f11) /
                        n2
                     )
                  ) +
                  (
                     dco2 *
                     um *
                     parseFloat($scope.potential.f1) *
                     parseFloat($scope.custom.f11)
                  )
               ) * fz;
         }
      }
      climatePoints = Math.round(climatePoints);
      return climatePoints;
   }

   $scope.getCo2 = function() {
      var um = 0.75; // Umrechnungsfaktor
      var zf = 5; // Umrechnungsfaktor
      var co2 = Math.round($scope.getClimatePoints() * (um/zf));
      return co2;
   }

   // Calculate the current media points (media checkboxes)
   $scope.countMediaPoints = function() {

      // Get the sum of the media checkboxes (max 3)
      var mediaPoints = 0;
      if ($scope.media.email) mediaPoints += 1;
      if ($scope.media.facebook) mediaPoints += 1;
      if ($scope.media.twitter) mediaPoints += 1;
      if ($scope.media.instagram) mediaPoints += 1;
      if ($scope.media.clubmedia) mediaPoints += 1;
      if ($scope.media.flyer) mediaPoints += 2;
      if ($scope.media.poster) mediaPoints += 2;
      if ($scope.media.website) mediaPoints += 3;
      if ($scope.media.radio) mediaPoints += 3;
      if ($scope.media.tv) mediaPoints += 3;
      if ($scope.media.newspaper) mediaPoints += 3;
      if ($scope.media.other) mediaPoints += 1;

      if (mediaPoints > 3) {
         mediaPoints = 3;
      }
      return mediaPoints;
   }

   $scope.countEngagementPoints = function() {

      // Get the sum of the engagement checkboxes (max 3)
      var engagementPoints = 0;
      if ($scope.potential.f21) engagementPoints = 0;
      if ($scope.potential.f22) engagementPoints = 2;
      if ($scope.potential.f23) engagementPoints = 3;
      return engagementPoints;
   }

   $scope.getEventId = function(name) {
      var id = null;
      angular.forEach(projects.events, function(event, key) {
         if (projects.events[key].name == name) {
            id = key;
         }
      });
      return id;
   };
}).filter('to_trusted', function($sce) {
   return function(text) {
      return $sce.trustAsHtml(text);
   };
});
