// Import dependencies
const ffi = require('ffi');


// Import dynamic library.
// This is an example using the libmath made in auto tools workshop.
// It won't work, at least you run the scripts 1 and 2 in the libmath
// directory.
const stdLib = new ffi.Library('/home/erickof/libmath/build/usr/lib/libmath', {
    // This must be an JSON with function name, return value and the arguments
    'add': [
        'double',
        ['double', 'double']
    ],
    /*'function_name': [
        'return_value':
        ['arg0_type', 'arg1_type', ...],
    ]
    */
});


// This is only a test, this must be in the server
const result = stdLib.add(10, 20);
console.log(result);
