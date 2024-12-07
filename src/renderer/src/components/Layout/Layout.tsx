import { Flex } from "antd"
import { Sidebar } from "../Sidebar/Sidebar"


export const Layout = () => {
    return (
        <Flex>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                {/* Main content*/}
            </div>
        </Flex>
    )
}
