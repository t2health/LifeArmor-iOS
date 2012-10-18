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

$('#seek-support-page').bind('pageshow', function (event, ui) {
	console.log('seek support pageshow');
	
	$('#seek-support-contacts').empty();
	$('#seek-support-contacts').append('<div class="message">Loading...</div>');
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName", "phoneNumbers"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		console.log('contacts not supported on this device');
		$("#setup_button").hide();
		$('#seek-support-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
	}
	else {
		console.log ('retrieving contacts');
		if ($("#setup_button:hidden")) {
			$("#setup_button").show();
		}
		navigator.contacts.find(fields, onSeekSupportContactsFindSuccess, onSeekSupportContactsFindError, options);
	}
});

function onSeekSupportContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
	
	var selectedContacts = null;
	if (selectedContactsJson != null) {
		selectedContacts = JSON.parse(selectedContactsJson);
	}
	else {
		selectedContacts = new Array();
	}
	console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
	$('#seek-support-contacts').empty();
	
	$('<div class="ui-grid-a"/>').appendTo('#seek-support-contacts');
	$.each(contacts, function(index, contact) {
		var html = '';
		//console.log('(' + index + ') contact.id: ' + contact.id + ", name: " + contact.displayName);
		var contactIdNum = parseInt(contact.id);
		// if (in support list && has name && has phone)
		if (jQuery.inArray(contactIdNum, selectedContacts) >= 0 && contact.displayName != null && contact.phoneNumbers != null)	{
			
			//if (contact.phoneNumbers.length > 1)	{
				html = html + '<div class="ui-block-a">' + contact.displayName + '</div>';
				html = html + '<div class="ui-block-b">';
				//$('<div data-role="controlgroup" >').appendTo('#seek-support-contacts');
				$.each(contact.phoneNumbers, function (i2, phoneNumber) {
					html = html + '<a href="tel: ' + phoneNumber.value + '" data-role="button">' + phoneNumber.type + '</a>';
				});
				html = html + '<br/></div>';
			//} 
			//else {
				//nodeHtml = '<a href="tel: ' + contact.phoneNumbers[0].value + '" data-role="button">Call: ' + contact.displayName + '</a>';
			//}
			//console.log(nodeHtml);
			$(html).appendTo('#seek-support-contacts div.ui-grid-a');
		}
	});

	console.log($('#seek-support-contacts').html() );
	$('#seek-support-contacts').trigger('create');  // add jqm styling to all created elements
}

function onSeekSupportContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}

