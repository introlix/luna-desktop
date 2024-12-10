import { Sidebar } from "../Sidebar/Sidebar";
import { History } from "../Histroy/History";
import { LlmNotFound } from "../LlmNotFound/LlmNotFound";
import { ChatInterface } from "../ChatInterface/ChatInterface";


export const Layout = () => {
    const llmfound = true;
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
                        <ChatInterface />
                    </div>
                ) : (
                    <LlmNotFound />
                )}
            </div>
        </div>
    )
}
