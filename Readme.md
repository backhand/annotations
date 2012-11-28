Doc-block embedded annotations for node.js functions/modules
=========================

Usage:
------
var annotations = require('annotations');

    annotations.get('test/data/testfile.js', function(err, result) {
      // If no errors occured, result should be an object containing
      // function names (anonymous functions are referred to as 'anonymous') mapping  
      // to an object with annotation name -> annotation value 
      // Example:
    });

Example (refer to the test file at test/data/testfile.js):

    annotations.get('test/data/testfile.js', function(err, result) {
      // result variable now contains:
      { testfunction1: { 
          annotation: 'annotation for testfunction1',
          someotherkey: 'someothervalue' },
          testfunction2: { annotation: 'annotation for testfunction2' },
        anonymous: { 
          annotation: 'annotation for anonymous function export' },
        testfunction3: { 
          annotation: 'annotation for variable assigned function' } }
    });

Installation:
------------------------
npm install annotations