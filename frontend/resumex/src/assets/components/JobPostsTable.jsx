// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function JobPostsTable() {
//   const [jobs, setJobs] = useState([]);
//   useEffect(() => {
//     const fetchJobs = async () => {
//       const token = localStorage.getItem("access_token");
//       const res = await axios.get("http://localhost:8000/api/v1/company/jobs/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setJobs(res.data);
//     };
//     fetchJobs();
//   }, []);
//   return (
//     <div>
//       <h2 className="text-2xl mb-4 font-bold">Job Posts</h2>
//       <table className="min-w-full bg-white rounded shadow">
//         <thead>
//           <tr>
//             <th className="px-6 py-2">Title</th>
//             <th className="px-6 py-2">Date</th>
//             <th className="px-6 py-2">Resumes</th>
//             <th className="px-6 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map(j => (
//             <tr key={j.id} className="hover:bg-gray-50">
//               <td className="px-6 py-2">{j.title}</td>
//               <td className="px-6 py-2">{new Date(j.created_at).toLocaleDateString()}</td>
//               <td className="px-6 py-2">{j.resumes_count || 0}</td>
//               <td className="px-6 py-2">
//                 <Link to={`/dashboard/jobs/${j.id}/resumes`} className="text-blue-600 hover:underline mr-3">Resumes</Link>
//                 <Link to={`/dashboard/jobs/${j.id}/upload`} className="text-green-600 hover:underline">Upload</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default JobPostsTable;

// src/assets/components/JobPostsTable.jsx (Fixed version)
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumeUploadModal from "./ResumeUploadModal";

const JobPostsTable = ({ token, isDarkMode, onJobSelect, onEditJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedJobForUpload, setSelectedJobForUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [token]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/company/jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('📋 Raw jobs data:', res.data);
      
      // Ensure each job has all required properties
      const processedJobs = res.data.map(job => ({
        ...job,
        id: job.id || job.job_id, // Fallback for different API formats
        title: job.title || job.job_title || 'Untitled Job',
        applications_count: job.applications_count || job.resumes_count || 0,
        // Ensure all properties exist
        description: job.description || '',
        location: job.location || 'Remote',
        job_type: job.job_type || 'Full-time',
        is_active: job.is_active !== false, // Default to true if undefined
        created_at: job.created_at || new Date().toISOString(),
        skills_required: job.skills_required || ''
      }));
      
      console.log('📋 Processed jobs:', processedJobs);
      setJobs(processedJobs);
      setError('');
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCandidates = (job) => {
    console.log('🎯 View Candidates clicked for job:', job);
    
    if (!job || !job.id) {
      console.error('❌ Invalid job for candidates view:', job);
      alert('Error: Job information is missing. Please refresh and try again.');
      return;
    }
    
    if (onJobSelect) {
      onJobSelect(job);
    }
  };

  const handleUploadResume = (job) => {
    console.log('📤 Upload Resume clicked for job:', job);
    console.log('Job validation check:');
    console.log('- Job exists:', !!job);
    console.log('- Job ID:', job?.id);
    console.log('- Job title:', job?.title);
    
    if (!job) {
      console.error('❌ Job object is null/undefined');
      alert('Error: Job information is missing. Please refresh the page and try again.');
      return;
    }
    
    if (!job.id) {
      console.error('❌ Job ID is missing from job object:', job);
      alert('Error: Job ID is missing. Please refresh the page and try again.');
      return;
    }
    
    if (!job.title) {
      console.warn('⚠️ Job title is missing, using fallback');
      job.title = job.title || `Job #${job.id}`;
    }
    
    console.log('✅ Job object is valid, setting for modal');
    console.log('Setting selectedJobForUpload to:', job);
    
    setSelectedJobForUpload(job);
    setShowUploadModal(true);
  };

  const handleUploadSuccess = () => {
    console.log('📤 Upload successful, closing modal');
    setShowUploadModal(false);
    setSelectedJobForUpload(null);
    fetchJobs(); // Refresh jobs to update application counts
  };

  const handleCloseModal = () => {
    console.log('❌ Modal closed');
    setShowUploadModal(false);
    setSelectedJobForUpload(null);
  };

  // Rest of your component code...
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && job.is_active) ||
                         (filterStatus === 'inactive' && !job.is_active);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-current mx-auto mb-4"></div>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading your jobs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-3xl p-12 text-center border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-red-400' 
          : 'bg-white border-gray-200 text-red-700'
      }`}>
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold mb-4">{error}</h3>
        <button
          onClick={fetchJobs}
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
    <>
      <div className="space-y-8">
        {/* Header and job cards - keeping your existing code but with proper job validation */}
        <div className={`rounded-3xl p-8 border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Your existing header code */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h2 className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                💼 Job Posts
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filteredJobs.length} of {jobs.length} jobs shown
              </p>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-50">💼</div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No Jobs Found
              </h3>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-4 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>
                        {job.title}
                      </h3>
                      
                      <div className="flex items-center gap-6 mb-4 text-base">
                        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          📍 {job.location}
                        </span>
                        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          💼 {job.job_type}
                        </span>
                        <span className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          📅 {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className={`text-base mb-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {job.description.substring(0, 150)}...
                      </p>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className={`text-3xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>
                        {job.applications_count || 0}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        applications
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => handleViewCandidates(job)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      👥 View Candidates ({job.applications_count || 0})
                    </button>
                    
                    <button
                      onClick={() => handleUploadResume(job)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📤 Upload Resume
                    </button>
                    
                    <button
                      onClick={() => onEditJob && onEditJob(job)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      ✏️ Edit Job
                    </button>
                    
                    <button
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📊 Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resume Upload Modal - Enhanced with better debugging */}
      {showUploadModal && (
        <div>
          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ position: 'fixed', top: '10px', left: '10px', background: 'black', color: 'white', padding: '10px', zIndex: 9999, fontSize: '12px' }}>
              Debug Info:<br/>
              showUploadModal: {showUploadModal.toString()}<br/>
              selectedJobForUpload: {selectedJobForUpload ? 'EXISTS' : 'NULL'}<br/>
              selectedJobForUpload.id: {selectedJobForUpload?.id || 'MISSING'}<br/>
              selectedJobForUpload.title: {selectedJobForUpload?.title || 'MISSING'}
            </div>
          )}
          
          <ResumeUploadModal
            job={selectedJobForUpload}
            token={token}
            isDarkMode={isDarkMode}
            onClose={handleCloseModal}
            onSuccess={handleUploadSuccess}
          />
        </div>
      )}
    </>
  );
};

export default JobPostsTable;
