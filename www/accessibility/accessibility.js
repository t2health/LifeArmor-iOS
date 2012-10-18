/**
 * LifeArmor Accessibility Module
 * @Author: Chris Allen, Darren Basler
 * 
 * If you read the comments at the top of lifearmor.js, you'll find several 'standards' that need to be 
 * maintained to allow boilerplate code to run for given types of pages.  Accessibility adds more
 * standards, defined here.  Mostly, abiding by these just allows pages to be automatically read.
 * 	* All learn pages should have id='learn'.
 * 	* All assessment pages should have id='assessment'.
 * 	* All tool pages should have class='tool'.
 */

/*
 * We can set device="FAKE" (currently can be set in start-fake.html to FAKE that we're on a device.  
 * This will turn on accessibility, even in a browser. Obviously, it will only read text to the console, 
 * but it's very useful for getting things together quickly. 
 */


/*
 * Global variable to tell us whether accessibility is on or not.
 */
var accessibility_on = false;

/**
 * All actions here get sent to AccessibilityPlugin.execute and pass the action name.
 * @return Instance of AccessibilityPlugin
 */
var AccessibilityPlugin = function() {};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
AccessibilityPlugin.prototype.checkAccessibility = function(successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'AccessibilityPlugin', 'checkAccessibility', [] ); 
};

/**
 * <ul>
 * <li>Register the Accessibility Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('accessibility', new AccessibilityPlugin());
});


/******************************************************/


function updateAccessibilitySetting ()
{
	console.debug("Updating Accessibility flag");
	// only run if we're on a device.
	if (device != null) {
		try
		{
			window.plugins.accessibility.checkAccessibility(
				function (bool) {
					console.info("Accessibility: Device set to: " + bool);
					accessibility_on = bool;
				}, 
				function () {
					console.warn("Accessibility: Device setting could not be determined.  Set to false.");
					accessibility_on = false;
				}
			);
		}
		catch (accessibility_err) {
			console.error("Error calling accessibility:" + accessibility_err);
			accessibility_on = false;
		}
	}
};

function initAccessibility () {
	setupAccessibility();
}

/**
 * These elements will have click events registered that will allow them to be spoken when clicked.
 */
var ACCESSIBLE_ELEMENTS = 'a, #favorite, .respeakable, h1, label, button, div.ui-controlgroup-label';

/*
 * Important note: I tried (hard) to inject our code into the jqm click handlers so that we could emulate
 * iOS and do single-click speaks and double-click activates.  It turns out that it is very complicated, with
 * handling being done in jqm's virtual-click layer, jquery's event scheme, and also (!) jqm's events registered
 * directly with the document (outside of jQuery!).  To make matters worse, Android's webkit grabs all double-
 * click events and tries to do a browser zoom (which is disabled by PhoneGap).  I even implemented a mousedown
 * double-click emulator with some success, but it was occassionally problematic and refused to behave.
 *  After chasing the rabbit down the hole for a long time and essentially getting stuck, I decided to "DRINK ME" 
 *  so I could get through the little door into the Queen's garden.  It's nicer here, but the grounds-keepers are a 
 *  bit strange. Anyway, we've decided to implement Android style accessibility, where you click on something 
 *  and it just tells you what you're doing while it does it.  Much easier,  but also fraught with some strangeness. -ca  
 */

