'use strict';

const fs = require('fs');

exports.get = get;
exports.getSync = getSync;

// Define line type patterns and their identifiers
const linetypes = {
  dbstart: { pattern: /^\s+\/\*\*/ },
  dbanno: { pattern: /^\s+\*\s?@([\w:-_()]+)(\s+(.*))?/, returns: { name: 1, value: 3 } },
  dbend: { pattern: /^\s+\*\/$/ },
  fnsig1: { pattern: /^\s?(async\s*)?function\s+(\w+)\s?/, returns: { name: 2 } },
  fnsig2: { pattern: /^\s?exports\.(\w+)\s?=\s?(async\s*)?function/, returns: { name: 1 } },
  fnsig3: { pattern: /^\s?module\.exports\s?=\s?(async\s*)?function/, returns: { name: 'anonymous' } },
  fnsig4: { pattern: /exports\[['"](\w+)['"]\]\s*=\s*(async\s*)?function/, returns: { name: 1 } },
  fnsig5: { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*(async\s*)?function/, returns: { name: 2 } },
  fnsig6: { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*new Function/, returns: { name: 2 } },
  fnsig7: { pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*(async\s*)?\(.*?\)\s*=>/, returns: { name: 2 } },
  fnsig8: { pattern: /^\s?module.exports\s*=\s*{/, returns: { name: 'module' } },
  fnsig9: { pattern: /^\s?exports\.(\w+)\s?=\s?(async\s*)?\(/, returns: { name: 1 } },
  fnsig10: { pattern: /\s?(\w+)\: function \(.*\) {/, returns: { name: 1 } }
};

function trim(str) {
  return typeof str === 'string' ? str.replace(/^\s+/, '').replace(/\s+$/, '') : str;
}

/**
 * Runs through linetypes, identifying str
 * @param {string} str
 * @return {object}
 */
function identify(str) {
  // Try all predefined line type patterns
  for (const i in linetypes) {
    if (!linetypes.hasOwnProperty(i)) {
      continue;
    }

    // Check for a match
    const match = str.match(linetypes[i].pattern);
    if (match !== null) {
      // Default returns type and regexp match results
      const returns = { id: i, match: match };

      // If specific values are requested, fill those in
      if (typeof linetypes[i].returns !== 'undefined') {
        for (const r in linetypes[i].returns) {
          if (!linetypes[i].returns.hasOwnProperty(r)) {
            continue;
          }

          returns[r] = typeof linetypes[i].returns[r] === 'string' ?
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
  const annotations = {};

  // Iterate over lines
  const lines = data.split('\n');
  let current = {};
  let previousType;
  for (const line of lines) {
    // Get line type
    const type = identify(line);

    switch (type.id) {
      case 'dbstart':
        // Reset current annotation object
        current = {};
        break;

      case 'dbanno': {
        // Store whatever was annotated, bucketing values of duplicate keys
        const annotationValue = typeof type.value === 'undefined' || type.value === '' ? true : type.value;
        // Create array to hold items
        if (typeof current[type.name] !== 'undefined') {
          if (typeof current[type.name] === 'string') {
            current[type.name] = [current[type.name]];
          }
          current[type.name].push(annotationValue);
        } else {
          current[type.name] = annotationValue;
        }
        break;
      }

      case 'fnsig1':
      case 'fnsig2':
      case 'fnsig3':
      case 'fnsig4':
      case 'fnsig5':
      case 'fnsig6':
      case 'fnsig7':
      case 'fnsig8':
      case 'fnsig9':
      case 'fnsig10':

        // Store current annotations under function name
        annotations[type.name] = current;
        current = {};
        break;

      default:
        if (previousType === 'dbend') {
          current = {};
        }
        break;
    }

    previousType = type.id;
  }

  return annotations;
}

/**
 * Get an object representation of all annotations in file
 *
 * @param {string} filename Path to file
 * @param {function} callback
 *
 */
function get(filename, callback) {
  if (!callback || typeof callback !== 'function') {
    return new Promise((resolve, reject) => {
      _get(filename, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  } else {
    _get(filename, callback);
  }
}

function _get(filename, callback) {
  // Read file
  fs.readFile(filename, 'utf8', function (err, data) {
    if (!err) {
      const annotations = analyze(data);
      callback(null, annotations);
    } else {
      callback(err, null);
    }
  });
}

function getSync(filename) {
  // Read file
  const data = fs.readFileSync(filename, 'utf8');

  // Analyze if possible
  if (typeof data === 'string') {
    return analyze(data);
  } else {
    return false;
  }
}