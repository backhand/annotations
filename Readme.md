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

    module.exports = {...}

The MIT License (MIT)
---------------------

Copyright © `2013` `Frederik Hannibal`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
