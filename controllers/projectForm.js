klimaChallenge.controller('projectFormCtrl', function($scope, $mdDialog) {

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
               $scope.formal.carrier &&
               $scope.formal.location &&
               $scope.formal.event)
                  return true;
            break;
         case 2:
            if (
               $scope.potential.f1 &&
               $scope.potential.f2 &&
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
            if
            (
               (
                  // If custom question is active, the field is required
                  !$scope.events[$scope.formal.event].question ||
                  $scope.custom.f10
               ) &&
               $scope.custom.repeat
            )
               return true;
            break;
         case 6:
            return true;
            break;
         return false;
      }
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
   $scope.hide = function() {
      $mdDialog.hide();
   };
   $scope.cancel = function() {
      $mdDialog.cancel();
   };
   $scope.submitForm = function() {
      $scope.cancel();
   }

   // Calculate the final climate points
   $scope.getClimatePoints = function() {

      var fz = 5; // Zielzahlfaktor
      var um = 0.75; // Umrechnungsfaktor
      var type = $scope.events[$scope.formal.event].type;

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
            var climatePoints = parseFloat($scope.potential.f1) *
               (
                  parseFloat($scope.potential.f2) +
                  parseFloat($scope.potential.f3) +
                  parseFloat($scope.potential.f4) +
                  parseFloat($scope.potential.f5) +
                  $scope.countMediaPoints() +
                  parseFloat($scope.effort.f7) +
                  parseFloat($scope.effort.f8) +
                  parseFloat($scope.effort.f9)
               ) * parseFloat(fz);
            return climatePoints;
         } else

         // Type A2
         if (type == 2) {
            var climatePoints = (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.potential.f2) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[$scope.formal.event].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        parseFloat(50)
                     )
                  ) +
                  (
                     $scope.events[$scope.formal.event].assessment *
                     parseFloat(um) *
                     parseFloat($scope.potential.f1)
                  )
               ) * parseFloat(fz);
            return climatePoints;
         } else

         // Type A3
         if (type == 3) {
            var climatePoints =
               (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.potential.f2) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[$scope.formal.event].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        50
                     )
                  ) +
                  (
                     $scope.events[$scope.formal.event].assessment *
                     parseFloat(um) *
                     parseFloat($scope.custom.f10)
                  )
               ) * parseFloat(fz);
            return climatePoints;
         } else

         // Type A4
         if (type == 4) {
            var climatePoints =
               (
                  parseFloat($scope.potential.f1) *
                  (
                     (
                        parseFloat($scope.potential.f2) +
                        parseFloat($scope.potential.f3) +
                        parseFloat($scope.potential.f4) +
                        parseFloat($scope.potential.f5) +
                        $scope.countMediaPoints() +
                        parseFloat($scope.effort.f7) +
                        parseFloat($scope.effort.f8) +
                        parseFloat($scope.effort.f9)
                     ) +
                     (
                        $scope.events[$scope.formal.event].assessment *
                        parseFloat(um) *
                        parseFloat($scope.potential.f1) /
                        50
                     )
                  ) +
                  (
                     $scope.events[$scope.formal.event].assessment *
                     parseFloat(um) *
                     parseFloat($scope.potential.f1) *
                     parseFloat($scope.custom.f10)
                  )
               ) * parseFloat(fz);
            return climatePoints;
         }
      }
      return false;
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

   // All events with type (A1-4), custom question and CO2 / unit
   $scope.events = [
      {name: 'Bildungsmodule buchen (inkl. Teamer)', type: 1},
      {name: 'Bildungsaktivitäten selber durchführen', type: 1},
      {name: 'Solarpumpe', type: 1},
      {name: 'Stromerzeuger-Fahrrad', type: 1},
      {name: 'Solarbetriebene Handy-Aufladestation', type: 3, question: 'Wie viele Handys wurden geladen?', assessment: 0.0033},
      {name: 'Veranstaltung plastikfrei gestalten', type: 2, assessment: 0.01},
      {name: 'Upcycling', type: 1},
      {name: 'Kleidertauschparty', type: 3, question: 'Wie viele Kleidungsstücke wurden getauscht?', assessment: 15},
      {name: 'Handy-Sammel-Aktion', type: 1},
      {name: 'Repair-Cafe', type: 1},
      {name: 'Fahrrad-Reparatur-Service', type: 3, question: 'Wie viele Fahrräder wurden repariert?', assessment: 50},
      {name: 'Politische Partizipation', type: 1},
      {name: 'Shopping-Fasten', type: 3, question: 'Auf wie viele neue Kleidungsstücke wurde verzichtet?', assessment: 15},
      {name: 'Versuchs-Vegetarier', type: 4, question: 'Wie viele Tage wurde vegetarisch gelebt?', assessment: 2.1},
      {name: 'Versuchs-Veganer', type: 4, question: 'Wie viele Tage wurde vegan gelebt?', assessment: 3.7},
      {name: 'Stromanbieterwechsel', type: 3, question: 'Wie hoch ist der monatliche Stromverbrauch (in kWh)?', assessment: 0.2},
      {name: 'Solaranlage fürs Vereinsheim', type: 3, question: 'Wie viel Strom produziert die Anlage monatlich (in kWh)?', assessment: 0.5},
      {name: 'Energiesparlampen', type: 3, question: 'Wie viele Lampen wurden ersetzt?', assessment: 13.7},
      {name: 'Umstieg auf Recyclingpapier', type: 3, question: 'Wie viel Papier wird monatlich gekauft (in Blatt Papier)?', assessment: 0.001}, // 100 Blatt = 0.1
      {name: 'Elektro-Auto statt Benziner', type: 1},
      {name: 'Klimafreundliche Veranstaltung', type: 1},
      {name: 'Müll sammeln', type: 1, question: 'Wieviel Müll (in kg) wurde gesammelt?', assessment: 1.25}, // Mittelwert für Verpackungsmüll (1) und Papiermüll (1,5)
      {name: 'Bäume pflanzen', type: 3, question: 'Wieviele Bäume wurden gepflanzt?', assessment: 10}
   ]
});
