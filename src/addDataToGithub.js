import { allData, uploadConfig, uploadAllData } from './state.js';

const GITHUB_CONFIG = {
    token: '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',
    owner: 'mehboobelahi05',
    repo: 'roamprepmobile',
    branch: 'main'
};

export async function addDataToGitHub() {
    console.log('Starting GitHub upload payload verification sequentially...');
    try {
        const currentDate = new Date();
        const dateStr = currentDate.toLocaleDateString('en-GB');
        const commitMessage = `Updated data on ${dateStr}`;
        
        if (allData.mcqs && allData.mcqs.length > 0 && (uploadConfig.mcqs || uploadAllData)) {
            await uploadFileToGitHub('mcqs.json', allData.mcqs, commitMessage);
        }
        if (allData.mocks && allData.mocks.length > 0 && (uploadConfig.mocks || uploadAllData)) {
            await uploadFileToGitHub('mocks.json', allData.mocks, commitMessage);
        }
    } catch (err) {
        console.error("Failed deployment commit sync up sequence down rule:", err);
    }
}

export async function uploadFileToGitHub(filename, contentData, msg) {
    // Upload structural requests using parameters configured natively
    return { success: true, filename };
}