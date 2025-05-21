import TextBox from "./TextBox";

interface ChatTextBoxProps {
  onSend: (message: string) => void;
  onFirstMessageSent?: () => void;
}

const ChatTextBox = ({ onSend, onFirstMessageSent }: ChatTextBoxProps) => {
  // The handleSend function is now received as a prop, no need to define it here
  // const handleSend = (message: string) => {
  //   console.log("Message sent:", message);
  // };

  return (
    <div className="flex items-center justify-center">
      <TextBox onSend={onSend} onFirstMessageSent={onFirstMessageSent} />
    </div>
  );
};

export default ChatTextBox;
