import { testFunction, test_var, elahi } from './test.js';
import { abcFunction } from './abc.js';

// Bundle everything into a single global namespace for Roam
window.RoamPrep = {
    test_var: test_var,
    testFunction: testFunction,
    abcFunction: abcFunction,
    elahi: elahi
};

console.log("🚀 Roam Prep Project Engine fully loaded!");