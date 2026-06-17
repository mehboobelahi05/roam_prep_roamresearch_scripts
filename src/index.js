import * as state from './state.js';
import * as roam from './roamFunctions.js';
import * as helpers from './generalComponents.js';
import * as mcqs from './mcqs.js';
import * as mocks from './mocks.js';
import * as config from './appConfig.js';
import * as git from './addDataToGithub.js';
import { loadData } from './data.js';

// Bundle everything seamlessly under a single safe Global Object
window.RoamPrep = {
    // Global Constants / State Objects
    state: state,
    allData: state.allData,
    blockUids: state.blockUids,
    
    // Structural Methods 
    loadData: loadData,
    getMcqs: mcqs.getMcqs,
    loadMockTests: mocks.loadMockTests,
    loadAppConfigData: config.loadAppConfigData,
    addDataToGitHub: git.addDataToGitHub,
    
    // Core API Helpers 
    getBlockInfo: roam.getBlockInfo,
    createBlock: roam.createBlock,
    getMCQById: helpers.getMCQById
};

console.log("✨ Roam Prep Core Engine Module Project Bundled Successfully!");