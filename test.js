// A global variable
var test_var = "hello";

// Changing this to a variable expression attaches it to the global scope reliably
var testFunction = function() {
    console.log("This is a test function");
};