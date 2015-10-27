const fs = require('fs');

/**
 * Search Songs by id.
 * @param id The song id.
 * @param jsonArr Array of JSON objects representing songs.
 * @return the JSON Song Object with the matching id.
 */
function getSongById(id, totalLength, jsonArr) {
    var song;
	if(id === undefined ){
		console.log('ERROR: undefined input -- Jie');
		return -1;
	}
	else if (id > totalLength || id < 0) {
		console.log('ERROR: id out of range -- Jie');
		return -1;
	} else {
        for (var i = 0; i < jsonArr.length; i++ ) {
            song = jsonArr[i];
            if (song.idNum == id)
                return song;
        }
        return -1;
	}
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * Song Name Search function that allows searching by song title.
 * @parameter songName Song Name entered from the front end, as a string
 * @parameter packJson The JSON of song packs as keys, with array of song objects for each key.
 * @return result as an JSON array of pack names that matched the user input for song name.
 * @return -1 input cannot be matched
 */
function songNameSearch(songFields, packJson) {

    // Separate the song name entered in the front end by whitespace
    // This will be treated like an and statement for all the non-whitespace chars
    var searchParts = songFields.toLocaleLowerCase(); // Make all lowercase for case insensitive search
    searchParts = searchParts.trim().split(/\s+/); // Separate by whitespace into an array
	const packs = packJson;
	const res = [];
    var notMatched = false;
    
    // For every key representing a song pack in the JSON, look through every chart object in
    // its array. See if the 'title' property of that song object matches the AND of all the
    // whitespace-separated song name fields passed in the form.
    for (var key in packs) {
        
        // Get the song array for the pack. Then for every song object, see if its title
        // matches the input song name specified.
        var songArr = packs[key];
        for (var songIndex = 0; songIndex < songArr.length; songIndex++) {
            notMatched = false;
            var songObject = songArr[songIndex];
            var songTitleLower = songObject.title.toLocaleLowerCase(); // Make all lowercase for case insensitive search
            var songParts = songTitleLower.trim().split(/\s+/); // Separate by whitespace into an array

            // For each song field passed, see if it's in the song name.
            for (var i = 0; i < searchParts.length; i++) {
                var searchPart = searchParts[i]; // e.g. "crossover"

                // See if the search part is part of the song name. Remember this is an AND operation so all fields must be met
                for (var j = 0; j < songParts.length; j++ ) {
                    var songPart = songParts[j];
                    if ( songPart.indexOf(searchPart) > -1 ) {
                        break;
                    } else {
                        continue;
                    }
                }

                if (j == songParts.length) {
                    notMatched = true;
                    break;
                }

            }
            
            // If the song pack didn't match the AND of all space separate fields in the pack fields, continue to the next pack name
            if (notMatched === true)
                continue
            else
                res.push(songObject); // Otherwise, the song name did match. Add the song object to the matching song title array.
        }
    }

	if (res.length === 0)
		return -1; // return -1 if no results were found, not an empty array.
	return res; // Return the array of results that match all the conditions
}

/**
 * Song Name Search function that allows searching by song title.
 * @parameter songName Song Name entered from the front end, as a string
 * @parameter packJson The JSON of song packs as keys, with array of song objects for each key.
 * @return result as an JSON array of pack names that matched the user input for song name.
 * @return -1 input cannot be matched
 */
function autocompleteSongNameSearch(songFields, packJson) {

    // Separate the song name entered in the front end by whitespace
    // This will be treated like an and statement for all the non-whitespace chars
    var searchParts = songFields.toLocaleLowerCase(); // Make all lowercase for case insensitive search
    searchParts = searchParts.trim().split(/\s+/); // Separate by whitespace into an array
	const packs = packJson;
	const res = [];
    var notMatched = false;
    
    // For every key representing a song pack in the JSON, look through every chart object in
    // its array. See if the 'title' property of that song object matches the AND of all the
    // whitespace-separated song name fields passed in the form.
    for (var key in packs) {
        
        // Get the song array for the pack. Then for every song object, see if its title
        // matches the input song name specified.
        var songArr = packs[key];
        for (var songIndex = 0; songIndex < songArr.length; songIndex++) {
            notMatched = false;
            var songObject = songArr[songIndex];
            var songTitleLower = songObject.title.toLocaleLowerCase(); // Make all lowercase for case insensitive search
            var songParts = songTitleLower.trim().split(/\s+/); // Separate by whitespace into an array

            // For each song field passed, see if it's in the song name.
            for (var i = 0; i < searchParts.length; i++) {
                var searchPart = searchParts[i]; // e.g. "crossover"

                // See if the search part is part of the song name. Remember this is an AND operation so all fields must be met
                for (var j = 0; j < songParts.length; j++ ) {
                    var songPart = songParts[j];
                    if ( songPart.indexOf(searchPart) > -1 ) {
                        break;
                    } else {
                        continue;
                    }
                }

                if (j == songParts.length) {
                    notMatched = true;
                    break;
                }

            }
            
            // If the song pack didn't match the AND of all space separate fields in the pack fields, continue to the next pack name
            if (notMatched === true)
                continue
            else {
                if ( contains(res, songObject.title) )
                    continue;
                else
                    res.push(songObject.title); // Otherwise, the song name did match. Add the song object to the matching song title array.
            }
        }
    }

	if (res.length === 0)
		return -1; // return -1 if no results were found, not an empty array.
	return res; // Return the array of results that match all the conditions
}


/**
 * Song stepper Search function that allows searching by song title.
 * @parameter stepperFields Step Artist entered from the front end, as a string
 * @parameter packJson The JSON of song packs as keys, with array of song objects for each key.
 * @return result as an JSON array of pack names that matched the user input for song stepper.
 * @return -1 input cannot be matched
 */
function stepArtistSearch(stepperFields, packJson) {

    // Separate the song stepper entered in the front end by whitespace
    // This will be treated like an and statement for all the non-whitespace chars
    var searchParts = stepperFields.toLocaleLowerCase(); // Make all lowercase for case insensitive search
    searchParts = searchParts.trim().split(/\s+/); // Separate by whitespace into an array
	const packs = packJson;
	const res = [];
    var notMatched = false;
    
    // For every key representing a song pack in the JSON, look through every chart object in
    // its array. See if the 'title' property of that song object matches the AND of all the
    // whitespace-separated song name fields passed in the form.
    for (var key in packs) {
        
        // Get the song array for the pack. Then for every song object, see if its stepper
        // matches the input song stepper specified.
        var songArr = packs[key];
        for (var songIndex = 0; songIndex < songArr.length; songIndex++) {
            notMatched = false;
            var songObject = songArr[songIndex];
            var stepperLower = songObject.stepper.toLocaleLowerCase(); // Make all lowercase for case insensitive search
            var stepperParts = stepperLower.trim().split(/\s+/); // Separate by whitespace into an array

            // For each song field passed, see if it's in the song name.
            for (var i = 0; i < searchParts.length; i++) {
                var searchPart = searchParts[i]; // e.g. "crossover"

                // See if the search part is part of the song stepper. Remember this is an AND operation so all fields must be met
                for (var j = 0; j < stepperParts.length; j++ ) {
                    var stepperPart = stepperParts[j];
                    if ( stepperPart.indexOf(searchPart) > -1 ) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (j == stepperParts.length) {
                    notMatched = true;
                    break;
                }
            }
            
            // If the song pack didn't match the AND of all space separate fields in the pack fields, continue to the next pack name
            if (notMatched === true)
                continue
            else
                res.push(songObject); // Otherwise, the song stepper did match. Add the song object to the matching song stepper array.
        }
    }
    
	if (res.length === 0)
		return -1; // return -1 if no results were found, not an empty array.
	return res; // Return the array of results that match all the conditions
}

/**
 * Song stepper Search function that allows searching by song title.
 * @parameter stepperFields Step Artist entered from the front end, as a string
 * @parameter packJson The JSON of song packs as keys, with array of song objects for each key.
 * @return result as an JSON array of pack names that matched the user input for song stepper.
 * @return -1 input cannot be matched
 */
function autocompleteStepArtistSearch(stepperFields, packJson) {

    // Separate the song stepper entered in the front end by whitespace
    // This will be treated like an and statement for all the non-whitespace chars
    var searchParts = stepperFields.toLocaleLowerCase(); // Make all lowercase for case insensitive search
    searchParts = searchParts.trim().split(/\s+/); // Separate by whitespace into an array
	const packs = packJson;
	const res = [];
    var notMatched = false;
    
    // For every key representing a song pack in the JSON, look through every chart object in
    // its array. See if the 'title' property of that song object matches the AND of all the
    // whitespace-separated song name fields passed in the form.
    for (var key in packs) {
        
        // Get the song array for the pack. Then for every song object, see if its stepper
        // matches the input song stepper specified.
        var songArr = packs[key];
        for (var songIndex = 0; songIndex < songArr.length; songIndex++) {
            notMatched = false;
            var songObject = songArr[songIndex];
            var stepperLower = songObject.stepper.toLocaleLowerCase(); // Make all lowercase for case insensitive search
            var stepperParts = stepperLower.trim().split(/\s+/); // Separate by whitespace into an array

            // For each song field passed, see if it's in the song name.
            for (var i = 0; i < searchParts.length; i++) {
                var searchPart = searchParts[i]; // e.g. "crossover"

                // See if the search part is part of the song stepper. Remember this is an AND operation so all fields must be met
                for (var j = 0; j < stepperParts.length; j++ ) {
                    var stepperPart = stepperParts[j];
                    if ( stepperPart.indexOf(searchPart) > -1 ) {
                        break;
                    } else {
                        continue;
                    }
                }
                if (j == stepperParts.length) {
                    notMatched = true;
                    break;
                }
            }
            
            // If the song pack didn't match the AND of all space separate fields in the pack fields, continue to the next pack name
            if (notMatched === true)
                continue
            else {
                if ( contains(res, songObject.stepper) )
                    continue;
                else
                    res.push(songObject.stepper); // Otherwise, the song name did match. Add the song object to the matching song title array.
            }
        }
    }
    
	if (res.length === 0)
		return -1; // return -1 if no results were found, not an empty array.
	return res; // Return the array of results that match all the conditions
}

/**
 * File Status function that allows searching by song status.
 * @parameter statusName name of the status requested, can be "Rejected", "Conditional Queue", "Accepted", and "Released"
 * @parameter packJson The JSON of song packs as keys, with array of song objects for each key.
 * @return result as an JSON array of songs that matched the input for status.
 * @return -1 input no files with requested status
 */
function getFilesByStatus(statusName, packJson) {

    //initialize the packs variable, and return array.
	const packs = packJson;
	const res = [];
    
    // For every key representing a song pack in the JSON, look through every chart object in
    // its array. See if the 'status' property of that song object matches the given parameter.
	// for reference, the status may be "Rejected", "Conditional Queue", "Accepted", and "Released"
    for (var key in packs) {
        
        // Get the song array for the pack. Then for every song object, see if its status matches the requested status
        var songArr = packs[key];
        for (var songIndex = 0; songIndex < songArr.length; songIndex++) {
			
            var songObject = songArr[songIndex];
            var songStatus = songObject.status.toLocaleLowerCase(); // Make status lowercase for ease in the future

            // Check for the status match, if they match, add to res JSON array, otherwise continue
            if (statusName.toLocaleLowerCase() == songStatus)
                res.push(songObject);
            else
                continue;
        }
    }

	if (res.length === 0)
		return -1; // return -1 if no results were found, not an empty array.
	return res; // Return the array of results that match all the conditions
}

//APIs
exports.getSongById = getSongById;
exports.songNameSearch = songNameSearch;
exports.stepArtistSearch = stepArtistSearch;
exports.contains = contains;
exports.autocompleteSongNameSearch = autocompleteSongNameSearch;
exports.autocompleteStepArtistSearch = autocompleteStepArtistSearch;
exports.getFilesByStatus = getFilesByStatus;