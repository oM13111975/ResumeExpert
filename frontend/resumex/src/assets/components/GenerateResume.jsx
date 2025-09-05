

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const GenerateResume = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    leetcode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/generate-resume/",
        formData,
        { 
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );

      // Automatically trigger download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.name.replace(/\s+/g, "_")}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setSuccess("✅ Resume generated and downloaded successfully!");
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please check your GitHub/LeetCode information and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Navigation */}
      <nav className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-900/90 backdrop-blur-xl' 
          : 'border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}>
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>ResumeExpert</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <Link
                to="/main"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-6 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}>
              <span className="text-white text-5xl">📄</span>
            </div>
            
            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Generate Professional Resume
            </h1>
            
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create a stunning resume from your GitHub and LeetCode profiles with AI-powered optimization
            </p>
          </div>

          {/* Resume Generator Form */}
          <div className={`rounded-3xl p-8 lg:p-12 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700 shadow-2xl' 
              : 'bg-white/80 border border-gray-200 shadow-2xl'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Resume Information
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Fill in your details to generate a personalized resume
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="xyz@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Profile Links */}
              <div className="space-y-6">
                <div>
                  <label className={`block text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    ⚡ GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/your-username"
                    value={formData.github}
                    onChange={handleChange}
                    required
                    className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    🧠 LeetCode Username
                  </label>
                  <input
                    type="text"
                    name="leetcode"
                    placeholder="your-leetcode-username"
                    value={formData.leetcode}
                    onChange={handleChange}
                    required
                    className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-xl ${
                    loading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-2xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                      Generating Your Resume...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">📄</span>
                      Generate Professional Resume
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Messages */}
            {success && (
              <div className={`mt-6 p-4 rounded-xl text-center ${
                isDarkMode 
                  ? 'bg-green-900/20 text-green-400 border border-green-800' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {success}
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

            {/* Info Section */}
            <div className={`mt-8 p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-blue-900/20 border border-blue-800' 
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <h3 className={`font-semibold mb-3 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                💡 What gets included in your resume:
              </h3>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-blue-200' : 'text-blue-600'
              }`}>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Professional summary based on your GitHub activity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Technical skills extracted from your repositories</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Project highlights with descriptions and technologies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>LeetCode statistics and problem-solving achievements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Clean, ATS-friendly formatting optimized for recruiters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-900/50' 
          : 'border-gray-200 bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}>
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className={`text-xl font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>ResumeExpert</span>
          </div>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} ResumeExpert. Creating professional resumes with AI technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GenerateResume;
