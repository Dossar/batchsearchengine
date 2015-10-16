/*****************************************************
 *
 * File:          search_validate.js
 * Authors:       Roy Van Liew
 * Last Modified: Aug 29 2015, 5:41 PM
 * Description:   Javascript file which provides
 *                checking for the input fields on
 *                Song title and Step Artist.
 *
 ****************************************************/

function checkSongTitleSearchField() {
  var inputSong = $('#inputSongTitle');
  var inputSongVal = inputSong.val();
  var inputRegexp = new RegExp(/\s*\S+.*/);

  // If the input to the Song Title Text Field contained
  // at least one non-whitespace character, it's good.
  if (inputSongVal.search(inputRegexp) != -1) {
    document.formSongTitle.submit();
  } else {
    var alertText = '<div id="badInput" class="alert alert-danger"> \
<a href="#" class="close" data-dismiss="alert" \
aria-label="close"> &times;</a> \
<strong>Please enter at least one non-whitespace character \
for Song Title Search.</strong></div>';
    $('div#songTitleSearchFieldEmpty').html(alertText);
    return false;
  }
}

function checkStepArtistSearchField() {
  var inputStepArtist = $('#inputStepArtist');
  var inputStepArtistVal = inputStepArtist.val();
  var inputRegexp = new RegExp(/\s*\S+.*/);

  // If the input to the  Title Text Field contained
  // at least one non-whitespace character, it's good.
  if (inputStepArtistVal.search(inputRegexp) != -1) {
    document.formStepArtist.submit();
  } else {
    var alertText = '<div id="badInput" class="alert alert-danger"> \
<a href="#" class="close" data-dismiss="alert" \
aria-label="close"> &times;</a> \
<strong>Please enter at least one non-whitespace character \
for Step Artist Search.</strong></div>';
    $('div#stepArtistSearchFieldEmpty').html(alertText);
    return false;
  }
}
