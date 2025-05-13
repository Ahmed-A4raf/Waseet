import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot } from "lucide-react";

const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();

  // Start new conversation
  useEffect(() => {
    const startConversation = async () => {
      try {
        const res = await fetch("https://89db-102-189-85-35.ngrok-free.app/start_conversation", {
          method: "POST",
        //   credentials: "include", // To keep session
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setMessages([{ from: "bot", text: data.message }]);
      } catch (err) {
        setMessages([{ from: "bot", text: "❌ Failed to connect to server." }]);
      }
    };

    startConversation();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("https://89db-102-189-85-35.ngrok-free.app/ask", {
        method: "POST",
        // credentials: "include", // Session is needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botReply = { from: "bot", text: data.answer };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Server error. Please try again later." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="fixed bottom-20 right-5 w-80 h-96 bg-white dark:bg-zinc-800 rounded-xl shadow-lg z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
        <h2 className="text-sm font-semibold">Chatbot</h2>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "bot" ? "justify-start" : "justify-end"
            } items-start gap-2`}
          >
            {msg.from === "bot" && (
              <div className="bg-primary text-white p-1 rounded-full">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap ${
                msg.from === "bot"
                  ? "bg-zinc-200 dark:bg-zinc-700 text-left"
                  : "bg-primary text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start items-start gap-2">
            <div className="bg-primary text-white p-1 rounded-full">
              <Bot size={16} />
            </div>
            <div className="bg-zinc-200 dark:bg-zinc-700 px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-300">
              Thinking...
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <div className="p-2 border-t dark:border-zinc-700 flex items-center gap-2">
        <input
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="text-primary">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
