import { useState } from "react";
import { LLMCard } from "../LLMCard/LLMCard";

export const Explore = () => {
    const [downloadingStatus, setDownloadingStatus] = useState({});

    const handleDownload = (modelName) => {
        setDownloadingStatus((prev) => ({
            ...prev,
            [modelName]: true, // Set downloading status to true for the specific LLM
        }));

        // // Simulate download completion after 3 seconds
        // setTimeout(() => {
        //     setDownloadingStatus((prev) => ({
        //         ...prev,
        //         [modelName]: false, // Reset the status after download
        //     }));
        // }, 3000);
    };

    const llms = [
        {
            modelName: "LLaMA 3.2-1B",
        },
        {
            modelName: "LLaMA 3.2-3B",
        },
        {
            modelName: "Grok",
        },
        {
            modelName: "Gemma 1B",
        },
        {
            modelName: "Mistral",
        },
        {
            modelName: "LLaMA 3.2-1B",
        },
        {
            modelName: "LLaMA 3.2-3B",
        },
        {
            modelName: "Grok",
        },
        {
            modelName: "Gemma 1B",
        },
        {
            modelName: "Mistral",
        },
        {
            modelName: "LLaMA 3.2-1B",
        },
        {
            modelName: "LLaMA 3.2-3B",
        },
        {
            modelName: "Grok",
        },
        {
            modelName: "Gemma 1B",
        },
        {
            modelName: "Mistral",
        },
        {
            modelName: "LLaMA 3.2-1B",
        },
        {
            modelName: "LLaMA 3.2-3B",
        },
        {
            modelName: "Grok",
        },
        {
            modelName: "Gemma 1B",
        },
        {
            modelName: "Mistral",
        },
    ];
    return (
        <>
            <div className="w-full px-4 bg-blue-50 dark:bg-gray-800">
                {llms.map((llm, index) => (
                    <LLMCard
                        key={index}
                        modelName={llm.modelName}
                        onDownload={() => handleDownload(llm.modelName)}
                        downloadProgress={10}
                        isDownloading={downloadingStatus[llm.modelName] || false}
                    />
                ))}
            </div>
        </>
    )
}
