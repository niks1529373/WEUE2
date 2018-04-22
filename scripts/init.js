$(document).ready(function() {

    // initialize all counters
    var deviceCounter = new Counter($('.devices-counter'));
    var arrowsCounter = new Counter($('.arrows-counter'));

    // initialize controls
    var controls = new Controls($('#controls'));

    // initialize diagram and transfer counters and controls
    var diagram = new Diagram('#diagram', '#arrow-sidebar-add', deviceCounter, arrowsCounter, controls);

    // add drag functionality to devices in sidebar
    $('.device').draggable({
        cursor: "move",
    	helper:  function() {
            return $(this).children('.device-image').clone().css('z-index', 1);
    	}
	});
});
