import React, { useState, useRef, useEffect } from 'react';
import { Download, Send, Bot, User, Loader2 } from 'lucide-react';

const ProfessionalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const backendUrl = process.env.REACT_APP_BACKEND || 'http://127.0.0.1:3001';
  const [inputEnabler, setInputEnabler] = useState(false);
  
  const defaultMessage = {
    text: "I'm here if you need anything else. What would you like to do next?",
    sender: 'bot',
    options: ['View Orders', 'Get specific order status/details', 'Inventory details'],
  };

  const welcomeMessage = {
    text: 'Hi Admin! 👋 Welcome to QueryBot Assistant. How can I help you today?',
    sender: 'bot',
    options: ['View Orders', 'Get specific order status/details', 'Inventory details'],
  };

  useEffect(() => {
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadAsCSV = (data, filename) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = typeof row[header] === 'object' ? row[header]?.name || '' : row[header];
          return `"${value}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const downloadAsTXT = (data, filename) => {
    const content = `
Order Details
-------------
Order ID: ${data.ID}
Order Date: ${new Date(data.order_date).toLocaleString()}
Order Status: ${data.order_status}
Quantity: ${data.quantity}
Total Amount: $${data.total_amount}

Customer Details
---------------
Name: ${data.User.name}
Email: ${data.User.email}

Product Details
--------------
Product Name: ${data.Inventory.name}
Price: $${data.Inventory.price}
Available Quantity: ${data.Inventory.quantity}
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (text === 'View Orders') {
      try {
        const response = await fetch(`${backendUrl}/get_orders`);
        const data = await response.json();
        const botMessage = {
          text: 'The following are the orders in the system:',
          sender: 'bot',
          table: data,
          downloadable: true
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setMessages((prev) => [...prev, defaultMessage]);
        }, 1500);
      }
    } else if (text === 'Get specific order status/details') {
      const botMessage = {
        text: 'Enter Order id:',
        sender: 'bot'
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      setInputEnabler(true);
    } else if (text === 'Inventory details') {
      try {
        const response = await fetch(`${backendUrl}/get_invs`);
        const data = await response.json();
        const botMessage = {
          text: 'Current Inventory Status:',
          sender: 'bot',
          inventory: data,
          downloadable: true
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setMessages((prev) => [...prev, defaultMessage]);
        }, 1500);
      }
    } else if (inputEnabler) {
      try {
        const response = await fetch(`${backendUrl}/get_order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: parseInt(text) }),
        });
        const data = await response.json();
        const botMessage = {
          text: 'The order details are as follows:',
          sender: 'bot',
          details: data,
          downloadable: true
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
        setInputEnabler(false);
        setTimeout(() => {
          setMessages((prev) => [...prev, defaultMessage]);
        }, 1500);
      }
    }
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
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">QueryBot Assistant</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`message-${index}`}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 animate-fadeIn`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-500" />
              </div>
            )}
            
            <div className={`max-w-[80%] space-y-2`}>
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                }`}
              >
                {message.text}
              </div>

              {message.options && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.options.map((option, optionIndex) => (
                    <button
                      key={`option-${index}-${optionIndex}`}
                      onClick={() => handleOptionClick(option)}
                      className="px-4 py-2 bg-white text-blue-500 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors duration-200 text-sm font-medium shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {message.table && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => downloadAsCSV(message.table, 'orders.csv')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {message.table.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{row.ID}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{row.Inventory.name}</td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  row.order_status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : row.order_status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {row.order_status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{row.User.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {message.inventory && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => downloadAsCSV(message.inventory, 'inventory.csv')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {message.inventory.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{item.ID}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">${item.price.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.quantity > 10
                                    ? "bg-green-100 text-green-800"
                                    : item.quantity > 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.quantity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {message.details && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => downloadAsTXT(message.details, `order-${message.details.ID}.txt`)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download TXT
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                     

<h2 className="text-lg font-semibold mb-4 text-gray-800">Order Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Order ID:</span>
                            <span className="text-gray-600">{message.details.ID}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Order Date:</span>
                            <span className="text-gray-600">
                              {new Date(message.details.order_date).toLocaleString()}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Order Status:</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              message.details.order_status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : message.details.order_status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {message.details.order_status}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Quantity:</span>
                            <span className="text-gray-600">{message.details.quantity}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Total Amount:</span>
                            <span className="text-gray-600">${message.details.total_amount}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-800 mb-3">Customer Details</h3>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Name:</span>
                            <span className="text-gray-600">{message.details.User.name}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-600">{message.details.User.email}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-800 mb-3">Product Details</h3>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Product Name:</span>
                            <span className="text-gray-600">{message.details.Inventory.name}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Price:</span>
                            <span className="text-gray-600">${message.details.Inventory.price}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Available Quantity:</span>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              message.details.Inventory.quantity > 10
                                ? "bg-green-100 text-green-800"
                                : message.details.Inventory.quantity > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {message.details.Inventory.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            disabled={!inputEnabler}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-200"
            placeholder={inputEnabler ? "Type your message..." : "Please select an option above..."}
          />
          <button
            type="submit"
            disabled={!inputEnabler || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalChatbot;