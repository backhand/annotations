// Note that value for @someotherkey has trailing whitespace on purpose! 
/**
 *
 * @annotation annotation for testfunction1
 * @someotherkey someothervalue  
 */
async function testfunction1() {
  
}

/**
 *
 * @annotation annotation for testfunction2
 */
exports.testfunction2 = async function() {
  
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
module.exports = async function() {
  
};

/**
 *
 * @duplicate first
 * @duplicate second
 * @duplicate third
 */
exports.testfunction3 = async function() {
  
};

/**
 *
 * @bummer this annotation goes nowhere
 */
var hej = 123;

async function unAnnotatedFunction3a() {

}

/**
 * 
 * @hi there
 */
exports['testfunction4'] = async function() {
 
};

/**
*
* @annotation annotation for variable assigned function
*/
var testfunction5 = async function() {
  
};

/**
 *
 * @annotation test
 */
let testfunction6 = async function() {

};

/**
 *
 * @annotation test
 */
const testfunction7 = async function() {

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
var testfunction11 = async () => console.log('Demo');

/**
 *
 * @annotation test
 */
var testfunction12 = async (name) => console.log('Hello, ' + name);

/**
 *
 * @annotation test
 */
const testfunction13 = async () => console.log('Demo');

/**
 *
 * @annotation test
 */
const testfunction14 = async (name) => console.log('Hello, ' + name);

/**
 *
 * @annotation test
 */
let testfunction15 = async () => console.log('Demo');

/**
 *
 * @annotation test
 */
let testfunction16 = async (name) => console.log('Hello, ' + name);

/**
 *
 * @annotation test
 */
exports.testfunction17 = async (name) => console.log('Hello, ' + name);
