import ChatBody from "@/components/Chat/ChatBody";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatNavbar from "@/components/Chat/ChatNavbar";

const Chat = () => {
 
  return (
    <div className="min-h-screen bg-chatbg font-sans py-2">
          <ChatNavbar />
          {/* <ChatBody Component={<InitialChatUI />} /> */}
          <ChatBody Component={ <ChatMessages/>} />
    </div>
  );
};

export default Chat;