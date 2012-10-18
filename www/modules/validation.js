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

function checked(name,id, errorArray)
{
	var number;
	var number_as_string;
	
	// Checked
	errorArray.pop();
	// You found a checked element so it's no longer an error
	choice_selected = name;
	number_as_string = choice_selected.match(/\d+/);
	number = parseInt(number_as_string[0], 10);
	if ($("#error" + number).length > 0)
	{
		$("#error" + number).remove();
	}
	return choice_selected;
}

function unchecked(name,id, errorArray, choice_selected)
{
	var number;
	var number_as_string;
	
	if (errorArray.indexOf(id) === -1) {
		// We check every individual element to see if it's not checked.
		// If it's not, we list it as an error.
		if (choice_selected !== name)
		{
			if (errorArray.indexOf(name) === -1)
			{
				errorArray.push(name);
				number_as_string = name.match(/\d+/);
				// Don't add 'Invalid answer' twice if it's already there
				number = parseInt(number_as_string[0], 10);
				
				// Add the span saying Required question if it doesn't already exist
				// Change the label to red
				if ($("#error" + number).length <= 0)
				{
					$("#" + name + "_fieldcontain .ui-controlgroup-label")
					.after("<span id=error" + number+ " style='color:red'>Required question</span>").trigger('create');
				}
			}
		}
	}
}