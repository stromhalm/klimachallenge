klimaChallenge.factory("projects", function($firebaseArray) {

   // create a reference to the database location where we will store our data
   var ref = new Firebase("https://klima-challenge.firebaseio.com/projects");

   var events = [
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
      {name: 'Versuchsveganer_in', type: 4, question: 'Wie viele Tage wurde vegan gelebt?', assessment: 3.7},
      {name: 'Versuchsvegetarier_in', type: 4, question: 'Wie viele Tage wurde vegetarisch gelebt?', assessment: 2.1}
   ];

   var carriers = [
      'Arbeiter-Samariter-Jugend ASJ',
      'Arbeitsgemeinschaft der Ev. Jugend in Nds AEJN',
      'Arbeitskreis Nds Jugendgemeinschaften ANJ',
      'BDKJ-Landesstelle Niedersachsen',
      'Bund der Alevitischen Jugendlichen in Deutschland e.V.',
      'Bund Deutscher Pfadfinder_innen',
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

   // this uses AngularFire to create the synchronized array
   return {
      db: $firebaseArray(ref),
      events: events,
      carriers: carriers
   };
});
