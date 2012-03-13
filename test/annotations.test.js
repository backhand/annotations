var annotations = require('../lib/annotations');

exports['Test 1: data/testfile.js'] = function(test) {
  
  annotations.get('test/data/testfile.js', function(err, result) {
    
    //console.log(result);
    test.equal(result.testfunction1.annotation, 'annotation for testfunction1');
    test.equal(result.testfunction1.someotherkey, 'someothervalue');
    test.equal(result.testfunction2.annotation, 'annotation for testfunction2');
    test.equal(result.anonymous.annotation, 'annotation for anonymous function export');
    
    test.done();
  });
};