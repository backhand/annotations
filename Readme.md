Doc-block embedded annotations for node.js functions/modules
=========================

[![Build Status](https://secure.travis-ci.org/backhand/annotations.png?branch=master)](https://travis-ci.org/backhand/annotations)

Installation:
------------------------
npm install annotations

Usage:
------
Given a Javascript source file:

    /**
    *
    * @annotation annotation for anonymous function export
    * @load:user parameter:id
    * @access group:root
    * @emptyannotation 
    * @anotheremptyannotation
    */
    function someFunction() {
      // Does something exciting
    }


Read the embedded annotations like this:

    var annotations = require('annotations');

    annotations.get('test/data/testfile.js', function(err, result) {
      // If no errors occured, result should be an object containing
      // function names (anonymous functions are referred to as 'anonymous') mapping  
      // to an object with annotation name -> annotation value 
      // Example:
      {
        someFunction: {
          annotation: 'annotation for anonymous function export',
          'load:user': 'parameter:id',
          access: 'group:root',
          emptyannotation: true,
          anotheremptyannotation: true
        }
      }
    });
    
    // Synchronous version
    var result = annotations.getSync('test/data/testfile.js');

Supports the following types of function definition syntax:
  
    function <name>(...) { ... }

    exports.<name> = function(...) { ... }

    module.exports = function(...) { ... }

    exports[<name>] = function(...) { ... }

    var <name> = function(...) { ... }