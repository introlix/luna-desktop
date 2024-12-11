import { Explore } from "@renderer/components/Explore/Explore";
import { Sidebar } from "@renderer/components/Sidebar/Sidebar";


export const ExploreLLM = () => {
    const llmfound = true;
    return (
        <div className="flex h-screen overflow-hidden bg-blue-50 dark:bg-gray-800">
            {/* Sidebar */}
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${llmfound ? "" : "w-full"} overflow-y-auto`}>
                <Explore />
            </div>
        </div>
    )
}
