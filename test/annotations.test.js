var annotations = require('../lib/annotations');

function testfileTests(result, test) {
  test.equal(result.testfunction1.annotation, 'annotation for testfunction1');
  test.equal(result.testfunction1.someotherkey, 'someothervalue');
  test.equal(result.testfunction2.annotation, 'annotation for testfunction2');
  test.equal(result.anonymous.annotation, 'annotation for anonymous function export');
  test.equal(result.anonymous.emptyannotation, true);
  test.equal(result.anonymous.anotheremptyannotation, true);
  test.deepEqual(result.testfunction3.duplicate, ['first','second','third']);
  test.equal(result.testfunction4.hi, 'there');
  test.equal(result.testfunction5.annotation, 'annotation for variable assigned function');
}

exports['Test 1: data/testfile.js, asynchronous'] = function(test) {
  
  annotations.get('test/data/testfile.js', function(err, result) {
    
    testfileTests(result, test);
    
    test.done();
  });
};

exports['Test 2: data/testfile.js, synchronous'] = function(test) {
  
  var result = annotations.getSync('test/data/testfile.js');
  
  testfileTests(result, test);
  
  test.done();
};