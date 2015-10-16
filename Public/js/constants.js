/* This file should be used to store global constants
   to allow for easily updating server.js */

//specifies which port to listen on
var port = 3000;
var ipAdress = '0.0.0.0';

// The batch sets to use
var batchNames = ['September 2014 Set1', 'September 2014 Set2',
                'September 2014 Set3', 'November 2014', 'January 2015',
                'March 2015', 'May 2015', 'July 2015', 'September 2015',
                'High FGO Special Batch Phase1',
                'High FGO Special Batch Phase2'];

// Alphabet array for the employee page A-Z listing.
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

exports.port = port;
exports.ipAdress = ipAdress;
exports.alphabet = alphabet;
exports.batchNames = batchNames;
