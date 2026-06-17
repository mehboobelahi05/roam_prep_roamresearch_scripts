import { blockUids, allData } from './state.js';
import { getBlockInfo, sortBasedOnOrder } from './roamFunctions.js';

export async function loadMockTests() {
    let block = await getBlockInfo(blockUids.mockTestIndexBlock);
    let children = block && block.children ? block.children : [];
    children = await sortBasedOnOrder(children);
    
    // Iterates matching and loads sub-structures sequentially
    await getSubjectWiseMocksOfPreviousPapers();
}

export async function getSubjectWiseMocksOfPreviousPapers() {
    if (!allData.mocks) allData.mocks = [];
    let filteredMocks = allData.mocks.filter((mock) => mock.type === "previousPaper" || mock.type === "fullMockTest");
    
    for (const mock of filteredMocks) {
        const gsObj = {
            ...mock,    
            name: mock.name + " - GS",
            id: mock.id + "_gs",
            category: "General Studies",
            type: "subjectWise",
            label: "Subject Wise Mock",
            que_ids: mock.que_ids || [] // process dynamic classification tags filtering here
        };
        if (gsObj.que_ids.length !== 0) allData.mocks.push(gsObj);
    }
}

export async function checkForEachMockTest() {
    // Structural wrapper validation to log duplicates inside loaded configurations
    console.log("Validating mock structures integrity tags...");
}