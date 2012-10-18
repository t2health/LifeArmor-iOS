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

console.log('Device: ' + devicePlatform);
console.log('videos.js called');
function displayPlaylist(playlistId) {
	var networkState = null;
	try {
		networkState = navigator.network.connection.type;
	}
	catch (err) {
		networkState = Connection.UNKNOWN;
	}
	if (networkState == null || networkState === Connection.NONE) {
		var html = '<div class="error">Viewing videos requires a network connection.</div>';
		$('#video-list').html(html);
	}
	else {
		try {
			var html = '<div class="message">Loading...</div>';
			$('#video-list').html(html);
			
			BCMAPI.token = "aEKaJd8fSOxJHDP_akYJVkjXLywOcC8jSESi13ZrmdY0VVI6r7FDEQ.."; //ad.org
			BCMAPI.callback = "parsePlaylist";
			BCMAPI.find("find_playlist_by_id", {
				"playlist_id": playlistId,
				"playlist_fields":"name,videos",
				"video_fields":"FLVURL,name,shortDescription,thumbnailURL,videoFullLength",
				"media_delivery":"http"				
			} );
		}
		catch (err) {
			console.log("ERROR", err);
		}
	}
}

function parsePlaylist (playlist) {
	//console.log("PARSING", playlist);
	var list = $('#video-list');
	if (playlist != null && playlist.error === undefined && playlist.videos != null && playlist.videos.length > 0) {
		var html = "";
        var setVideoSrc = "";
        var vidURL = "";
        var setOnClick = "";
        var vidName= "";
        var setVideoName ="";
		//console.log("Parsing video list");
		//console.log(playlist);
        
		$.each(playlist.videos, function(key, val) {
			if (val.videoFullLength.videoContainer == "MP4") {
				//console.log("Adding video to list.", key, val);
			    vidURL = "'" + val.FLVURL + "'";
	            videoName = "'" + val.name + "'";
	            setVideoSrc = "(videoSrc=" + vidURL + "); ";
	            setVideoSrcAndroid = "window.plugins.videoPlayer.play(" + vidURL + "); ";
	            setVideoName = "(videoName=" + videoName + "); ";
	            setOnClick = 'onclick="' + setVideoSrc + setVideoName + 'return true;"';
	            setOnClickAndroid = 'onclick="' + setVideoSrcAndroid + '"';
	               
               if (devicePlatform == "Android"){
				//html += '<li><a href="' + val.FLVURL + '"><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
				html += '<li><a href="#" ' + setOnClickAndroid + '><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
                   
                   //html += '<li><a href="#" onclick="'window.plugins.videoPlayer.play("http://brightcove.vo.llnwd.net/pd16/media/1041122098001/1041122098001_1125427800001_Depression---03-Guilt-compilation.mp4?pubId=1041122098001&videoId=1125397186001"); return true;'"><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
                   } else {
               
               html += '<li><a href="../player.html"' + setOnClick + '><img src="' + val.thumbnailURL + '" class="ui-li-thumb video-thumb"/><div><h3 class="ui-li-heading">' + val.name + '</h3><p>' + val.shortDescription + '</p></div></a></li>';
                   }
               }
			else {
				console.log("Skipping non-MP4 video.", key, val);
			}
		});
		//What if playlist isn't empty, but has no mp4 vids?  (e.g. all flv)
		$(list).empty().append(html).listview('refresh');
	}
	else {
		console.log("Empty Playlist.");
		var html = '<div class="error">Videos for this topic could not be retrieved.</div>';
		$(list).empty().append(html);
	}
}