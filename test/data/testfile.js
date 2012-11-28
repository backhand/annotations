// Note that value for @someotherkey has trailing whitespace on purpose! 
/**
 *
 * @annotation annotation for testfunction1
 * @someotherkey someothervalue  
 */
function testfunction1() {
  
}

/**
 *
 * @annotation annotation for testfunction2
 */
exports.testfunction2 = function() {
  
};

// Note that @emptyannotation has trailing whitespace on purpose!
/**
*
* @annotation annotation for anonymous function export
* @load:user parameter:id
* @access group:root
* @emptyannotation 
* @anotheremptyannotation
*/
module.exports = function() {
  
};

/**
 *
 * @duplicate first
 * @duplicate second
 * @duplicate third
 */
exports.testfunction3 = function() {
  
};

/**
 * 
 * @hi there
 */
exports['testfunction4'] = function() {
 
};

/**
*
* @annotation annotation for variable assigned function
*/
var testfunction5 = function() {
  
};
