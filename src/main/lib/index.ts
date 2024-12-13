import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os';
import { appDirectoryName } from '@shared/constants';
import { ensureDir, readdir } from 'fs-extra';
import { GetLLMs, LLMInfo } from '@shared/types';

export const getRootDir = () => {
    return `${homedir()}/${appDirectoryName}`
}

export const getLLMs: GetLLMs = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const llmFileName = await readdir(rootDir, {
        encoding: 'utf-8',
        withFileTypes: false,
    });

    const llms = llmFileName.filter((fileName) => fileName.endsWith('.gguf'));

    // Await the Promise.all to get the resolved values
    const resolvedLLMs = await Promise.all(llms.map(getLLMInfoFromFileName));

    return resolvedLLMs;
};


export const getLLMInfoFromFileName = async (filename: string): Promise<LLMInfo> => {
    
    return {
        title: filename.replace(/\.gguf$/, '')
    }
}

export const downloadLLM = async (
    userName: string,
    modelName: string,
    fileName: string
): Promise<void> => {
    const apiUrl = `https://huggingface.co/${userName}/${modelName}/resolve/main/${fileName}.md?download=true`;
    const savePath = path.join(getRootDir(), `${fileName}.gguf`);

    try {
        console.log(`Downloading ${fileName} from ${apiUrl}...`);

        // Fetch the file
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to download ${fileName}: ${response.statusText}`);
        }

        const readableStream = response.body;

        if (!readableStream) {
            throw new Error('No response body received from the server.');
        }

        // Manually read the web ReadableStream and pipe it to the file
        const reader = readableStream.getReader();
        const fileStream = fs.createWriteStream(savePath);

        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            if (value) {
                fileStream.write(Buffer.from(value));
            }
            done = streamDone;
        }

        fileStream.close();
        console.log(`Successfully downloaded and saved ${fileName} to ${savePath}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error downloading LLM: ${error.message}`);
        } else {
            console.error(`Unexpected error downloading LLM: ${String(error)}`);
        }
        throw error;
    }
};