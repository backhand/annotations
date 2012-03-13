var fs = require('fs');

// Define line type patterns and their identifiers
var linetypes = {
  dbstart : { pattern: /^\s?\/\*\*/ },
  dbanno  : { pattern: /^\s?\*\s?@(\w+)\s+(.*)/, returns: { name:1, value:2 } },
  dbend   : { pattern: /^\s?\*\/$/ },
  fnsig1  : { pattern: /^\s?function\s+(\w+)\s?/, returns: { name:1 } },
  fnsig2  : { pattern: /^\s?exports\.(\w+)\s?=\s?function/, returns: { name:1 } },
  fnsig3  : { pattern: /^\s?module\.exports\s?=\s?function/, returns: { name:'anonymous' } }
};

/**
 * Runs through linetypes, identifying str
 */ 
function identify(str) {

  // Try all predefined line type patterns
  for(var i in linetypes) {
    
    // Check for a match
    if(null != (match = str.match( linetypes[i].pattern ))) {
      
      // Default returns type and regexp match results
      var returns = { id: i, match: match };
      
      // If specific values are requested, fill those in
      if('undefined' != typeof linetypes[i].returns) {
        for(var r in linetypes[i].returns) {
          returns[r] = 'string' == typeof linetypes[i].returns[r] ?
              linetypes[i].returns[r] : match[linetypes[i].returns[r]];
        }
      }
      
      return returns;
    }
  }
  
  return false;
}

/**
 * 
 * 
 * @param string filename Path to file
 * @param function callback
 * 
 */
module.exports.get = function(filename, callback) {
  
  // Object for holding annotation data
  var annotations = {};
  
  // Read file
  fs.readFile(filename, 'utf8', function(err, data) {
    if(!err) {
      
      // Iterate over lines
      var lines = data.split('\n');
      var current = {};
      for(var num in lines) {
        
        // Get line type
        var type = identify(lines[num]);
        
        switch(type.id) {
          case 'dbstart':
            // Reset current annotation object
            current = {};
            break;
            
          case 'dbanno':
            // Store whatever was annotated
            current[type.name] = type.value;
            break;
            
          case 'fnsig1':
          case 'fnsig2':
          case 'fnsig3':
            // Store current annotations under function name
            annotations[type.name] = current;
            break;
          
          default: break;
        }
      }
    }
    
    // Call back
    callback(err, annotations);    
  });
  
};