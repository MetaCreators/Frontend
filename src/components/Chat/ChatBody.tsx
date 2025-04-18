//import { OrbitingCircles } from "../magicui/orbiting-circles";
import ChatTextBox from "./ChatTextBox";
import { Orbiting } from "./Orbitting";

const ChatBody = () => {
  return (
      <div className="bg-chatOverlay min-h-screen font-sans my-2 mx-6 rounded-md relative flex flex-col">
          <div className="flex justify-center items-center text-4xl text-chatbg font-medium font-inclusive">
              Hi User, let's create something
          </div>
      <div className="flex-grow">
        <Orbiting/>
      </div>
      <div className="sticky bottom-0 w-full bg-chatOverlay/80 backdrop-blur-sm py-4">
        <ChatTextBox/>
      </div>
    </div>
  );
};

export default ChatBody;