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
      <nav className="hidden md:block bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-464 64-620l156-156 156 156-156 156ZM360-80v-200q-61-5-121-14.5T120-320l20-80q84 23 168.5 31.5T480-360q87 0 171.5-8.5T820-400l20 80q-59 16-119 25.5T600-280v200H360ZM220-576l44-44-44-44-44 44 44 44Zm260-104q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0 280q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-360q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm202 280-68-120 68-120h136l68 120-68 120H682Zm46-80h44l22-40-22-40h-44l-22 40 22 40Zm-508-60Zm260-180Zm270 200Z" className='mr-3'/></svg> SkillCircle
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