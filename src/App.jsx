import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import { FlowersDataProvider } from "./components/FlowersDataContext";

function App() {
  return (
    <FlowersDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:flowerId" element={<Details />} />
      </Routes>
    </FlowersDataProvider>
  );
}

export default App;
