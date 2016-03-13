var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var title = new UI.Card({
  title:'D219 IRC Capacity',
	body:'Press up for North\nPress down for West'
});

// Create details card
var details = new UI.Card({
});

// Instance variables to hold student, period, and URL data
var students;
var period;
var URL;

// Display the Card
title.show();

// If click is up on title card, then set URL to North and get North data
title.on('click', 'up', function(e) {
	URL = 'http://fahrenbacher.com/irc/irc.php?school=North';
	details.title('North IRC Capactity');
	details.subtitle('Fetching...');
	details.body('');
	getData();
	details.show();
});

// If click is down on title card, then set URL to West and get West data
title.on('click', 'down', function(e) {
	URL = 'http://fahrenbacher.com/irc/irc.php?school=West';
	details.title('West IRC Capactity');
	details.subtitle('Fetching...');
	details.body('');
	getData();
	details.show();
});

// If click is center on details card, then refresh card with current URL
details.on('click', 'select', function(e) {
	details.subtitle('Fetching...');
	details.body('');
	getData();
});

// If click is back on details card, then go back to title card
details.on('click', 'back', function(e) {
  details.hide();
});

// Make ajax request with current URL
function getData() {
	// Make the request
	ajax(	
  	{
			url: URL,
    	type: 'json'
  	},
  	function(data) {
    	// Success!
    	console.log("Successfully fetched IRC data!");

    	// Extract data
    	students = data.Students;
    	period = data.Period;
		
    	// Show to user
    	details.subtitle(students + " Students");
			details.body("Period: " + period);
  	},
  	function(error) {
    	// Failure!
    	console.log('Failed fetching IRC data: ' + error);
  	}
	);	
}