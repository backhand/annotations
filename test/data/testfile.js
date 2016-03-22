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

/**
 *
 * @annotation test
 */
let testfunction6 = function() {

};

/**
 *
 * @annotation test
 */
const testfunction7 = function() {

};

/**
 *
 * @annotation test
 */
var testfunction8 = new Function();

/**
 *
 * @annotation test
 */
let testfunction9 = new Function();

/**
 *
 * @annotation test
 */
const testfunction10 = new Function();

/**
 *
 * @annotation test
 */
var testfunction11 = () => console.log('Demo');

/**
 *
 * @annotation test
 */
var testfunction12 = (name) => console.log('Hello, ' + name);

/**
 *
 * @annotation test
 */
const testfunction13 = () => console.log('Demo');

/**
 *
 * @annotation test
 */
const testfunction14 = (name) => console.log('Hello, ' + name);

/**
 *
 * @annotation test
 */
let testfunction15 = () => console.log('Demo');

/**
 *
 * @annotation test
 */
let testfunction16 = (name) => console.log('Hello, ' + name);
