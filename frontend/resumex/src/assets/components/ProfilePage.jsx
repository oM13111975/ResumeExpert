import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    linkedin: '',
    github: '',
    leetcode: '',
    portfolio: ''
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (!token || role !== "candidate") {
      navigate("/login");
    }
    loadProfileData();
  }, [navigate]);

  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      // Replace with your actual profile API endpoint
      // const response = await axios.get('http://localhost:8000/api/v1/profile/', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setProfileData(response.data);
      
      // For now, load from localStorage
      setProfileData({
        first_name: localStorage.getItem('first_name') || '',
        last_name: localStorage.getItem('last_name') || '',
        email: localStorage.getItem('username') || '',
        phone: localStorage.getItem('phone') || '',
        location: localStorage.getItem('location') || '',
        bio: localStorage.getItem('bio') || '',
        skills: JSON.parse(localStorage.getItem('skills') || '[]'),
        experience: JSON.parse(localStorage.getItem('experience') || '[]'),
        education: JSON.parse(localStorage.getItem('education') || '[]'),
        linkedin: localStorage.getItem('linkedin') || '',
        github: localStorage.getItem('github') || '',
        leetcode: localStorage.getItem('leetcode') || '',
        portfolio: localStorage.getItem('portfolio') || ''
      });
    } catch (err) {
      setError('Failed to load profile data');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem("access_token");
      // Replace with your actual profile update API endpoint
      // await axios.put('http://localhost:8000/api/v1/profile/', profileData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // For now, save to localStorage
      Object.keys(profileData).forEach(key => {
        if (typeof profileData[key] === 'object') {
          localStorage.setItem(key, JSON.stringify(profileData[key]));
        } else {
          localStorage.setItem(key, profileData[key]);
        }
      });
      
      setMessage('✅ Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('❌ Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index, value) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Navigation */}
      <nav className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-900/95 backdrop-blur-sm' 
          : 'border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'border-gray-300 bg-gray-800' : 'border-gray-700 bg-gray-100'
              }`}>
                <span className={`font-bold text-lg ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>R</span>
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>ResumeExpert</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <Link
                to="/main"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            isDarkMode ? 'bg-gray-800 border border-gray-600' : 'bg-blue-100 border border-blue-200'
          }`}>
            <span className="text-4xl">👨‍💻</span>
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Developer Profile
          </h1>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Manage your professional information and preferences
          </p>
        </div>

        {/* Profile Form */}
        <div className={`rounded-2xl shadow-xl border p-8 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Edit Toggle */}
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Personal Information
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isEditing
                  ? isDarkMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                  : isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {profileData.first_name || 'Not specified'}
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {profileData.last_name || 'Not specified'}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <div className={`px-4 py-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                }`}>
                  {profileData.email || 'Not specified'}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {profileData.phone || 'Not specified'}
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Professional Bio
              </label>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about your professional background and interests..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
              ) : (
                <div className={`px-4 py-3 rounded-lg min-h-[100px] ${
                  isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                }`}>
                  {profileData.bio || 'No bio provided'}
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Skills
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder="Enter a skill"
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                          isDarkMode
                            ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                            : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSkill}
                    className={`w-full py-2 border-2 border-dashed rounded-lg transition-colors ${
                      isDarkMode
                        ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                        : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600'
                    }`}
                  >
                    + Add Skill
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      No skills added
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {profileData.linkedin ? (
                      <a 
                        href={profileData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {profileData.linkedin}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GitHub
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                ) : (
                  <div className={`px-4 py-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {profileData.github ? (
                      <a 
                        href={profileData.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {profileData.github}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-600 text-gray-200 hover:bg-gray-700' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}

            {/* Messages */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                isDarkMode 
                  ? 'bg-green-900/20 text-green-400 border border-green-800' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message}
              </div>
            )}

            {error && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                isDarkMode 
                  ? 'bg-red-900/20 text-red-400 border border-red-800' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
