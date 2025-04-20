import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Gift, UserPlus, Activity } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { to: '/', text: 'Home', icon: Home },
    { to: '/skill-giver', text: 'Give Skill', icon: Gift },
    { to: '/skill-posts', text: 'Browse Skills', icon: Book },
    { to: '/register-learner', text: 'Register', icon: UserPlus },
    { to: '/match-status', text: 'Match Status', icon: Activity }
  ];
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <span className="mr-2">⭐</span> SkillCircle
          </Link>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center transition-all ${
                  isActive(item.to)
                    ? 'text-white font-bold scale-105'
                    : 'text-indigo-200 hover:text-white hover:scale-105'
                }`}
              >
                <item.icon className="mr-1 h-4 w-4" />
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center py-1 px-2 ${
                isActive(item.to)
                  ? 'text-indigo-600 font-medium'
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.text}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;