/*****************************************************
 *
 * File:          server.js
 * Description:   File that runs the Batch Search
 *                Engine site.
 *
 ****************************************************/

// Use express to create a server.
var express = require('express');
var app = express();

// Use constants for pre-defined data not part of the JSONs.
var constants = require('./Public/js/constants.js');

// Use a common directory for files to be used in the
// web pages, such as for images, javascript, and css.
app.use(express.static(__dirname + '/Public'));
var fs = require('fs');
var searchEngine = require('./Public/js/search.js');

// Read in the JSON files and parse them into objects to pass as data.
var data = JSON.parse(fs.readFileSync('./Public/batches.json'));

// Home Page is Song Title and Step Artist Search.
app.get('/', function(req, res) {
    
  var inputSongTitle = '';      // song title search placeholder
  var inputStepArtist = '';     // song artist search placeholder
  
  // If there was a query from the song title form, run a song title search.
  if (req.query.inputSongTitle != undefined) {
    inputSongTitle = req.query.inputSongTitle;
    var searchResults = searchEngine.songNameSearch(req.query.inputSongTitle, data);
  }
  
  // If there was a query from the song artist form, run a song artist search.
  if (req.query.inputStepArtist != undefined) {
    inputStepArtist = req.query.inputStepArtist;
    var searchResults = searchEngine.stepArtistSearch(req.query.inputStepArtist, data);
  }

  res.render('search.jade',
             {results: searchResults, inputSongTitle: inputSongTitle, inputStepArtist: inputStepArtist, data: data});
  
});

// Song Info Page.
app.get('/songInfo', function(req, res) {
    
  var permission = '';      // permission value placeholder
  
  var searchResults;
  for (var keyPack in data) {
    if (data.hasOwnProperty(keyPack)) {
      packArray = data[keyPack];
      searchResults = searchEngine.getSongById(req.query.idNum, data.length, packArray);
      if (searchResults != -1)
        break; // We found the file with the id
    } else {
      continue; 
    }
  }

  res.render('songInfo.jade',
             {songTitle: searchResults.title,
              artist: searchResults.artist,
              stepper: searchResults.stepper,
              batchName: searchResults.batch,
              latest: searchResults.latest,
              status: searchResults.status,
              permission: permission});
});

// Displaying current batches
app.get('/batches', function(req, res) {

  res.render('batches.jade');
  
});

// Displaying songs for one batch
app.get('/batch', function(req, res) {

  var results = -1;      // Song results for the specified batch.
  
  // If there was a query from the song title form, run a song title search.
  if (req.query.batchName != undefined) {
    if ( searchEngine.contains(constants.batchNames, req.query.batchName) )
      results = data[req.query.batchName]; // Get the array of song objects in that batch if valid
  }
  
  res.render('batch.jade',
             {results: results, batchName: req.query.batchName});
  
});

/**************************
 * AUTOCOMPLETE PROCESSING
 **************************/

app.get('/autoCompleteProcessSongName', function(req, res) {
  
  // return JSON result
  //console.log("#" + req.query.inputString);
  var searchResult = searchEngine.autocompleteSongNameSearch(req.query.inputString, data);

  //console.log(searchResult);
  //("auto complete search finished");
  res.json(searchResult);
  
});

app.get('/autoCompleteProcessStepArtist', function(req, res) {
  
  // return JSON result
  //console.log("#" + req.query.inputString);
  var searchResult = searchEngine.autocompleteStepArtistSearch(req.query.inputString, data);

  //console.log(searchResult);
  //("auto complete search finished");
  res.json(searchResult);
  
});

// Error page which redirects the user back to Search.
app.get('/*', function(req, res) {
  res.status(404).render('error.jade');
});

console.log('Running on port: ' + constants.port);

// Tell the server to listen to a specific port. If on localhost,
// you might need to use http://localhost:3000/ as the URL.
app.listen(constants.port, constants.ipAdress);
