import Layout from "antd/es/layout/layout";
import { ChatTool } from "../ChatTool/ChatTool";
import { Button, ConfigProvider, Input, Space } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";

const generate_response = async (name: string, prompt: string) => {
    if (window.context?.generate) {
        await window.context.generate(name, prompt);
    } else {
        console.error("Window context or generate function is not defined");
    }
};

export const ChatInterface = ({ fetchedLLMs }) => {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const onSubmit = () => {
        if (!prompt.trim()) {
            alert("Please enter a valid prompt!");
            return;
        }
        if (!selectedModel) {
            alert("Please select a model!");
            return;
        }
        generate_response(selectedModel, prompt);
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
