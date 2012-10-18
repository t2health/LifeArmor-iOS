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

var add_favorites = new Array(), module_list;
var tool_list;
var videoSrc = '';
var videoName = '';
var enabled = true;
var historyCount = 0;
var flurrySetting;

module_list = {
            'alcohol_drugs': 'Alcohol &amp; Drugs',
            'anger': 'Anger',
            'anxiety': 'Anxiety',
            'depression': 'Depression',
            'families_friendships': 'Families &amp; Friendships',
            'families_with_kids': 'Families With Kids',
            'life_stress': 'Life Stress',
            'mild_traumatic_brain_injury': 'Mild Traumatic Brain Injury',
            'military_sexual_trauma': 'Military Sexual Trauma',
            'physical_injury': 'Physical Injury',
            'post_traumatic_stress': 'Post Traumatic Stress',
            'resilience': 'Resilience',
            'sleep': 'Sleep',
            'spirituality': 'Spirituality',
            'stigma': 'Stigma',
            'tobacco': 'Tobacco',
            'work_adjustment': 'Work Adjustment'
        };

tool_list = {
            'assertiveness':'Assertiveness',
            'distract':'Distract Yourself',
            'gratitude':'Gratitude',
            'grounding':'Grounding',
            //'health_habits':'Health Habits',
            'help_falling_asleep':'Help with Sleep',
            'inspiring_quotes':'Inspiring Quotes',
            //'iso_plan':'Build Your Social Support',
            'optimism':'Optimism',
            'perspective_change':'Perspective Change',
            'pleasant_events':'Pleasant Events',
            'relax_breathe':'Relax/Breathe',
            //'relaxation':'Relaxation',
            'rid':'R.I.D.',
            //'safety_plan':'Safety Plan',
            'seek_support':'Support Finder',
            'time_out':'Time Out'
};

//document.addEventListener("deviceready", onDeviceReady, false);
/* for diagnosing the sequince of events 
$( document ).bind("pagebeforecreate pagecreate pagebeforechange pagechange pagebeforeshow pageshow pagebeforehide pagehide", function( e ) {
    console.log( e.type + ": " + e.target.nodeName + " - " + ( e.target.id ? "#" + e.target.id : "<No ID>" ) );
});*/

$('div').live('pagecreate',function(event, ui) {
    $(this).hasClass('add-footer') && $(this).append('<div data-role="footer" data-position="fixed" class="ui-state-persist" id="footerID">');
});

$('div').live('pagehide',function(event,ui){
    onPageChange();
});

$('div').live('pageshow',function(event,ui){
    setFlurry();
    adjustHistory();
    $("#favorite").bind("click", function(event, ui) {
        var id = $(this).attr("id");
        var faves = localStorage.getItem('favorites');
        if ( !jQuery.isArray(faves)) {
            faves = [];
        }
        var module = myPath.split('/')[1];
        var pos = faves.indexOf(module);

        if ( pos  === -1 ) {
            faves.push(module);
            $(this).removeClass('unfavorite').addClass('favorite');
            console.log('a ' + id);
        } 
        else {
            faves.splice(pos, 1);
            $(this).removeClass('favorite').addClass('unfavorite');
            //$(this).children('speak').text('Add to favorites.');  // set the speech for next click.
            console.log('b');
        }
        localStorage.setItem('favorites', faves);
    }); 

    $('.interactive-rotate-button').bind('click', function () {
        rotateMessage('data.json', $(".interactive-message"));
    });
    
    $( "#flurryPluginButton" ).bind( "change", function(event, ui) {
        console.log("changed");
        //e.preventDefault();
        var flurrySetting = $( "#flurryPluginButton" ).val();
        
       /* $("input[type='radio']:checked").each(function () {
            flurrySetting = flurrySetting + Number($(this).val());
        }); */
        
        if (flurrySetting == 0){
            console.log("flurry is off");
            $("#flurryPluginButton").val('0').slider('refresh');
        } else {
            console.log("flurry is on");
            $("#flurryPluginButton").val('1').slider('refresh');
        }
        
        localStorage.setItem("flurryPluginButton", flurrySetting);
    });
    
});

$('#settings').live('pagebeforeshow', function(event, ui) {
    flurryToggle();
 
});

$('#tools').live('pagebeforeshow', function(event, ui){
    $('div[data-role="navbar"]').empty().remove();
});

$('#player').live('pageshow', function(event, ui) {
                  $('#videoSrcID').attr('src', videoSrc);
                  $('#playerHeader').text(videoName);
                  console.log('VideoSrc: ' + videoSrc);
                  console.log('VideoName: ' + videoName);
});

$('#main').live('pagebeforeshow',function(event, ui)    {
    historyCount = 0;
    createTopicList();
    mainFooter();
   
});

