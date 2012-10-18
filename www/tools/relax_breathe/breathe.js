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

var audio_inhale = null;
var audio_hold = null;
var audio_exhale = null;
var StateEnum = {"NONE": 0, "BREATHE": 3};
var state = StateEnum.NONE;
var counter = null;


document.addEventListener("pause", onApplicationPause, false);



$( '#breathe_intervention' ).bind( 'pagebeforeshow',function(event, ui){
    buttonPress(StateEnum.NONE);
});

$( '#breathe_intervention' ).bind( 'pagebeforehide',function(event){
    buttonPress(StateEnum.NONE);
});

$("#breatheButton").bind('click', function() {
    buttonPress(StateEnum.BREATHE);
});

function setAButtonText(txt){
    $('#breatheButton .ui-btn-text').text(txt);
}

function onApplicationPause() {
    console.log('STATE: ' + state);
    buttonPress(StateEnum.NONE);
};



function buttonPress(targetState) {
	console.log("Button press: " + targetState);
	// if we press the button for the state we're in, we really want to stop.
	if (targetState == state)
	{
		targetState = StateEnum.NONE;
	}
	changeState(targetState);
};

function changeState(newState) {
	var oldState = state;
	state = newState;
	
	console.log("State change, " + oldState + " to " + state);

	//clean up from the old state
	switch (oldState)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		if (audio_inhale)
		{
			audio_inhale.stop();
		}
		if (audio_hold)
		{
			audio_hold.stop();
		}
		if (audio_exhale)
		{
			audio_exhale.stop();
		}
		$(this).stopTime("breathe");
		//$("#breatheButton").html('Start');
		setAButtonText("Start");
	    $("#instruction").text("");
	    $("#counter").text("");
	    //$("#orb_green").hide();
	    $("#orb_green").css({'visibility': 'hidden'});
	    //$("#orb_yellow_full").hide();
	    $("#orb_yellow_full").css({'webkitTransform':'scale(2)', 'visibility': 'hidden'});
	    //$("#orb_red").hide();
	    $("#orb_red").css({'webkitTransform':'scale(2)', 'visibility': 'hidden'});
	    //$("#orb_yellow_empty").hide();
	    $("#orb_yellow_empty").css('visibility', 'hidden');
		
		break;
	}
	switch (state)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		//$("#breatheButton").html('Stop');
	    setAButtonText("Stop");
		runBreathe();
		break;	
	}
};

function runBreathe()
{
    var path = jQuery.mobile.path.parseUrl(location.pathname).pathname;
    var dir = path.substring(path.indexOf(''), path.lastIndexOf('/'));
    console.log("MP3" + dir + "/tools/relax_breathe/audio/Alford/inhale.mp3");

		audio_inhale = new Media( dir + "/tools/relax_breathe/audio/Alford/inhale.mp3" );
		audio_hold   = new Media( dir + "/tools/relax_breathe/audio/Alford/hold.mp3" );
    	audio_exhale = new Media( dir + "/tools/relax_breathe/audio/Alford/exhale.mp3" );
  	    		
	counter = -4;

	$(this).stopTime();
	$(this).everyTime(1200, "breathe", function () 
	{
		var instruction = $("#instruction");
		var orb_green = $("#orb_green");
		
		console.log('counter=' + counter);  
             
	    if (counter < 0) {
	        $("#counter").text(Math.abs(counter));
	    } else {
	    	var fourcount = counter % 4 + 1;
	        $("#counter").text(fourcount);
	    }
	    
	    // Show the text and then display the circles.
		switch (counter)
		{
		case -4:
			$(orb_green).css("visibility", "visible");

			$(instruction).text("Ready");
			break;
		case -3:
			$(instruction).text("Relax");
			break;
		case -2:
			$(instruction).text("Exhale");
			break;
		case -1:
		    $(instruction).text("Begin");
			break;
		case 0:
		    $("#orb_yellow_full").css('visibility', 'hidden');
		    $(instruction).text("Inhale");
		    $('#orb_green').css({'visibility': 'visible', '-webkit-transition':'-webkit-transform 4s ease-in-out', '-webkit-transform':'scale(2)'});
			//$('#orb_green').animate({'visibility': 'visible', '-webkit-transition':'-webkit-transform 4s ease-in-out', '-webkit-transform':'scale(2)'}, [,4][,easing][,complete]);
	         if (audio_inhale) 
	            {
	                audio_inhale.play();
	            }
			break;
		case 4:
			$(instruction).text("Hold");
			// hide green orb and scale back to 1.
			$('#orb_green').css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(1)'});
			// show yellow orb at scale 2.
			$("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(2)'});
			if (audio_hold) 
			{
				audio_hold.play();
			}
			break;
		case 8:
			$(instruction).text("Exhale");
			// show red orb and shrink
			$("#orb_red").css({'visibility': 'visible', 'webkitTransition':'-webkit-transform 4s ease-in-out', 'webkitTransform':'scale(1)'});
			
			// hide yellow orb
			$("#orb_yellow_full").css('visibility', 'hidden');
		    if (audio_exhale) 
		    {
		    	audio_exhale.play();
		    }    			    
			break;
		case 12:
			$(instruction).text("Hold");
			// hide red orb and scale back to 2.
			$("#orb_red").css({'visibility': 'hidden', 'webkitTransition':'', 'webkitTransform': 'scale(2)'});
			// show yellow orb at scale 1.
			$("#orb_yellow_full").css({'visibility': 'visible', 'webkitTransform': 'scale(1)'});
			if (audio_hold)
			{
				audio_hold.play();
			}
			break;
		case 15:
		    //reset to beginning.
		    counter = -1;
		    break;
		}
		counter++;
	});
};