import { Route, Routes } from "react-router-dom";
import { Chat } from "./Chat";
import { ExploreLLM } from "./ExploreLLM";


function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/explore" element={<ExploreLLM />} />
      </Routes>
    </>
  )
}

export default App
