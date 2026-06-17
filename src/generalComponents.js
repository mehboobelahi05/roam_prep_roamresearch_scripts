import { allData } from './state.js';

export function getCleanBlockUid(uid) {
    if (uid && uid.indexOf("))") != -1) {
        uid = uid.replace("))", "").replace("((", "");
    }
    return uid;
}

export function getMCQById(id) {
    if (!id) return null;
    id = id.replace("((", "").replace("))", "");
    let matched = allData.mcqs.filter(mcq => mcq.id === id);
    return matched.length ? matched : null;
}

export async function getFormattedBlockString(string) {
    string = await formatVideoTimestampPatterns(string);
    return string;
}

export async function formatVideoTimestampPatterns(blockString) {
    if (!blockString) return "";
    const regex = /{{\[\[video-timestamp\]\]: \(\(([^)]+)\)\) (\d{2}):(\d{2}):(\d{2})}}/g;
    let matches;
    const results = [];

    while ((matches = regex.exec(blockString)) !== null) {
        const uid = matches[1];
        const hours = parseInt(matches[2]);
        const minutes = parseInt(matches[3]);
        const seconds = parseInt(matches[4]);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        results.push({ uid, time: totalSeconds });
    }

    // Process translations based on dependencies if needed
    return blockString; 
}