import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Chat from "./pages/Chat";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
