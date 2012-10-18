// accessibility page reading automatically provided by accessibility.js

var results = null;
$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});
});

$("#resilience_assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var numChecked = 0;
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		
		total = total + Number($(this).val());
		numChecked = numChecked + 1;
	});

	if (numChecked < 22) {
		console.log('not done');
		alertDialog('Please make a selection on each question', 'Error');
		return false;
	}
	
	var last = localStorage.getItem("resilienceAssessLastScore");
	var key = score(last) + "-" + score(total);
	localStorage.setItem("resilienceAssessLastScore", total);

	//displayed scored results
	alertDialog(results[key], 'Results', 2);
	//history.back();
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