$('#toolListPage').live('pageshow',function(event, ui)    {
    createToolList()
});

$('#foursquare').live('pagebeforeshow',function(event, ui) {
    $('a').bind('click', function(event, ui){
        $.mobile.showPageLoadingMsg(); 
    });
    $('div[data-role="navbar"]').remove();
        myPath = getCurrentPage();
        if (myPath.search('/four.html') > -1 ) {
            localStorage.setItem('foursquare', myPath);
            var faves = localStorage.getItem('favorites');
            // if current module is in faves, show favorite star.
            if (faves != null && faves.indexOf(myPath.split('/')[1]) > -1 ) {
                console.log("Topic is a favorite.");
                $(this).children('div[data-role="header"]').append('<div id="favorite" class="favorite" speak-action="Removed from favorites"></div>');
            }
            else {
                console.log("Topic is not a favorite.");
                $(this).children('div[data-role="header"]').append('<div id="favorite" class="unfavorite"></div>');
            }
        }
        else if ( myPath === 'index.html'  || myPath === 'tools/index.html' ) {
            localStorage.removeItem("foursquare");
        }
});

$('.tool').live('pageshow', function (event, ui) {
    if ($(this).has('.interactive-message').length > 0) {
        rotateMessage('data.json', $('.interactive-message'));
    }
});

/* LEARN */
$('div[data-role="collapsible"]').live('expand', function (event, ui) {
    // when expanding a collapsible, scroll to the top of the collapsible.
    var targ = event.currentTarget;
    var offie = $(targ).offset();
    $(window).scrollTop(offie.top - 60);
});

$('div.ui-collapsible-contain').live('expand', function() {
    var lastExpanded;
    $(this).hide().trigger('updatelayout');
    var $expandable = $(this);
    // wait until the lastExpanded is collapsed
    var intervalId = setInterval(function() {
        if (lastExpanded && lastExpanded.has( ".ui-collapsible-heading-collapsed" )) {
            var expandableTop = $expandable.offset().top,
            $window = $(window),
            targetPos = expandableTop - $window.scrollTop() + $expandable.height();
            if (targetPos > $window.height() || expandableTop < $window.scrollTop()) {
                $.mobile.silentScroll(expandableTop);
            }
            clearInterval(intervalId);
            lastExpanded = $expandable;
        } else {
            lastExpanded = $expandable;
        }
    }, 200);
});

/*******************************************************************************
 ****************************** FUNCTIONS **************************************
 *******************************************************************************/

function onBackKeyDown() {
    console.log('backbutton called');
   // buttonPress(StateEnum.NONE);
    if (historyCount == 0){
        navigator.app.exitApp() 
    } else {
        window.history.back();
    }
}

function adjustHistory() {
    historyCount--;
    console.log("historyCount = " + historyCount);
}

function setFlurry() {
    if (localStorage.getItem("flurryPluginButton") == null){
            flurrySetting = 1;
    } else{
            flurrySetting = localStorage.getItem("flurryPluginButton");
    }
    //console.log(flurrySetting);
}

function onPageChange() {
    
    if (flurrySetting == null || flurrySetting == 1 ){
        logAnalytics( 'Page: ' + getCurrentPage());
    } else {
        console.log("Flurry Disabled");
    }
}

function getCurrentPage() {
   var base = 'www';//Cut off in Path,
   var result = '';
   if(location.hash) //Parse Hash
       result = location.hash.substring(1);
   else
       result = location.pathname;
   var path = jQuery.mobile.path.parseUrl(result).pathname;
   var indexPosition = path.indexOf(base);
   if(indexPosition > -1)
       path = path.substring(path.indexOf(base)+base.length+1);
   indexPosition = path.indexOf('&');
   if(indexPosition > -1) { //Parse Query String to sub Page
       var bar = jQuery('.ui-header', jQuery.mobile.activePage);
       var subPage = 'Nested-List ' + jQuery('.ui-title', bar).html();
       path = path.substring(0,indexPosition) + ' ' + subPage;
   }
   return path;
}

function clearData(){
    localStorage.clear();
}

function flurryToggle(){ 

    if (flurrySetting == 1 || flurrySetting == null){
        var flurryNo = '<option value="0" id="flurryNo">No</option>'; 
        var flurryYes = '<option value="1" id="flurryYes" selected="selected">Yes</option>';
    } else {
        var flurryNo = '<option value="0" id="flurryNo" selected="selected">No</option>'; 
        var flurryYes = '<option value="1" id="flurryYes">Yes</option>';
    } 
    
    //var flurryNo = '<option value="0" id="flurryNo" ' + selected + '>No</option>'; 
    //var flurryYes = '<option value="1" id="flurryYes" ' + selected + '>Yes</option>';
    
    $('#flurryToggle').html('<div data-role="fieldcontain">' + 
                        '<label for="flurryPluginButton">Send anonymous data</label>' +
                        '<select name="flurryPluginButton" id="flurryPluginButton" data-role="slider" data-mini="true" data-theme="z">' +
                        flurryNo + 
                        flurryYes + 
                        '</select> ' +
                        '</div> ').trigger('create');
}

