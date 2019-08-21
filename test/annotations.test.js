'use strict';

const annotations = require('../lib/annotations');
const assert = require('assert');

describe('annotations', function(done) {
  it('should retrieve correct annotations from functions, async', function() {
    annotations.get('test/data/testfile.js', function(err, result) {
      testfileTests(result);
      done();
    });
  });

  it('should retrieve correct annotations from functions, sync', function() {
    const result = annotations.getSync('test/data/testfile.js');
    testfileTests(result);
  });

  it('should retrieve correct annotations from functions, await', async function() {
    const result = await annotations.getSync('test/data/testfile.js');
    testfileTests(result);
  });

  it('should handle module annotations', function() {
    const result = annotations.getSync('test/data/testfile2.js');
    assert.equal(result.module.annotation, 'annotation for module');
  });

  it('should handle async functions', function() {
    const result = annotations.getSync('test/data/testfile3.js');
    testfileTests(result);
  });
}); // End describe annotations

function testfileTests(result) {
  assert.equal(result.testfunction1.annotation, 'annotation for testfunction1');
  assert.equal(result.testfunction1.someotherkey, 'someothervalue');
  assert.equal(result.testfunction2.annotation, 'annotation for testfunction2');
  assert.equal(result.anonymous.annotation, 'annotation for anonymous function export');
  assert.equal(result.anonymous.emptyannotation, true);
  assert.equal(result.anonymous.anotheremptyannotation, true);
  assert.deepEqual(result.testfunction3.duplicate, ['first','second','third']);
  assert.deepEqual(result.unAnnotatedFunction3a, {});
  assert.equal(result.testfunction4.hi, 'there');
  assert.equal(result.testfunction5.annotation, 'annotation for variable assigned function');
  assert.equal(result.testfunction6.annotation, 'test');
  assert.equal(result.testfunction7.annotation, 'test');
  assert.equal(result.testfunction8.annotation, 'test');
  assert.equal(result.testfunction9.annotation, 'test');
  assert.equal(result.testfunction10.annotation, 'test');
  assert.equal(result.testfunction11.annotation, 'test');
  assert.equal(result.testfunction12.annotation, 'test');
  assert.equal(result.testfunction13.annotation, 'test');
  assert.equal(result.testfunction14.annotation, 'test');
  assert.equal(result.testfunction15.annotation, 'test');
  assert.equal(result.testfunction16.annotation, 'test');
  assert.equal(result.testfunction17.annotation, 'test');
}
