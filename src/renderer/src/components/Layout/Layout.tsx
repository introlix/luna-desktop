import { Sidebar } from "../Sidebar/Sidebar";
import { History } from "../Histroy/History";
import { LlmNotFound } from "../LlmNotFound/LlmNotFound";
import { ChatInterface } from "../ChatInterface/ChatInterface";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

interface LlmInfo {
    label: string;
    value: string;
}

const loadLLMs = async (): Promise<{ label: string; value: string }[]> => {
    const llms = await window.context.getLLMs();

    const mappedOptions = llms.map((llm) => ({
        label: llm.title,
        value: llm.title,
    }));

    return mappedOptions;
}

async function checkIfEmpty(promise: Promise<object[]>): Promise<boolean> {
    const result = await promise;
    return result.length === 0;
}

export const Layout = () => {
    const [llmfound, setLlmfound] = useState(false);
    const [llms, setLLMs] = useState<LlmInfo[]>([]);

    useEffect(() => {
        (async () => {
            const isEmpty = await checkIfEmpty(loadLLMs());
            setLlmfound(!isEmpty); // Update the state
        })();
        const fetchLLMs = async () => {
            try {
                const loadedLLMs = await loadLLMs();
                setLLMs(loadedLLMs);
            } catch (error) {
                console.error('Error loading LLMs:', error);
            }
        };

        if (llmfound) {
            fetchLLMs();
        }
    }, [llmfound]);
    return (
        <div className="flex h-screen overflow-hidden bg-blue-50 dark:bg-gray-800">
            {/* Sidebar */}
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${llmfound ? "" : "w-full"} overflow-y-auto`}>
                {llmfound ? (
                    <div className="flex w-full">
                        <div className="sticky top-0 h-screen">
                            <History />
                        </div>
                        <ChatInterface fetchedLLMs={llms} />
                    </div>
                ) : (
                    <LlmNotFound />
                )}
            </div>
        </div>
    )
}
