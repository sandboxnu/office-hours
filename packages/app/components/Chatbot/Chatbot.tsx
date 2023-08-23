import React, { useState } from "react";
import { useMessages } from "../../hooks/useMessages";

const GPTChatbotPage: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [content, setContent] = useState("");
  const { addMessage } = useMessages();

  const handleSubmit = async (e?: any) => {
    e?.preventDefault();
    addMessage(question);
    setContent("");
  };

  return (
    <div>
      <h1>Ask GPT Chatbot</h1>
      <div>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
        />
        <button onClick={handleSubmit}>Ask</button>
      </div>
      {content && (
        <div>
          <h2>Response:</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default GPTChatbotPage;
