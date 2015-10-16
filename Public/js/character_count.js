/*****************************************************
 *
 * File:          character_count.js
 * Authors:       Roy Van Liew
 * Last Modified: Aug 29 2015, 5:47 PM
 * Description:   Javascript file which allows the
 *                user to see the remaining
 *                characters available for the
 *                Song Title and Step Artist Search.
 *
 ****************************************************/

function initCharCounterSongTitle() {

  var charMax = 50;
  var inputLength = $('#inputSongTitle').val().length;
  if (inputLength > 0) {
    var remainingChars = charMax - inputLength;
    $('#songTitleCharacters').text('Characters Remaining: ' + remainingChars);
  } else {
    $('#songTitleCharacters').text('Characters Remaining: ' + charMax);
  }

  /* The following three events: keyup, input, and paste relate to what the
     user puts in the Song Title Text Field. The counter is updated when
     these events occur. */
  $('#inputSongTitle').keyup(function() {
    var currentLength = $(this).val().length;
    var remainingChars = charMax - currentLength;
    $('#songTitleCharacters').text('Characters Remaining: ' + remainingChars);
  });

}

function initCharCounterStepArtist() {

  var charMax = 50;
  var inputLength = $('#inputStepArtist').val().length;
  if (inputLength > 0) {
    var remainingChars = charMax - inputLength;
    $('#stepArtistCharacters').text('Characters Remaining: ' + remainingChars);
  } else {
    $('#stepArtistCharacters').text('Characters Remaining: ' + charMax);
  }

  /* The following three events: keyup, input, and paste relate to what the
     user puts in the Step Artist Text Field. The counter is updated when
     these events occur. */
  $('#inputStepArtist').keyup(function() {
    var currentLength = $(this).val().length;
    var remainingChars = charMax - currentLength;
    $('#stepArtistCharacters').text('Characters Remaining: ' + remainingChars);
  });

}