function mainFooter(){
    $('#footerID').html('<div data-role="navbar" >' + 
                        '<ul>'  + 
                        '<li><a href="#toolListPage" data-theme="z" data-icon="grid">Tools</a></li>' +
                        '<li><a href="settings.html" data-theme="z" data-icon="gear">Settings</a></li>' +
                        '</ul></div>').trigger('create');
    //console.log('tool list called');
}

function createTopicList() {

    var listHtml = "";
    var selectedFavorites = localStorage.getItem('favorites');
    var path = jQuery.mobile.path.parseUrl(location.pathname).pathname;
    var dir = path.substring(path.indexOf(''), path.lastIndexOf('/'));

    if ( jQuery.isArray(selectedFavorites) ) {
        selectedFavorites = selectedFavorites.sort();
    }
    else {
        selectedFavorites = [];
    }

    if (selectedFavorites.length > 0) {
        listHtml = listHtml + "<speak>Category: </speak><li data-role='list-divider' data-theme='z'>Favorites</li><speak> contains the following links:</speak>";
    
        for (var i in selectedFavorites)
        {
            var module = selectedFavorites[i];
            var moduleDescription = module_list[module];
            
            // if we can't find moduleDescription, then we must have a bad element in faves.  get rid of it!
            if (moduleDescription == undefined) {
                selectedFavorites.splice(i, 1);
                localStorage.setItem('favorites', selectedFavorites);
                continue;
            }
            var enabled = localStorage.getItem('pref_' + module + '_enabled');
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
            if (enabled){
                listHtml = listHtml + "<li>" +
                        "<a href='modules/" + module + "/four.html'>" +
                       // "<img src='modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                        "<img src='" + dir + "/modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                        "<h3 class='ui-li-heading'>" + moduleDescription + "</h3><speak>.</speak>" +
                    "</a>" +
                        "</li>";
            } else {
                listHtml = listHtml + "<!--" + module + " hidden --->";
            }
        }

        // if we had favorites, we'll need a separate header for other topics.
        listHtml = listHtml + "<speak>Category: </speak><li data-role='list-divider' data-theme='z'>Other Topics </li><speak> contains the following links:</speak>";
    }
    
    // If the user has favorited every module then don't bother populating the unfavorited
    // modules as there aren't any.
    if (selectedFavorites.length < keys(module_list).length ) 
    {
        var sortedKeys = keys(module_list).sort();
    
        for (var i in sortedKeys)
        {
            var module = sortedKeys[i];
            var enabled = localStorage.getItem('pref_' + module + '_enabled');
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
            //console.log(module + " = " + enabled);
            if (enabled && selectedFavorites.indexOf(module) === -1) {
                var moduleDescription = module_list[module];
                listHtml = listHtml + "<li>" +
                    "<a href='modules/" + module + "/four.html'>" +
                    "<img src='" + dir + "/modules/" + module + "/module.png' class='ui-li-thumb'/>" +
                    "<h3 class='ui-li-heading'>" + moduleDescription + "</h3>" +
                    "</a>" +
                    "</li>";
            }
        }
    }
    $('.topic-list').html('<ul data-role="listview" id="subject" data-theme="z">' + listHtml + '</ul>').trigger('create');
}

function createToolList() {
    var listHtml = "";
    var sortedKeys = keys(tool_list).sort();

    for (var i in sortedKeys)
    {
        var tool = sortedKeys[i];
        
            if (enabled === false || enabled === "false" ) {
                enabled = false;
            } 
            else {
                enabled = true; // yes, undefined defaults to true.
            }
        console.log("Tool enabled?", tool, enabled);
        if (enabled) {
            var toolDescription = tool_list[tool];
            listHtml = listHtml + '<li>' +
                '<a href="tools/' + tool + '/index.html">' + 
                '<h3 class="ui-li-heading">' + toolDescription + '</h3>' +
                '</a>' +
                '</li>';
        }
    }
    console.log(listHtml);
    $('.tool-list').html('<ul data-role="listview" id="subjectTools"  style="margin-top: 0em !important; margin-bottom: 0em !important;">' + listHtml + '</ul>').trigger('create');
}

