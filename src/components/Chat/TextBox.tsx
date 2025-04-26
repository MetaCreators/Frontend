
import { Plus, Send } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface TextBoxProps {
  onSend: (message: string) => void;
}

const TextBox = ({ onSend }: TextBoxProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative flex items-center bg-black rounded-lg p-2">
        <button
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Add content"
        >
          <Plus className="w-6 h-6 text-[#1EAEDB] fill-white" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white placeholder-white placeholder:font-poppins font-poppins outline-none px-4"
        />
        
        <button
          onClick={handleSend}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Send message"
        >
          <Send className="w-6 h-6 text-[#1EAEDB]" />
        </button>
      </div>
    </div>
  );
};

export default TextBox;