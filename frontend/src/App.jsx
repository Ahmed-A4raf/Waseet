import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatWidget from "./components/ChatWidget";

import { AnimatePresence } from "framer-motion";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <div className="dark:bg-zinc-900 dark:text-zinc-50">
        <Navbar />
        <Outlet />

        {/* Chat Icon Button */}
        <button
          id="chat-toggle" 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/80 transition-all z-50"
        >
          <MessageCircle size={24} />
        </button>

        {/* Chat Window */}
        <AnimatePresence>
          {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default App;