//$(document).ready(function () {
function setupAccessibility () {
	console.debug('Accessibility initializing');
	/* 
	 * Accessibility code that runs on every pageshow.  Note the data-role bit.  Because of the way
	 * live events are done, a 'div'.live fires before the '#id'.live events registered in lifearmor.js.  So,
	 * adding the data-role selector slows it down so that it fires after events registered on ids.  
	 */
	$('div[data-role="page"]').live('pageshow.accessibility', function (event, ui) {
		// check accessibility on every pageshow, in case the user has just turned it on.
		updateAccessibilitySetting(); //TODO: This doesn't work, as the following code usually completes before the callback fires.
		if (accessibility_on && localStorage.getItem("pref_accessibility_enabled") == true) {
			/*
			 * attach a click listener as the very first bind on any ACCESSIBLE ELEMENT.
			 * there's an important reason we have to do this as a bind on each page load
			 * instead of as a live event: it has to be first.  the anchor clicks, in particular, must
			 * be read before any following text, and  clicking on an anchor flushes any
			 * text currently being read.
			 */
			
			var accessibles = $(this).find(ACCESSIBLE_ELEMENTS);
			console.debug('Attaching events to accessible elements:', accessibles.length);
			accessibles.bindFirst('click.accessibility', function(event, ui) {
				//console.debug('click.accessibility', event);
				speakSmarter(this, event);
			});
			accessibles.bindFirst('taphold.accessibility', function(event, ui) {
				//console.debug('taphold.accessibility');
				event.preventDefault();
				speakSmarter(this, event);
			});			
		}
	});

	/*
	 * main and foursquares, we can just read aloud.
	 */
	$('#main, #foursquare').live('pageshow.accessibility',function(event, ui) {
		if (accessibility_on && localStorage.getItem("pref_accessibility_enabled") == true) {
			speakSmarter(this, event);
		}
	});

	$('#learn').live('pageshow', function(event) {
		if (accessibility_on) {
			// get rid of the pesky "click to expand contents" spans.  they don't do anything for us in this env except try to get spoken.
			$('span.ui-collapsible-heading-status').remove();
			var text = '';
			
			var h3s = $(this).find('h3 > a > span > span.ui-btn-text').clone();
			$(h3s).children().remove();
			
			text = text + $(this).find('h1').text() + '.';
			text = text + $(h3s).delimitedText('.');
			text = text + $(this).find('.navbar');
			speakSmarter(text);
		}
	});
	
	$('div[data-role="page"].assessment').live('pageshow.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter(this, event);
		}
	});
	
	/*
	 * tools pages... we need to be a bit smarter and speak elements explicitly.
	 */
	$('div[data-role="page"].tool').live('pageshow.accessibility',function(event, ui) {
		if (accessibility_on) {
			if ($(this).has('.interactive-message').length > 0) {
				speakSmarter($(this).find('h1').text() + ". " + $(this).find('.interactive-instruct').text(), event);
				// Note: the text of the interactive gets read by an 'update' event generated by rotateText
				
				// this next part is a bit of a hack.  I had trouble with the timing, and how to get the footer to
				// read AFTER the text had rotated for the first time.  So... we simply pause 1 sec to allow the 
				// text to load before we add the button and navbar to the speak queue.
				$('.interactive-message').one('update.accessibility', function(event, ui) {
					window.setTimeout( function () {
						speakSmarter($('div.tool button').text() + " button." +  $('.navbar').text(), null);
					}, 1000);
				});
			}
			else {
				speakSmarter(this, event);
			}
		}	
	});

	/*
	 * On any pagehide, stop the TTS engine, so that we don't keep a-speakin away.
	 */
	$('div').live('pagehide.accessibility', function (event, ui) {
		if (accessibility_on) {
			// allow anchors to come through, as it is probably speaking "clicked whatever",
			// otherwise, always kill tts on page change.
			if (lastSpokenNodeName !== 'A') {
				text_to_speech("stop");
			}
		}
	});
	
	$('div.ui-collapsible-contain').live('expand.accessibility',  function(event) {
		if (accessibility_on) {		
			speakSmarter("clicked " + $(this).find('span.ui-btn-text:first').text() + "." + $(this).children('.ui-collapsible-content').text(), event);
		}
	});
	
	/*
	 * When we receive word (update) that the message has changed, read it.
	 */
	$('.interactive-message').live('update.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter($('.interactive-message'), null);
		}
	});
	
	/*
	 * When a clock has changed, read it.
	 */
	$('.clock').live('update.accessibility', function(event, ui) {
		if (accessibility_on) {
			speakSmarter($(this).text(), null);
		}
	});	
	console.debug('Accessibility initialized');
}



var lastSpokenNodeName = null;
/**
 * A reusable function to help us say things smarter.
 * @param stuff  Stuff to say
 * @param event  We need the event to find out how to be smarter.
 */
function speakSmarter(stuff, event) {
	var text = '';
	if (stuff instanceof HTMLElement) {
		text = $(stuff).text();
	}
	else if (stuff instanceof jQuery){
		$(stuff).each(function(i, element) {
			if (element instanceof HTMLElement){
				text = text + $(element).text();
			} 
			else {
				text = text + stuff;
			}
		});
	}
	else {
		text = stuff;
	}
	
	//console.debug('speakSmarter', text);
	
	var nodeName = null;
	var addOption = 'add';
	
	// if we have an event, be smarter.
	if (event) {
		
		if (event.currentTarget) {
			nodeName = event.currentTarget.nodeName;
			//if a or button, add 'clicked'
			if (nodeName === 'A' || nodeName === 'BUTTON') {
				text = 'clicked ' + text;
				addOption = 'flush';
			}
			if (event.currentTarget.id === 'favorite') {
				addOption = 'flush';
			}
		}
		
		// clicky handling seems broken on devices with anchors.  so, we read the click on expand.
		console.log(event.type);
		if (event.type === 'expand') {
			addOption = 'flush';
		}
	}
	
	// if we just did an anchor, always add, don't flush.
	if (lastSpokenNodeName === 'A') {
		console.debug('speakSmarter just spoke an anchor.  ADD.');
		addOption = 'add';
	}
	lastSpokenNodeName = nodeName;
	text_to_speech(text, addOption);
}




/*
 * Since .text() runs text together, this function allows you to add a delimiter between elements.
 * NOTE: This probably doesn't work yet if there are child elements.
 */
$.fn.extend({
	delimitedText: function(delimiter) {
		var newthis = $(this).clone();
		var result =  $(newthis).text( function(i, string) {
			return string + delimiter;
		});
		return result.text();
	}
});