// Keep your working variable
var test_var = "hello";

// Option A: Write the function as a var expression (forces it global)
var testFunction = function() {
    console.log("This is a test function working via var!");
};

// Option B: Explicitly attach it to the window object (bulletproof backup)
window.testFunctionBackup = function() {
    console.log("This is the backup function working via window!");
};

// Add this line so you can see in real-time when the script refreshes
console.log("Script updated and loaded perfectly!");