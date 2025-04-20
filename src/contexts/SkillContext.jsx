import { createContext, useContext, useState, useEffect } from 'react';

const SkillContext = createContext();

export const useSkillContext = () => useContext(SkillContext);

export const SkillProvider = ({ children }) => {
  const [skillOffers, setSkillOffers] = useState(() => {
    const savedOffers = localStorage.getItem('skillOffers');
    return savedOffers ? JSON.parse(savedOffers) : [
      {
        id: '1',
        skillName: 'Web Development',
        description: 'Learn modern web development with React, Node.js, and more',
        availability: 'Weekday evenings',
        status: 'Active',
        category: 'technology',
        expertise: 5,
        matchedWith: [],
        price: 50
      },
      {
        id: '2',
        skillName: 'Guitar Lessons',
        description: 'From basics to advanced techniques in acoustic and electric guitar',
        availability: 'Weekends',
        status: 'Active',
        category: 'music',
        expertise: 4,
        matchedWith: [],
        price: 30
      },
      {
        id: '3',
        skillName: 'French Language',
        description: 'Learn French from a native speaker with 10 years of teaching experience',
        availability: 'Flexible',
        status: 'Active',
        category: 'languages',
        expertise: 5,
        matchedWith: [],
        price: 40
      }
    ];
  });
  
  const [skillRequests, setSkillRequests] = useState(() => {
    const savedRequests = localStorage.getItem('skillRequests');
    return savedRequests ? JSON.parse(savedRequests) : [];
  });

  useEffect(() => {
    localStorage.setItem('skillOffers', JSON.stringify(skillOffers));
  }, [skillOffers]);

  useEffect(() => {
    localStorage.setItem('skillRequests', JSON.stringify(skillRequests));
  }, [skillRequests]);

  const addSkillOffer = (newOffer) => {
    const offerWithId = {
      ...newOffer,
      id: Date.now().toString(),
      status: 'Active',
      matchedWith: [],
      expertise: parseInt(newOffer.expertise) || 3,
      category: newOffer.category || 'other',
      price: parseInt(newOffer.price) || 0
    };
    setSkillOffers([...skillOffers, offerWithId]);
    return offerWithId;
  };

  const addSkillRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: Date.now().toString(),
      status: 'Unmatched',
      matchedWith: null,
      purchaseDate: new Date().toISOString()
    };
    
    const matchedOfferIndex = skillOffers.findIndex(
      offer => offer.skillName.toLowerCase() === newRequest.desiredSkill.toLowerCase()
    );
    
    if (matchedOfferIndex !== -1) {
      const matchedOffer = skillOffers[matchedOfferIndex];
      
      requestWithId.status = 'Matched';
      requestWithId.matchedWith = matchedOffer.id;
      
      const updatedOffers = [...skillOffers];
      updatedOffers[matchedOfferIndex] = {
        ...matchedOffer,
        matchedWith: [...matchedOffer.matchedWith, requestWithId.id]
      };
      
      setSkillOffers(updatedOffers);
    }
    
    setSkillRequests([...skillRequests, requestWithId]);
    return requestWithId;
  };

  const getOfferById = (id) => {
    return skillOffers.find(offer => offer.id === id);
  };

  const getRequestById = (id) => {
    return skillRequests.find(request => request.id === id);
  };

  const getMatchForRequest = (requestId) => {
    const request = getRequestById(requestId);
    if (request && request.matchedWith) {
      return getOfferById(request.matchedWith);
    }
    return null;
  };

  const getActiveOffers = () => {
    return skillOffers;
  };

  return (
    <SkillContext.Provider
      value={{
        skillOffers,
        skillRequests,
        addSkillOffer,
        addSkillRequest,
        getOfferById,
        getRequestById,
        getMatchForRequest,
        getActiveOffers
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContext;