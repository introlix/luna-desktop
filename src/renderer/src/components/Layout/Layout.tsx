import { Flex } from "antd"
import { Sidebar } from "../Sidebar/Sidebar"
import { Theme } from "../Theme/Theme"
import { History } from "../Histroy/History"
import { LlmNotFound } from "../LlmNotFound/LlmNotFound"


export const Layout = () => {
    const llmfound = false;
    return (
        <Flex>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content w-full">
                {llmfound ?
                    <div className="flex">
                        <History />
                        <Theme />
                    </div> :
                    <LlmNotFound />}
            </div>
        </Flex>
    )
}
