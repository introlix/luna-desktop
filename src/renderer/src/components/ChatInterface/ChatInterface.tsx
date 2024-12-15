import Layout from "antd/es/layout/layout";
import { ChatTool } from "../ChatTool/ChatTool";
import { Button, ConfigProvider, Input, Space } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState, useEffect } from "react";

export const ChatInterface = ({ fetchedLLMs }: { fetchedLLMs: string[] }) => {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState("");

    useEffect(() => {
        // Listener for each chunk received from the backend
        const handleChunk = (event: Event) => {
            const chunk = (event as CustomEvent).detail;
            setAiResponse((prevResponse) => prevResponse + chunk); // Append the current chunk to the response
        };

        // Listen for generation chunk events
        window.addEventListener("generationChunk", handleChunk);

        return () => {
            // Cleanup the listener on component unmount
            window.removeEventListener("generationChunk", handleChunk);
        };
    }, []);

    const onSubmit = async () => {
        if (!prompt.trim()) {
            alert("Please enter a valid prompt!");
            return;
        }
        if (!selectedModel) {
            alert("Please select a model!");
            return;
        }

        try {
            await window.context.generate(selectedModel, prompt); // Initiate the generation process
            setAiResponse(""); // Clear the response before new chunks are received
        } catch (error) {
            console.error("Error in submission:", error);
        }

        setPrompt(""); // Clear the input field after submission
    };

    return (
        <>
            <Layout className="bg-transparent">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="md:w-full lg:w-1/2">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgBase: "#1f2937",
                                    colorText: "#ffffff",
                                },
                            }}
                        >
                            <ChatTool
                                modelToSelect={fetchedLLMs}
                                setSelectedModel={setSelectedModel}
                            />
                        </ConfigProvider>
                    </div>
                </div>
                <h1>{aiResponse}</h1> {/* Display the live updated response */}
                <div className="chat mx-2 mb-4 flex justify-center">
                    <Space direction="vertical" className="md:w-full lg:w-1/2">
                        <Space.Compact className="w-full">
                            <Button
                                className="bg-blue-500 dark:bg-white outline-none border-none text-white dark:text-black py-5 text-2xl"
                                icon={<MdOutlineFileUpload />}
                            />
                            <Input
                                className="dark:bg-slate-700 border-none placeholder-gray-300 py-2 dark:text-gray-200 outline-none"
                                placeholder="Enter your message"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <Button
                                onClick={onSubmit}
                                className="bg-blue-500 dark:bg-white outline-none border-none text-white dark:text-black py-5 text-2xl"
                                icon={<FaArrowRight />}
                            />
                        </Space.Compact>
                    </Space>
                </div>
            </Layout>
        </>
    );
};
