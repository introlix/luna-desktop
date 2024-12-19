import { Sidebar } from '@renderer/components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from 'react';

export const ChatDetails = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const { chatId } = useParams();

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const myHistory = await window.context.loadChatHistory(chatId || '');
                setChatHistory(myHistory);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, [])

    return (
        <>
            <div className="flex h-screen overflow-hidden bg-blue-50 dark:bg-gray-800">
                {/* Sidebar */}
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>
                {/* Main Content */}
                <div className="flex-1 w-full  overflow-y-auto">
                    <div className={`overflow-y-auto`}>
                        <div className="my-10 h-full">
                            {chatHistory.map((data, index) => (
                                <div key={index} className="flex w-full justify-center">
                                    <div className="lg:w-[50%] w-full lg:mx-0 mx-5">
                                        <div className="user_chat bg-slate-200 p-2 my-2 font-sans text-[1.1rem] rounded-lg">
                                           {data.userMessage}
                                        </div>
                                        <div className="ai_response p-2 my-2 font-sans bg-gray-100 rounded-lg overflow-auto">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {data.aiResponse}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
