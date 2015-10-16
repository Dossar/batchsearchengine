/*****************************************************
 *
 * File:          accordion_focus.js
 * Authors:       Roy Van Liew
 * Last Modified: August 29 2015
 * Description:   Javascript file for allowing the
 *                General and Advanced Search
 *                to focus on specific fields when
 *                opened, as well as switching
 *                between searches.
 *
 ****************************************************/

function initAccordionFocusSettings() {

  var url = window.location.href; // Returns full URL
  var urlHasQuery = url.match(/\?/i);

  // Check if the URL had ? in it.
  if (urlHasQuery) {

    var isSongTitleSearch = url.match(/\?inputSongTitle/i);
    var isStepArtistSearch = url.match(/\?inputStepArtist/i);
    if (isSongTitleSearch) {
      $('#collapseOne').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputSongTitle').focus();
    } else if (isStepArtistSearch) {
      $('#collapseTwo').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputStepArtist').focus();
    }

  } else {

    // Neither Search was performed. Focus on Song Title Search.
    $('#collapseOne').collapse('show');
    $('div#badInput').remove();
    document.getElementById('inputSongTitle').focus();

  }

}

function clickedOnSongTitleSearch() {

  // If Song Title Search is clicked and Song Title tab is open,
  // close Song Title Search and open Step Artist Search.
  if ($('#collapseOne.collapse').hasClass('in')) {
    $('#collapseOne').collapse('hide');
    $('#collapseTwo').collapse('show');
    $('div#badInput').remove();
    document.getElementById('inputStepArtist').focus();
  } else {

    // Otherwise, Song Title Search was closed originally. Open Song Title Search and
    // autofocus. If any other search was open, close them.
    if ($('#collapseTwo.collapse').hasClass('in')) {
      $('#collapseTwo').collapse('hide');
      $('#collapseOne').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputSongTitle').focus();
    } else {
      $('#collapseOne').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputSongTitle').focus();
    }

  }

}

function clickedOnStepArtistSearch() {

  // If Step Artist Search is clicked and Step Artist tab is open,
  // close Step Artist and open Song Title Search.
  if ($('#collapseTwo.collapse').hasClass('in')) {
    $('#collapseTwo').collapse('hide');
    $('#collapseOne').collapse('show');
    $('div#badInput').remove();
    document.getElementById('inputSongTitle').focus();
  } else {

    // Otherwise, Step Artist Search was closed. Open Song Title Search and
    // autofocus. If Song Title Search was open, close it.
    if ($('#collapseOne.collapse').hasClass('in')) {
      $('#collapseOne').collapse('hide');
      $('#collapseTwo').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputStepArtist').focus();
    } else {
      $('#collapseTwo').collapse('show');
      $('div#badInput').remove();
      document.getElementById('inputStepArtist').focus();
    }

  }

}
