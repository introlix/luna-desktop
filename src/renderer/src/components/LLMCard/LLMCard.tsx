import { Button, Card, Progress } from "antd"


export const LLMCard = ({ modelName, onDownload, downloadProgress, isDownloading }) => {
    return (
        <>
            <Card
                className="w-full rounded-lg border border-gray-300 my-4 bg-transparent"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">{modelName}</h3>
                    {isDownloading ? <Progress className="w-1/2"
                        strokeColor="#3b82f6"
                        trailColor="#fff"
                        percent={downloadProgress} status="active" />
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
