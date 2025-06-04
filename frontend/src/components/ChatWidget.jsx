import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const contextRef = useRef(null);
  const widgetRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ Close on outside click, but ignore #chat-toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isToggleBtn = event.target.closest("#chat-toggle");
      if (isToggleBtn) return;

      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // ✅ Load messages if logged in, or start new conversation
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chat_messages");

    if (isLoggedIn && savedMessages) {
      setMessages(JSON.parse(savedMessages));
      return;
    }

    const startConversation = async () => {
      try {
        const res = await fetch("https://6727-102-189-87-56.ngrok-free.app/start_conversation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const initialMsg = [{ from: "bot", text: data.message }];
        setMessages(initialMsg);
        if (isLoggedIn) {
          sessionStorage.setItem("chat_messages", JSON.stringify(initialMsg));
        }
      } catch (err) {
        const failMsg = [{ from: "bot", text: "❌ Failed to connect to server." }];
        setMessages(failMsg);
        if (isLoggedIn) {
          sessionStorage.setItem("chat_messages", JSON.stringify(failMsg));
        }
      }
    };

    startConversation();
  }, [isLoggedIn]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      if (isLoggedIn) sessionStorage.setItem("chat_messages", JSON.stringify(updated));
      return updated;
    });
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("https://6727-102-189-87-56.ngrok-free.app/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          context: contextRef.current,
        }),
      });

      const data = await res.json();
      if (data.context) {
        contextRef.current = data.context;
      }

      const botReply = {
        from: "bot",
        text: data.answer || data.message || "🤖 No response",
      };

      setMessages((prev) => {
        const updated = [...prev, botReply];
        if (isLoggedIn) sessionStorage.setItem("chat_messages", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      const errorMsg = { from: "bot", text: "⚠️ Server error. Please try again later." };
      setMessages((prev) => {
        const updated = [...prev, errorMsg];
        if (isLoggedIn) sessionStorage.setItem("chat_messages", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <motion.div
      ref={widgetRef}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-20 right-5 w-80 h-4/6 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-zinc-700"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold">AI Assistant</h2>
            <p className="text-xs text-white/80">Always here to help</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-gray-50 dark:bg-zinc-900">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.from === "bot" ? "justify-start" : "justify-end"
              } items-start gap-2`}
            >
              {msg.from === "bot" && (
                <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-1.5 rounded-lg">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                  msg.from === "bot"
                    ? "bg-white dark:bg-zinc-800 text-left shadow-sm"
                    : "bg-gradient-to-r from-primary to-primary-dark text-white"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-start gap-2"
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-1.5 rounded-lg">
                <Bot size={16} />
              </div>
              <div className="bg-white dark:bg-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white dark:bg-zinc-800 border-t dark:border-zinc-700">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-900 rounded-xl px-3 py-2">
          <input
            className="flex-1 bg-transparent text-sm outline-none dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button 
            onClick={handleSend} 
            className="text-primary hover:text-primary-dark transition-colors p-1.5"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWidget;











// import React, { useState, useEffect, useRef } from "react";
// import { X, Send, Bot } from "lucide-react";
// import { motion } from "framer-motion";

// const ChatWidget = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const scrollRef = useRef();
//   const contextRef = useRef(null);
//   const widgetRef = useRef(null);

//   // ✅ Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const isToggleBtn = event.target.closest("#chat-toggle");
//       if (isToggleBtn) return;

//       if (widgetRef.current && !widgetRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   // ✅ Load chat from localStorage
//   useEffect(() => {
//     const savedMessages = localStorage.getItem("chat_messages");
//     const savedContext = localStorage.getItem("chat_context");

//     if (savedContext) contextRef.current = JSON.parse(savedContext);

//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//       return;
//     }

//     const startConversation = async () => {
//       try {
//         const res = await fetch("https://6727-102-189-87-56.ngrok-free.app/start_conversation", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//         });
//         const data = await res.json();
//         const initialMsg = [{ from: "bot", text: data.message }];
//         setMessages(initialMsg);
//         localStorage.setItem("chat_messages", JSON.stringify(initialMsg));
//       } catch (err) {
//         const failMsg = [{ from: "bot", text: "❌ Failed to connect to server." }];
//         setMessages(failMsg);
//         localStorage.setItem("chat_messages", JSON.stringify(failMsg));
//       }
//     };

//     startConversation();
//   }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { from: "user", text: input };
//     setMessages((prev) => {
//       const updated = [...prev, userMessage];
//       localStorage.setItem("chat_messages", JSON.stringify(updated));
//       return updated;
//     });
//     setInput("");
//     setTyping(true);

//     try {
//       const res = await fetch("https://6727-102-189-87-56.ngrok-free.app/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: input,
//           context: contextRef.current,
//         }),
//       });

//       const data = await res.json();
//       if (data.context) {
//         contextRef.current = data.context;
//         localStorage.setItem("chat_context", JSON.stringify(data.context));
//       }

//       const botReply = {
//         from: "bot",
//         text: data.answer || data.message || "🤖 No response",
//       };

//       setMessages((prev) => {
//         const updated = [...prev, botReply];
//         localStorage.setItem("chat_messages", JSON.stringify(updated));
//         return updated;
//       });
//     } catch (err) {
//       const errorMsg = { from: "bot", text: "⚠️ Server error. Please try again later." };
//       setMessages((prev) => {
//         const updated = [...prev, errorMsg];
//         localStorage.setItem("chat_messages", JSON.stringify(updated));
//         return updated;
//       });
//     } finally {
//       setTyping(false);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   return (
//     <motion.div
//       ref={widgetRef}
//       initial={{ opacity: 0, y: 50, scale: 0.8 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 50, scale: 0.8 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       className="fixed bottom-20 right-5 w-80 h-4/6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg z-50 flex flex-col overflow-hidden"
//     >
//       {/* Header */}
//       <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
//         <h2 className="text-sm font-semibold">Chatbot</h2>
//         <div className="flex items-center gap-2">
//           <button
//             title="Clear chat"
//             onClick={() => {
//               localStorage.removeItem("chat_messages");
//               localStorage.removeItem("chat_context");
//               setMessages([]);
//               contextRef.current = null;
//             }}
//             className="text-white text-xs rounded px-2 py-1"
//           >
//             🧹
//           </button>
//           <button onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.from === "bot" ? "justify-start" : "justify-end"
//             } items-start gap-2`}
//           >
//             {msg.from === "bot" && (
//               <div className="bg-primary text-white p-1 rounded-full">
//                 <Bot size={16} />
//               </div>
//             )}
//             <div
//               className={`max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap ${
//                 msg.from === "bot"
//                   ? "bg-zinc-200 dark:bg-zinc-700 text-left"
//                   : "bg-primary text-white"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {typing && (
//           <div className="flex justify-start items-start gap-2">
//             <div className="bg-primary text-white p-1 rounded-full">
//               <Bot size={16} />
//             </div>
//             <div className="bg-zinc-200 dark:bg-zinc-700 px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-300">
//               Thinking...
//             </div>
//           </div>
//         )}
//         <div ref={scrollRef}></div>
//       </div>

//       {/* Input */}
//       <div className="p-2 border-t dark:border-zinc-700 flex items-center gap-2">
//         <input
//           className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none"
//           placeholder="Message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend} className="text-primary">
//           <Send size={18} />
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default ChatWidget;
