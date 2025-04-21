import { Link } from 'react-router-dom';
import { Gift, Search } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-teal-700">Skill</span>
            <span className="text-purple-600">Circle</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A community where you can share your skills and learn from others.
            Connect, barter, and grow together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/skill-giver"
            className="bg-white rounded-lg shadow-md p-8 border-2 border-transparent hover:border-teal-500 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-6">
                <Gift className="h-12 w-12 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I Want to Give a Skill</h2>
              <p className="text-gray-600 mb-6">
                Share your expertise, knowledge, or talents with others in the community. 
                Help someone learn what you already know.
              </p>
              <button className="py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors">
                Become a Skill Giver
              </button>
            </div>
          </Link>
          
          <Link
            to="/skill-seeker"
            className="bg-white rounded-lg shadow-md p-8 border-2 border-transparent hover:border-purple-500 transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-6">
                <Search className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I Want to Learn a Skill</h2>
              <p className="text-gray-600 mb-6">
                Looking to acquire new knowledge or abilities? Find someone who's 
                willing to teach you what you want to learn.
              </p>
              <button className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                Become a Skill Seeker
              </button>
            </div>
          </Link>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">How SkillCircle Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl mx-auto mb-4">1</div>
              <h4 className="font-semibold text-lg mb-2">Post Your Skills</h4>
              <p className="text-gray-600">Share what you know or what you want to learn with our community.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl mx-auto mb-4">2</div>
              <h4 className="font-semibold text-lg mb-2">Get Matched</h4>
              <p className="text-gray-600">Our system automatically matches skill givers with seekers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl mx-auto mb-4">3</div>
              <h4 className="font-semibold text-lg mb-2">Start Learning</h4>
              <p className="text-gray-600">Connect with your match and begin your skill exchange journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;