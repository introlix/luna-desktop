import Layout from "antd/es/layout/layout"
import { ChatTool } from "../ChatTool/ChatTool"
import { Button, ConfigProvider, Input, Space } from "antd"
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

export const ChatInterface = () => {
    return (
        <>
            <Layout className="bg-transparent">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="md:w-full lg:w-1/2">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgBase: '#1f2937',
                                    colorText: '#ffffff',
                                },
                            }}
                        >
                        <ChatTool />
                        </ConfigProvider>

                    </div>
                </div>
                <div className="chat mx-2 mb-4 flex justify-center">
                    <Space direction="vertical" className="md:w-full lg:w-1/2">
                        <Space.Compact className="w-full">
                            <Button className="bg-blue-500 dark:bg-white outline-none border-none text-white dark:text-black py-5 text-2xl" icon={<MdOutlineFileUpload />} />
                            <Input className="dark:bg-slate-700 border-none placeholder-gray-300 py-2 dark:text-gray-200 outline-none" placeholder="Enter your message" />
                            <Button className="bg-blue-500 dark:bg-white outline-none border-none text-white dark:text-black py-5 text-2xl"><FaArrowRight /></Button>
                        </Space.Compact>
                    </Space>
                </div>
            </Layout>
        </>
    )
}
