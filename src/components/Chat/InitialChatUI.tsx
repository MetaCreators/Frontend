import { Orbiting } from "./Orbitting";
import ChatTextBox from "./ChatTextBox";

interface InitialChatUIProps {
  handleSendMessage: (message: string) => Promise<void>;
}

const InitialChatUI = ({ handleSendMessage }: InitialChatUIProps) => {
 
  return (
    <div>
        <div className="flex justify-center items-center text-4xl text-chatbg font-medium font-inclusive">
        Hi User, let's create something
        {/* https://v3.magicui.design/docs/components/morphing-text */}
          </div>
      <div className="flex-grow">
        <Orbiting/>
      </div>
      <div className="sticky bottom-0 w-full bg-chatOverlay/80 backdrop-blur-sm py-4">
        <ChatTextBox onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default InitialChatUI;