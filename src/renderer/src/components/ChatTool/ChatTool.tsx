import { Layout, Select } from "antd"

export const ChatTool = ({ modelToSelect, setSelectedModel }) => {

    const taskToSelect = [
        { label: 'Text Summarization', value: 'Text Summarization' },
        { label: 'Question Answering', value: 'Question Answering' },
        { label: 'Code Generation', value: 'Code Generation' },
        { label: 'Translation', value: 'Translation' },
    ]
    const handleModelChange = (value) => {
        console.log('Selected Model:', value); // Logs the selected value
        setSelectedModel(value); // Updates state with the selected value
    };

    const handleTaskChange = () => {

    }
    return (
        <>
            <Layout className="dark:bg-gray-700 bg-blue-100 md:mx-2 lg:mx-0 rounded-lg">
                <div className="flex items-center justify-center">
                    <Select
                        placeholder="Select a model"
                        className="w-full mx-2 my-2 rounded-lg bg-white dark:bg-gray-800"
                        onChange={handleModelChange}
                        options={modelToSelect}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Select
                        placeholder="Select a task"
                        className="w-full mx-2 my-2 rounded-lg bg-white dark:bg-gray-800 dark_mode"
                        onChange={handleTaskChange}
                        options={taskToSelect}
                    />
                </div>
            </Layout>
        </>
    )
}
