import { useState } from "react";
import ChatTextBox from "./ChatTextBox";
import { ChevronDown, Send, User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing your request. This is a simulated response.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">

      <div className="flex space-x-3 items-center justify-between w-full border px-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex space-x-4 bg-toolsbg p-1 rounded-md border-2 border-black shadow-2xl">
            <div>
            Tools
            </div>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-toolsbg">
             <DropdownMenuItem>Thumbnail</DropdownMenuItem>
            <DropdownMenuItem>Script generator</DropdownMenuItem>
            <DropdownMenuItem>Description generator</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-black p-4 flex items-center justify-center w-1/2">
          <div className="flex borer border-2 px-4 py-1 rounded-md justify-center items-center space-x-4">
            <div>
              Lito is online
            </div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </div>
        <div>

        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
           { message.sender === "ai" && <img
                src="/lito_head.png"
                alt="lito"
                className="w-12 h-12"
              />}
            <div
              className={`max-w-[70%] rounded-2xl p-3 border border-black shadow-xl ${
                message.sender === "user"
                  ? "bg-usermsg text-gray-800 rounded-tr-none"
                  : "bg-botmsg text-gray-800 rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
             { message.sender === "user" && <User2Icon  className="w-6 h-6"/>}
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="sticky bottom-0 w-full bg-chatOverlay/80 backdrop-blur-sm p-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const input = e.target as HTMLInputElement;
                handleSendMessage(input.value);
                input.value = "";
              }
            }}
          />
          <button
            className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement;
              handleSendMessage(input.value);
              input.value = "";
            }}
          >
            <Send size={20} />
          </button>
        </div>
          </div>
          <ChatTextBox/>
    </div>
  );
};

export default ChatMessages;