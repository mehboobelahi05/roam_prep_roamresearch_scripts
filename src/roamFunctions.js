export async function getBlockInfo(uid, isShowConsole = false) {
    try {
        if (uid.indexOf("((") != -1) uid = uid.slice(2, -2);
        var block = await window.roamAlphaAPI.q(`
            [:find (pull ?block [
                :block/string
                :block/uid
                :block/heading
                :block/order
                {:block/children [:block/string :block/uid :block/heading :block/order {:block/children ...}]}
            ])
            :where [?block :block/uid "${uid}"]]
        `);
        block = block.length ? block : null;
        if (block) block = block[0][0];
        if (isShowConsole) console.log("block::", block);
        return block;
    } catch (error) {
        console.error("Error in getBlockInfo: ", error);
        return null;
    }
}

export async function sortBasedOnOrder(arr) {
    try {
        if (!arr) return [];
        return arr.sort((a, b) => a.order - b.order);
    } catch {
        return arr || [];
    }
}

export async function getPageInfoByPageTitle(title) {
    try {
        let query = `[:find (pull ?e [:block/uid :block/string {:block/children [:block/uid :block/string :block/order]}])
                     :where [?e :node/title "${title}"]]`;
        let block = await window.roamAlphaAPI.q(query);
        return block ? block[0][0] : null;
    } catch (error) {
        console.log("Error title: ", title);
        console.error("Error in getPageInfoByPageTitle: ", error);
        return null;
    }
}

export function generateUid() {
    return window.roamAlphaAPI.util.generateUID();
}

export async function createBlock(parentUid, blockString, order = "last") {
    parentUid = parentUid.replace("((", "").replace("))", "");
    let uid = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": parentUid, "order": order },
        block: { string: blockString, uid: uid }
    });
    console.log("uid::", uid);
    return uid;
}

export function deleteBlock(uid) {
    try {
        window.roamAlphaAPI.deleteBlock({ block: { uid: uid } });
        console.log("Block deleted");
    } catch (error) {
        console.error("Error deleting block:", error);
    }
}

export async function replaceStringInBlock(blockUid, string, replaceWith) {
    const block = await window.roamAlphaAPI.q(`
        [:find ?string
         :where
           [?b :block/string ?string]
           [(clojure.string/includes? ?string "${string}")]
           [?b :block/uid ${blockUid}]]`);
    
    if (block && block[0]) {
        const newString = block[0][1].string.replace(string, replaceWith);
        await window.roamAlphaAPI.updateBlock({
            block: { uid: blockUid, string: newString }
        });
    }
}

export function getTodayDNP() {
    const today = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = today.getDate();
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    
    return `${month} ${day}${suffix}, ${year}`;
}