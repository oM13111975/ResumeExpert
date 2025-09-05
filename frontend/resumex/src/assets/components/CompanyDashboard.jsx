
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobPostForm from './JobPostForm';
import ResumeList from './ResumeList';
import JobPostsTable from './JobPostsTable';
import ResumeUploadModal from './ResumeUploadModal';
import axios from 'axios';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [selectedJob, setSelectedJob] = useState(null);
  
  // ✅ Modal state for resume upload
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedJobForUpload, setSelectedJobForUpload] = useState(null);
  
  const [stats, setStats] = useState({
    open_jobs: 0,
    resumes_received: 0,
    total_applications: 0,
    avg_score: 0,
    shortlisted: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('company_name');
    if (!token || role !== 'company') {
      navigate('/login/');
    } else {
      setCompanyName(name || 'Company');
      fetchStats();
    }
  }, [navigate, token]);

  // Integrated stats fetching logic
  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      console.log('🔍 Fetching dashboard stats...');

      const jobsResponse = await axios.get("http://localhost:8000/api/v1/company/jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobs = jobsResponse.data;
      console.log('📊 Jobs fetched:', jobs.length);

      let calculatedStats = {
        open_jobs: jobs.filter(job => job.is_active !== false).length,
        resumes_received: 0,
        total_applications: 0,
        avg_score: 0,
        shortlisted: 0,
      };

      const totalFromJobObjects = jobs.reduce((total, job) => {
        const count = job.applications_count || job.resumes_count || job.resume_count || 0;
        return total + count;
      }, 0);

      if (totalFromJobObjects > 0) {
        calculatedStats.resumes_received = totalFromJobObjects;
        calculatedStats.total_applications = totalFromJobObjects;
        console.log('✅ Got counts from job objects:', totalFromJobObjects);
      } else {
        console.log('🔄 Job objects have no counts, fetching individual resumes...');
        
        let allResumes = [];
        let totalScore = 0;
        let resumesWithScores = 0;
        let shortlistedCount = 0;

        for (const job of jobs) {
          try {
            const resumesResponse = await axios.get(
              `http://localhost:8000/api/v1/company/resumes/${job.id}/`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            
            const jobResumes = resumesResponse.data || [];
            allResumes = [...allResumes, ...jobResumes];

            jobResumes.forEach(resume => {
              if (resume.score && resume.score > 0) {
                totalScore += resume.score;
                resumesWithScores++;
              }
              if (resume.shortlisted) {
                shortlistedCount++;
              }
            });

          } catch (resumeError) {
            console.log(`No resumes found for job ${job.id}`);
          }
        }

        calculatedStats.resumes_received = allResumes.length;
        calculatedStats.total_applications = allResumes.length;
        calculatedStats.shortlisted = shortlistedCount;
        
        if (resumesWithScores > 0) {
          calculatedStats.avg_score = totalScore / resumesWithScores;
        }

        console.log('📋 Total resumes found:', allResumes.length);
      }

      try {
        const statsResponse = await axios.get("http://localhost:8000/api/v1/company/stats/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const apiStats = statsResponse.data;
        if (apiStats.resumes_received > calculatedStats.resumes_received) {
          calculatedStats.resumes_received = apiStats.resumes_received;
        }
        if (apiStats.shortlisted > calculatedStats.shortlisted) {
          calculatedStats.shortlisted = apiStats.shortlisted;
        }
        if (apiStats.avg_score > calculatedStats.avg_score) {
          calculatedStats.avg_score = apiStats.avg_score;
        }
      } catch (statsError) {
        console.log('⚠️ Stats API not available');
      }

      setStats(calculatedStats);
      setStatsError('');
      console.log('✅ Final calculated stats:', calculatedStats);
      
    } catch (err) {
      console.error("❌ Failed to fetch stats:", err);
      setStatsError('Unable to load statistics');
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Navigation handlers
  const handleNavigation = async (view, job = null) => {
    console.log('Navigation clicked:', view);
    
    if (view === 'candidates' && !selectedJob && !job) {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/company/jobs/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.length > 0) {
          setSelectedJob(res.data[0]);
          setActiveView('candidates');
        } else {
          setActiveView('post-job');
        }
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setActiveView('jobs');
      }
      return;
    }
    
    setActiveView(view);
    if (job) {
      setSelectedJob(job);
    }
  };

  const handleJobCreated = (job) => {
    setSelectedJob(job);
    setActiveView('candidates');
    fetchStats();
  };

  const handleJobSelected = (job) => {
    setSelectedJob(job);
    setActiveView('candidates');
  };

  const handleJobEdit = (job) => {
    setSelectedJob(job);
    setActiveView('post-job');
  };

  // ✅ Modal handlers
  const handleUploadResumeModal = (job) => {
    console.log('Opening upload modal for job:', job);
    setSelectedJobForUpload(job);
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setSelectedJobForUpload(null);
  };

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
    setSelectedJobForUpload(null);
    fetchStats(); // Refresh stats after upload
    // Optionally refresh the current view
    if (activeView === 'candidates' && selectedJob) {
      // Force refresh of the resume list by re-setting the selected job
      setSelectedJob({ ...selectedJob });
    }
  };

  // Stats card component
  const StatCard = ({ label, value, icon, onClick, description }) => (
    <div 
      className={`group relative rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 cursor-pointer border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-60 mb-1">Live</div>
          <div className="text-green-500 text-sm font-bold">●</div>
        </div>
      </div>
      
      <div className={`text-4xl font-bold mb-3 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>
        {statsLoading ? (
          <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
        ) : (
          value
        )}
      </div>
      
      <div className={`text-xl font-semibold mb-2 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {label}
      </div>
      
      <div className={`text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {description}
      </div>
    </div>
  );

  // Quick Job Selection Component
  const JobQuickSelect = ({ token, isDarkMode, onJobSelect }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/company/jobs/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobs(res.data);
        } catch (err) {
          console.error('Failed to fetch jobs:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }, [token]);

    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading jobs...</p>
        </div>
      );
    }

    if (jobs.length === 0) {
      return (
        <div className="text-center py-8">
          <div className={`text-6xl mb-4 ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}>📭</div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No jobs available. Create a job first to manage candidates.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.slice(0, 6).map((job) => (
          <button
            key={job.id}
            onClick={() => onJobSelect(job)}
            className={`p-6 rounded-2xl text-left transition-all duration-200 border hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className={`text-xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              {job.title}
            </h4>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                📍 {job.location || 'Remote'}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                job.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {job.is_active ? '🟢 Active' : '⭕ Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {job.applications_count || 0}
              </span>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                applications
              </span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      
      {/* Navigation Header */}
      <nav className={`border-b sticky top-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        isDarkMode 
          ? 'bg-black/90 border-gray-800' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-6">
            
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-white text-black' 
                  : 'bg-black text-white'
              }`}>
                <span className="font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  ResumeExpert
                </h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Company Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className={`px-4 py-2 rounded-lg font-medium border ${
                isDarkMode 
                  ? 'bg-gray-900 text-gray-200 border-gray-700' 
                  : 'bg-gray-50 text-gray-800 border-gray-200'
              }`}>
                <span className="text-sm">Welcome, </span>
                <span className="font-semibold">{companyName}</span>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className={`text-6xl lg:text-7xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            {activeView === 'overview' && 'Dashboard'}
            {activeView === 'post-job' && 'Create Job'}
            {activeView === 'jobs' && 'Manage Jobs'}
            {activeView === 'candidates' && 'Candidates'}
            {activeView === 'analytics' && 'Analytics'}
          </h2>
          <p className={`text-xl lg:text-2xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {activeView === 'overview' && 'Streamline your hiring process with intelligent tools and insights'}
            {activeView === 'post-job' && 'Create compelling job descriptions that attract top talent'}
            {activeView === 'jobs' && 'Organize and track all your job postings in one place'}
            {activeView === 'candidates' && 'Review applications and discover the perfect candidates'}
            {activeView === 'analytics' && 'Measure performance and optimize your hiring strategy'}
          </p>
        </div>

        {/* Navigation Pills */}
        <div className={`flex flex-wrap justify-center gap-2 mb-16 p-2 rounded-2xl max-w-2xl mx-auto ${
          isDarkMode 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-gray-100 border border-gray-200'
        }`}>
          {[
            { id: 'overview', name: 'Overview', icon: '📊' },
            { id: 'post-job', name: 'Post Job', icon: '➕' },
            { id: 'jobs', name: 'Jobs', icon: '💼' },
            { id: 'candidates', name: 'Candidates', icon: '👥' },
            { id: 'analytics', name: 'Analytics', icon: '📈' },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => handleNavigation(nav.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-base transition-all duration-200 ${
                activeView === nav.id
                  ? isDarkMode
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{nav.icon}</span>
              {nav.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-12">
          {activeView === 'overview' && (
            <div className="space-y-12">
              {/* Stats Section */}
              {statsError ? (
                <div className={`rounded-3xl p-12 text-center border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-red-400' 
                    : 'bg-white border-gray-200 text-red-700'
                }`}>
                  <div className="text-6xl mb-6">⚠️</div>
                  <h3 className="text-2xl font-bold mb-4">Unable to Load Statistics</h3>
                  <p className="text-lg mb-6">{statsError}</p>
                  <button
                    onClick={fetchStats}
                    className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
                      isDarkMode
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard 
                    label="Active Jobs" 
                    value={stats.open_jobs} 
                    icon="💼" 
                    description="Currently open positions"
                    onClick={() => handleNavigation('jobs')}
                  />
                  <StatCard 
                    label="Total Applications" 
                    value={stats.resumes_received || stats.total_applications || 0} 
                    icon="📄" 
                    description="All resume submissions"
                    onClick={() => handleNavigation('candidates')}
                  />
                  <StatCard 
                    label="Average Score" 
                    value={stats.avg_score?.toFixed(1) || '0.0'} 
                    icon="⭐" 
                    description="AI evaluation average"
                  />
                  <StatCard 
                    label="Shortlisted" 
                    value={stats.shortlisted || 0} 
                    icon="✅" 
                    description="Selected candidates"
                    onClick={() => handleNavigation('candidates')}
                  />
                </div>
              )}

              {/* Quick Actions */}
              <div className={`rounded-3xl p-12 border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-4xl font-bold mb-4 text-center ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  🚀 Quick Actions
                </h3>
                <p className={`text-center text-xl mb-12 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Streamline your hiring process with these powerful tools
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <button
                    onClick={() => handleNavigation('post-job')}
                    className={`group p-8 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">➕</div>
                    <h4 className={`font-bold text-2xl mb-4 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      Post New Job
                    </h4>
                    <p className={`text-lg ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Create compelling job descriptions to attract top talent worldwide
                    </p>
                  </button>

                  <button
                    onClick={() => handleNavigation('candidates')}
                    className={`group p-8 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👥</div>
                    <h4 className={`font-bold text-2xl mb-4 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      Review Applications
                    </h4>
                    <p className={`text-lg ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      AI-powered candidate evaluation with {stats.resumes_received || 0} applications waiting
                    </p>
                  </button>

                  <button
                    onClick={() => handleNavigation('analytics')}
                    className={`group p-8 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
                    <h4 className={`font-bold text-2xl mb-4 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      View Analytics
                    </h4>
                    <p className={`text-lg ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Comprehensive insights and performance metrics dashboard
                    </p>
                  </button>
                </div>
              </div>

              {/* Manual Refresh Button */}
              <div className="text-center">
                <button
                  onClick={fetchStats}
                  disabled={statsLoading}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    statsLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {statsLoading ? (
                    <span className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                      <span>Refreshing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-3">
                      <span>🔄</span>
                      <span>Refresh Stats</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeView === 'post-job' && (
            <div className={`rounded-3xl p-12 border ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <JobPostForm 
                token={token} 
                onCreated={handleJobCreated} 
                isDarkMode={isDarkMode}
                onCancel={() => handleNavigation('overview')}
              />
            </div>
          )}

          {activeView === 'jobs' && (
            <JobPostsTable 
              token={token} 
              isDarkMode={isDarkMode}
              onJobSelect={handleJobSelected}
              onEditJob={handleJobEdit}
            />
          )}

          {/* ✅ Updated Candidates Section with Modal Integration */}
          {activeView === 'candidates' && (
            <div className="space-y-8">
              {selectedJob ? (
                <>
                  <div className={`rounded-3xl p-12 border ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-12">
                      <div>
                        <h3 className={`text-4xl font-bold mb-4 ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {selectedJob.title}
                        </h3>
                        <p className={`text-xl ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Managing applications and candidates
                        </p>
                      </div>
                      <button
                        onClick={() => handleNavigation('jobs')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all border ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                        }`}
                      >
                        ← Back to Jobs
                      </button>
                    </div>
                    
                    {/* ✅ Upload Resume Button (Modal) */}
                    <div className="text-center mb-8">
                      <button
                        onClick={() => handleUploadResumeModal(selectedJob)}
                        className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                          isDarkMode
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        📤 Upload Resume for this Job
                      </button>
                    </div>
                  </div>
                  
                  <ResumeList 
                    token={token} 
                    jobId={selectedJob.id} 
                    isDarkMode={isDarkMode}
                  />
                </>
              ) : (
                /* Job selection interface when no job is selected */
                <div className="space-y-8">
                  <div className={`rounded-3xl p-12 border ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="text-center mb-12">
                      <div className={`text-8xl mb-6 ${
                        isDarkMode ? 'opacity-30' : 'opacity-20'
                      }`}>💼</div>
                      <h3 className={`text-4xl font-bold mb-6 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>
                        Select a Job to View Candidates
                      </h3>
                      <p className={`text-xl mb-12 max-w-2xl mx-auto ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Choose from your active job postings below to review applications and manage candidates
                      </p>
                    </div>

                    <JobQuickSelect 
                      token={token}
                      isDarkMode={isDarkMode}
                      onJobSelect={handleJobSelected}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => handleNavigation('jobs')}
                      className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      Browse All Jobs
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'analytics' && (
            <div className={`text-center py-32 rounded-3xl border ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <div className={`text-8xl mb-8 ${
                isDarkMode ? 'opacity-30' : 'opacity-20'
              }`}>📊</div>
              <h3 className={`text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                Analytics Dashboard
              </h3>
              <p className={`text-xl mb-12 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Comprehensive hiring insights and performance metrics are coming soon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t mt-32 py-16 ${
        isDarkMode 
          ? 'border-gray-800 bg-black' 
          : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode 
                ? 'bg-white text-black' 
                : 'bg-black text-white'
            }`}>
              <span className="font-bold text-lg">R</span>
            </div>
            <span className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              ResumeExpert
            </span>
          </div>
          <p className={`text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} ResumeExpert. Empowering companies to find exceptional talent.
          </p>
        </div>
      </footer>

      {/* ✅ Resume Upload Modal */}
      {showUploadModal && selectedJobForUpload && (
        <ResumeUploadModal
          job={selectedJobForUpload}
          token={token}
          isDarkMode={isDarkMode}
          onClose={handleCloseUploadModal}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
