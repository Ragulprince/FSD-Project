import React from 'react';
import Header from './header';
import Footer from './footer';
import { Link } from 'react-router-dom';

// Feature Card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    {icon}
    <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600 text-center">{description}</p>
  </div>
);

// Main Landing Page component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
        <Header />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Streamline Your E-commerce Operations</h1>
          <p className="text-xl mb-8">Efficient order management and inventory tracking at your fingertips</p>
          <a href="#cta" className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
          <Link to="/admin">
            Start Managing Orders
            </Link>
            </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for E-commerce Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
              title="Comprehensive Order Listing"
              description="Access a complete list of all orders in one place, making it easy to track and manage your sales."
            />
            <FeatureCard
              icon={<svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
              title="Detailed Order Status"
              description="Get specific order status and details instantly, ensuring you're always up-to-date with each transaction."
            />
            <FeatureCard
              icon={<svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
              title="Real-time Inventory Management"
              description="Keep track of your stock levels in real-time, preventing overselling and stockouts."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How OrderMaster Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">List All Orders</h3>
              <p className="text-gray-600">Access a comprehensive list of all your orders, sortable by date, status, or customer.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Check Order Details</h3>
              <p className="text-gray-600">Quickly retrieve specific order information, including status, shipping details, and customer data.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Manage Inventory</h3>
              <p className="text-gray-600">Monitor stock levels, set low stock alerts, and update product quantities effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your E-commerce Management?</h2>
          <p className="text-xl mb-8">Join successful businesses using OrderMaster to streamline their operations</p>
          <a href="#" className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300">Start Your Free Trial</a>
        </div>
      </section>

        <Footer />
    </div>
  );
};

export default LandingPage;

