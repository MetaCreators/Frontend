//import { OrbitingCircles } from "../magicui/orbiting-circles";
import ChatTextBox from "./ChatTextBox";
import { Orbiting } from "./Orbitting";

const ChatBody = () => {
 
  return (
      <div className="bg-chatOverlay min-h-screen font-sans my-2 mx-6 rounded-md justify-center">
        <Orbiting/>
        <ChatTextBox/>
    </div>
  );
};

export default ChatBody;