import { useState } from "react";
import { LLMCard } from "../LLMCard/LLMCard";
// import models from "../../../../shared/supported_models";
import models from "@shared/supported_models";

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

    return (
        <>
            <div className="w-full px-4 bg-blue-50 dark:bg-gray-800">
                {models.map((llm, index) => (
                    <LLMCard
                        key={index}
                        modelName={llm.name}
                        onDownload={() => handleDownload(llm.name)}
                        downloadProgress={10}
                        isDownloading={downloadingStatus[llm.name] || false}
                    />
                ))}
            </div>
        </>
    )
}
