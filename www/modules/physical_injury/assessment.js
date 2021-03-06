// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#pys_injury_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	
	var total = null;
	try {
		total = scoreRadioForm('#assess-form');
	}
	catch (err) {
		// most likely a failure to enter all form values.
		alertDialog (err);
		return false;
	}
	
	var last = localStorage.getItem("physicalInjuryAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("physicalInjuryAssessLastScore", total);

	// display the scored results.
	alertDialog(results[key], 'Results', 2);
	//history.back();
	
	//this was working, but broke.
/*	$(this).simpledialog({
		'mode' : 'bool',
		'prompt' : '<div class="popup-text">' + results[key] + '</div>',
		'buttons' : {
			'OK': {
				click: function () {
					reset();
					//history.back();
				}
			}
		}
	});*/
}); 




/* apply scoring algorithm */
function score(total) {
	if (total == null) {
		return null;
	}
	else if (total <= 49) {
		return "low";
	}
	else if (total <= 70) {
		return "med";
	}
	else {
		return "high";
	}
}

/* reset all radio buttons */
function reset() {
	$('input[type="radio"]:checked').prop('checked', false).checkboxradio("refresh");
}
