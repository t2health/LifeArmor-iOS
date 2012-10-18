/*
 *
 * LifeArmor
 *
 * Copyright © 2009-2012 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright © 2009-2012 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * Government Agency Original Software Designation: LifeArmor001
 * Government Agency Original Software Title: LifeArmor
 * User Registration Requested. Please send email
 * with your contact information to: robert.kayl2@us.army.mil
 * Government Agency Point of Contact for Original Software: robert.kayl2@us.army.mil
 *
 */

$('#time-out-page .reset-timer').bind('click', function() {
	startCountdown($('#time-out-page .clock'), 300);
});

$('#time-out-page .interactive-rotate-button').bind("click", function (event) {
	$('#timer-group').show();
	// blank the html before doing class setting to avoid flashing effect of changing class.
	$("#message").html('').removeClass('interactive-instruct').addClass('interactive-message');
	rotateMessage('data.json', $("#message"));
	$('#time-out-page .interactive-rotate-button .ui-btn-text ').html('New Suggestion');
	event.stopPropagation();  // don't let the live handler do this one.
	//resetCountdown($('#time-out-page .clock'));
	$('#time-out-page .clock').stopTime();
	$('#time-out-page .clock').html(formatTime(0));
});


$('#time-out-page #timer-1').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 60);
});
$('#time-out-page #timer-5').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 300);
});
$('#time-out-page #timer-10').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 600);
});
$('#time-out-page #timer-30').bind("click", function () {
	startCountdown($('#time-out-page .clock'), 1800);
});