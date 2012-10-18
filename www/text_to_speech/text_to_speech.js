/**
 * 
 * 
 * All actions here get sent to TextToSpeechPlugin.execute and pass the action name.
 * 
 * @return Instance of TextToSpeechPlugin
 */
var TextToSpeechPlugin = function()
{
};

/**
 * @param directory        The directory for which we want the listing
 * @param successCallback  The callback which will be called on successful completion
 * @param failureCallback  The callback which will be called on error
 */
TextToSpeechPlugin.prototype.speakEventStartFlush = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStartFlush', [event] ); 
};

TextToSpeechPlugin.prototype.speakEventStartAdd = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStartAdd', [event] ); 
};

TextToSpeechPlugin.prototype.speakEventStop = function(event, successCallback, failureCallback)
{
	return PhoneGap.exec(successCallback, failureCallback, 'TextToSpeechPlugin', 'speakEventStop', [event] ); 
};
/**
 * <ul>
 * <li>Register the TextToSpeech Plugin</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function()
{
	// Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('text_to_speech', new TextToSpeechPlugin());
});

text_to_speech = function (stuff, choice)
{
	var text;
	if (stuff instanceof HTMLElement){
		text = $(stuff).text();
	} 
	else {
		text = stuff;
	}
		
	// only run if we're on a device.
	if (device != null) {
		
		// next bit makes the logs prettier and easier to understand.
		var logLineLimit = 200;
		var text_bit = text.substring(0,logLineLimit*2).replace(/[\r\n\t]/gm,' ').replace(/( )+/gm, ' ').substring(0,logLineLimit);
		if (text_bit.length >= logLineLimit) {text_bit = text_bit + '...';}
		
		if (text === "stop") {
			try {
				window.plugins.text_to_speech.speakEventStop(
					text, 
					function () { console.debug('TTS: Stop'); }, 
					function () { console.warn('TTS: Stop FAILURE'); }
				);
			}
			catch (stop_err) {
				console.error('TTS: Stop ERROR', stop_err);
			}
		}
		else if (choice === "add") {
			try {
				window.plugins.text_to_speech.speakEventStartAdd(
					text, 
					function () { console.debug('TTS: Add', text_bit); }, 
					function () { console.warn('TTS: Add FAILURE', text_bit); }
				);
			}
			catch (add_err) {
				console.error('TTS: Add ERROR', text_bit, add_err);
			}
		}
		else {
			try {
				window.plugins.text_to_speech.speakEventStartFlush(
					text, 
					null, 
					function () { console.debug('TTS: Flush', text_bit); }, 
					function () { console.warn('TTS: Flush FAILURE', text_bit); }
				);
			}
			catch (flush_err) {
				console.error('TTS: Flush ERROR', text_bit, flush_err);
			}
		}
	}
};