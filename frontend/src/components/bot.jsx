import React, { useState, useRef, useEffect } from 'react';

const loadingAnimationCSS = `
  @keyframes dotFlashing {
    0% { background-color: #3B82F6; }
    50%, 100% { background-color: #E5E7EB; }
  }

  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #3B82F6;
    color: #3B82F6;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }

  .dot-flashing::before, .dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #3B82F6;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #3B82F6;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }
`;

const ProfessionalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        text: 'Hi Admin! 👋 Welcome to OrderMaster AI Assistant. How can I help you today?',
        sender: 'bot',
        options: ['Check Order Status', 'Manage Inventory', 'Generate Reports'],
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        text: 'Great choice! Please select an option from below:',
        sender: 'bot',
        options: ['Option 1', 'Option 2', 'Option 3'],
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
    }
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option);
  };

  return (
    // <div className="flex flex-col h-screen bg-gray-100">
    <div className="flex flex-col h-[600px] bg-gray-100 rounded-xl overflow-hidden shadow-xl">
      <style>{loadingAnimationCSS}</style>
      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">OrderMaster AI Assistant</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={`message-${index}`}
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
            {message.options && (
              <div className="mt-2">
                {message.options.map((option, optionIndex) => (
                  <button
                    key={`option-${index}-${optionIndex}`}
                    onClick={() => handleOptionClick(option)}
                    className="mr-2 mb-2 px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="dot-flashing"></div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalChatbot;
