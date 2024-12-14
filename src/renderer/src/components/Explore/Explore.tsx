import { useState } from "react";
import { LLMCard } from "../LLMCard/LLMCard";
import models from "@shared/supported_models";

export const Explore = () => {
    const [downloadingStatus, setDownloadingStatus] = useState({});
    const [downloadProgress, setDownloadProgress] = useState({});

    const handleDownload = async (userName, modelName, fileName) => {
        // Set initial downloading state and progress
        setDownloadingStatus((prev) => ({
            ...prev,
            [modelName]: true,
        }));
        setDownloadProgress((prev) => ({
            ...prev,
            [modelName]: 0,
        }));

        try {
            await window.context.downloadLLM(userName, modelName, fileName, (progress) => {
                // Update progress dynamically
                setDownloadProgress((prev) => ({
                    ...prev,
                    [modelName]: progress,
                }));
            });

            alert(`${modelName} downloaded successfully!`);
        } catch (error) {
            console.error(`Failed to download ${modelName}:`, error);
            alert(`Failed to download ${modelName}.`);
        } finally {
            // Reset download state
            setDownloadingStatus((prev) => ({
                ...prev,
                [modelName]: false,
            }));
            setDownloadProgress((prev) => ({
                ...prev,
                [modelName]: undefined, // Clear progress after completion
            }));
        }
    };

    return (
        <div className="w-full px-4 bg-blue-50 dark:bg-gray-800">
            {models.map((llm, index) => (
                <LLMCard
                    key={index}
                    modelName={llm.modelName}
                    onDownload={() => handleDownload(llm.userName, llm.modelName, llm.fileName)}
                    downloadProgress={downloadProgress[llm.modelName] || 0} // Pass progress dynamically
                    isDownloading={downloadingStatus[llm.modelName] || false} // Pass downloading state
                />
            ))}
        </div>
    );
};