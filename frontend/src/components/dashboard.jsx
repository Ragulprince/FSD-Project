// AdminDashboard.jsx
import { useState } from 'react';
import Header from './header';
import Footer from './footer';
import ProfessionalChatbot from './bot'; // Add this import at the top
import { Package, ShoppingCart, DollarSign, Users, Bot, X, Search } from 'lucide-react';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const statsCards = [
    { 
      title: 'Total Orders', 
      value: '1,234', 
      icon: <ShoppingCart className="text-blue-600 w-6 h-6" />,
      trend: '+12% from last month'
    },
    { 
      title: 'Products in Stock', 
      value: '892', 
      icon: <Package className="text-blue-600 w-6 h-6" />,
      trend: '-3% from last month'
    },
    { 
      title: 'Revenue', 
      value: '$45,678', 
      icon: <DollarSign className="text-blue-600 w-6 h-6" />,
      trend: '+8% from last month'
    },
    { 
      title: 'Active Customers', 
      value: '456', 
      icon: <Users className="text-blue-600 w-6 h-6" />,
      trend: '+5% from last month'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your e-commerce platform efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statsCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {card.icon}
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {card.value}
                </h3>
                <p className="text-sm text-gray-500">
                  {card.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* QueryBot Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Meet QueryBot - Your Database Assistant
            </h2>
            <p className="text-gray-600 mb-6">
              Quickly access and manage your e-commerce data with natural language queries. 
              QueryBot connects directly to your database to provide:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Order Management</h3>
                <p className="text-sm text-gray-600">View order details, track status, and manage fulfillment</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Inventory Tracking</h3>
                <p className="text-sm text-gray-600">Check stock levels, low inventory alerts, and product details</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Quick Analytics</h3>
                <p className="text-sm text-gray-600">Get instant insights on sales, revenue, and customer data</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <Search className="w-5 h-5" />
              Start Querying Database
            </button>
          </div>
        </div>
      </main>

      {/* Chatbot Modal */}
      {/* {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
            <div className="bg-blue-600 p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-white w-6 h-6" />
                <h3 className="text-white font-medium">QueryBot</h3>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  Try these example queries:
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• "Show all orders from last week"</li>
                  <li>• "Check inventory for product SKU-123"</li>
                  <li>• "List orders with pending status"</li>
                </ul>
              </div>
              <div className="border-t pt-4">
                <input
                  type="text"
                  placeholder="Type your query here..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Chatbot Modal */}
{/* Chatbot Modal */}
{/* Chatbot Modal */}
{isChatOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div className="w-full max-w-4xl h-[600px] shadow-2xl relative animate-slideUp">
      <div className="absolute -top-2 -right-2 z-50">
        <button 
          onClick={() => setIsChatOpen(false)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <ProfessionalChatbot />
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};

export default Dashboard;