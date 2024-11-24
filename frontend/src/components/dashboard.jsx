import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import ProfessionalChatbot from './bot';
import { Package, ShoppingCart, Users, Bot, X, Search } from 'lucide-react';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    productsInStock: 0,
    activeCustomers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND || 'http://127.0.0.1:3001'}/dashboard-stats`
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <ShoppingCart className="text-blue-600 w-5 h-5" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Products in Stock',
      value: stats.productsInStock.toLocaleString(),
      icon: <Package className="text-blue-600 w-5 h-5" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Customers',
      value: stats.activeCustomers.toLocaleString(),
      icon: <Users className="text-blue-600 w-5 h-5" />,
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans">
      <Header />

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Main Chatbot Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            QueryBot
            <span className="text-blue-600">Assistant</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your intelligent e-commerce companion for seamless data management and insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Bot className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-lg">Order Management</h3>
                <p className="text-slate-700">
                  View order details, track status, and manage fulfillment
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-lg">Inventory Tracking</h3>
                <p className="text-slate-700">
                  Check stock levels and product details
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-lg">Specific Orders Status</h3>
                <p className="text-slate-700">
                  Get instant information of a particular order
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-3 mx-auto text-lg font-medium shadow-md hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Start Querying Data
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl text-slate-700 mb-4 text-center font-medium">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} p-6 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/80 rounded-lg">{card.icon}</div>
                  <p className="text-blue-900 font-medium">{card.title}</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl relative animate-slideUp">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
            <ProfessionalChatbot />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;