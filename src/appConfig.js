import { blockUids, allData } from './state.js';
import { getBlockInfo, sortBasedOnOrder } from './roamFunctions.js';

export async function loadAppConfigData() {
    let ACD = {};
    
    // Sequence initializers
    await getTimelineData(ACD);
    await getGeneralExams(ACD);
    await getQutation(ACD);
    
    allData.appConfigData = ACD;
    allData.rpConfig = typeof rpConfig === 'function' ? rpConfig() : {};
}

export async function getTimelineData(ACD) {
    let block = await getBlockInfo(blockUids.timeline);
    let timelineBlocks = block && block.children ? block.children : [];
    timelineBlocks = await sortBasedOnOrder(timelineBlocks);
    
    ACD.timelineBlocks = timelineBlocks.map(b => {
        const lines = b.string.split('\n').map(l => l.trim()).filter(l => l !== '');
        return {
            date: lines[0]?.replace(':', '') || '',
            items: lines.slice(1)
        };
    }).filter(entry => entry.date !== '');
}

export async function getGeneralExams(ACD) { /* Sub configuration parameters parsing extraction */ }
export async function getQutation(ACD) { /* Quote configuration setups block mapping extraction */ }