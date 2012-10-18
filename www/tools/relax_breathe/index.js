console.log('loaded');

var audio_intro = null;
var audio_inhale = null;
var audio_hold = null;
var audio_exhale = null;
var audio_tutorial = null;

var pausedByLifecycleChange = false;

var StateEnum = {"NONE": 0, "INTRO": 1, "TUTORIAL": 2, "BREATHE": 3};
var state = StateEnum.NONE;

var voice = "Alford";
var muted;
var vibrate;
var flurry;

var change_voice;
var change_muted;
var change_vibrate;
var change_flurry;


document.addEventListener("pause", onApplicationPause, false);

$("#speaker_unmuted").hide();
$("#speaker_muted").hide();

// Read the radio button change
//$("input[name=voice]").change(changeVoice);

//$("input[name=audio]").change(toggleAudio);

//$("input[name=vibrate]").change(toggleVibration);

//$("input[name=flurry]").change(toggleFlurry);
// register event listeners (touchstart is faster to respond than click)
//TODO: should detect environment and use click when not on device.

$("#breatheButton").bind('tap', function() {
	console.log ('tap!');
	buttonPress(StateEnum.BREATHE);
});


//$("#breatheButton").bind('touchstart', runBreathe);

//$("#speaker_muted").bind("tap", buttonPressUnmute);

//$("#speaker_unmuted").bind("tap", buttonPressMute);
// Set the voice and muted to local storage
voice = localStorage.voice;
muted = localStorage.muted;
vibrate = localStorage.vibrate;
flurry = localStorage.flurry;

//updateMedia();

// transform the settings radiobuttons to jqueryui buttonsets.
/*$("#radio_voice").buttonset();
$("#radio_audio").buttonset();
$("#radio_vibration").buttonset();
$("#radio_flurry").buttonset();*/

// eliminate click delays. 
/*var x;
x = new NoClickDelay(document.getElementById('radio_voice'));	
x = new NoClickDelay(document.getElementById('radio_audio'));
x = new NoClickDelay(document.getElementById('radio_vibration'));
x = new NoClickDelay(document.getElementById('radio_flurry'));*/
//TODO: eliminate click delay on OK and cancel buttons.

function changeVoice ()
{
	// change_voice is a temporary variable that sets voice to it if Ok is pressed in the Settings dialog box.
	// Otherwise voice is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=voice]:checked").val() === 'female')
	{
		change_voice = 'Alford'; //saves to the database, “key”, “value”
	}
	else if ($("input[name=voice]:checked").val() === 'male')
	{
		change_voice = 'Adam'; //saves to the database, “key”, “value”
	}
};

function toggleAudio ()
{
	// change_muted is a temporary variable that sets muted to it if Ok is pressed in the Settings dialog box.
	// Otherwise muted is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=audio]:checked").val() === 'no')
	{
		change_muted = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=audio]:checked").val() === 'yes')
	{
		change_muted = "on"; //saves to the database, “key”, “value”
	}
}; 
	
function toggleVibration ()
{
	// change_vibrate is a temporary variable that sets vibrate to it if Ok is pressed in the Settings dialog box.
	// Otherwise vibrate is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=vibrate]:checked").val() === 'noVibration')
	{
		change_vibrate = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=vibrate]:checked").val() === 'yesVibration')
	{
		change_vibrate = "on"; //saves to the database, “key”, “value”
	}
};

function toggleFlurry () 
{
	// change_flurry is a temporary variable that sets flurry to it if Ok is pressed in the Settings dialog box.
	// Otherwise flurry is still the old value.  This is so you can cancel out of Settings and it won't save 
	// your changes.
	if ($("input[name=flurry]:checked").val() === 'noFlurry')
	{
		change_flurry = "off"; //saves to the database, “key”, “value”
	}
	
	else if ($("input[name=flurry]:checked").val() === 'yesFlurry')
	{
		change_flurry = "on"; //saves to the database, “key”, “value”
	}
};

/*
 * Temporary until I can get passing parameters from delegate or live functions.
 */
function buttonPressIntro ()
{
	buttonPress(StateEnum.INTRO);
};
function buttonPressTutorial ()
{
	buttonPress(StateEnum.TUTORIAL);
};