/*
 * Given a json file containing an array and a domElement, randomly choose an array element 
 * and replace the domElement's innerHtml with the results. This function also ensures the element
 * isn't the same as the one most recently chosen.
 */
function rotateMessage(jsonFile, domElement) {
    // look to see if json data is already loaded.
    var messageData = $(domElement).data('messageData');
    if (messageData == undefined) {
        $.getJSON(jsonFile, function (data) {
            console.log('Loaded ' + jsonFile);
            messageData = data;
            $(domElement).data('messageData', messageData);
            // this getJSON function seems to complete after the calling function completes.
            // so... make sure you leave this next call inside the function.
            doRotateMessage(messageData, domElement); 
        });
    } 
    else {
        doRotateMessage(messageData, domElement);
    }
}

/*
 * Given an array of messages, randomly choose an array element 
 * and replace the domElement's innerHtml with the results.
 * This function also ensures the element isn't the same as the one most recently chosen.
 * "do..." because it actually does the work of rotateMessage above. 
 */
function doRotateMessage(messageData, domElement){
    // check for a previous message, so we don't duplicate
    var lastIndx = $(domElement).data('messageIndx');
    // now get a new message
    var indx;
    do {
        indx = Math.floor(Math.random() * messageData.length);
        if (indx == lastIndx) {
            console.log("Duplicate message avoided.");
        }
    } while (indx == lastIndx);
    // and set the element
    console.log('Message index: ' + indx + ' (was ' + lastIndx + ')');
    $(domElement).html(messageData[indx]);
    $(domElement).trigger('update');
    // update the index so we don't duplicate this one next time.
    $(domElement).data('messageIndx', indx);
}

/**
 *  add seconds=xx to a domElement and have this automatically start a countdown in the element.
 * */
function startCountdown(domElement) {
    var seconds = $(domElement).data('seconds');
    if (seconds == null) {
        console.log('No seconds attribute on ' + $(domElement).prop('id'));
    }
    else {
        startCountdown(domElement, seconds);
    }
}

/** Start a countdown timer on a domElement, replacing the html with time left. */
function startCountdown(domElement, seconds) {
    $(domElement).stopTime();
    $(domElement).html(formatTime(seconds));
    $(domElement).everyTime('1s', function(t) {
        var remaining = seconds - t;
        var display = formatTime(remaining);
        $(domElement).html(display).trigger('update');
    }, seconds);
}

/** Reset a countdown timer on a domElement, replacing the html with 0:00.  */
function resetCountdown(domElement) {
    $(domElement).stopTime();
    $(domElement).html(formatTime(0));
}

/** Make a number of seconds look pretty, in the mm:ss format. */
function formatTime(seconds) {
    var minutesPart = Math.floor(seconds / 60);
    var secondsPart = seconds % 60; 
    var display = minutesPart + ':' + (secondsPart<10?'0':'') + secondsPart;    
    return display;
}

/**
 * Return the keys from an associative array.  Remember that associative arrays really hoover in javascript.  This
 * provides some relief, e.g., you can get the array's length by keys(array).length.
 * (I noticed recently that there's a .keys method that has somewhat recently been defined. We should investigate. -ca)
 * @param associativeArray
 * @returns {Array}
 */
function keys(associativeArray) {
    var keys = [];
    for (var key in associativeArray) {
        keys.push(key);
    }
    return keys;
}

/**
 * Score a form full of radio buttons by summing all the radio values.
 * It assumes that all radio's are required to be completed and that they are all wrapped in fieldsets.
 * Throws an error if any items are incomplete.
 * @param formName
 * @returns {Number}
 */
function scoreRadioForm(formName) {
    var total = 0;
    var numChecked = 0;
    $(formName + " input[type='radio']:checked").each(function (index) {
        // add up each checked radio button.
        total = total + Number($(this).val());
        numChecked = numChecked + 1;
    });
    var numItems = $(formName).find('fieldset').length;
    
    console.log('score: ' + total);
    console.log('#checked: ' + numChecked + '/' + numItems);
    
    if (numChecked < numItems ) {
        console.log('All form items are required, but not all items were completed.');
        throw 'Please make a selection on each question';
    }
    return total;
}

function alertDialog(pageText, headerText, back) {
    if (headerText == null) {
        headerText = "LifeArmor";
    }
    if(back == null || back == 0) {
        back = 1;
    }
    else {
        back = Math.abs(back);
    }
    
    $.mobile.changePage( '../../dialog.html' , { role: 'dialog'});

    $('#dialog').live('pageshow', function(event, ui){          
        $('#dialog h1').text(headerText);
        $('#dialog-text').html(pageText);
               console.log('PAGE TEXT: ' + pageText);
        $('#dialog-close').attr('href', 'javascript:history.go(-' + back + ');');
     });
}
