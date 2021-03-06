klimaChallenge.factory("projects", function($firebaseArray) {

   // create a reference to the database location where we will store our data
   var ref = new Firebase("https://klima-challenge.firebaseio.com");

   var events = [
      {name: 'Bildungsaktivitäten selber durchführen', type: 1},
      {name: 'Bildungsmodule buchen (inkl. Teamer)', type: 1},
      {name: 'Biologische Ernährung', type: 1},
      {name: 'Bus statt Auto', type: 3, question: 'Wie ist die durchschnittliche Distanz in km pro Person?', assessment: 0.109},
      {name: 'Bäume pflanzen', type: 3, question: 'Wieviele Bäume wurden gepflanzt?', assessment: 10},
      {name: 'Energiesparlampen', type: 3, question: 'Wie viele Lampen wurden ersetzt?', assessment: 13.7},
      {name: 'Fahrrad-Reparatur-Service', type: 3, question: 'Wie viele Fahrräder wurden repariert?', assessment: 25},
      {name: 'Fahrrad statt Auto', type: 3, question: 'Wie ist die durchschnittliche Distanz in km pro Person?', assessment: 0.139},
      {name: 'Handy-Sammel-Aktion', type: 1},
      {name: 'Kleidertauschparty', type: 3, question: 'Wie viele Kleidungsstücke wurden getauscht?', assessment: 5},
      {name: 'Klimafreundliche Veranstaltung', type: 1},
      {name: 'Müll sammeln', type: 3, question: 'Wieviel Müll (in kg) wurde gesammelt?', assessment: 1.25}, // Mittelwert für Verpackungsmüll (1) und Papiermüll (1,5)
      {name: 'Politische Partizipation', type: 1},
      {name: 'Repair-Café', type: 1},
      {name: 'Shopping-Fasten', type: 3, question: 'Auf wie viele neue Kleidungsstücke wurde verzichtet?', assessment: 5},
      {name: 'Solaranlage fürs Vereinsheim', type: 3, question: 'Wie viel Strom produziert die Anlage monatlich (in kWh)?', assessment: 0.5},
      {name: 'Solarbetriebene Handy-Aufladestation', type: 3, question: 'Wie viele Handys wurden geladen?', assessment: 0.0033},
      {name: 'Solarpumpe', type: 1},
      {name: 'Stromanbieterwechsel', type: 3, question: 'Wie hoch ist der monatliche Stromverbrauch (in kWh)?', assessment: 0.2},
      {name: 'Stromerzeuger-Fahrrad', type: 1},
      {name: 'Umstieg auf Recyclingpapier', type: 3, question: 'Wie viel Papier wird monatlich gekauft (in Blatt Papier)?', assessment: 0.001}, // 100 Blatt = 0.1
      {name: 'Upcycling', type: 1},
      {name: 'Veranstaltung plastikfrei gestalten', type: 2, assessment: 0.01},
      {name: 'Vereinsbus mit Erdgas', type: 1},
      {name: 'Versuchsveganer_in', type: 4, question: 'Wie viele Tage wurde vegan gelebt?', assessment: 3.7},
      {name: 'Versuchsvegetarier_in', type: 4, question: 'Wie viele Tage wurde vegetarisch gelebt?', assessment: 2.1},
      {name: 'Zug statt Auto', type: 3, question: 'Wie ist die durchschnittliche Distanz in km pro Person?', assessment: 0.096},
      {name: 'Sonstige Aktion', type: 3, question: 'Wie viele kg CO<sub>2</sub> habt ihr durch die Aktion eingespart?', assessment: 1, placeholder: 'Für noch mehr Klimapunkte: Wie viel klimawirksame Emissionen (in kg CO<sub>2</sub>-Äquivalent) wurden durch eure Aktion eingespart? Wir schlagen vor: Finde es selbst heraus, z.B. per Suchmaschine oder auf der Website <a href="http://eingutertag.org" target="_blank">www.eingutertag.org</a>. Für die Berechnung: Dort entspricht ein "Punkt" übrigens 68g CO<sub>2</sub>. Eine Abschätzung ist ausreichend. Wenn Du keine Infos findest, trage einfach <b>0</b> ein. Wir versuchen dann anhand deiner Kurzbeschreibung, die Emissionseinsparungen zu bewerten.'}
   ];

   var carriers = [
      'Arbeiter-Samariter-Jugend ASJ',
      'Arbeitsgemeinschaft der Ev. Jugend in Nds AEJN',
      'Arbeitskreis Nds Jugendgemeinschaften ANJ',
      'BDKJ-Landesstelle Niedersachsen',
      'Bund der Alevitischen Jugendlichen in Deutschland e.V.',
      'Bund der Pfadfinderinnen und Pfadfinder (BdP) Niedersachsen',
      'Bund Deutscher Pfadfinder_innen (BDP), Landesverband Niedersachsen',
      'Deutsche Schreberjugend',
      'Deutsche Wanderjugend',
      'Deutsches Jugendrotkreuz JRK',
      'DGB-Gewerkschaftsjugend',
      'DITIB LJV Niedersachsen und Bremen',
      'DJO-Dt Jugend in Europa',
      'DLRG-Jugend',
      'Jugend im Niedersächsischen Beamtenbund und Tarifunion NBB-Jugend',
      'Jugendnetzwerk LAMBDA',
      'Jugendumweltnetzwerk JANUN',
      'Jugendwerk der Arbeiterwohlfahrt',
      'Junge Presse Nds Geschäftsstelle ANJ',
      'Landesjugendring Niedersachsen ljr',
      'Naturfreundejugend Deutschlands',
      'Nds Alpenvereinsjugend',
      'Nds Jugendfeuerwehr',
      'Nds Landjugend NLJ',
      'Ring dt Pfadfinderinnenverbände',
      'Ring dt Pfadfinderverbände',
      'SJD-Die Falken',
      'Sportjugend Niedersachsen',
      'THW-Jugend e.V.',
      'Sonstige / kein Träger'
   ];

   function getClimatePointsSum() {
      var sum = 0;
      angular.forEach(interface.db, function(project) {
         if (project.public) {
            sum += project.climatePoints;
         }
      });

      return sum;
   };

   function getPublicProjectsCount() {
      var sum = 0;
      angular.forEach(interface.db, function(project) {
         if (project.public) {
            sum += 1;
         }
      });
      return sum;
   }

   function getPercentage() {
      var goal = 400000;
      var rate = parseFloat(getClimatePointsSum()) / parseFloat(goal);
      return Math.round(rate*100);
   }

   function getCleanPercentage() {
      var percentage = getPercentage();
      if (percentage < 100) {
         return percentage;
      } else {
         return 100;
      }
   }

   // this uses AngularFire to create the synchronized array
   var interface = {
      db: $firebaseArray(ref.child('projects')),
      climatePointsSum: getClimatePointsSum,
      publicProjectsCount: getPublicProjectsCount,
      getPercentage: getPercentage,
      getCleanPercentage: getCleanPercentage,
      events: events,
      carriers: carriers,
      aktionstage: ref.child('aktionstage'),
		klimafasten: ref.child('klimafasten')
   };
   return interface;
});
