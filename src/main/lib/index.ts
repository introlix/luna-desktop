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
    fileName: string,
    onProgress: (percentage: number) => void
): Promise<void> => {
    const apiUrl = `https://huggingface.co/${userName}/${modelName}/resolve/main/${fileName}.gguf?download=true`;
    const savePath = path.join(getRootDir(), `${fileName}.gguf`);

    try {
        console.log(`Downloading ${fileName} from ${apiUrl}...`);

        // Fetch the file
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to download ${fileName}: ${response.statusText}`);
        }

        const contentLength = response.headers.get('Content-Length');
        if (!contentLength) {
            throw new Error('Unable to determine file size from response headers.');
        }

        const totalSize = parseInt(contentLength, 10);
        const readableStream = response.body;

        if (!readableStream) {
            throw new Error('No response body received from the server.');
        }

        const reader = readableStream.getReader();
        const fileStream = fs.createWriteStream(savePath);

        let downloadedSize = 0;
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            if (value) {
                downloadedSize += value.length;
                fileStream.write(Buffer.from(value));
                const percentage = Math.round((downloadedSize / totalSize) * 100);
                onProgress(percentage); // Call the progress callback
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

export const generate = async (name: string, prompt: string, onChunk: (chunk: string) => void) => {
    const pathToLLM = path.join(`${getRootDir()}`, `${name}.gguf`);

    const { getLlama, LlamaChatSession } = await import("node-llama-cpp");

    const llama = await getLlama();
    const model = await llama.loadModel({
        modelPath: pathToLLM,
    });

    const context = await model.createContext();
    const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
    });

    // Start streaming response with token callbacks
    await session.prompt(prompt, {
        onTextChunk(chunk: string) {
            onChunk(chunk); // Send the chunk to the provided callback
        },
    });
};


