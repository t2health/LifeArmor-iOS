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

$('#iso-plan-page').bind('pageshow', function (event, ui) {
	console.log('iso plan pageshow');
	
	
	$('#contacts ul').empty();
	$('#contacts').append('<div class="message">Loading...</div>');	
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		//contacts are not available, which means we're on the web or on a non-phone (e.g. tablet) device.
		console.log('contacts not supported on this device');
		//$('#contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
		
		//this is to help test on the web... makes a fake entry.
		if (device.indexOf("FAKE") >= 0) {
			$('#contacts .message').remove();
			var c = new Contact();
			c.displayName = "Test Contact";
			var phoneNumbers = [3];
			phoneNumbers[0] = new ContactField('work', '212-555-1234', false);
			phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
			phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
			c.phoneNumbers = phoneNumbers;
		}
		$('#contacts ul').append('<li><a href="activity.html?' +  encodeURIComponent(JSON.stringify(c)) + '"  id="iso-plan-contact-32">Test Contact</a></li>').listview('refresh');
		$('#contacts ul').bind('tap', function(event) {
		});		
		//$('#contacts').button('disable');  //TODO: would actually like to hide, but can't find jqm method to do so easily.  more investigation.
	}
	else {
		console.log ('retrieving contacts');
		navigator.contacts.find(fields, onIsoPlanContactsFindSuccess, onIsoPlanContactsFindError, options);
	}
});

function onIsoPlanContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	if (contacts.length == 0) {
		alert('You do not have any contacts in your phone book, or your device does not support contact retrieval.');
	}
	else {
		//$('#contacts').empty().append('<ul data-role="listview" data-theme="z" data-filter="true" data-filter-theme="z">');
		$('#contacts .message').remove();
		
		$.each(contacts, function(index, contact) {
			console.log('contact.id: ' + contact.id + ", name: " + contact.displayName);
			//TODO: right now, it pulls all contacts.  Only with phone or email?
			if (contact.displayName != null)	{
				console.log('x= ' + JSON.stringify(contact));
				var contactIdNum = parseInt(contact.id);
				var nodeBase = 'iso-plan-contact-';  // if you change this, change the substring line, far below
				var nodeName = nodeBase + contactIdNum;
				var nodeHtml = '<li><a id="' + nodeName + '">' + contact.displayName + '</a></li>';
				$('#contacts ul').append(nodeHtml);
				//( $.inArray(contactIdNum, selectedContacts) > 0 ? "selected" : "" )
			}
		});
		console.log($('#contacts').html() );
		//$('#contacts').trigger('create');
		$('#contacts ul').listview('refresh');
		$('#contacts ul').bind('tap', function(event) {
			
			console.log('event.target= ' + event.target);
		});
	}
}

function onIsoPlanContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}
