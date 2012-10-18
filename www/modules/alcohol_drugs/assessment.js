var results = null;
var alcohol_drugs_array = new Array();
var begin = null;
var drug = null;
var end = null;
var alcohol_pressed = false;
var cannabis_pressed = false;
var cocaine_pressed = false;
var amphetamine_pressed = false;
var sedatives_pressed = false;
var other_drug_use_pressed = false;

var show_2_alcohol = false, 
	show_2_cannabis = false, 
	show_2_cocaine = false, 
	show_2_amphetamine = false,
	show_2_sedatives = false;
	show_2_other_drug_use = false;

	var notAtAll = "Not at all";
	var severalDays = "Several days";
	var moreHalfDays = "More than half the days";
	var nEveryDay = "Nearly every day";
	var daily = "Daily or almost daily";

	var noNever = "No, Never";
	var yPast3Mo = "Yes, in the past 3 month";
	var yNPast3Mo = "Yes, but not in the past 3 months";

	var never = "Never";
	var onceOrTwice = "Once or twice";
	var monthly = "Monthly";
	var weekly = "Weekly";

$('.assessment').bind('pageshow.assessment', function(event, ui) {
	/* Load results data */
	$.getJSON('assessment.json', function (data) {
		results = data;
	});

	// Hide the legend at first, we only show it when a yes has been chosen for 
	// one of the options of question 1
	$("#2_legend").hide();
});



/* Replace the word substance with the current drug chosen*/
function add_text(id, drug_of_choice)
{
	var new_text;
	new_text = $(id).text();
		
	// Need to replace all occurrences of [substance]
	new_text = new_text.replace('[substance]', drug_of_choice);
	$(id).text(new_text);
}

/*************************************************************************************************/
/*
 * 
 1a - 1f are if the user has ever used these drugs in their life  
 */
/*************************************************************************************************/
$(":input[name='1a']").bind("change", function(event, ui) {
	var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If alcohol hasn't been chosen already then create question 2 
		 * */
		if (!show_2_alcohol)
		{
			$("#2_legend").after(
			'<div data-role="fieldcontain" id="2_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>a.  Alcohol (beer, wine, spirits, etc.)</legend>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs20sub1" value="0"/><label for="alcohol_drugs20sub1">' + notAtAll  + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs21sub1" value="2"/><label for="alcohol_drugs21sub1">' + severalDays + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs22sub1" value="3"/><label for="alcohol_drugs22sub1">' + moreHalfDays + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs23sub1" value="4"/><label for="alcohol_drugs23sub1">' + nEveryDay + '</label>' +
				'<input type="radio" name="2sub_alcohol" id="alcohol_drugs24sub1" value="6"/><label for="alcohol_drugs24sub1">' + daily + '</label>' +
				
			'</fieldset>' +
			
			'</div>');
			
			$("#2_alcohol").trigger('create');
			
			// Find the correct area to place question 6 about alcohol
			var placement;
			// Drugs after alcohol
			if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else
			{
				placement = "#2_alcohol";
			}
			
			$(placement).after(
			'<div data-role="fieldcontain" id="6_alcohol_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_a">6 a.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_alcohol" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
				
			'</fieldset>' +
			'</div>');
			// Add the css to the question
			$("#6_alcohol_fieldcontain").trigger('create');
			
			// Find the correct area to place question 7 about alcohol
			add_text('#concern_a', drug_of_choice);
			
			if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol_fieldcontain").length > 0)
			{
				placement = "#6_alcohol_fieldcontain";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7_alcohol_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_a">7 a.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_alcohol" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			// Add the css to the question
			$("#7_alcohol_fieldcontain").trigger('create');
			
			add_text('#control_a', drug_of_choice);
			show_2_alcohol = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		alcohol_pressed = false;
		$("#2_alcohol").remove();
		$("#3a_alcohol_fieldcontain").remove();
		$("#4a_alcohol_fieldcontain").remove();
		$("#5a_alcohol_fieldcontain").remove();
		$("#6_alcohol_fieldcontain").remove();
		$("#7_alcohol_fieldcontain").remove();
		
		show_2_alcohol = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
			
		}
	}
});

