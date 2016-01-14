klimaChallenge.directive('factsGenerator', function () {
	function link($scope, element) {

		var facts = [
			'Der weltweite Tierhaltungssektor (von Futtermittelanbau bis zum Endprodukt in der Ladentheke) ist für 14,5% der menschengemachten Treibhausgase verantwortlich. Das ist mehr als der globale Verkehrssektor (alle Autos, Schiffe, Flugzeuge, Züge, LKWs).',
			'Mit dem, was wir im Stand-by-Modus in Deutschland pro Jahr verbrauchen, könnte der Strombedarf von Berlin für 1 Jahr gedeckt werden.',
			'Hunderttausend Krankheitsfälle und sogar 10 000 Todesfälle gibt es jährlich in der EU, resultierend aus der globalen Erwärmung durch Luftverschmutzung.',
			'Was bringt Recycling? Mit der im Jahr 2012 durch Recycling eingesparten Energie könnten ca. 620.000 kleine Haushalte ein Jahr lang mit Strom versorgt werden. (Stell dir vor, wie viel Energie wir einsparen könnten, wenn wir diesen Müll ganz vermeiden würden!)',
			'Jede sechste Tier- oder Pflanzenart ist vom Aussterben bedroht. Ein Grund dafür ist der Klimawandel.',
			'In den Ozeanen gibt es mittlerweile gigantische Müllstrudel aus Plastik, der größte im pazifischen Ozean ist etwa doppelt so groß wie Deutschland. Jedes Jahr tötet dieser Müll mehrere hunderttausend höhere Meerestiere.',
			'Der weltweite Anteil von erneuerbaren Energien an der Stromerzeugung betrug 22,1% im Jahr 2013, wovon fast drei Viertel aus Wasserkraft stammten.',
			'Der Papierverbrauch in Deutschland ist genauso hoch wie der von ganz Afrika und Südamerika zusammen! Jeder Einzelne von uns nutzt fast 260 Kilogramm Papier und Pappe im Jahr. Das entspricht dem Gewicht eines riesigen Rothirsches mit imposantem Geweih.',
			'Die traurige Energiebilanz einer Batterie: „Zur Herstellung einer Einweg-Batterie wird 50-500 mal mehr Energie verbraucht, als die Batterie dann später abgibt“. ',
			'Würde es in Deutschland nur noch Mehrwegflaschen geben und Einweg ganz abgeschafft, könnten wir jährlich so viel Energie einsparen, dass die Stromversorgung von ganz Berlin für zwei Monate gesichert wäre.',
			'Für die Herstellung eines einzigen Computers werden schätzungsweise 1500 Liter Wasser, 22 Kilo chemische Stoffe und 240 Kilo fossile Brennstoffe wie Kohle oder Erdöl sowie eine Reihe von Edel- und Schwermetallen eingesetzt oder verbraucht. Allein mit der Wassermenge könnte man 150 Elefanten einen ganzen Tag tränken.',
			'Eine einzige Knopfzellen-Batterie genügt, um die Wassermenge eines 25 m Schwimmbeckens zu verseuchen.',
			'Der CO<sub>2</sub>-Fußabdruck von Tiefkühlpommes beträgt das 25-fache der gleichen Menge an frischen Kartoffeln.',
			'Steigt die globale Temperatur um mehr als 1,5 Grad Celsius, sind die Folgen des Klimawandels Wissenschaftler*innen zufolge nicht mehr zu bewältigen. Um dieses Klimaziel nicht zu verfehlen, müssen 80 Prozent der bekannten Kohlereserven im Boden bleiben.',
			'In Deutschland hatten erneuerbare Energien 2014 einen Anteil von 25,8% an der Stromerzeugung, wovon Windkraft mit einem Drittel den größten Teil beisteuert, dicht gefolgt von Biomasse.',
			'An sonnen- und windreichen Tagen können erneuerbare Energien in Deutschland schon bis zu 80% der Strom-Nachfrage abdecken (erstmals am 11. Mai 2014 mittags geschehen).',
			'Alle drei Tage schmilzt die Arktis um eine Fläche, die so groß ist wie Deutschland.',
			'Weltweit verbraucht das Internet mehr als 30 Gigawatt Strom – das ist so viel, wie 30 große Atomkraftwerke produzieren müssten und verursacht mehr Treibhausgase als der weltweite Flugverkehr.',
			'Fleischreiche Ernährung braucht ca. 3-5  mal so viel Land wie pflanzenbasierte Ernährung.',
			'Eine Kunststofftüte – übrigens ein Erdölprodukt – wird im Durchschnitt eine halbe Stunde benutzt. Nach ihrem Gebrauch bleibt sie etwa 100 bis 400 Jahre auf der Erde zurück. Selbst danach wird sie nicht vollständig biologisch abgebaut, sondern zerfällt nur in kleine Teile.',
			'Mit 10,3 Grad Celsius im Mittel war 2014 das bisher wärmste Jahr seit Beginn der Wetterbeobachtung. 2015 könnte einen weiteren Rekord aufstellen.',
			'Jede Tonne Kunststoffverpackungen, die getrennt gesammelt wird, statt mit dem Restmüll in Müllverbrennungsanlagen verbrannt zu werden, spart 1,26 Tonnen an klimaschädlichen Treibhausgasen. Der Kunststoff kann dann recycelt werden und es muss weniger neuer Kunststoff hergestellt werden.',
			'1/3 der in Deutschland verbrauchten Energie geht auf das Konto warmer Räume. Heizung und Warmwasser verbrauchen über 80% von privat-Haushalten verbrachte Energie.',
			'Jede Sekunde wird eine Regenwaldfläche von etwa einem halben Fußballfeld gerodet.',
			'Die Europäische Union könnte bis zum Jahr 2030 (theoretisch) rund 70% ihres Stroms kostengünstig aus erneuerbaren Energien herstellen, wie eine Greenpeace-Studie berechnet hat.',
			'Jährlich werden in Deutschland 15 Millionen Tonnen Verpackungsmüll produziert. Das entspricht dem Gewicht von 79 Raumschiff Enterprises oder mehr als 3,5 Millionen Elefanten.',
			'Wer sich vegetarisch ernährt, kann Treibhausgase um ca. die Hälfte reduzieren. Veganer schaffen bis zu 90%.',
			'Zur Herstellung eines Smartphones wird 0,034 Gramm Gold benötigt. Es wird mittels Giften aus dem Gestein gelöst; dabei entstehen pro Handy 100 kg giftiger Abraum (das sind die nicht nutzbaren Erdschichten über Bodenschätzen).',
			'Zwei Atomkraftwerke könnten abgeschaltet werden, wenn alle Stand-by-Geräte in Deutschland bei Nichtbenutzung richtig ausgeschaltet würden.'
		]

		var random = Math.floor(Math.random() * facts.length);
		$scope.fact = facts[random];

		// Get next fact from the list
		$scope.new = function() {
			random = (random+1) % facts.length;
			$scope.fact = null;
			$scope.fact = facts[random];
		}

	}
	return {
		templateUrl: 'views/facts-generator.html',
		link: link
	};

	// only filter the nth (1st, 2nd, 3rd, ...) element
});
