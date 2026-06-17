import { allData } from './state.js';
import { getMcqs, getLinkedBlocks } from './mcqs.js';
import { loadMockTests, checkForEachMockTest } from './mocks.js';
import { loadAppConfigData } from './appConfig.js';

export async function loadData() {
    console.log("🚀 Loading engine components safely initialized...");
    
    let obj = await getMcqs();
    allData.mcqs = obj.mcqs;
    allData.mocks = obj.mocks;
    
    await checkForEachMockTest();
    await loadMockTests();
    
    // Stub methods placeholders to avoid breaking execution if defined anywhere globally 
    if (typeof getMCQsChapterList === 'function') await getMCQsChapterList();
    await loadAppConfigData();
    if (typeof getNotesChapterList === 'function') await getNotesChapterList();
    if (typeof getNotesData === 'function') await getNotesData();
    
    await getLinkedBlocks();
    
    if (typeof getVideosList === 'function') await getVideosList();
    if (typeof getVideoBlocks === 'function') await getVideoBlocks();
    if (typeof getPDFBlocks === 'function') await getPDFBlocks();
    
    console.log("🎯 All Data Compilation Complete::", allData);
}