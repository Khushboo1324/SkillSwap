import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkillContext } from '../contexts/SkillContext';
import SkillForm from '../components/SkillForm';
import SkillCard from '../components/SkillCard';
import { Search, Filter, Sparkles, BookOpen, PlusCircle } from 'lucide-react';

const SkillSeekerPage = () => {
  const { skillOffers, addSkillRequest } = useSkillContext();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    'all',
    'technology',
    'arts',
    'languages',
    'music',
    'fitness',
    'cooking',
    'business'
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredSkills = skillOffers.filter(skill => {
    const matchesSearch = skill.skillName.toLowerCase().includes(searchTerm) ||
                         skill.description.toLowerCase().includes(searchTerm);
    const matchesStatus = filter === 'all' ? true : skill.status === filter;
    const matchesCategory = selectedCategory === 'all' ? true : skill.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleRequestSkill = (skill) => {
    const request = {
      desiredSkill: skill.skillName,
      personalNote: `I'm interested in learning ${skill.skillName}`
    };
    
    const newRequest = addSkillRequest(request);
    navigate(`/match-status?id=${newRequest.id}`);
  };

  const handleFormSubmit = (formData) => {
    const newRequest = addSkillRequest(formData);
    navigate(`/match-status?id=${newRequest.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-8 pb-20 md:pt-16 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Discover & Request Skills
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our community's talents or request a specific skill you want to learn
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {showForm ? (
                <>
                  <BookOpen className="h-5 w-5" />
                  Browse Skills
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  Request New Skill
                </>
              )}
            </button>
          </div>

          {showForm ? (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                What would you like to learn?
              </h2>
              <SkillForm onSubmit={handleFormSubmit} isSkillGiver={false} />
            </div>
          ) : (
            <>
              {/* Search and Filter Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-purple-100">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for skills..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleSearch}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => setFilter(e.target.value)}
                      value={filter}
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Available</option>
                      <option value="Matched">Matched</option>
                    </select>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : (
                        category.charAt(0).toUpperCase() + category.slice(1)
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Grid */}
              {filteredSkills.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkills.map((skill) => (
                    <div key={skill.id} className="group relative transform hover:scale-105 transition-all duration-300">
                      <SkillCard skill={skill} />
                      {skill.status === 'Active' && (
                        <button
                          onClick={() => handleRequestSkill(skill)}
                          className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:from-indigo-700 hover:to-purple-700"
                        >
                          <Sparkles className="h-4 w-4" />
                          Learn This
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-xl border border-purple-100">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No skills found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters to find more skills
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillSeekerPage;