import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Ticket, Users, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/user-portal');
    } else if (isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Ticket className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">TicketDesk</h1>
          </div>
          <p className="text-xl text-gray-600">Professional Support Ticket System</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Portal</h3>
            <p className="text-gray-600">Submit and track your support tickets easily</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Ticket className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Resolution</h3>
            <p className="text-gray-600">Fast response times for all your queries</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">Comprehensive ticket management system</p>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                !isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6">
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
        </div>

        {/* Admin Access */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;