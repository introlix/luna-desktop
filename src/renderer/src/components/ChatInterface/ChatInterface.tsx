import { useState, useEffect } from "react";
import Layout from "antd/es/layout/layout";
import { ChatTool } from "../ChatTool/ChatTool";
import { Button, ConfigProvider, Input, Space } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatInterface = ({ fetchedLLMs }) => {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState("");
    const [isResponseComplete, setIsResponseComplete] = useState(false); // Track if the response is complete
    const [disableSubmit, setDisableSubmit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (prompt === "") {
            setDisableSubmit(true);
        }
        else {
            setDisableSubmit(false);
        }
    }, [prompt])


    useEffect(() => {
        const handleChunk = (event: Event) => {
            const chunk = (event as CustomEvent).detail;
            setAiResponse((prevResponse) => prevResponse + chunk); // Append the current chunk to the response
        };

        const handleComplete = () => {
            setIsResponseComplete(true);
        };

        // Attach listeners
        window.addEventListener("generationChunk", handleChunk);
        window.addEventListener("generationComplete", handleComplete);

        return () => {
            // Cleanup listeners on component unmount
            window.removeEventListener("generationChunk", handleChunk);
            window.removeEventListener("generationComplete", handleComplete);
        };
    }, []);


    const onSubmit = async () => {
        setDisableSubmit(true);
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
            // setAiResponse(""); // Clear the response before new chunks are received
            setIsResponseComplete(false); // Reset the completion flag
        } catch (error) {
            console.error("Error in submission:", error);
        }

        setPrompt(""); // Clear the input field after submission
    };

    useEffect(() => {
        if (isResponseComplete) {
            // When the response is complete, save the chat history
            const chatId = uuidv4();  // Replace with your dynamic chat ID
            if (prompt && aiResponse) {
                window.context.saveChatHistory(chatId, prompt, aiResponse, selectedModel || ''); // Save user prompt and AI response
            }
            setDisableSubmit(false);
            navigate(`/chat/${chatId}`);
            // setAiResponse(""); // Reset AI response after saving
        }
    }, [isResponseComplete, aiResponse, prompt]);

    return (
        <>
            <Layout className="bg-transparent">
                {aiResponse == '' ?
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
                    </div> :
                    <div className="my-10 h-full">
                        <div className="flex w-full justify-center">
                            <div className="lg:w-[50%] w-full lg:mx-0 mx-5">
                                <div className="user_chat bg-slate-200 p-2 my-2 font-sans text-[1.1rem] rounded-lg">
                                    {prompt}
                                </div>
                                <div className="ai_response p-2 my-2 font-sans bg-gray-100 rounded-lg overflow-auto">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {aiResponse}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className="chat mx-2 mb-4 flex justify-center">
                    <Space direction="vertical" className="w-1/2 fixed bottom-5">
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
                                disabled={disableSubmit}
                                className={`${disableSubmit ? 'bg-blue-400 dark:dark:bg-gray-200' : 'bg-blue-500 dark:bg-white'} outline-none border-none text-white dark:text-black py-5 text-2xl`}
                                icon={<FaArrowRight />}
                            />
                        </Space.Compact>
                    </Space>
                </div>
            </Layout>
        </>
    );
};
