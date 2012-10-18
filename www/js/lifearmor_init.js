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

var devicePlatform = '';
$(document).bind("mobileinit", function() {

     (function( $, undefined ) {
          $.mobile.page.prototype.options.backBtnText  = "Back";
          $.mobile.page.prototype.options.addBackBtnFooter   = true;
          $.mobile.page.prototype.options.backBtnTheme = null;
          $.mobile.page.prototype.options.headerTheme  = "a";
          $.mobile.page.prototype.options.footerTheme  = "a";
          $.mobile.page.prototype.options.contentTheme = null;
          $( ":jqmData(role='page'), :jqmData(role='dialog')" ).live( "pagecreate", function( e ) {                                                      
             var $page = $( this ),
             o = $page.data( "page" ).options,
             pageTheme = o.theme;
             $( ":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", this ).each(function() {
                  var $this = $( this ),
                  role = $this.jqmData( "role" ),
                  theme = $this.jqmData( "theme" ),
                  $headeranchors,
                  leftbtn,
                  rightbtn,
                  backBtn,
                  toolBtn,
                  newBtn;
                  
                  $this.addClass( "ui-" + role );	
                  
                  //apply theming and markup modifications to page,header,content,footer
                  if ( role === "header" || role === "footer" ) {
                  
                  var thisTheme = theme || ( role === "footer" ? o.headerTheme : o.footerTheme ) || pageTheme;
                  
                  $this
                  //add theme class
                  .addClass( "ui-bar-" + thisTheme )
                  // Add ARIA role
                  .attr( "role", role === "footer" ? "banner" : "contentinfo" );
                  
                  // Right,left buttons
                  $headeranchors	= $this.children( "a" );
                  leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
                  rightbtn = $headeranchors.hasClass( "ui-btn-right" );
                  
                  leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;
                  
                  rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
                  
                  // Auto-add back btn on pages beyond first view
                                                                                                          if ( o.addBackBtnFooter && 
                                                                                                              role === "footer" &&
                                                                                                              $( ".ui-page" ).length > 1 &&
                                                                                                              $this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash )
                                                                                                              ) {
                                                                                                          
                                                                                                          backBtn = $("<a href='' data-rel='back' data-"+ $.mobile.ns +" data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
                                                                                                          .attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
                                                                                                          .prependTo( $this ); 
                                                                                                          }

                        /* if (o.addBackBtnFooter &&
                            role === "footer" &&
                            $( ".ui-page" ).length > 1 &&
                            $this.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) ) {
                                 $toolBtn = $( '<a href="#toolListPage" data-icon="grid" data-role="button" class="ui-btn-right" style="float:right;">Tools</a>' )
                                 .attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
                                 .prependTo( $this );
                       } */
                   
                  if ( o.addBackBtnFooter && 
                          role === "footer" &&
                          $('div').hasClass('interactive-message')) {
                      $newBtn = $( '<div data-role="navbar"><ul><li><button class="interactive-rotate-button" data-icon="refresh" data-position="fixed" data-theme="a">New Suggestion</button></li></ul></div>' )
                      .attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || thisTheme )
                      .prependTo( $this );
                      } 
                  } 
                  });
             });
      })( jQuery );

	$.mobile.defaultPageTransition = 'none'; // Turn off the transitions for all page animations
	$.mobile.defaultDialogTransition  = 'none'; // Turn off the transitions for all dialog animations
	$.mobile.pushStateEnabled = false;
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
    //$.mobile.fixedToolbars.setTouchToggleEnabled(false);
    //$.mobile.fixedToolbars.show(true);
   // $.mobile.page.prototype.options.domCache = false;
});                 

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    console.log("onLoad called"); 
}

function onDeviceReady () {
    console.log("Device Ready");
    devicePlatform = device.platform;
    // initAccessibility();
	//text_to_speech("");
	window.plugins.flurry.init();
}

/**
 * Extend the Storage object to assume everything going in and out will be stored and retrieved 
 * using JSON.parse and JSON.stringify.  Works like a charm... (I hope!) -ca
 * adapted from //http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
 * @param key
 * @param value
*/

Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value){
	var json = JSON.stringify(value);
	//console.log('Storage.setItem("' +  key + '": "' + json + '")');
	this._setItem(key, json);
};

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key) {  
	try {
		var json = this._getItem(key);
		console.log('Storage.getItem("' +  key + '") = ' + json);
		return JSON.parse(json);
	}
	catch(e) {
		value = this._getItem(key);
		console.log('Storage.getItem failed to retrieve or parse JSON.  Returning: ' + value);
		return value;
	}
}; 
