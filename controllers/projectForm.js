klimaChallenge.controller('projectFormCtrl', function($scope, $mdDialog) {

   // Start at page 1
   $scope.page = 1;

   $scope.formal = {};
   $scope.potential = {};
   $scope.media = {};
   $scope.effort = {};

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
               $scope.potential.persons &&
               $scope.potential.behavior &&
               $scope.potential.ideas &&
               $scope.potential.longRange &&
               $scope.potential.setting)
                  return true;
            break;
         case 3:
               return true;
            break;
         case 4:
            if (
               $scope.effort.time &&
               $scope.effort.networking &&
               $scope.effort.outcome)
                  return true;
            break;

         return false;
      }
   };

   $scope.nextPage = function() {
      $scope.page++;
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

   $scope.events = [
      {name: 'Bildungsmodule buchen (inkl. Teamer)', type: 1},
      {name: 'Bildungsaktivitäten selber durchführen', type: 1},
      {name: 'Solarpumpe', type: 1},
      {name: 'Stromerzeuger-Fahrrad', type: 1},
      {name: 'Solarbetriebene Handy-Aufladestation', type: 3, question: 'Wie viele Handys wurden geladen?'},
      {name: 'Veranstaltung plastikfrei gestalten', type: 2},
      {name: 'Upcycling', type: 1},
      {name: 'Kleidertauschparty', type: 3, question: 'Wie viele Kleidungsstücke wurden getauscht?'},
      {name: 'Handy-Sammel-Aktion', type: 1},
      {name: 'Repair-Cafe', type: 1},
      {name: 'Fahrrad-Reparatur-Service', type: 3, question: 'Wie viele Fahrräder wurden repariert?'},
      {name: 'Politische Partizipation', type: 1},
      {name: 'Shopping-Fasten', type: 3, question: 'Auf wie viele neue Kleidungsstücke wurde verzichtet?'},
      {name: 'Versuchs-Vegetarier', type: 4, question: 'Wie viele Tage wurde vegetarisch gelebt?'},
      {name: 'Versuchs-Veganer', type: 4, question: 'Wie viele Tage wurde vegan gelebt?'},
      {name: 'Stromanbieterwechsel', type: 3, question: 'Wie hoch ist der monatliche Stromverbrauch (in kWh)?'},
      {name: 'Solaranlage fürs Vereinsheim', type: 3, question: 'Wie viel Strom produziert die Anlage monatlich (in kWh)?'},
      {name: 'Energiesparlampen', type: 3, question: 'Wie viele Lampen wurden ersetzt?'},
      {name: 'Umstieg auf Recyclingpapier', type: 3, question: 'Wie viel Papier wird monatlich gekauft? (in Blatt Papier)?'},
      {name: 'Elektro-Auto statt Benziner', type: 1},
      {name: 'Klimafreundliche Veranstaltung', type: 1},
      {name: 'Müll sammeln', type: 1, question: 'Wieviel Müll (in kg) wurde gesammelt?'},
      {name: 'Bäume pflanzen', type: 3, question: 'Wieviele Bäume wurden gepflanzt?'}
   ]
});
