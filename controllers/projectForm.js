klimaChallenge.controller('projectFormCtrl', function($scope, $timeout, projects, $q) {

   // Start at page 1
   $scope.page = 1;

   // Init all input elements
   $scope.formal = {};
   $scope.potential = {};
   $scope.media = {};
   $scope.effort = {};
   $scope.custom = {};

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
               $scope.potential.z1 &&
               $scope.potential.f3 &&
               $scope.potential.f4 &&
               $scope.potential.f5)
                  return true;
            break;
         case 3:
               return true;
            break;
         case 4:
            if (
               $scope.effort.f7 &&
               $scope.effort.f8 &&
               $scope.effort.f9)
                  return true;
            break;
         case 5:

            var eventId = $scope.getEventId($scope.formal.event);

            if
            (
               (
                  // If custom question is active, the field is required
                  (eventId != null && !$scope.events[eventId].question) ||
                  $scope.custom.f10
               ) &&
               $scope.custom.repeat &&
               (
                  $scope.formal.imageUpload == "later" ||
                  (
                     $scope.formal.imageUpload == "upload" &&
                     $scope.formal.image
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

   $scope.resizeImage = function (file, base64) {
      var deferred = $q.defer();
      // We create an image to receive the Data URI
      var img = document.createElement('img');

      // When the event "onload" is triggered we can resize the image.
      img.onload = function()
         {
             // We create a canvas and get its context.
             var canvas = document.createElement('canvas');
             var ctx = canvas.getContext('2d');

             // We set the dimensions at the wanted size.
             canvas.width = 300;
             canvas.height = canvas.width/img.width*img.height;

             // We resize the image with the canvas method drawImage();
             ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

             var dataURI = canvas.toDataURL();
             base64.resizedDataURI = dataURI;
             deferred.resolve(base64);

             $scope.formal.image = base64.resizedDataURI;
             $scope.$apply();
         };
      img.src = 'data:'+base64.filetype+';base64,'+base64.base64;
      return deferred.promise;
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
      projects.$add({
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

      var fz = 5; // Zielzahlfaktor
      var um = 0.75; // Umrechnungsfaktor

      var eventId = $scope.getEventId($scope.formal.event);

      try {
         var type = $scope.events[eventId].type;
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
                  $scope.countMediaPoints() +
                  parseFloat($scope.effort.f7) +
                  parseFloat($scope.effort.f8) +
                  parseFloat($scope.effort.f9)
               ) * parseFloat(fz);
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
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[eventId].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        parseFloat(50)
                     )
                  ) +
                  (
                     $scope.events[eventId].assessment *
                     parseFloat(um) *
                     parseFloat($scope.potential.f1)
                  )
               ) * parseFloat(fz);
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
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[eventId].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        50
                     )
                  ) +
                  (
                     $scope.events[eventId].assessment *
                     parseFloat(um) *
                     parseFloat($scope.custom.f10)
                  )
               ) * parseFloat(fz);
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
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[eventId].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        50
                     )
                  ) +
                  (
                     $scope.events[eventId].assessment *
                     parseFloat(um) *
                     parseFloat($scope.potential.f1) *
                     parseFloat($scope.custom.f10)
                  )
               ) * parseFloat(fz);
         }
      }
      climatePoints = Math.round(climatePoints);
      return climatePoints;
   }

   $scope.getCo2 = function() {
      var um = 0.75; // Umrechnungsfaktor
      var co2 = Math.round($scope.getClimatePoints() * (1/um));
      return co2;
   }

   // Calculate the current media points (media checkboxes)
   $scope.countMediaPoints = function() {

      // Get the highest checked checkbox value
      var mediaPoints = 0;
      if ($scope.media.email && mediaPoints < 1) mediaPoints = 1;
      if ($scope.media.facebook && mediaPoints < 1) mediaPoints = 1;
      if ($scope.media.twitter && mediaPoints < 1) mediaPoints = 1;
      if ($scope.media.instagram && mediaPoints < 1) mediaPoints = 1;
      if ($scope.media.clubmedia && mediaPoints < 1) mediaPoints = 1;
      if ($scope.media.flyer && mediaPoints < 2) mediaPoints = 2;
      if ($scope.media.poster && mediaPoints < 2) mediaPoints = 2;
      if ($scope.media.website && mediaPoints < 3) mediaPoints = 3;
      if ($scope.media.radio && mediaPoints < 3) mediaPoints = 3;
      if ($scope.media.tv && mediaPoints < 3) mediaPoints = 3;
      if ($scope.media.newspaper && mediaPoints < 3) mediaPoints = 3;
      if ($scope.media.other && mediaPoints < 1) mediaPoints = 1;
      return mediaPoints;
   }

   $scope.countEngagementPoints = function() {

      // Get the highest checked checkbox value
      var engagementPoints = 0;
      if ($scope.potential.f21) engagementPoints = 1;
      if ($scope.potential.f22) engagementPoints = 2;
      if ($scope.potential.f23) engagementPoints = 3;
      return engagementPoints;
   }

   // All events with type (A1-4), custom question and CO2 / unit
   $scope.events = [
      {name: 'Bildungsaktivitäten selber durchführen', type: 1},
      {name: 'Bildungsmodule buchen (inkl. Teamer)', type: 1},
      {name: 'Bäume pflanzen', type: 3, question: 'Wieviele Bäume wurden gepflanzt?', assessment: 10},
      {name: 'Elektro-Auto statt Benziner', type: 1},
      {name: 'Energiesparlampen', type: 3, question: 'Wie viele Lampen wurden ersetzt?', assessment: 13.7},
      {name: 'Fahrrad-Reparatur-Service', type: 3, question: 'Wie viele Fahrräder wurden repariert?', assessment: 50},
      {name: 'Handy-Sammel-Aktion', type: 1},
      {name: 'Kleidertauschparty', type: 3, question: 'Wie viele Kleidungsstücke wurden getauscht?', assessment: 15},
      {name: 'Klimafreundliche Veranstaltung', type: 1},
      {name: 'Müll sammeln', type: 1, question: 'Wieviel Müll (in kg) wurde gesammelt?', assessment: 1.25}, // Mittelwert für Verpackungsmüll (1) und Papiermüll (1,5)
      {name: 'Politische Partizipation', type: 1},
      {name: 'Repair-Cafe', type: 1},
      {name: 'Shopping-Fasten', type: 3, question: 'Auf wie viele neue Kleidungsstücke wurde verzichtet?', assessment: 15},
      {name: 'Solaranlage fürs Vereinsheim', type: 3, question: 'Wie viel Strom produziert die Anlage monatlich (in kWh)?', assessment: 0.5},
      {name: 'Solarbetriebene Handy-Aufladestation', type: 3, question: 'Wie viele Handys wurden geladen?', assessment: 0.0033},
      {name: 'Solarpumpe', type: 1},
      {name: 'Stromanbieterwechsel', type: 3, question: 'Wie hoch ist der monatliche Stromverbrauch (in kWh)?', assessment: 0.2},
      {name: 'Stromerzeuger-Fahrrad', type: 1},
      {name: 'Umstieg auf Recyclingpapier', type: 3, question: 'Wie viel Papier wird monatlich gekauft (in Blatt Papier)?', assessment: 0.001}, // 100 Blatt = 0.1
      {name: 'Upcycling', type: 1},
      {name: 'Veranstaltung plastikfrei gestalten', type: 2, assessment: 0.01},
      {name: 'Versuchs-Veganer', type: 4, question: 'Wie viele Tage wurde vegan gelebt?', assessment: 3.7},
      {name: 'Versuchs-Vegetarier', type: 4, question: 'Wie viele Tage wurde vegetarisch gelebt?', assessment: 2.1}
   ];

   $scope.getEventId = function(name) {
      var id = null;
      angular.forEach($scope.events, function(event, key) {
         if ($scope.events[key].name == name) {
            id = key;
         }
      });
      return id;
   };
});
