import { useLocation, Link } from 'react-router-dom';
import { useSkillContext } from '../contexts/SkillContext';
import { BookOpen, Clock } from 'lucide-react';

const MatchStatusPage = () => {
  const location = useLocation();
  const { skillRequests, skillOffers } = useSkillContext();
  
  // Get learner's purchased skills
  const learners = JSON.parse(localStorage.getItem('learners') || '[]');
  const currentLearner = learners[learners.length - 1]; // Get most recent learner
  
  const purchasedSkills = currentLearner
    ? skillOffers.filter(skill => 
        currentLearner.purchasedSkills.includes(skill.id)
      )
    : [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-8 pb-20 md:pt-16 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Journey</h1>
            <p className="text-gray-600">
              Track your skill acquisitions and learning progress
            </p>
          </div>
          
          {/* Purchased Skills Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              Your Purchased Skills
            </h2>
            
            {purchasedSkills.length > 0 ? (
              <div className="grid gap-6">
                {purchasedSkills.map(skill => (
                  <div key={skill.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{skill.skillName}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Purchased
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{skill.description}</p>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Availability:</span> {skill.availability}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Skills Purchased Yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start your learning journey by purchasing skills from our talented community.
                </p>
                <Link
                  to="/skill-posts"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg transition-all hover:from-indigo-700 hover:to-purple-700"
                >
                  Browse Available Skills
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatusPage;