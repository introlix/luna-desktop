import { Button, Card } from "antd"
import not_llm_found_image from "../../assets/no_llm_found.png"
import { Link } from "react-router-dom"

export const LlmNotFound = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-800 w-full">
                <Card
                    cover={<img src={not_llm_found_image} alt="No LLM Found" />}
                    className="flex flex-col items-center justify-center p-4 bg-transparent border-none"
                    style={{ width: 300 }}
                >
                    <Button
                        type="primary"
                        className="mt-4"
                    >
                        <Link to={'/explore'}>
                            Explore & Download LLMs
                        </Link>
                    </Button>
                </Card>
            </div>

        </>
    )
}
