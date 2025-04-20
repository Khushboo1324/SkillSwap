import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkillContext } from '../contexts/SkillContext';
import SkillForm from '../components/SkillForm';
import { CheckCircle } from 'lucide-react';

const SkillGiverPage = () => {
  const { addSkillOffer } = useSkillContext();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [skillData, setSkillData] = useState(null);
  
  const handleSubmit = (formData) => {
    const newSkill = addSkillOffer(formData);
    setSkillData(newSkill);
    setSubmitted(true);
    
    // Redirect to the skill posts page after 2 seconds
    setTimeout(() => {
      navigate('/skill-posts');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20 md:pt-16 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Skills</h1>
            <p className="text-gray-600">
              Offer your expertise to others in the community. Your knowledge could be exactly what someone needs!
            </p>
          </div>
          
          {!submitted ? (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <SkillForm onSubmit={handleSubmit} isSkillGiver={true} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Skill Successfully Posted!
              </h2>
              <p className="text-gray-600 mb-4">
                Your skill "{skillData.skillName}" has been added to our community. You'll be notified when someone is interested in learning from you.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800">
                  Status: <span className="font-semibold">Active</span>
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Redirecting to the skills page...
              </p>
            </div>
          )}
          
          <div className="mt-8 bg-teal-50 rounded-lg p-6 border border-teal-200">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">
              Tips for Skill Givers
            </h3>
            <ul className="space-y-2 text-teal-700">
              <li>Be specific about what you can teach</li>
              <li>Set clear expectations about your experience level</li>
              <li>Mention any prerequisites learners should have</li>
              <li>Be realistic about your availability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGiverPage;