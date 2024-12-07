import { Flex } from "antd"
import { Sidebar } from "../Sidebar/Sidebar"
import { Theme } from "../Theme/Theme"


export const Layout = () => {
    return (
        <Flex>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                {/* Main content*/}
                <Theme />
            </div>
        </Flex>
    )
}
