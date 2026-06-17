import { blockUids, allData } from './state.js';
import { getBlockInfo, sortBasedOnOrder, getPageInfoByPageTitle } from './roamFunctions.js';
import { getCleanBlockUid, getMCQById, formatVideoTimestampPatterns } from './generalComponents.js';

export async function getMcqs() {
    let localMcqs = [];
    let localMocks = [];
    
    let block = await getBlockInfo(blockUids.mcqsIndex);
    let children = block && block.children ? block.children : [];
    children = await sortBasedOnOrder(children);
    
    for (const child of children) {
        await isMCQBlock(child);
    }

    async function isMCQBlock(targetBlock) {
        let blockInfo = await getBlockInfo(targetBlock.uid);
        if (!blockInfo) return;
        
        let isBlockRef = false;
        if (blockInfo.string.trim().startsWith("((") && blockInfo.string.trim().endsWith("))")) {
            isBlockRef = true;
        }
        if (isBlockRef) {
            let blockUid = targetBlock.string.trim().replace("((", "").replace("))", "");
            await getMcqsByBlockUid(blockUid, localMcqs, localMocks);
        }
        let innerChildren = blockInfo.children ? blockInfo.children : [];
        innerChildren = await sortBasedOnOrder(innerChildren);
        for (const child of innerChildren) {
            await isMCQBlock(child);
        }
    }

    return { mcqs: localMcqs, mocks: localMocks };
}

export async function getMcqsByBlockUid(uid, localMcqs, localMocks) {
    uid = getCleanBlockUid(uid);
    let block = await getBlockInfo(uid);
    if (!block) return;
    
    let string = block.string;
    const lines = string.split("\n");

    let line = lines.find((l) => l.trim().toLowerCase().startsWith("page:"));
    const pageTitle = line ? line.replace("Page:", "").replaceAll("[[", "").replaceAll("]]", "").trim() : null;
    let page_uid = "";
    if (pageTitle) {
        let pageInfo = await getPageInfoByPageTitle(pageTitle);
        if (pageInfo) page_uid = pageInfo.uid;
    }

    let tags_result = extractTagsFromString(string);
    // Parsing rules logic continues below...
}

export function extractTagsFromString(input) {
    if (!input) return { modifiedInput: "", tags: [] };
    const hashTagRegex = /#(\w+)/g;
    const squareBracketTagRegex = /\[\[\s*([^\\]]+?)\s*\]\]/g;
    let tags = [];
    let match;

    while ((match = hashTagRegex.exec(input)) !== null) {
        if (match[1] !== "ans") {
            tags.push(match[1].replaceAll("_", " "));
            input = input.replace(match[0], "");
        }
    }
    while ((match = squareBracketTagRegex.exec(input)) !== null) {
        tags.push(match[1].trim());
    }

    return {
        modifiedInput: input.trim(),
        tags: tags,
    };
}

export async function getLinkedBlocks() {
    if (!allData.linkedBlocks) allData.linkedBlocks = [];
    let blocks = await window.roamAlphaAPI.q(
        `[:find ?nodeUid ?nodeString :keys uid string :where [?tag :node/title "linkedBlock"] [?node :block/refs ?tag] [?node :block/uid ?nodeUid] [?node :block/string ?nodeString] ]`
    );
    
    let compiled = [];
    for (const block of blocks) {        
        let obj = {
            uid: block.uid,
            string: await formatVideoTimestampPatterns(block.string),
        };
        compiled.push(obj);
    }
    allData.linkedBlocks = compiled;
}