import { Check, Clock, X, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillCard = ({ skill, isRequest = false, onPurchase }) => {
  const navigate = useNavigate();
  const statusColors = {
    Active: 'bg-green-100 text-green-800 border-green-300',
    Matched: 'bg-purple-100 text-purple-800 border-purple-300',
    Unmatched: 'bg-amber-100 text-amber-800 border-amber-300'
  };

  const statusIcons = {
    Active: <Check className="h-4 w-4 text-green-600" />,
    Matched: <Check className="h-4 w-4 text-purple-600" />,
    Unmatched: <Clock className="h-4 w-4 text-amber-600" />
  };

  const categoryColors = {
    technology: 'bg-blue-100 text-blue-800',
    arts: 'bg-pink-100 text-pink-800',
    languages: 'bg-green-100 text-green-800',
    music: 'bg-purple-100 text-purple-800',
    fitness: 'bg-orange-100 text-orange-800',
    cooking: 'bg-red-100 text-red-800',
    business: 'bg-indigo-100 text-indigo-800'
  };

  const handlePurchase = () => {
    const learners = JSON.parse(localStorage.getItem('learners') || '[]');
    if (learners.length === 0) {
      navigate('/register-learner');
      return;
    }
    onPurchase && onPurchase(skill);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-indigo-500 transition-all hover:border-l-purple-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {isRequest ? skill.desiredSkill : skill.skillName}
        </h3>
        <div className="flex items-center gap-2">
          {skill.category && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[skill.category]}`}>
              {skill.category}
            </span>
          )}
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
              statusColors[skill.status]
            }`}
          >
            {statusIcons[skill.status]}
            <span className="ml-1">{skill.status}</span>
          </div>
        </div>
      </div>
      
      {!isRequest && (
        <>
          <p className="text-gray-600 mb-4">{skill.description}</p>
          {skill.expertise && (
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(skill.expertise)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
                {[...Array(5 - skill.expertise)].map((_, i) => (
                  <Star
                    key={i + skill.expertise}
                    className="h-4 w-4 text-gray-300"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {skill.expertise === 5 ? 'Expert' : 
                 skill.expertise === 4 ? 'Advanced' :
                 skill.expertise === 3 ? 'Intermediate' :
                 skill.expertise === 2 ? 'Basic' : 'Beginner'}
              </span>
            </div>
          )}
        </>
      )}
      
      {isRequest && skill.personalNote && (
        <p className="text-gray-600 mb-4">Note: {skill.personalNote}</p>
      )}

      {!isRequest && (
        <>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Availability:</span> {skill.availability}
          </div>
          {skill.price > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-indigo-600">${skill.price}</span>
              <button
                onClick={handlePurchase}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" />
                Take This Skill
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {isRequest ? 'Seeking Skill' : 'Offering Skill'}
        </div>
        <div className="text-sm text-gray-500">
          ID: {skill.id.substring(skill.id.length - 4)}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;