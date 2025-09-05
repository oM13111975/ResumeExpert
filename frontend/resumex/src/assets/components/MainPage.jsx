
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [resume, setResume] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [scored, setScored] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (!token || role !== "candidate") {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setResult(null);
    setIsLoading(true);

    const formData = new FormData();
    if (resume) formData.append("resume", resume);
    formData.append("linkedin", linkedin);
    formData.append("github", github);
    formData.append("leetcode", leetcode);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/score/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(response.data);
      setScored((prev) => prev + 1);
      setMessage("✅ Analysis completed successfully!");
      setActiveTab('results');
    } catch (err) {
      setError("❌ Error submitting data or unauthorized access.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleGeneratePDF = () => {
    navigate("/generate-resume");
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
                to="/profile"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center space-x-2 rounded-full px-6 py-3 mb-6 ${
              isDarkMode 
                ? 'bg-blue-900/20 border border-blue-800' 
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
              }`}></span>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Welcome back, {localStorage.getItem("username") || "Developer"}!
              </span>
            </div>
            
            <h1 className={`text-5xl lg:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Your Career Command Center
            </h1>
            
            <p className={`text-xl lg:text-2xl mb-8 max-w-4xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Analyze your technical skills, generate professional resumes, and discover perfect job opportunities with AI-powered insights.
            </p>

            {/* Quick Stats */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className={`rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800' 
                  : 'bg-white/70 border border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
              }`}>
                <div className="text-3xl font-bold mb-2">
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{scored}</span>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Profiles Analyzed
                </div>
              </div>

              <div className={`rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800' 
                  : 'bg-white/70 border border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
              }`}>
                <div className="text-3xl font-bold mb-2">
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{result ? 1 : 0}</span>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Resumes Generated
                </div>
              </div>

              <div className={`rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800' 
                  : 'bg-white/70 border border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
              }`}>
                <div className="text-3xl font-bold mb-2">
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    {linkedin && github && leetcode ? "100%" : "60%"}
                  </span>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Profile Complete
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className={`flex rounded-2xl p-2 mb-8 max-w-md mx-auto ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'analysis'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-lg'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚀 Analysis
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'results'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-lg'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Results
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'analysis' && (
            <div className={`rounded-3xl p-8 lg:p-12 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-white/80 border border-gray-200 shadow-2xl'
            }`}>
              <div className="text-center mb-12">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}>
                  <span className="text-white text-4xl">🔬</span>
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  AI-Powered Skill Analysis
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Upload your resume and connect your profiles for comprehensive evaluation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                {/* Resume Upload */}
                <div>
                  <label className={`block text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    📄 Resume Upload
                  </label>
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    resume 
                      ? isDarkMode 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-green-500 bg-green-50'
                      : isDarkMode
                      ? 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="text-5xl mb-4">
                        {resume ? '✅' : '📁'}
                      </div>
                      <div className={`text-lg font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {resume ? resume.name : 'Click to upload your resume'}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Supports PDF, DOC, DOCX formats
                      </div>
                    </label>
                  </div>
                </div>

                {/* Profile Links */}
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <label className={`block text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      💼 LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                        isDarkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      ⚡ GitHub Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/your-username"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                        isDarkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
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
                      placeholder="your-leetcode-username"
                      value={leetcode}
                      onChange={(e) => setLeetcode(e.target.value)}
                      className={`w-full px-6 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                        isDarkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500/20 focus:border-blue-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-8 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-xl ${
                      isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                        Analyzing Your Profile...
                      </span>
                    ) : (
                      '🚀 Start AI Analysis'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGeneratePDF}
                    className="w-full py-4 px-8 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl"
                  >
                    📄 Generate Professional Resume
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'results' && (
            <div className={`rounded-3xl p-8 lg:p-12 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-white/80 border border-gray-200 shadow-2xl'
            }`}>
              <div className="text-center mb-12">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}>
                  <span className="text-white text-4xl">📈</span>
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Analysis Results
                </h2>
              </div>

              {result ? (
                <div className="max-w-3xl mx-auto">
                  <div className={`rounded-2xl p-8 mb-8 text-center ${
                    isDarkMode 
                      ? 'bg-blue-900/30 border border-blue-800' 
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className={`text-6xl font-bold mb-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {result.score}
                    </div>
                    <div className={`text-xl font-semibold ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      Overall Professional Score
                    </div>
                  </div>
                  
                  <div className={`rounded-2xl p-8 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border border-gray-600' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <h3 className={`text-xl font-bold mb-6 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      📋 Detailed Feedback & Recommendations
                    </h3>
                    <div className="space-y-4">
                      {(Array.isArray(result.feedback) ? result.feedback : [result.feedback]).map((item, index) => (
                        <div key={index} className={`flex items-start space-x-3 p-4 rounded-xl ${
                          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
                        }`}>
                          <span className="text-green-500 text-xl mt-0.5">✅</span>
                          <span className={`text-lg ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6 opacity-30">📊</div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    No Analysis Results Yet
                  </h3>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Complete the analysis to see your detailed results here
                  </p>
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Start Analysis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          {message && (
            <div className={`mt-8 p-4 rounded-2xl text-center max-w-2xl mx-auto ${
              isDarkMode 
                ? 'bg-green-900/20 text-green-400 border border-green-800' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          {error && (
            <div className={`mt-8 p-4 rounded-2xl text-center max-w-2xl mx-auto ${
              isDarkMode 
                ? 'bg-red-900/20 text-red-400 border border-red-800' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {error}
            </div>
          )}
        </div>
      </section>

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
            © {new Date().getFullYear()} ResumeExpert. Empowering developers to achieve their career goals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
