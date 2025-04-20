import { useSkillContext } from '../contexts/SkillContext';
import SkillCard from '../components/SkillCard';
import { Filter, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillGiverPostsPage = () => {
  const { skillOffers } = useSkillContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  
  const handlePurchaseSkill = (skill) => {
    const learners = JSON.parse(localStorage.getItem('learners') || '[]');
    const currentLearner = learners[learners.length - 1];
    
    if (!currentLearner) {
      navigate('/register-learner');
      return;
    }
    
    // Add skill to learner's purchased skills
    currentLearner.purchasedSkills = [
      ...(currentLearner.purchasedSkills || []),
      skill.id
    ];
    
    // Update learner in localStorage
    learners[learners.length - 1] = currentLearner;
    localStorage.setItem('learners', JSON.stringify(learners));
    
    // Navigate to match status page
    navigate('/match-status');
  };
  
  const filteredSkills = skillOffers.filter(skill => {
    if (filter === 'all') return true;
    if (filter === 'active') return skill.status === 'Active';
    if (filter === 'matched') return skill.status === 'Matched';
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-8 pb-20 md:pt-16 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Skills</h1>
            <p className="text-gray-600">
              Browse through the skills offered by our community members
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter:</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All Skills
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('matched')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'matched'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Matched
              </button>
            </div>
          </div>
          
          {/* Skills List */}
          {filteredSkills.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSkills.map((skill) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  onPurchase={handlePurchaseSkill}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <RefreshCw className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Skills Found
              </h2>
              <p className="text-gray-500">
                {filter !== 'all'
                  ? `There are no ${filter.toLowerCase()} skills at the moment.`
                  : 'There are no skills posted yet. Be the first to share your talents!'}
              </p>
            </div>
          )}
          
          {/* Info Box */}
          <div className="mt-8 bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              About Skill Status
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-purple-700">
                <div className="bg-green-100 w-4 h-4 rounded-full mr-2"></div>
                <span><strong>Active</strong>: Skills that are available to be matched</span>
              </li>
              <li className="flex items-center text-purple-700">
                <div className="bg-purple-100 w-4 h-4 rounded-full mr-2"></div>
                <span><strong>Matched</strong>: Skills that have been paired with a seeker</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGiverPostsPage;