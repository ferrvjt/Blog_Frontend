// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, ArrowLeft } from 'lucide-react';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleBack = () => {
    if (location.pathname.includes('/post/')) {
      navigate(-1);
    } else if (location.pathname.includes('/course/')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-3">
          {location.pathname !== '/' && (
            <button onClick={handleBack} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-2xl font-bold">Mi Blog</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main */}
      <main className="pt-24 px-4 sm:px-6 max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
};


export default Layout;
