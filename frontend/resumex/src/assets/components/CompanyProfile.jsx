import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyProfile = ({ isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    company_name: '',
    email: '',
    website: '',
    industry: '',
    company_size: '',
    location: '',
    description: '',
    founded_year: '',
    benefits: [],
    social_links: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Load from localStorage for now
      setProfileData({
        company_name: localStorage.getItem('company_name') || '',
        email: localStorage.getItem('email') || '',
        website: localStorage.getItem('website') || '',
        industry: localStorage.getItem('industry') || '',
        company_size: localStorage.getItem('company_size') || '',
        location: localStorage.getItem('location') || '',
        description: localStorage.getItem('description') || '',
        founded_year: localStorage.getItem('founded_year') || '',
        benefits: JSON.parse(localStorage.getItem('benefits') || '[]'),
        social_links: JSON.parse(localStorage.getItem('social_links') || '{"linkedin":"","twitter":"","facebook":""}')
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
      // Save to localStorage for now
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
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addBenefit = () => {
    setProfileData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index, value) => {
    setProfileData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index) => {
    setProfileData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className={`rounded-2xl p-8 ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200 shadow-lg'
      }`}>
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
            }`}>
              <span className="text-3xl">🏢</span>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Company Information
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your company profile and settings
              </p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isLoading}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isEditing
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
            } transform hover:scale-105`}
          >
            {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {/* Company Info Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Company Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
            ) : (
              <div className={`px-4 py-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
              }`}>
                {profileData.company_name || 'Not specified'}
              </div>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Industry
            </label>
            {isEditing ? (
              <select
                value={profileData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className={`px-4 py-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
              }`}>
                {profileData.industry || 'Not specified'}
              </div>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Company Size
            </label>
            {isEditing ? (
              <select
                value={profileData.company_size}
                onChange={(e) => handleInputChange('company_size', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            ) : (
              <div className={`px-4 py-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
              }`}>
                {profileData.company_size || 'Not specified'}
              </div>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Website
            </label>
            {isEditing ? (
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://company.com"
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
            ) : (
              <div className={`px-4 py-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
              }`}>
                {profileData.website ? (
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {profileData.website}
                  </a>
                ) : (
                  'Not specified'
                )}
              </div>
            )}
          </div>
        </div>

        {/* Company Description */}
        <div className="mt-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Company Description
          </label>
          {isEditing ? (
            <textarea
              rows={4}
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell us about your company..."
              className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
          ) : (
            <div className={`px-4 py-3 rounded-xl min-h-[100px] ${
              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'
            }`}>
              {profileData.description || 'No description provided'}
            </div>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center ${
            isDarkMode 
              ? 'bg-green-900/20 text-green-400 border border-green-800' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        {error && (
          <div className={`mt-6 p-4 rounded-xl text-center ${
            isDarkMode 
              ? 'bg-red-900/20 text-red-400 border border-red-800' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