function buttonPressMute ()
{
	$("#speaker_unmuted").hide();
	$("#speaker_muted").show();
	muted = "on";
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
};

function buttonPressUnmute ()
{
	$("#speaker_unmuted").show();
	$("#speaker_muted").hide();
	muted = "off";
};

function buttonPress (targetState)
{
	console.log("Button press: " + targetState);
	// if we press the button for the state we're in, we really want to stop.
	if (targetState == state)
	{
		targetState = StateEnum.NONE;
	}
	changeState(targetState);
};

function changeState (newState)
{
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
		$("#breatheButton .ui-btn-text").text("Start");
	    $("#instruction").text("");
	    $("#counter").text("");
	    //$("#orb_green").hide();
	    $("#orb_yellow_full").hide();
	    $("#orb_red").hide();
	    $("#orb_yellow_empty").hide();
	    $("#speaker_unmuted").hide();
		$("#speaker_muted").hide();
		break;
	}
	
	switch (state)
	{
	case StateEnum.NONE:
		break;
	case StateEnum.BREATHE:
		$("#breatheButton .ui-btn-text").text("Stop");
		runBreathe();
		break;	
	}

};


function runIntro ()
{
	console.log("Intro button pressed.");
	logAnalytics("intro");
	
	// load media if not already loaded.
	if (audio_intro == null) 
	{
		audio_intro = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/intro1.mp3");
	}

	audio_intro.play();
	
	// set a timer to reset our state and button when audio is completed.
	var duration;
	if (voice === "Alford")
	{
		duration = "57s";
	} else {
		duration = "68s";
	}
	$(this).oneTime(duration, "intro", function () 
    {
		changeState(StateEnum.NONE);
    });
		
};
	
/*function runTutorial ()
{
	console.log("Tutorial button pressed.");
	logAnalytics("tutorial");
	
	// load media if not already loaded.
	if (audio_tutorial == null) 
	{
		audio_tutorial = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/intro2.mp3");
	}
	
	//TODO: worried about this variable getting out of sync with buttons... need to think about it.
	var counter = 0;
	$(this).everyTime(1000, "tutorial", function () 
	{
		// Play audio and show the green circle at the appropriate time
		switch (counter)
		{
		case 0:
			if (audio_tutorial) {
				audio_tutorial.play();
			}
			console.log("Playing new audio:" + audio_tutorial.source);
			break;
		case 10:
			break;
		case 12:
			$("#orb_green").replaceWith($("#orb_green").clone(true));  //resets animation
			$("#orb_green").show();
			$("#orb_green").css("webkitAnimationPlayState", "running");
			break;
		case 13:
			$("#counter").text(1);
			break;
		case 14:
			$("#counter").text(2);
			break;
		case 15:
			$("#counter").text(3);
			break;
		case 16:
			$("#counter").text(4);
			break;
		case 17:
			$("#orb_yellow_full").replaceWith($("#orb_yellow_full").clone(true)); //resets animation
			$("#orb_yellow_full").show();
			$("#orb_yellow_full").css("webkitAnimationPlayState", "running");
			$("#counter").text(1);
			break;
		case 18:
			$("#counter").text(2);
			break;
		case 19:
			$("#counter").text(3);
			break;
		case 20:
			$("#counter").text(4);
			break;
		case 21:
			$("#orb_red").replaceWith($("#orb_red").clone(true)); //resets animation
			$("#orb_red").show();
			$("#orb_red").css("webkitAnimationPlayState", "running");
			break;
		case 22:
			$("#counter").text(1);
			break;
		case 23:
			$("#counter").text(2);
			break;
		case 24:
			$("#orb_yellow_empty").replaceWith($("#orb_yellow_empty").clone(true)); //resets animation
			$("#orb_yellow_empty").show();
			$("#orb_yellow_empty").css("webkitAnimationPlayState", "running");
			$("#counter").text(3);
			break;
		case 25:
			$("#counter").text(4);
			break;
		case 26:
			$("#counter").text(1);
			break;
		case 27:
			$("#counter").text(2);
			break;
		case 28:
			$("#counter").text(3);
			break;
		case 29:
			$("#counter").text(4);
			break;
		case 30:
			$("#counter").text("");
			break;	
		case 31:
			// all done.
			$("#tutorialButton").stopTime("tutorial");
			changeState(StateEnum.NONE);
			return;
		}
		counter++;
	});
};*/

