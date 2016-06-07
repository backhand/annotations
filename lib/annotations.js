'use strict';

var fs = require('fs');

exports.get     = get;
exports.getSync = getSync;

// Define line type patterns and their identifiers
var linetypes = {
  dbstart : { pattern: /^\s?\/\*\*/ },
  dbanno  : { pattern: /^\s?\*\s?@([\w:-_\(\)]+)(\s+(.*))?/, returns: { name:1, value:3 } },
  dbend   : { pattern: /^\s?\*\/$/ },
  fnsig1  : { pattern: /^\s?function\s+(\w+)\s?/, returns: { name:1 } },
  fnsig2  : { pattern: /^\s?exports\.(\w+)\s?=\s?function/, returns: { name:1 } },
  fnsig3  : { pattern: /^\s?module\.exports\s?=\s?function/, returns: { name:'anonymous' } },
  fnsig4  : { pattern: /exports\[['"](\w+)['"]\]\s*=\s*function/, returns: { name:1 } },
  fnsig5  : { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*function/, returns: { name:2 } },
  fnsig6  : { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*new Function/, returns: { name:2 } },
  fnsig7  : { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*\(.*?\)\s*=>/, returns: { name:2 } },
  fnsig8  : { pattern: /^\s?module.exports\s*=\s*{/, returns: { name:'module' } }
};

function trim(str) {
  return 'string' == typeof str ? str.replace(/^\s+/,'').replace(/\s+$/,'') : str;
}

/**
 * Runs through linetypes, identifying str
 */ 
function identify(str) {

  // Try all predefined line type patterns
  for (var i in linetypes) {

    // Check for a match
    var match = str.match(linetypes[i].pattern);
    if (null !== match) {

      // Default returns type and regexp match results
      var returns = { id: i, match: match };

      // If specific values are requested, fill those in
      if ('undefined' != typeof linetypes[i].returns) {
        for (var r in linetypes[i].returns) {
          returns[r] = 'string' == typeof linetypes[i].returns[r] ?
              linetypes[i].returns[r] : trim(match[linetypes[i].returns[r]]);
        }
      }

      return returns;
    }
  }

  return false;
}

function analyze(data) {

  // Object for holding annotation data
  var annotations = {};

  // Iterate over lines
  var lines = data.split('\n');
  var current = {};
  for (var num in lines) {

    // Get line type
    var type = identify(lines[num]);

    switch (type.id) {
      case 'dbstart':
        // Reset current annotation object
        current = {};
        break;

      case 'dbanno':
        // Store whatever was annotated, bucketing values of duplicate keys
        var annotationValue = undefined === type.value || '' === type.value ? true : type.value;
          // Create array to hold items
        if (undefined !== current[type.name]) {
          if ('string' == typeof current[type.name])
            current[type.name] = [current[type.name]];
          current[type.name].push(annotationValue);
        } else {
          current[type.name] = annotationValue;
        }
        break;

      case 'fnsig1':
      case 'fnsig2':
      case 'fnsig3':
      case 'fnsig4':
      case 'fnsig5':
      case 'fnsig6':
      case 'fnsig7':
      case 'fnsig8':
        // Store current annotations under function name
        annotations[type.name] = current;
        current = {};
        break;

      default: break;
    }
  }

  return annotations;
}

/**
 * Get an object representation of all annotations in file
 *
 * @param string filename Path to file
 * @param function callback
 *
 */
function get(filename, callback) {

  // Read file
  fs.readFile(filename, 'utf8', function(err, data) {
    if (!err) {
      var annotations = analyze(data);
      callback(null, annotations);
    } else {
      callback(err, null);
    }
  });
}

function getSync(filename) {

  // Read file
  var data = fs.readFileSync(filename, 'utf8');

  // Analyze if possible
  if ('string' == typeof data) {
    return analyze(data);
  } else {
    return false;
  }
}
