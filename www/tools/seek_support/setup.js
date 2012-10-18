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

$('#seek-support-setup-page').bind('pageshow', function (event, ui) {
	console.log('seek support setup pageshow');
	
	$('#seek-support-setup-contacts').empty();
	$('#seek-support-setup-contacts').append('<div class="message">Loading...</div>');	
	
	var options = new ContactFindOptions();
	options.multiple = true;
	//TODO: be aware of iOS quirks with displayName.  see phonegap docs.
	var fields = ["id", "displayName", "phoneNumbers"];
	console.log(navigator.contacts);
	if (navigator.contacts == null) {
		console.log('contacts not supported on this device');
		$('#seek-support-setup-contacts').html('<div class="error">Your device does not support contact retrieval.</div>');
		$('#seek-support-setup-submit').button('disable');  //TODO: would actually like to hide, but can't find jqm method to do so easily.  more investigation.
	}
	else {
		console.log ('retrieving contacts');
		navigator.contacts.find(fields, onSeekSupportSetupContactsFindSuccess, onSeekSupportSetupContactsFindError, options);
	}
});

function onSeekSupportSetupContactsFindSuccess(contacts) {
	console.log('Contracts retrieved: ' + contacts.length);
	if (contacts.length == 0) {
		alert('You do not have any contacts in your phone book, or your device does not support contact retrieval.');
	}
	else {
		var selectedContactsJson = localStorage.getItem("seekSupportNetwork");
		
		var selectedContacts = null;
		if (selectedContactsJson != null) {
			selectedContacts = JSON.parse(selectedContactsJson);
		}
		else {
			selectedContacts = new Array();
		}
		console.log(selectedContacts.length + ' contacts parsed from localstorage: ' + selectedContactsJson);
		$('#seek-support-setup-contacts').empty();

		$.each(contacts, function(index, contact) {
			console.log('contact.id: ' + contact.id + ", name: " + contact.displayName);
			if (contact.displayName != null && contact.phoneNumbers != null)	{
				var contactIdNum = parseInt(contact.id);
				var checkIt;
				if (jQuery.inArray(contactIdNum, selectedContacts) >= 0) {
					checkIt = "checked";
					console.log ("Contact with phone, previously selected.");
				}
				else {
					checkIt = "";
					console.log ("Contact with phone.");
				}
				var nodeBase = 'seek-support-setup-contacts-';  // if you change this, change the substring line, far below
				var nodeName = nodeBase + contactIdNum;
				var nodeHtml = '<input type="checkbox" name="' + nodeName + '" id="' + nodeName + '" ' + checkIt + ' />' +
									'<label for="' + nodeName + '" id=' + nodeName + '-lbl">' + contact.displayName + '</label>';
				$('#seek-support-setup-contacts').append(nodeHtml);
				//( $.inArray(contactIdNum, selectedContacts) > 0 ? "selected" : "" )
			}
		});
		$('#seek-support-setup-contacts').trigger('create');
	}
}

function onSeekSupportSetupContactsFindError(err) {
	//TODO: probably don't need to give technical error back to user without addl niceness
	alert('Error: ' + err);
}


$('#seek-support-setup-submit').bind('tap', function (event) {
	var checked = new Array();
	$('input[type="checkbox"]').each(function () {
		if ( $(this).prop('checked') ) {
			var contactId = $(this).prop('name').substring(28); //length of nodeBase, above.
			console.log(contactId + "   checked");
			checked.push(parseInt(contactId));
		}
	});
	var checkedJson =  JSON.stringify(checked);
	console.log(checkedJson);
	localStorage.setItem("seekSupportNetwork", checkedJson);
	// href will take the user back a page.
});






