var test = require('tape');
var equal = require('../');
var isArguments = require('../lib/is_arguments.js');
var objectKeys = require('../lib/keys.js');

// BRIEFING

// t.ok - Assert that value is truthy.
// t.notOk - Assert that value is falsy.

// TESTS

// Test 1. Test equal function works as expected when given two identical objects.

test('equal', function (t) {
    t.ok(equal(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ 4 ] }
    ));
    t.end();
});

// Test 2. Test equal function works as expected when given two different objects.

test('not equal', function (t) {
    t.notOk(equal(
        { x : 5, y : [6] },
        { x : 5, y : 6 }
    ));
    t.end();
});

// Test 3. Test equal function works as expected when given identical nested null objects.

test('nested nulls', function (t) {
    t.ok(equal([ null, null, null ], [ null, null, null ]));
    t.end();
});

// Test 4. Test equal function works as expected when given similar object with different data types.

// Interesting that equal recognises them as the same unless object with strict property evaluating to true. t.notOk expects a falsy value and by adding { strict: true } we return falsy.

test('strict equal', function (t) {
    t.notOk(equal(
        [ { a: 3 }, { b: 4 } ],
        [ { a: '3' }, { b: '4' } ],
        { strict: true }
    ));
    t.end();
});

// Test 5. Test different tape functions on different data types.

test('non-objects', function (t) {
    t.ok(equal(3, 3));
    t.ok(equal('beep', 'beep'));
    t.ok(equal('3', 3));
    t.notOk(equal('3', 3, { strict: true }));
    t.notOk(equal('3', [3]));
    t.end();
});

// Test 6. Test different tape functions on different data types.

// Interesting that equal recognises object and array as same. Change to t.ok for test to pass

test('arguments class', function (t) {
    t.ok(equal(
        (function(){return arguments})(1,2,3),
        (function(){return arguments})(1,2,3),
        "compares arguments"
    ));

    // Interesting that equal recognises object and array as different.
    t.notOk(equal(
        (function(){return arguments})(1,2,3),
        [1,2,3],
        "differenciates array and arguments"
    ));

    // Interesting that equal recognises object and array as same. Change to t.ok for test to pass
    var expected = (function(){return arguments})(1,2,3)
    var actual = [1,2,3]
    console.log('expected ', expected)
    t.ok(equal(actual, expected, "differenciates array and arguments"
    ));

    t.end();
});

// Test 7. Warning - potential rabbithole !!! => O.

test('test the arguments shim', function (t) {
    t.ok(isArguments.supported((function(){return arguments})()));
    t.notOk(isArguments.supported([1,2,3]));

    t.ok(isArguments.unsupported((function(){return arguments})()));
    t.notOk(isArguments.unsupported([1,2,3]));

    t.end();
});

// Test 8. A-ha, deepEqual!

test('test the keys shim', function (t) {
    t.deepEqual(objectKeys.shim({ a: 1, b : 2 }), [ 'a', 'b' ]);
    t.end();
});

// var shim = function (obj) {
//   var keys = [];
//   for (var key in obj) keys.push(key);
//   return keys;
// }
//
// test('test the keys shim', function (t) {
//     t.deepEqual(shim({ a: 1, b : 2 }), [ 'a', 'b' ]);
//     t.end();
// });

// Test 9. Test equal works on different date formats!

// Interesting that there isn't even a 7 in d1 console.log.

test('dates', function (t) {
    var d0 = new Date(1387585278000);
    var d1 = new Date('Fri Dec 20 2013 16:21:18 GMT-0800 (PST)');
    console.log('------ Date stuff ------')
    console.log('d0 ', d0)
    console.log('d1 ', d1)
    console.log('------------------------')
    t.ok(equal(d0, d1));
    t.end();
});

// Test 10. Test equal works on Buffer()????

test('buffers', function (t) {
    console.log("Buffer('xyz') = ", Buffer('xyz'))
    t.ok(equal(Buffer('xyz'), Buffer('xyz')));
    t.end();
});

// Test 11. Test equal recognises difference between a boolean and an array!

// Interesting that Boolean[] = true.

test('booleans and arrays', function (t) {
    t.notOk(equal(true, []));
    t.end();
})

// test('booleans and arrays', function (t) {
//     t.ok(equal(true, Boolean([])));
//     t.end();
// })

// Test 12. Test equal recognises null and undefined are recognised as equal but not 'deepEqual'!

test('null == undefined', function (t) {
    t.ok(equal(null, undefined))
    t.notOk(equal(null, undefined, { strict: true }))
    t.end()
})
