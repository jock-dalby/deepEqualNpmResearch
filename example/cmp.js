var equal = require('../');
console.dir([
    equal(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ 4 ] }
    ),
    equal(
        { x : 5, y : [6] },
        { x : 5, y : 6 }
    )
]);

// Calling console.dir(object) will display an interactive list of the properties of the specified JavaScript object.
// The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
