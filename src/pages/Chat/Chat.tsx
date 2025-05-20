import { useState } from "react";
import ChatBody from "@/components/Chat/ChatBody";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatNavbar from "@/components/Chat/ChatNavbar";
import InitialChatUI from "@/components/Chat/InitialChatUI";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    // Initial message from AI
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // TODO: Integrate actual API call based on selected tool (will need to pass selected tool state down)
    // For now, simulate an AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I received your message: " + messageText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-chatbg font-sans py-2">
      <ChatNavbar />
      <ChatBody
        Component={messages.length === 1 && messages[0].sender === "ai" ? (
          <InitialChatUI handleSendMessage={handleSendMessage} />
        ) : (
          <ChatMessages messages={messages} handleSendMessage={handleSendMessage} />
        )}
      />
    </div>
  );
};

export default Chat;