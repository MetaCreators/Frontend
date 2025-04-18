import TextBox from "./TextBox";

const ChatTextBox = () => {
  const handleSend = (message: string) => {
    console.log("Message sent:", message);
  };

  return (
    <div className="flex items-center justify-center">
      <TextBox onSend={handleSend} />
    </div>
  );
};

export default ChatTextBox;
