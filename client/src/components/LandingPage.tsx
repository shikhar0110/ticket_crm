import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import DarkModeToggle from './DarkModeToggle';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <DarkModeToggle />
          </div>
          <div className="flex justify-center items-center mb-4">
            <Ticket className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">TicketDesk</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Professional Support Ticket System</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <Users className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">User Portal</h3>
            <p className="text-gray-600 dark:text-gray-300">Submit and track your support tickets easily</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <Ticket className="h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Quick Resolution</h3>
            <p className="text-gray-600 dark:text-gray-300">Fast response times for all your queries</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <Shield className="h-12 w-12 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Admin Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive ticket management system</p>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                !isLogin
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;