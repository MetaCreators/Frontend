import React, { ReactNode } from "react";

interface ChatBodyProps {
  Component: ReactNode;
}

const ChatBody = ({ Component }: ChatBodyProps) => {
  return (
    <div className="bg-chatOverlay min-h-screen font-inclusive my-2 mx-6 rounded-md relative flex flex-col">
      {Component}
    </div>
  );
};

export default ChatBody;