$(":input[name='1b']").bind("change", function(event, ui) {
	var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If cannabis hasn't been chosen already then create question 2 
		 * */
		if (!show_2_cannabis)
		{
			var placement;
			if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="2_cannabis_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>b.  Cannabis (marijuana, pot, grass, hash, etc.)</legend>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs20sub2" value="0"/><label for="alcohol_drugs20sub2">' + never + '</label>' + 
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs21sub2" value="2"/><label for="alcohol_drugs21sub2">' + onceOrTwice + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs22sub2" value="3"/><label for="alcohol_drugs22sub2">' + monthly + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs23sub2" value="4"/><label for="alcohol_drugs23sub2">' + weekly + '</label>' +
					'<input type="radio" name="2sub_cannabis" id="alcohol_drugs24sub2" value="6"/><label for="alcohol_drugs24sub2">' + daily + '</label>' +
					
				'</fieldset>' +
				'</div>');
			
			$("#2_cannabis_fieldcontain").trigger('create');
			// Drugs before cannabis
			if ($("#6_alcohol_fieldcontain").length > 0)
			{
				placement = "#6_alcohol_fieldcontain";
			}
			// Drugs after cannabis
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else
			{
				placement = "#2_cannabis_fieldcontain";
			}
			
			$(placement).after(
			'<div data-role="fieldcontain" id="6_cannabis_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_b">6 b.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + ' </label>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + ' </label>' +
				'<input type="radio" name="6_cannabis" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + ' </label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6_cannabis_fieldcontain").trigger('create');
			
			add_text('#concern_b', drug_of_choice);
			
			// Figure out where to put question 7b
			if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7b_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_b">7 b.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_cannabis" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7b_alcohol").trigger('create');
			
			add_text('#control_b', drug_of_choice);
			
			show_2_cannabis = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		cannabis_pressed = false;
		$("#2_cannabis_fieldcontain").remove();
		$("#3b_cannabis_fieldcontain").remove();
		$("#4b_cannabis_fieldcontain").remove();
		$("#5b_amphetamine_fieldcontain").remove();
		$("#6_cannabis_fieldcontain").remove();
		$("#7b_alcohol").remove();
		show_2_cannabis = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
			
		}
	}
});

