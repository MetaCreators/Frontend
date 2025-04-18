import ChatBody from "@/components/Chat/ChatBody";
import ChatNavbar from "@/components/Chat/ChatNavbar";

const Chat = () => {
 
  return (
    <div className="min-h-screen bg-chatbg font-sans py-2">
          <ChatNavbar />
          <ChatBody/>
    </div>
  );
};

export default Chat;