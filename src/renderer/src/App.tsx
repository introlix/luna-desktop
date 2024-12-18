import { Route, Routes } from "react-router-dom";
import { Chat } from "./Chat";
import { ExploreLLM } from "./ExploreLLM";
import { ChatDetails } from "./chat/ChatDetails";


function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/explore" element={<ExploreLLM />} />
        <Route path="/chat/:chatId" element={<ChatDetails />} />
      </Routes>
    </>
  )
}

export default App
