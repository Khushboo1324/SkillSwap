import { useState } from 'react';

const SkillForm = ({ onSubmit, isSkillGiver }) => {
  const [formData, setFormData] = useState(
    isSkillGiver
      ? {
          skillName: '',
          description: '',
          availability: '',
          category: 'technology',
          expertise: '3',
          price: '0'
        }
      : {
          desiredSkill: '',
          personalNote: ''
        }
  );
  
  const [errors, setErrors] = useState({});
  
  const categories = [
    'technology',
    'arts',
    'languages',
    'music',
    'fitness',
    'cooking',
    'business'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (isSkillGiver) {
      if (!formData.skillName.trim()) {
        newErrors.skillName = 'Skill name is required';
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 10) {
        newErrors.description = 'Description should be at least 10 characters';
      }
      
      if (!formData.availability.trim()) {
        newErrors.availability = 'Availability is required';
      }
      
      if (formData.price && isNaN(formData.price)) {
        newErrors.price = 'Price must be a valid number';
      }
    } else {
      if (!formData.desiredSkill.trim()) {
        newErrors.desiredSkill = 'Desired skill is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSkillGiver ? (
        <>
          <div>
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              value={formData.skillName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.skillName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="What skill are you offering?"
            />
            {errors.skillName && (
              <p className="mt-1 text-sm text-red-600">{errors.skillName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your skill in detail. What can you teach others?"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                Expertise Level
              </label>
              <select
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="1">Beginner</option>
                <option value="2">Basic</option>
                <option value="3">Intermediate</option>
                <option value="4">Advanced</option>
                <option value="5">Expert</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="1"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.availability ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="When are you available? E.g., 'Evenings and weekends'"
            />
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="desiredSkill" className="block text-sm font-medium text-gray-700 mb-1">
              Desired Skill
            </label>
            <input
              type="text"
              id="desiredSkill"
              name="desiredSkill"
              value={formData.desiredSkill}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                errors.desiredSkill ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="What skill do you want to learn?"
            />
            {errors.desiredSkill && (
              <p className="mt-1 text-sm text-red-600">{errors.desiredSkill}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="personalNote" className="block text-sm font-medium text-gray-700 mb-1">
              Personal Note (Optional)
            </label>
            <textarea
              id="personalNote"
              name="personalNote"
              value={formData.personalNote}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Any additional information about your learning goals or preferences?"
            ></textarea>
          </div>
        </>
      )}
      
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg transition-all hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSkillGiver ? 'Offer Skill' : 'Find Skill Match'}
      </button>
    </form>
  );
};

export default SkillForm;