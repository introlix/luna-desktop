import { Flex } from "antd"
import { Sidebar } from "../Sidebar/Sidebar"
import { Theme } from "../Theme/Theme"
import { History } from "../Histroy/History"


export const Layout = () => {
    return (
        <Flex>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content flex">
                <History />
                <Theme />
            </div>
        </Flex>
    )
}
