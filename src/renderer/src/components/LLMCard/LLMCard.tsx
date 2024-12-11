import { Button, Card, Flex, Progress } from "antd"
import { MdCancel } from "react-icons/md"

export const LLMCard = ({ modelName, onDownload, downloadProgress, isDownloading }) => {
    return (
        <>
            <Card
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 my-4 bg-transparent"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">{modelName}</h3>
                    {isDownloading ?
                        <div className="w-full flex justify-end">
                            <Progress className="w-1/2"
                                strokeColor="#3b82f6"
                                trailColor="#fff"
                                showInfo={false}
                                percent={downloadProgress} status="active" />

                            <button
                                className="text-xl bg-transparent border-none hover:text-blue-500 duration-75"
                            >
                                <MdCancel />
                            </button>

                        </div>
                        : <Button
                            type="primary"
                            size="small"
                            className="bg-blue-500 hover:bg-blue-600 text-xs px-3"
                            onClick={onDownload}
                        >
                            Download
                        </Button>}
                </div>
            </Card>
        </>
    )
}
