import { useSkillContext } from '../contexts/SkillContext';
import { Trophy, AlertCircle } from 'lucide-react';

const MatchDisplay = ({ requestId }) => {
  const { getRequestById, getMatchForRequest } = useSkillContext();
  
  const request = getRequestById(requestId);
  const matchedOffer = request ? getMatchForRequest(requestId) : null;
  
  if (!request) {
    return <div>Request not found</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {request.status === 'Matched' && matchedOffer ? (
        <div className="p-6 animate-fadeIn">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <Trophy className="h-10 w-10 text-purple-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
            🎉 You've been matched!
          </h3>
          
          <p className="text-center text-gray-600 mb-6">
            Someone has the skill you're looking for!
          </p>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Match Details:</h4>
            <p className="text-gray-700">
              <span className="font-semibold">Skill:</span> {matchedOffer.skillName}
            </p>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Description:</span> {matchedOffer.description}
            </p>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Availability:</span> {matchedOffer.availability}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Contact them to arrange your skill swap session!
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <AlertCircle className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Still looking for a match...
          </h3>
          
          <p className="text-center text-gray-600 mb-6">
            We haven't found a skill giver for <span className="font-semibold">{request.desiredSkill}</span> yet.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Your Request:</h4>
            <p className="text-gray-700">
              <span className="font-semibold">Skill:</span> {request.desiredSkill}
            </p>
            {request.personalNote && (
              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Note:</span> {request.personalNote}
              </p>
            )}
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Status:</span> {request.status}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              You can update your request or try again with a different skill.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDisplay;