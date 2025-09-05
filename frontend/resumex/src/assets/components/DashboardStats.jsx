// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DashboardHome = () => {
//   const [stats, setStats] = useState({
//     open_jobs: 0,
//     resumes_received: 0,
//     avg_score: 0,
//     shortlisted: 0,
//   });

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await axios.get("http://localhost:8000/api/v1/company/stats/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStats(response.data);
//     } catch (err) {
//       console.error("Failed to fetch stats:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const StatCard = ({ label, value, icon, color }) => (
//     <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
//       <div className={`text-3xl ${color}`}>{icon}</div>
//       <div>
//         <div className="text-2xl font-semibold">{value}</div>
//         <div className="text-sm text-gray-800">{label}</div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard label="Open Job Posts" value={stats.open_jobs} icon="📁" color="text-blue-600" />
//         <StatCard label="Total Resumes +" value={stats.resumes_received} icon="📄" color="text-purple-600" />
//         <StatCard label="Average Score" value={stats.avg_score.toFixed(2)} icon="⭐" color="text-yellow-500" />
//         <StatCard label="Shortlisted" value={stats.shortlisted} icon="✅" color="text-green-600" />
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

// src/assets/components/DashboardStats.jsx
// src/assets/components/DashboardStats.jsx (Enhanced version)
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardStats = ({ isDarkMode, onNavigate }) => {
  const [stats, setStats] = useState({
    open_jobs: 0,
    resumes_received: 0,
    total_applications: 0,
    avg_score: 0,
    shortlisted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      
      console.log('🔍 Fetching stats with token:', token ? 'Present' : 'Missing');

      // Always fetch jobs first as it's the most reliable endpoint
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

      // Method 1: Try to get counts from job objects directly
      const totalFromJobObjects = jobs.reduce((total, job) => {
        const count = job.applications_count || job.resumes_count || job.resume_count || 0;
        console.log(`Job "${job.title}" has ${count} applications`);
        return total + count;
      }, 0);

      if (totalFromJobObjects > 0) {
        calculatedStats.resumes_received = totalFromJobObjects;
        calculatedStats.total_applications = totalFromJobObjects;
        console.log('✅ Got counts from job objects:', totalFromJobObjects);
      } else {
        // Method 2: Fetch resumes for each job individually
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
            
            console.log(`Job "${job.title}" (ID: ${job.id}) has ${jobResumes.length} resumes`);

            // Calculate scores and shortlisted
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
            console.log(`No resumes found for job ${job.id}:`, resumeError.response?.status);
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

      // Try to get additional stats from stats endpoint (if available)
      try {
        const statsResponse = await axios.get("http://localhost:8000/api/v1/company/stats/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Merge with calculated stats, preferring non-zero values
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
        
        console.log('📈 Stats API response:', apiStats);
      } catch (statsError) {
        console.log('⚠️ Stats API not available:', statsError.response?.status);
      }

      setStats(calculatedStats);
      setError('');
      
      console.log('✅ Final calculated stats:', calculatedStats);
      
    } catch (err) {
      console.error("❌ Failed to fetch stats:", err);
      setError('Unable to load statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Force refresh function
  const forceRefresh = () => {
    console.log('🔄 Force refreshing stats...');
    fetchStats();
  };

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
        {loading ? (
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

  if (error) {
    return (
      <div className={`rounded-3xl p-12 text-center border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-red-400' 
          : 'bg-white border-gray-200 text-red-700'
      }`}>
        <div className="text-6xl mb-6">⚠️</div>
        <h3 className="text-2xl font-bold mb-4">Unable to Load Statistics</h3>
        <p className="text-lg mb-6">{error}</p>
        <button
          onClick={forceRefresh}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
            isDarkMode
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          label="Active Jobs" 
          value={stats.open_jobs} 
          icon="💼" 
          description="Currently open positions"
          onClick={() => onNavigate('jobs')}
        />
        <StatCard 
          label="Total Applications" 
          value={stats.resumes_received || stats.total_applications || 0} 
          icon="📄" 
          description="All resume submissions"
          onClick={() => onNavigate('candidates')}
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
          onClick={() => onNavigate('candidates')}
        />
      </div>

      {/* Manual Refresh Button */}
      <div className="text-center">
        <button
          onClick={forceRefresh}
          disabled={loading}
          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
            loading
              ? 'opacity-50 cursor-not-allowed'
              : isDarkMode
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          {loading ? (
            <span className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
              <span>Refreshing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-3">
              <span>🔄</span>
              <span>Force Refresh Stats</span>
            </span>
          )}
        </button>
      </div>

      {/* Debug Info in Development */}
      {process.env.NODE_ENV === 'development' && (
        <div className={`rounded-2xl p-4 text-xs ${
          isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          <details>
            <summary className="cursor-pointer font-bold mb-2">🐛 Debug Info (Click to expand)</summary>
            <pre className="whitespace-pre-wrap">{JSON.stringify(stats, null, 2)}</pre>
            <button 
              onClick={() => console.log('Current stats:', stats)} 
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs"
            >
              Log to Console
            </button>
          </details>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
