// src/assets/components/ResumeUploadModal.jsx (Complete Fix)
import React, { useState, useEffect } from "react";
import axios from "axios";

const ResumeUploadModal = ({ job, token, isDarkMode, onClose, onSuccess }) => {
  // ✅ IMMEDIATE CHECK - before any other code executes
  console.log('ResumeUploadModal render - job:', job, 'type:', typeof job);
  
  const [formData, setFormData] = useState({
    file: null,
    github_url: "",
    leetcode_username: "",
    candidate_name: "",
    candidate_email: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ FIRST: Handle completely undefined job
  if (job === undefined || job === null) {
    console.error('❌ ResumeUploadModal: job is', job);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`w-full max-w-md rounded-3xl p-8 text-center border ${
          isDarkMode 
            ? 'bg-gray-800 text-white border-gray-700' 
            : 'bg-white text-gray-900 border-gray-200'
        }`}>
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold mb-4">Loading Job Information</h3>
          <p className="text-lg mb-6">Please wait while job data loads...</p>
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ✅ SECOND: Handle empty object or missing ID
  if (!job.id) {
    console.error('❌ ResumeUploadModal: job.id missing. Job object:', job);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`w-full max-w-md rounded-3xl p-8 text-center border ${
          isDarkMode 
            ? 'bg-gray-800 text-white border-gray-700' 
            : 'bg-white text-gray-900 border-gray-200'
        }`}>
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-bold mb-4">Invalid Job Data</h3>
          <p className="text-lg mb-6">Job ID is missing. Please refresh and try again.</p>
          <div className="text-xs text-gray-500 mb-4">
            Debug: {JSON.stringify(job, null, 2)}
          </div>
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("job", job.id);
    data.append("resume_file", formData.file);
    if (formData.github_url) data.append("github_url", formData.github_url);
    if (formData.leetcode_username) data.append("leetcode_username", formData.leetcode_username);
    if (formData.candidate_name) data.append("candidate_name", formData.candidate_name);
    if (formData.candidate_email) data.append("candidate_email", formData.candidate_email);

    try {
      await axios.post(
        "http://localhost:8000/api/v1/company/resume/upload/",
        data,
        { 
          headers: { 
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      
      setMessage("✅ Resume uploaded and analyzed successfully!");
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setMessage("❌ Failed to upload resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Safe job title with multiple fallbacks
  const jobTitle = job?.title || job?.name || job?.job_title || `Job #${job?.id}` || 'Unknown Job';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-3xl border overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Header */}
        <div className={`px-8 py-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                📤 Upload Resume
              </h3>
              <p className={`text-lg mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                For: {jobTitle}
              </p>
              {/* Debug info */}
              <p className="text-xs text-gray-500 mt-1">
                Job ID: {job?.id} | Available props: {Object.keys(job || {}).join(', ')}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form - Rest of your existing form code */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={formData.candidate_name}
                  onChange={(e) => handleInputChange('candidate_name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="enter name"
                />
              </div>

              <div>
                <label className={`block text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Candidate Email
                </label>
                <input
                  type="email"
                  value={formData.candidate_email}
                  onChange={(e) => handleInputChange('candidate_email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="xyz@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Resume File *
              </label>
              <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                formData.file 
                  ? isDarkMode 
                    ? 'border-green-500 bg-green-900/20' 
                    : 'border-green-500 bg-green-50'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}>
                <input
                  type="file"
                  required
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleInputChange('file', e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-4xl mb-4">
                  {formData.file ? '✅' : '📄'}
                </div>
                <div className={`text-lg font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {formData.file ? formData.file.name : 'Click to upload resume'}
                </div>
                <div className={`text-sm mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Supports PDF, DOC, DOCX files
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => handleInputChange('github_url', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className={`block text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  LeetCode Username
                </label>
                <input
                  type="text"
                  value={formData.leetcode_username}
                  onChange={(e) => handleInputChange('leetcode_username', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="leetcode_username"
                />
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl text-center font-medium ${
                message.includes('✅') 
                  ? isDarkMode 
                    ? 'bg-green-900/30 text-green-400 border border-green-800' 
                    : 'bg-green-50 text-green-700 border border-green-200'
                  : isDarkMode 
                  ? 'bg-red-900/30 text-red-400 border border-red-800' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 border ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading || !formData.file}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                  loading || !formData.file
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-3">
                    <span>🤖</span>
                    <span>Upload & Analyze</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadModal;