function runBreathe ()
{
	//logAnalytics("breathe");
		
	if (muted === "off") // Show the speaker
	{
		$("#speaker_unmuted").show();
		$("#speaker_muted").hide();
	}
	else if (muted === "on") // Hide the speaker
	{
		$("#speaker_unmuted").hide();
		$("#speaker_muted").show();
	}

	// load media if not already loaded.
	if (audio_inhale == null) 
	{    	
		audio_inhale = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/inhale.mp3");
	}
	if (audio_hold   == null) 
	{		
		audio_hold   = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/hold.mp3");
	}
    if (audio_exhale == null) 
	{
    	audio_exhale = new MediaWrapper("/android_asset/www/tools/breathing/audio/" + voice + "/exhale.mp3");
	}    	    		
	
	var counter = -4;

	$(this).everyTime(1200, "breathe", function () 
	{
		if (muted === "off") // Show the speaker
		{
	    	audio_inhale.setMuted(false);
	    	audio_hold.setMuted(false);
	    	audio_exhale.setMuted(false);
		}
		else if (muted === "on") // Hide the speaker
		{
			audio_inhale.setMuted(true);
			audio_hold.setMuted(true);
	    	audio_exhale.setMuted(true);
		}
		
		// do the counting automatically
	    if (counter < 0) {
	        $("#counter").text(Math.abs(counter));
	    } else {
	    	var fourcount = counter % 4 + 1;
	        $("#counter").text(fourcount);
	        
	        // TODO: need to have this off by default and provide a way to turn it on in the settings.
	        // heartbeat vibrations
	        if (vibrate === "on")
	        {
		        if (fourcount === 1)
	        	{
	        		navigator.notification.vibrate(70);
	        	} else {
	        		navigator.notification.vibrate(30);
	        	}
	        }
	    }
	    
	    // Show the text and then display the circles.
		switch (counter)
		{
		case -4:
			$("#instruction").text("Ready");
			break;
		case -3:
			$("#instruction").text("Relax");
			break;
		case -2:
			$("#instruction").text("Exhale");
			break;
		case -1:
		    $("#instruction").text("Begin");
			break;
		case 0:
			$("#instruction").text("Inhale");
			
			$("#orb_green").replaceWith($("#orb_green").clone(true));  //resets animation
			$("#orb_green").show();
			$("#orb_green").css("webkitAnimationPlayState", "running");
			if (audio_inhale) 
			{
				audio_inhale.play();
			}
			break;
		case 4:
			$("#instruction").text("Hold");
			$("#orb_yellow_full").replaceWith($("#orb_yellow_full").clone(true)); //resets animation
            $("#orb_yellow_full").show();
			$("#orb_yellow_full").css("webkitAnimationPlayState", "running"); 
			if (audio_hold) 
			{
				audio_hold.play();
			}
			break;
		case 8:
		    $("#instruction").text("Exhale");
		    $("#orb_red").replaceWith($("#orb_red").clone(true)); //resets animation
            $("#orb_red").show();
		    $("#orb_red").css("webkitAnimationPlayState", "running");
		    if (audio_exhale) 
		    {
		    	audio_exhale.play();
		    }    			    
			break;
		case 12:
			$("#instruction").text("Hold");
			$("#orb_yellow_empty").replaceWith($("#orb_yellow_empty").clone(true)); //resets animation
            $("#orb_yellow_empty").show();
			$("#orb_yellow_empty").css("webkitAnimationPlayState", "running");
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


function updateMedia ()
{
	console.log("updateMedia");
	
    if (voice == null)
	{
    	// Alford will be the default if nothing is in the localStorage
		voice = "Alford";
	}
    
    if (muted == null)
	{
    	// Off will be the default if nothing is in the localStorage
    	muted = "off";
	}
    
    if (vibrate == null)
	{
    	// Off will be the default if nothing is in the localStorage
    	vibrate = "off";
	}
    
    if (flurry == null)
	{
    	// On will be the default if nothing is in the localStorage
    	flurry = "on";
	}
    
    destroyAllMedia();
};

/**
 * Releases all acquired media handles.
 */
function releaseAllMedia ()
{
    if (audio_intro != null)
	{
    	audio_intro.release();
	}
    if (audio_tutorial != null)
	{
    	audio_tutorial.release();
	}
    if (audio_inhale != null)
	{
    	audio_inhale.release();
	}
    if (audio_hold != null)
	{
    	audio_hold.release();
	}
    if (audio_exhale != null)
	{
    	audio_exhale.release();
	}    
};

/**
 * Releases all acquired media handles and then nulls all media variables.
 */
function destroyAllMedia ()
{
	releaseAllMedia();
	audio_intro = null;
	audio_tutorial = null;
	audio_inhale = null;
	audio_hold = null;
	audio_exhale = null;
};

/**
 * Runs on PhoneGap initialization (does not run for browser)
 */
function onDeviceReady () {
    console.log("Device Ready");
    
    
    /*voice = preferences("voice");
	muted = preferences("muted");
	vibrate = preferences("vibrate");
	flurry = preferences("flurry");
	// Used here for the preferences menu
	*/
    //document.addEventListener("resume", onApplicationResume, false);
    //document.addEventListener("backbutton", onBackButton, false);
};

function onApplicationPause () {
    console.log("applicationPause");
    destroyAllMedia();
};

function showSettings ()
{
	//NOTE: if we rewrite this in native code, we still need to sendJavascript the changeState.
	changeState(StateEnum.NONE);
    
    $("#dialog-message-settings").css("display:inline");
	$("#dialog-message-settings").dialog({
		modal: true,
		open: function (event, ui) {
			// Hide the little "X" in the upper right corner as we have a Cancel button already
			$(".ui-dialog-titlebar-close").hide();
			
			// Set the voice to Adam otherwise default to Alford
			var index = voice === 'Adam' ? 1 : 0;
			$("#radio_voice input:radio").eq(index).attr('checked', true);

			// Check to see if it's muted otherwise default to unmuted
			index = muted === 'on' ? 1 : 0;
			$("#radio_audio input:radio").eq(index).attr('checked', true);
			
			// Set vibration on otherwise default to off
			index = vibrate === 'on' ? 1 : 0;
			$("#radio_vibration input:radio").eq(index).attr('checked', true);
			
			// Set flurry off otherwise default to on 
			index = flurry === 'on' ? 1 : 0;
			$("#radio_flurry input:radio").eq(index).attr('checked', true);
			
			// JQuery UI doesn't automatically refresh the radio buttons so we have to do it.
			// This migth be fixed in a later release 
			$('#radio_voice').buttonset("refresh");
			$('#radio_audio').buttonset("refresh");
			$('#radio_vibration').buttonset("refresh");
			$('#radio_flurry').buttonset("refresh");
			
		},
		buttons: {
			Ok: function () {
				$("#dialog-message-settings").css("display:none");
				$(this).dialog("close");
				
				
				//TODO: it probably makes sense to include all these in one try.
				try 
				{
					// Set the voice and localStorage to change_voice.  We are setting voice and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					voice = change_voice;
					localStorage.voice = change_voice;
				} 
				catch (e1) 
				{
					if (e1 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - voice!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try 
				{
					// Set the muted and localStorage to change_muted.  We are setting muted and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					muted = change_muted;
					localStorage.muted = change_muted;
				} 
				catch (e2) 
				{
					if (e2 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - muted!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try 
				{
					// Set the vibrate and localStorage to change_vibrate.  We are setting vibrate and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					vibrate = change_vibrate;
					localStorage.vibrate = change_vibrate;
				} 
				catch (e3) 
				{
					if (e3 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - vibrate!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				try
				{
					// Set the flurry and localStorage to change_flurry.  We are setting flurry and 
					// localStorage separately so if localStorage fails, the user can still use the 
					// app for that session.
					flurry = change_flurry;
					localStorage.flurry = change_flurry;
				}
				catch (e4)
				{
					if (e4 == QUOTA_EXCEEDED_ERR) 
					{
						//TODO: probably don't need to give technical error back to user without addl niceness
						alert('Quota exceeded - flurry!'); //data wasn't successfully saved due to quota exceed so throw an error
					}
				}
				
				updateMedia();
			}, 
			Cancel: function () {
				$("#dialog-message-settings").css("display:none");
				$(this).dialog("close");
			}
		}
	});
};


