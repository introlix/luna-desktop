import { useState } from "react";
import { LLMCard } from "../LLMCard/LLMCard";
// import models from "../../../../shared/supported_models";
import models from "@shared/supported_models";


export const Explore = () => {
    const [downloadingStatus, setDownloadingStatus] = useState({});

    const handleDownload = async (userName, modelName, fileName) => {
        setDownloadingStatus((prev) => ({
            ...prev,
            [modelName]: true, // Set downloading status to true for the specific LLM
        }));

        console.log(userName, modelName, fileName);

        await window.context.downloadLLM(userName, modelName, fileName);

        setDownloadingStatus((prev) => ({
            ...prev,
            [modelName]: false,
        }));
    };

    return (
        <>
            <div className="w-full px-4 bg-blue-50 dark:bg-gray-800">
                {models.map((llm, index) => (
                    <LLMCard
                        key={index}
                        modelName={llm.modelName}
                        onDownload={() => handleDownload(llm.userName, llm.modelName, llm.fileName)}
                        downloadProgress={10}
                        isDownloading={downloadingStatus[llm.value] || false}
                    />
                ))}
            </div>
        </>
    )
}