$(":input[name='1c']").bind("change", function(event, ui) {
	var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
	
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If cocaine hasn't been chosen already then create question 2 
		 * */
		if (!show_2_cocaine)
		{
			var placement;
			if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="2_cocaine_fieldcontain">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<legend>c.  Cocaine (coke, crack, etc.)</legend>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs20sub3" value="0"/><label for="alcohol_drugs20sub3">' + never + '</label>' + 
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs21sub3" value="2"/><label for="alcohol_drugs21sub3">' + onceOrTwice + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs22sub3" value="3"/><label for="alcohol_drugs22sub3">' + monthly + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs23sub3" value="4"/><label for="alcohol_drugs23sub3">' + weekly + '</label>' +
					'<input type="radio" name="2sub_cocaine" id="alcohol_drugs24sub3" value="6"/><label for="alcohol_drugs24sub3">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#2_cocaine_fieldcontain").trigger('create');
			
			// Figure out the correct placement
			// Drugs before cocaine
			if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after cocaine
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else
			{
				placement = "#2_cocaine_fieldcontain";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6_cocaine">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_c">6 c.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_cocaine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6_cocaine").trigger('create');
			
			add_text('#concern_c', drug_of_choice);
			
			// Figure out the correct placement of question 7
			if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else
			{
				placement = "#6_cocaine";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7c_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_c">7 c.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + never + '</label>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_cocaine" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			$("#7c_alcohol").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#control_c', drug_of_choice);
			
			show_2_cocaine = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		cocaine_pressed = false;
		$("#2_cocaine_fieldcontain").remove();
		$("#3c_cocaine_fieldcontain").remove();
		$("#4c_cocaine_fieldcontain").remove();
		$("#5c_cocaine_fieldcontain").remove();
		$("#6_cocaine").remove();
		$("#7c_alcohol").remove();
		show_2_cocaine = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1d']").bind("change", function(event, ui) {
	var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If amphetamine hasn't been chosen already then create question 2 
		 * */
		if (!show_2_amphetamine)
		{
			var placement;
			if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_amphetamine">' +
						'<fieldset data-role="controlgroup" class=likert1-5_alcohol>' +
							'<legend>d.  Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)</legend>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs20sub4" value="0"/><label for="alcohol_drugs20sub4">' + never + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs21sub4" value="2"/><label for="alcohol_drugs21sub4">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs22sub4" value="3"/><label for="alcohol_drugs22sub4">' + monthly + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs23sub4" value="4"/><label for="alcohol_drugs23sub4">' + weekly + '</label>' +
							'<input type="radio" name="2sub_amphetamine" id="alcohol_drugs24sub4" value="6"/><label for="alcohol_drugs24sub4">' + daily + '</label>' +

						'</fieldset>' +
					'</div>');
			
			// Add the css to the question
			$("#2_amphetamine").trigger('create');
			
			// Figure out where to place question 6
			// Drugs before amphetamine
			if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after amphetamine
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			
			// No drugs present so make it after amphetamine in question 2
			else
			{
				placement = "#2_amphetamine";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6d_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_d">6 d.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_amphetamine" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6d_alcohol").trigger('create');
			
			add_text('#concern_d', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7d_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_d">7 d.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="77_sedatives" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7d_alcohol").trigger('create');
			
			add_text('#control_d', drug_of_choice);
			
			show_2_amphetamine = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		amphetamine_pressed = false;
		$("#2_amphetamine").remove();
		$("#3d_amphetamine_fieldcontain").remove();
		$("#4d_amphetamine_fieldcontain").remove();
		$("#5d_amphetamine_fieldcontain").remove();
		$("#6d_alcohol").remove();
		$("#7d_alcohol").remove();
		show_2_amphetamine = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1e']").bind("change", function(event, ui) {
	var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)';
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If sedatives hasn't been chosen already then create question 2 
		 * */
		if (!show_2_sedatives)
		{
			var placement;
			if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_sedatives">' +
						'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
							'<legend>e.  Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)</legend>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs20sub5" value="0"/><label for="alcohol_drugs20sub5">' + never + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs21sub5" value="2"/><label for="alcohol_drugs21sub5">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs22sub5" value="3"/><label for="alcohol_drugs22sub5">' + monthly + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs23sub5" value="4"/><label for="alcohol_drugs23sub5">' + weekly + '</label>' +
							'<input type="radio" name="2sub_sedatives" id="alcohol_drugs24sub5" value="6"/><label for="alcohol_drugs24sub5">' + daily + '</label>' +

						'</fieldset>' +
					'</div>');
			
			// Add the css to the question
			$("#2_sedatives").trigger('create');
			
			// Figure out where to place question 6
			// Drugs before sedatives
			if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			
			// Drugs after sedatives
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else
			{
				placement = "#2_sedatives";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6e_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_e">6 e.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6_sedatives" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6e_alcohol").trigger('create');
			
			add_text('#concern_e', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7d_alcohol").length > 0)
			{
				placement = "#7d_alcohol";
			}
			else if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7e_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_e">7 e.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7e_alcohol").trigger('create');
			
			add_text('#control_e', drug_of_choice);
			
			show_2_sedatives = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the button to be pressed again, 
		 * and hide the legend if necessary
		*/
		sedatives_pressed = false;
		$("#2_sedatives").remove();
		$("#3e_sedatives_fieldcontain").remove();
		$("#4e_sedatives_fieldcontain").remove();
		$("#5e_sedatives_fieldcontain").remove();
		$("#6e_alcohol").remove();
		$("#7e_alcohol").remove();
		show_2_sedatives = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

$(":input[name='1f']").bind("change", function(event, ui) {
	var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
	if ($(this).val() === '1') {
		if ($("#2:hidden"))
		{
			$("#2_legend").show();
		}
		
		/*
		 * If other drug use hasn't been chosen already then create question 2 
		 * */
		
		if (!show_2_other_drug_use)
		{
			var placement;
			if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else if ($("#2_alcohol").length > 0)
			{
				placement = "#2_alcohol";
			}
			else
			{
				placement = "#2_legend";
			}
			$(placement).after(
					'<div data-role="fieldcontain" id="2_other_drug_use">' +
						'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
							'<legend>f.  Other drug use (inhalants, hallucinogens, opiods, etc.)</legend>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs20sub6" value="0"/><label for="alcohol_drugs20sub6">' + never + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs21sub6" value="2"/><label for="alcohol_drugs21sub6">' + onceOrTwice + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs22sub6" value="3"/><label for="alcohol_drugs22sub6">' + monthly + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs23sub6" value="4"/><label for="alcohol_drugs23sub6">' + weekly + '</label>' +
							'<input type="radio" name="2sub_other_drug_use" id="alcohol_drugs24sub6" value="6"/><label for="alcohol_drugs24sub6">' + daily + '</label>' +
						'</fieldset>' +
					'</div>');
			
			$("#2_other_drug_use").trigger('create');
			
			// Figure out where to place question 7
			// Drugs before other drug use
			if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else if ($("#6_alcohol").length > 0)
			{
				placement = "#6_alcohol";
			}
			else
			{
				placement = "#2_other_drug_use";
			}
			$(placement).after(
			'<div data-role="fieldcontain" id="6f_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="concern_f">6 f.	Has a friend or anyone else ever expressed concern because of your use of [substance]?</div>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs60" value="0"/><label for="alcohol_drugs60">' + noNever + '</label>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs61" value="6"/><label for="alcohol_drugs61">' + yPast3Mo + '</label>' +
				'<input type="radio" name="6f_alcohol_radio" id="alcohol_drugs62" value="3"/><label for="alcohol_drugs62">' + yNPast3Mo + '</label>' +
			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#6f_alcohol").trigger('create');
			
			add_text('#concern_f', drug_of_choice);
			
			// Figure out where to place question 7
			if ($("#7e_alcohol").length > 0)
			{
				placement = "#7e_alcohol";
			}
			else if ($("#7d_alcohol").length > 0)
			{
				placement = "#7d_alcohol";
			}
			else if ($("#7c_alcohol").length > 0)
			{
				placement = "#7c_alcohol";
			}
			else if ($("#7b_alcohol").length > 0)
			{
				placement = "#7b_alcohol";
			}
			else if ($("#7_alcohol_fieldcontain").length > 0)
			{
				placement = "#7_alcohol_fieldcontain";
			}
			else if ($("#6f_alcohol").length > 0)
			{
				placement = "#6f_alcohol";
			}
			else if ($("#6e_alcohol").length > 0)
			{
				placement = "#6e_alcohol";
			}
			else if ($("#6d_alcohol").length > 0)
			{
				placement = "#6d_alcohol";
			}
			else if ($("#6_cocaine").length > 0)
			{
				placement = "#6_cocaine";
			}
			else if ($("#6_cannabis_fieldcontain").length > 0)
			{
				placement = "#6_cannabis_fieldcontain";
			}
			else 
			{
				placement = "#6_alcohol";
			}
			
			$(placement).after('<div data-role="fieldcontain" id="7f_alcohol">' +
				'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
					'<div id="control_f">7 f.	Have you ever tried and failed to control, cut down or stop using [substance]?</div>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs70" value="0"/><label for="alcohol_drugs70">' + noNever + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs71" value="6"/><label for="alcohol_drugs71">' + yPast3Mo + '</label>' +
				'<input type="radio" name="7_other_drug_use" id="alcohol_drugs72" value="3"/><label for="alcohol_drugs72">' + yNPast3Mo + '</label>' +

			'</fieldset>' +
			'</div>');
			
			// Add the css to the question
			$("#7f_alcohol").trigger('create');
			
			add_text('#control_f', drug_of_choice);
			
			show_2_other_drug_use = true;
		}
	} 
	else
	{
		/* Remove the dynamically created text, allow the other drug use button to be pressed again, 
		 * and hide the legend if necessary
		*/
		other_drug_use_pressed = false;
		$("#2_other_drug_use").remove();
		$("#3f_other_drug_use_fieldcontain").remove();
		$("#4f_other_drug_use_fieldcontain").remove();
		$("#5f_other_drug_use_fieldcontain").remove();
		$("#6f_alcohol").remove();
		$("#7f_alcohol").remove();
		show_2_other_drug_use = false;
		if (	!show_2_alcohol && !show_2_cannabis && 
				!show_2_cocaine && !show_2_amphetamine &&
				!show_2_sedatives && !show_2_other_drug_use)
		{
			$("#2_legend").hide();
		}
	}
});

/*************************************************************************************************/
/*
 * 
 End of 1a - 1f  
 */
/*************************************************************************************************/
$(":input[name='2sub_alcohol']").live("change", function(event, ui) {
	var drug_of_choice = 'Alcohol (beer, wine, spirits, etc.)';
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3a_alcohol_fieldcontain").remove();
		$("#4a_alcohol_fieldcontain").remove();
		$("#5a_alcohol_fieldcontain").remove();
		alcohol_pressed = false;
	} 
	else
	{
		// Figure out where to place question 3, 4, and 5 for alcohol.
		if (!alcohol_pressed)
		{
			if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else if ($("#2_cannabis_fieldcontain").length > 0)
			{
				placement = "#2_cannabis_fieldcontain";
			}
			else
			{
				placement = "#2_alcohol";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_a">3 a.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_alcohol" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3a_alcohol_fieldcontain").trigger('create');
			
			add_text('#desire_a', drug_of_choice);
			
			if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_a">4 a.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_alcohol" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4a_alcohol_fieldcontain").trigger('create');
			
			add_text('#problems_a', drug_of_choice);
			
			if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="5a_alcohol_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_a">5 a.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_alcohol" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#5a_alcohol_fieldcontain").trigger('create');
			
			add_text('#failed_a', drug_of_choice);
			
			alcohol_pressed = true;
		}
	}
});

$(":input[name='2sub_cannabis']").live("change", function(event, ui) {
	var drug_of_choice = 'Cannabis (marijuana, pot, grass, hash, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3b_cannabis_fieldcontain").remove();
		$("#4b_cannabis_fieldcontain").remove();
		$("#5b_amphetamine_fieldcontain").remove();
		cannabis_pressed = false;
	} 
	else
	{
		if (!cannabis_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for cannabis.
			var placement;
			
			if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else if ($("#2_cocaine_fieldcontain").length > 0)
			{
				placement = "#2_cocaine_fieldcontain";
			}
			else
			{
				placement = "#2_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3b_cannabis_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_b">3 b.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_cannabis" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>');
				
			$("#3b_cannabis_fieldcontain").trigger('create');
	
			add_text('#desire_b', drug_of_choice);
			
			if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4b_cannabis_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_b">4 b.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_cannabis" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4b_cannabis_fieldcontain").trigger('create');
			
			add_text('#problems_b', drug_of_choice);
				
			if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5b_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_b">5 b.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_cannabis" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5b_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_b', drug_of_choice);
				
			cannabis_pressed = true;
		}
	}
});

$(":input[name='2sub_cocaine']").live("change", function(event, ui) {
	var drug_of_choice = 'Cocaine (coke, crack, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3c_cocaine_fieldcontain").remove();
		$("#4c_cocaine_fieldcontain").remove();
		$("#5c_cocaine_fieldcontain").remove();
		cocaine_pressed = false;
	} 
	else
	{
		if (!cocaine_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for cocaine.
			var placement;
			if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else if ($("#2_amphetamine").length > 0)
			{
				placement = "#2_amphetamine";
			}
			else
			{
				placement = "#2_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_c">3 c.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_cocaine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3c_cocaine_fieldcontain").trigger('create');
			
			add_text('#desire_c', drug_of_choice);
			
			if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_c">4 c.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_cocaine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +
			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4c_cocaine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#problems_c', drug_of_choice);
			
			if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5c_cocaine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_c">5 c.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_cocaine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5c_cocaine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_c', drug_of_choice);
			
			cocaine_pressed = true;
		}
	}
});

$(":input[name='2sub_amphetamine']").live("change", function(event, ui) {
	var drug_of_choice = 'Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3d_amphetamine_fieldcontain").remove();
		$("#4d_amphetamine_fieldcontain").remove();
		$("#5d_amphetamine_fieldcontain").remove();
		amphetamine_pressed = false;
	} 
	else
	{
		if (!amphetamine_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for amphetamine.
			var placement;
			if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}
			else
			{
				placement = "#2_amphetamines";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="3d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup"  class="likert1-5_alcohol">' + 
						'<div id="desire_d">3 d.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_amphetamine" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#desire_d', drug_of_choice);
			
			if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_d">4 d.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_amphetamine" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#problems_d', drug_of_choice);
				
			if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5d_amphetamine_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_d">5 d.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_amphetamine" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5d_amphetamine_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_d', drug_of_choice);
			
			amphetamine_pressed = true;
		}
	}
});

$(":input[name='2sub_sedatives']").live("change", function(event, ui) {
	var drug_of_choice = 'Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3e_sedatives_fieldcontain").remove();
		$("#4e_sedatives_fieldcontain").remove();
		$("#5e_sedatives_fieldcontain").remove();
		sedatives_pressed = false;
	} 
	else
	{
		if (!sedatives_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for sedatives.
			var placement;
			if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else if ($("#2_other_drug_use").length > 0)
			{
				placement = "#2_other_drug_use";
			}
			else if ($("#2_sedatives").length > 0)
			{
				placement = "#2_sedatives";
			}

			$(placement).after(
				'<div data-role="fieldcontain" id="3e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_e">3 e.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_sedatives" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +
					'</fieldset>' +
				'</div>').trigger('create');
			
			$("#3e_sedatives_fieldcontain").trigger('create');
			
			add_text('#desire_e', drug_of_choice);
			
			if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else if ($("#3f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_e">4 e.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_sedatives" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4e_sedatives_fieldcontain").trigger('create');
			
			add_text('#problems_e', drug_of_choice);
				
			if ($("#5d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5d_amphetamine_fieldcontain";
			}
			else if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else if ($("#4f_other_drug_use_fieldcontain").length > 0)
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			else
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="5e_sedatives_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_e">5 e.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_sedatives" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +

				'</fieldset>' +
				'</div>');
			
			$("#5e_sedatives_fieldcontain").trigger('create');
			
			add_text('#failed_e', drug_of_choice);
				
			sedatives_pressed = true;
		}
	}
});

$(":input[name='2sub_other_drug_use']").live("change", function(event, ui) {
	var drug_of_choice = 'Other drug use (inhalants, hallucinogens, opiods, etc.)'; 
	
	if ($(this).val() === '0') {
		/* Remove the dynamically created text, allow the button to be pressed again */
		$("#3f_other_drug_use_fieldcontain").remove();
		$("#4f_other_drug_use_fieldcontain").remove();
		$("#5f_other_drug_use_fieldcontain").remove();
		other_drug_use_pressed = false;
	} 
	else
	{
		if (!other_drug_use_pressed)
		{
			// Figure out where to place question 3, 4, and 5 for other drug use.
			var placement;
			if ($("#3e_sedatives_fieldcontain").length > 0)
			{
				placement = "#3e_sedatives_fieldcontain";
			}
			else if ($("#3d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#3d_amphetamine_fieldcontain";
			}
			else if ($("#3c_cocaine_fieldcontain").length > 0)
			{
				placement = "#3c_cocaine_fieldcontain";
			}
			else if ($("#3b_cannabis_fieldcontain").length > 0)
			{
				placement = "#3b_cannabis_fieldcontain";
			}
			else if ($("#3a_alcohol_fieldcontain").length > 0)
			{
				placement = "#3a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#2_other_drug_use";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="3f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
						'<div id="desire_f">3 f.	During the past three months, how often have you had a strong desire or urge to use [substance]?</div>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs30" value="0"/><label for="alcohol_drugs30">' + never + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs31" value="3"/><label for="alcohol_drugs31">' + onceOrTwice + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs32" value="4"/><label for="alcohol_drugs32">' + monthly + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs33" value="5"/><label for="alcohol_drugs33">' + weekly + '</label>' +
						'<input type="radio" name="3_other_drug_use" id="alcohol_drugs34" value="6"/><label for="alcohol_drugs34">' + daily + '</label>' +

					'</fieldset>' +
				'</div>');
				
			$("#3f_other_drug_use_fieldcontain").trigger('create');
	
			add_text('#desire_f', drug_of_choice);
			
			if ($("#4e_sedatives_fieldcontain").length > 0)
			{
				placement = "#4e_sedatives_fieldcontain";
			}
			else if ($("#4d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#4d_amphetamine_fieldcontain";
			}
			else if ($("#4c_cocaine_fieldcontain").length > 0)
			{
				placement = "#4c_cocaine_fieldcontain";
			}
			else if ($("#4b_cannabis_fieldcontain").length > 0)
			{
				placement = "#4b_cannabis_fieldcontain";
			}
			else if ($("#4a_alcohol_fieldcontain").length > 0)
			{
				placement = "#4a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#3f_other_drug_use_fieldcontain";
			}
			
			$(placement).after(
				'<div data-role="fieldcontain" id="4f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' + 
					'<div id="problems_f">4 f.	During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?</div>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs40" value="0"/><label for="alcohol_drugs40">' + never + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs41" value="2"/><label for="alcohol_drugs41">' + onceOrTwice + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs42" value="3"/><label for="alcohol_drugs42">' + monthly + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs43" value="4"/><label for="alcohol_drugs43">' + weekly + '</label>' +
				'<input type="radio" name="4_other_drug_use" id="alcohol_drugs44" value="6"/><label for="alcohol_drugs44">' + daily + '</label>' +

			'</fieldset>' + 
			'</div>').trigger('create');
			
			$("#4f_other_drug_use_fieldcontain").trigger('create');
			
			add_text('#problems_f', drug_of_choice);
			if ($("#5e_sedatives_fieldcontain").length > 0)
			{
				placement = "#5e_sedatives_fieldcontain";
			}
			else if ($("#5d_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5d_amphetamine_fieldcontain";
			}
			else if ($("#5c_cocaine_fieldcontain").length > 0)
			{
				placement = "#5c_cocaine_fieldcontain";
			}
			else if ($("#5b_amphetamine_fieldcontain").length > 0)
			{
				placement = "#5b_amphetamine_fieldcontain";
			}
			else if ($("#5a_alcohol_fieldcontain").length > 0)
			{
				placement = "#5a_alcohol_fieldcontain";
			}
			else
			{
				placement = "#4f_other_drug_use_fieldcontain";
			}
			$(placement).after(
				'<div data-role="fieldcontain" id="5f_other_drug_use_fieldcontain">' +
					'<fieldset data-role="controlgroup" class="likert1-5_alcohol">' +
						'<div id="failed_f">5 f.	During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]</div>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs50" value="0"/><label for="alcohol_drugs50">' + never + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs51" value="5"/><label for="alcohol_drugs51">' + onceOrTwice + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs52" value="6"/><label for="alcohol_drugs52">' + monthly + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs53" value="7"/><label for="alcohol_drugs53">' + weekly + '</label>' +
					'<input type="radio" name="5_other_drug_use" id="alcohol_drugs54" value="8"/><label for="alcohol_drugs54">' + daily + '</label>' +
				'</fieldset>' +
				'</div>');
			
			$("#5f_other_drug_use_fieldcontain").trigger('create');
			
			// Radio buttons 1-4 are pressed
			add_text('#failed_f', drug_of_choice);
				
			other_drug_use_pressed = true;
		}
	}
});

$("#alcohol_drugs-assessment-submit").bind("tap", function (e) {
	e.preventDefault();
	var total = 0;
	var alcohol_score = 0;
	var cannabis_score = 0;
	var cocaine_score = 0;
	var amphetamine_score = 0;
	var sedatives_score = 0;
	var other_drug_use_score = 0;
	
	var numChecked = 0;
	var question1_use_alcohol = false;
	var question1_use_cannabis = false;
	var question1_use_cocaine = false;
	var question1_use_amphetamine = false;
	var question1_use_sedatives = false;
	var question1_use_other_drug_use = false;
	
	/*********************************/
	// For questions 3-7
	var alcohol_used_2 = false;
	var cannabis_used_2 = false;
	var cocaine_used_2 = false;
	var amphetamine_used_2 = false;
	var sedatives_used_2 = false;
	var other_drug_use_used_2 = false;
	
	/*********************************/
	
	$("input[type='radio']:checked").each(function () {
		// add up each checked radio button.
		// Questions 1a - 1f will be used to check if scoring is needed for the later questions
		
		switch($(this).attr('name'))
		{
		case '1a':
			if ($(this).val() === '1')
			{
				question1_use_alcohol = true;
			}
			break;
		case '1b':
			if ($(this).val() === '1')
			{
				question1_use_cannabis = true;
			}
			break;
		case '1c':
			if ($(this).val() === '1')
			{
				question1_use_cocaine = true;
			}
			break;
		case '1d':
			if ($(this).val() === '1')
			{
				question1_use_amphetamine = true;
			}
			break;
		case '1e':
			if ($(this).val() === '1')
			{
				question1_use_sedatives = true;
			}
			break;
		case '1f':
			if ($(this).val() === '1')
			{
				question1_use_other_drug_use = true;
			}
			break;
		/************************************************************************************/
		// If you have answers yes for question 1 and the answer is greater than zero 
		// then proceed to questions 3-7 for scoring.
		// This is done for all of the alcohol and drugs
		/************************************************************************************/
			
		case '2sub_alcohol':
			if ($(this).val() > '0' && question1_use_alcohol)
			{
				alcohol_used_2 = true;
				alcohol_score += Number($(this).val());
			}
			break;
		case '3_alcohol':
		case '4_alcohol':
		case '5_alcohol':
		case '6_alcohol':
		case '7_alcohol':
			if (alcohol_used_2)
			{
				alcohol_score += Number($(this).val());
			}
			break;
			
		case '2sub_cannabis':
			if ($(this).val() > '0' && question1_use_cannabis)
			{
				cannabis_used_2 = true;
				cannabis_score += Number($(this).val());
			}
			break;
		case '3_cannabis':
		case '4_cannabis':
		case '5_cannabis':
		case '6_cannabis':
		case '7_cannabis':
			if (cannabis_used_2)
			{
				cannabis_score += Number($(this).val());
			}
			break;
			
		case '2sub_cocaine':
			if ($(this).val() > '0' && question1_use_cocaine)
			{
				cocaine_used_2 = true;
				cocaine_score += Number($(this).val());
			}
			break;
		case '3_cocaine':
		case '4_cocaine':
		case '5_cocaine':
		case '6_cocaine':
		case '7_cocaine':
			if (cocaine_used_2)
			{
				cocaine_score += Number($(this).val());
			}
			break;
			
		
		case '2sub_amphetamine':
			if ($(this).val() > '0' && question1_use_amphetamine)
			{
				amphetamine_used_2 = true;
				amphetamine_score += Number($(this).val());
			}
			break;
		case '3_amphetamine':
		case '4_amphetamine':
		case '5_amphetamine':
		case '6_amphetamine':
		case '7_amphetamine':
			if (amphetamine_used_2)
			{
				amphetamine_score += Number($(this).val());
			}
			break;
			
		case '2sub_sedatives':
			if ($(this).val() > '0' && question1_use_sedatives)
			{
				sedatives_used_2 = true;
				sedatives_score += Number($(this).val());
			}
			break;
		case '3_sedatives':
		case '4_sedatives':
		case '5_sedatives':
		case '6_sedatives':
		case '7_sedatives':
			if (sedatives_used_2)
			{
				sedatives_score += Number($(this).val());
			}
			break;
			
		case '2sub_other_drug_use':
			if ($(this).val() > '0' && question1_use_other_drug_use)
			{
				other_drug_use_used_2 = true;
				other_drug_use_score += Number($(this).val());
			}
			break;
		case '3_other_drug_use':
		case '4_other_drug_use':
		case '5_other_drug_use':
		case '6_other_drug_use':
		case '7_other_drug_use':
			if (other_drug_use_used_2)
			{
				other_drug_use_score += Number($(this).val());
			}
			break;
		}
		numChecked = numChecked + 1;
	});

	// We start at 6 because if nothing is selected or it's all set to no for question 1,
	// we need to make sure that those 6 have been selected
	
	var value_to_be_checked = 6;
	/***************************************************************************/
	// Add up all of the alcohol and drug scores
	/***************************************************************************/
	if (question1_use_alcohol)
	{
		if (!alcohol_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (alcohol_used_2)
		{
				
			value_to_be_checked += 6;
		}
	}
	if (question1_use_cannabis)
	{
		if (!cannabis_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (cannabis_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	if (question1_use_cocaine)
	{
		if (!cocaine_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (cocaine_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	if (question1_use_amphetamine)
	{
		if (!amphetamine_used_2)
		{
			value_to_be_checked += 3;
		}
		else if (amphetamine_used_2)
		{
			value_to_be_checked += 6;
		}
	}
	
	var errorArray = new Array();
	var choice_selected = null;
	var name = null;
	var id = null;
	
	$("input[type='radio']").each(function () {
		name = $(this).attr("name");
		id = $(this).attr("id");
		
		// add up each checked radio button.
		if ($(this).attr("checked"))
		{
			choice_selected = checked(name, id, errorArray);
		}
		else
		{
			// Unchecked
			unchecked(name, id, errorArray, choice_selected);
		}
	});
	
	if (numChecked < value_to_be_checked) {
		console.log('not done');
		$(window).scrollTop($('[name=' +  errorArray[0] +']').offset().top - 100);
		return false;
	}

	var key;
	// Figure out based on the alcohol and drug score what feedback to show
	if (	alcohol_score <= 10 && 
			(cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3)) 
	{
		key = 'feedback1';
	} 
	else if (	alcohol_score >= 11 && alcohol_score <= 26 
			&& (cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3))
	{
		key = 'feedback2';
	}
	else if (	alcohol_score >= 27 && alcohol_score <= 38 
			&& (cannabis_score + cocaine_score +
			amphetamine_score + sedatives_score +
			other_drug_use_score <= 3))
	{
		key = 'feedback3';
	}
	else if (
				alcohol_score <= 10 && cannabis_score  < 27 && cocaine_score < 27 && 
				amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
				((cannabis_score >= 4 && cannabis_score <= 26) || 
				(cocaine_score >= 4 && cocaine_score <= 26) || 
				(amphetamine_score >= 4 && amphetamine_score <= 26) || 
				(sedatives_score >= 4 && sedatives_score <= 26) ||
				(other_drug_use_score >= 4 && other_drug_use_score <= 26)))
	{
		key = 'feedback4';
	}
	else if (alcohol_score <= 10 && 
			((cannabis_score >= 27 && cannabis_score <= 38) || 
			(cocaine_score >= 27 && cocaine_score <= 38) || 
			(amphetamine_score >= 27 && amphetamine_score <= 38) || 
			(sedatives_score >= 27 && sedatives_score <= 38) ||
			(other_drug_use_score >= 27 && other_drug_use_score <= 38)))
	{
		key = 'feedback5';
	}
	else if (
			alcohol_score >= 11 && alcohol_score >= 26 && cannabis_score  < 27 && cocaine_score < 27 && 
			amphetamine_score < 27 && sedatives_score < 27 && other_drug_use_score < 27 && 
			((cannabis_score >= 4 && cannabis_score <= 26) || 
			(cocaine_score >= 4 && cocaine_score <= 26) || 
			(amphetamine_score >= 4 && amphetamine_score <= 26) || 
			(sedatives_score >= 4 && sedatives_score <= 26) ||
			(other_drug_use_score >= 4 && other_drug_use_score <= 26)))
	{
		key = 'feedback6';
	}
	else if ((alcohol_score >= 27 && alcohol_score <= 38 &&
			(cannabis_score >= 3 || 
			cocaine_score >= 3 || 
			amphetamine_score >= 3 || 
			sedatives_score >= 3 ||
			other_drug_use_score >= 3)) ||
			
			(alcohol_score >= 10 && (cannabis_score > 26 || 
					cocaine_score > 26 || 
					amphetamine_score > 26 || 
					sedatives_score > 26 ||
					other_drug_use_score > 26)))
	{
		key = 'feedback7';
	}
	//displayed scored results
	alertDialog(results[key], null, 2);
});