// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId }) => {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`/api/v1/company/resumes/${jobId}/`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setResumes(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetch();
//   }, [jobId, token]);

//   return (
//     <div>
//       <h3>Scored Resumes</h3>
//       <table>
//         <thead>
//           <tr><th>#</th><th>Name / File</th><th>Score</th><th>Feedback</th></tr>
//         </thead>
//         <tbody>
//           {resumes.map((r, i) => (
//             <tr key={r.id}>
//               <td>{i+1}</td>
//               <td>{r.resume_file.split('/').pop()}</td>
//               <td>{r.score}</td>
//               <td>
//                 <ul>{r.feedback?.split('\n').map((f, idx) => <li key={idx}>{f}</li>)}</ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResumeList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId }) => {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/v1/company/resumes/${jobId}/`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setResumes(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetch();
//   }, [jobId, token]);

//   return (
//     <div>
//       <h3>Scored Resumes</h3>
//       <table>
//         <thead>
//           <tr><th>#</th><th>File</th><th>Score</th><th>Feedback</th></tr>
//         </thead>
//         <tbody>
//           {resumes.map((r, i) => (
//             <tr key={r.id}>
//               <td>{i + 1}</td>
//               <td>{r.resume_file?.split('/').pop()}</td>
//               <td>{r.score}</td>
//               <td>
//                 <ul>{r.feedback?.split('\n').map((f, idx) => <li key={idx}>{f}</li>)}</ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResumeList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId }) => {
//   const [resumes, setResumes] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/v1/company/resumes/${jobId}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setResumes(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetch();
//   }, [jobId, token]);

//   return (
//     <div>
//       <h3>Scored Resumes</h3>
//       <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'left' }}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Resume File</th>
//             <th>Score</th>
//             <th>Feedback</th>
//           </tr>
//         </thead>
//         <tbody>
//           {resumes.map((r, i) => (
//             <tr key={r.id}>
//               <td>{i + 1}</td>
//               <td>{r.resume_file?.split('/').pop()}</td>
//               <td>{r.score}</td>
//               <td>
//                 <ul>
//                   {r.feedback?.split('\n').map((line, idx) => (
//                     <li key={idx}>{line}</li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResumeList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId }) => {
//   const [resumes, setResumes] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!token || !jobId) {
//       setError('Token or jobId missing');
//       return;
//     }
//     const fetch = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/v1/company/resumes/${jobId}/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("Resumes response:", res.data);
//         setResumes(res.data);
//       } catch (err) {
//         setError(
//           err?.response?.data?.error ||
//             "Failed to fetch resumes. Check your permissions and jobId."
//         );
//         setResumes([]);
//         console.error(err);
//       }
//     };
//     fetch();
//   }, [jobId, token]);

//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (
//     <div>
//       <h3>Scored Resumes</h3>
//       {resumes.length === 0 ? (
//         <div style={{ color: 'gray' }}>No resumes found for this job.</div>
//       ) : (
//         <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Resume File</th>
//               <th>Score</th>
//               <th>Feedback</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resumes.map((r, i) => (
//               <tr key={r.id}>
//                 <td>{i + 1}</td>
//                 <td>{r.resume_file ? r.resume_file.split('/').pop() : "N/A"}</td>
//                 <td>{r.score}</td>
//                 <td>
//                   <ul>
//                     {(r.feedback || "").split('\n').map((line, idx) => (
//                       <li key={idx}>{line}</li>
//                     ))}
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ResumeList;


// ResumeList.jsx (Modern Card Design)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId, isDarkMode }) => {
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!token || !jobId) {
//       setError('Token or jobId missing');
//       setLoading(false);
//       return;
//     }

//     const fetchResumes = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `http://localhost:8000/api/v1/company/resumes/${jobId}/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setResumes(res.data);
//         setError('');
//       } catch (err) {
//         setError(
//           err?.response?.data?.error ||
//           "Failed to fetch resumes. Check your permissions and jobId."
//         );
//         setResumes([]);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResumes();
//   }, [jobId, token]);

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//         <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//           Loading resumes...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`rounded-2xl p-8 text-center ${
//         isDarkMode 
//           ? 'bg-red-900/20 text-red-400 border border-red-800' 
//           : 'bg-red-50 text-red-700 border border-red-200'
//       }`}>
//         <div className="text-4xl mb-4">⚠️</div>
//         <p className="text-lg font-medium">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`rounded-2xl p-8 ${
//       isDarkMode 
//         ? 'bg-gray-800/50 border border-gray-700 backdrop-blur-lg' 
//         : 'bg-white/80 border border-gray-200 shadow-xl backdrop-blur-lg'
//     }`}>
//       <div className="text-center mb-8">
//         <h3 className={`text-3xl font-bold ${
//           isDarkMode ? 'text-gray-100' : 'text-gray-900'
//         }`}>
//           📋 Resume Applications
//         </h3>
//         <p className={`text-lg mt-2 ${
//           isDarkMode ? 'text-gray-400' : 'text-gray-600'
//         }`}>
//           {resumes.length} applications received
//         </p>
//       </div>

//       {resumes.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="text-6xl mb-4 opacity-50">📄</div>
//           <h4 className={`text-xl font-bold mb-2 ${
//             isDarkMode ? 'text-gray-300' : 'text-gray-600'
//           }`}>
//             No Applications Yet
//           </h4>
//           <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Applications will appear here once candidates start applying
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {resumes.map((resume, index) => (
//             <div key={resume.id} className={`rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${
//               isDarkMode 
//                 ? 'bg-gray-700/50 border border-gray-600 hover:border-gray-500' 
//                 : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
//             }`}>
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center space-x-4">
//                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
//                     isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
//                   }`}>
//                     #{index + 1}
//                   </div>
//                   <div>
//                     <h4 className={`text-lg font-semibold ${
//                       isDarkMode ? 'text-gray-200' : 'text-gray-900'
//                     }`}>
//                       {resume.resume_file ? resume.resume_file.split('/').pop() : "Resume File"}
//                     </h4>
//                     <p className={`text-sm ${
//                       isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       Submitted on {new Date(resume.uploaded_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className={`text-2xl font-bold mb-1 ${
//                     (resume.score || 0) >= 80 ? 'text-green-500' :
//                     (resume.score || 0) >= 60 ? 'text-yellow-500' : 'text-red-500'
//                   }`}>
//                     {resume.score || 0}/100
//                   </div>
//                   <div className={`text-xs ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                   }`}>
//                     AI Score
//                   </div>
//                 </div>
//               </div>

//               {/* GitHub and LeetCode Links */}
//               <div className="flex gap-4 mb-4">
//                 {resume.github_url && (
//                   <a
//                     href={resume.github_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                       isDarkMode 
//                         ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     💻 GitHub
//                   </a>
//                 )}
//                 {resume.leetcode_username && (
//                   <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
//                     isDarkMode ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-100 text-orange-700'
//                   }`}>
//                     🧠 LeetCode: {resume.leetcode_username}
//                   </span>
//                 )}
//               </div>

//               {/* Feedback */}
//               {resume.feedback && (
//                 <div className={`rounded-lg p-4 ${
//                   isDarkMode ? 'bg-gray-600/30' : 'bg-white'
//                 }`}>
//                   <h5 className={`font-semibold mb-2 ${
//                     isDarkMode ? 'text-gray-200' : 'text-gray-800'
//                   }`}>
//                     🤖 AI Feedback:
//                   </h5>
//                   <div className={`text-sm space-y-1 ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}>
//                     {resume.feedback.split('\n').map((line, idx) => (
//                       line.trim() && (
//                         <div key={idx} className="flex items-start space-x-2">
//                           <span className="text-blue-500 mt-1">•</span>
//                           <span>{line.trim()}</span>
//                         </div>
//                       )
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex gap-3 mt-4">
//                 <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
//                   ✅ Shortlist
//                 </button>
//                 <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                   👁️ Review
//                 </button>
//                 <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
//                   ❌ Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeList;


// src/assets/components/ResumeList.jsx
// src/assets/components/ResumeList.jsx (Landing page theme)



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResumeList = ({ token, jobId, isDarkMode }) => {
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('score');

//   useEffect(() => {
//     if (!token || !jobId) {
//       setError('Token or jobId missing');
//       setLoading(false);
//       return;
//     }

//     fetchResumes();
//   }, [jobId, token]);

//   const fetchResumes = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/company/resumes/${jobId}/`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setResumes(res.data);
//       setError('');
//     } catch (err) {
//       setError(
//         err?.response?.data?.error ||
//         "Failed to fetch resumes. Check your permissions and jobId."
//       );
//       setResumes([]);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (resumeId, action) => {
//     try {
//       let updateData = {};
      
//       switch (action) {
//         case 'shortlist':
//           updateData = { shortlisted: true, status: 'shortlisted' };
//           break;
//         case 'reject':
//           updateData = { shortlisted: false, status: 'rejected' };
//           break;
//         case 'interview':
//           updateData = { status: 'interview_scheduled' };
//           break;
//         case 'hire':
//           updateData = { status: 'hired' };
//           break;
//         default:
//           return;
//       }

//       await axios.patch(
//         `http://localhost:8000/api/v1/company/resume/${resumeId}/`,
//         updateData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setResumes(prevResumes => 
//         prevResumes.map(resume => 
//           resume.id === resumeId 
//             ? { ...resume, ...updateData }
//             : resume
//         )
//       );
//     } catch (err) {
//       console.error('Failed to update resume status:', err);
//       alert('Failed to update status. Please try again.');
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 80) return isDarkMode ? 'text-green-400' : 'text-green-600';
//     if (score >= 60) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
//     return isDarkMode ? 'text-red-400' : 'text-red-600';
//   };

//   const getStatusBadge = (status, shortlisted) => {
//     if (shortlisted) return { 
//       color: isDarkMode ? 'bg-green-900/20 text-green-400 border-green-700' : 'bg-green-50 text-green-700 border-green-200', 
//       text: '✅ Shortlisted' 
//     };
    
//     switch (status) {
//       case 'interview_scheduled':
//         return { 
//           color: isDarkMode ? 'bg-blue-900/20 text-blue-400 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200', 
//           text: '📅 Interview' 
//         };
//       case 'hired':
//         return { 
//           color: isDarkMode ? 'bg-purple-900/20 text-purple-400 border-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200', 
//           text: '🎉 Hired' 
//         };
//       case 'rejected':
//         return { 
//           color: isDarkMode ? 'bg-red-900/20 text-red-400 border-red-700' : 'bg-red-50 text-red-700 border-red-200', 
//           text: '❌ Rejected' 
//         };
//       default:
//         return { 
//           color: isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200', 
//           text: '⏳ Pending' 
//         };
//     }
//   };

//   const filteredAndSortedResumes = resumes
//     .filter(resume => {
//       if (filter === 'all') return true;
//       if (filter === 'shortlisted') return resume.shortlisted;
//       if (filter === 'pending') return resume.status === 'pending';
//       if (filter === 'high-score') return (resume.score || 0) >= 80;
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === 'score') return (b.score || 0) - (a.score || 0);
//       if (sortBy === 'date') return new Date(b.uploaded_at) - new Date(a.uploaded_at);
//       return 0;
//     });

//   if (loading) {
//     return (
//       <div className="text-center py-20">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-current mx-auto mb-6"></div>
//         <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//           Loading applications...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`rounded-3xl p-12 text-center border ${
//         isDarkMode 
//           ? 'bg-gray-800 border-gray-700 text-red-400' 
//           : 'bg-white border-gray-200 text-red-700'
//       }`}>
//         <div className="text-6xl mb-6">⚠️</div>
//         <h3 className="text-2xl font-bold mb-4">Unable to Load Applications</h3>
//         <p className="text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`rounded-3xl border ${
//       isDarkMode 
//         ? 'bg-gray-800 border-gray-700' 
//         : 'bg-white border-gray-200'
//     }`}>
//       {/* Header */}
//       <div className="p-8 border-b border-gray-200">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           <div>
//             <h2 className={`text-4xl font-bold ${
//               isDarkMode ? 'text-white' : 'text-black'
//             }`}>
//               📋 Resume Applications
//             </h2>
//             <p className={`text-xl mt-2 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               {filteredAndSortedResumes.length} of {resumes.length} applications
//             </p>
//           </div>
          
//           <div className="flex gap-4">
//             {/* Filter */}
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className={`px-6 py-3 rounded-2xl border text-lg transition-all duration-200 focus:outline-none ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-gray-500'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-gray-500'
//               }`}
//             >
//               <option value="all">All Applications</option>
//               <option value="shortlisted">Shortlisted</option>
//               <option value="high-score">High Score (80+)</option>
//               <option value="pending">Pending Review</option>
//             </select>
            
//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className={`px-6 py-3 rounded-2xl border text-lg transition-all duration-200 focus:outline-none ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-gray-500'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-gray-500'
//               }`}
//             >
//               <option value="score">Sort by Score</option>
//               <option value="date">Sort by Date</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {filteredAndSortedResumes.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="text-8xl mb-8 opacity-30">📄</div>
//             <h3 className={`text-3xl font-bold mb-6 ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-600'
//             }`}>
//               {resumes.length === 0 ? 'No Applications Yet' : 'No Applications Match Filter'}
//             </h3>
//             <p className={`text-xl ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               {resumes.length === 0 
//                 ? 'Applications will appear here once candidates start applying'
//                 : 'Try adjusting your filters to see more applications'
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredAndSortedResumes.map((resume, index) => {
//               const statusBadge = getStatusBadge(resume.status, resume.shortlisted);
              
//               return (
//                 <div 
//                   key={resume.id} 
//                   className={`rounded-2xl p-8 border transition-all duration-300 ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
//                       : 'bg-gray-50 border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex items-center space-x-6">
//                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl border ${
//                         isDarkMode 
//                           ? 'bg-gray-600 text-white border-gray-500' 
//                           : 'bg-white text-gray-700 border-gray-300'
//                       }`}>
//                         #{index + 1}
//                       </div>
//                       <div>
//                         <h3 className={`text-2xl font-bold ${
//                           isDarkMode ? 'text-white' : 'text-black'
//                         }`}>
//                           {resume.candidate_name || 'Unknown Candidate'}
//                         </h3>
//                         {resume.candidate_email && (
//                           <p className={`text-lg ${
//                             isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                           }`}>
//                             📧 {resume.candidate_email}
//                           </p>
//                         )}
//                         <p className={`text-sm mt-1 ${
//                           isDarkMode ? 'text-gray-500' : 'text-gray-500'
//                         }`}>
//                           Submitted on {new Date(resume.uploaded_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <div className={`text-4xl font-bold mb-2 ${getScoreColor(resume.score || 0)}`}>
//                         {resume.score || 0}/100
//                       </div>
//                       <div className={`text-sm ${
//                         isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                       }`}>
//                         AI Score
//                       </div>
//                       <div className={`mt-3 px-4 py-2 rounded-xl text-sm font-medium border ${statusBadge.color}`}>
//                         {statusBadge.text}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Links */}
//                   <div className="flex flex-wrap gap-4 mb-6">
//                     {resume.resume_file && (
//                       <a
//                         href={resume.resume_file}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
//                           isDarkMode 
//                             ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 border-gray-500' 
//                             : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
//                         }`}
//                       >
//                         📄 View Resume
//                       </a>
//                     )}
//                     {resume.github_url && (
//                       <a
//                         href={resume.github_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
//                           isDarkMode 
//                             ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 border-gray-500' 
//                             : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
//                         }`}
//                       >
//                         💻 GitHub
//                       </a>
//                     )}
//                     {resume.leetcode_username && (
//                       <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${
//                         isDarkMode ? 'bg-orange-900/20 text-orange-400 border-orange-700' : 'bg-orange-50 text-orange-700 border-orange-200'
//                       }`}>
//                         🧠 LeetCode: {resume.leetcode_username}
//                       </span>
//                     )}
//                   </div>

//                   {/* AI Feedback */}
//                   {resume.feedback && (
//                     <div className={`rounded-2xl p-6 mb-6 border ${
//                       isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
//                     }`}>
//                       <h4 className={`font-bold text-lg mb-4 ${
//                         isDarkMode ? 'text-white' : 'text-black'
//                       }`}>
//                         🤖 AI Analysis
//                       </h4>
//                       <div className={`text-base space-y-2 ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                       }`}>
//                         {resume.feedback.split('\n').map((line, idx) => (
//                           line.trim() && (
//                             <div key={idx} className="flex items-start space-x-3">
//                               <span className="mt-1 text-lg">•</span>
//                               <span>{line.trim()}</span>
//                             </div>
//                           )
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <button
//                       onClick={() => handleAction(resume.id, 'shortlist')}
//                       disabled={resume.shortlisted}
//                       className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                         resume.shortlisted
//                           ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
//                           : isDarkMode
//                           ? 'bg-white text-black hover:bg-gray-200'
//                           : 'bg-black text-white hover:bg-gray-800'
//                       }`}
//                     >
//                       ✅ Shortlist
//                     </button>
                    
//                     <button
//                       onClick={() => handleAction(resume.id, 'interview')}
//                       className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
//                         isDarkMode
//                           ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
//                           : 'border-gray-300 text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       📅 Interview
//                     </button>
                    
//                     <button
//                       onClick={() => handleAction(resume.id, 'hire')}
//                       className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
//                         isDarkMode
//                           ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
//                           : 'border-gray-300 text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       🎉 Hire
//                     </button>
                    
//                     <button
//                       onClick={() => handleAction(resume.id, 'reject')}
//                       className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
//                         isDarkMode
//                           ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
//                           : 'border-gray-300 text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeList;



// src/assets/components/ResumeList.jsx (Updated with proper error handling)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeList = ({ token, jobId, isDarkMode }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    console.log('🔍 ResumeList received:', { token: !!token, jobId, isDarkMode });
    
    if (!token) {
      setError('Authentication token missing');
      setLoading(false);
      return;
    }
    
    if (!jobId) {
      setError('Job ID missing');
      setLoading(false);
      return;
    }

    fetchResumes();
  }, [jobId, token]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log(`📋 Fetching resumes for job ID: ${jobId}`);
      
      const res = await axios.get(
        `http://localhost:8000/api/v1/company/resumes/${jobId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('📄 Resumes fetched:', res.data);
      console.log('Resume count:', res.data.length);
      
      setResumes(res.data || []);
      setError('');
    } catch (err) {
      console.error('❌ Failed to fetch resumes:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorMessage = err?.response?.data?.error || 
                          err?.response?.data?.detail ||
                          `Failed to fetch resumes. Status: ${err.response?.status}`;
      setError(errorMessage);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ MAIN FIX - Updated handleAction function
  const handleAction = async (resumeId, action) => {
    console.log('🔍 Attempting to update resume:', resumeId);
    console.log('Action:', action);
    
    // Verify the resume exists in your current list
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) {
      console.error('❌ Resume not found in current list:', resumeId);
      alert('Resume not found in current list. Please refresh the page.');
      return;
    }
    
    try {
      let updateData = {};
      
      switch (action) {
        case 'shortlist':
          updateData = { shortlisted: true, status: 'shortlisted' };
          break;
        case 'reject':
          updateData = { shortlisted: false, status: 'rejected' };
          break;
        case 'interview':
          updateData = { status: 'interview_scheduled' };
          break;
        case 'hire':
          updateData = { status: 'hired' };
          break;
        default:
          return;
      }
      
      console.log('📤 Sending PATCH request to:', `http://localhost:8000/api/v1/company/resume/${resumeId}/`);
      console.log('📤 With data:', updateData);

      // ✅ This is the main fix - correct API endpoint
      await axios.patch(
        `http://localhost:8000/api/v1/company/resume/${resumeId}/`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state immediately
      setResumes(prevResumes => 
        prevResumes.map(resume => 
          resume.id === resumeId 
            ? { ...resume, ...updateData }
            : resume
        )
      );
      
      console.log('✅ Resume updated successfully');
    } catch (err) {
      console.error('❌ Failed to update resume status:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      // Enhanced error handling
      if (err.response?.status === 404) {
        alert('Resume not found. It may have been deleted. Please refresh the page.');
        fetchResumes(); // Refresh the list
      } else if (err.response?.status === 403) {
        alert('Access denied. You may not have permission to modify this resume.');
      } else if (err.response?.status === 401) {
        alert('Authentication expired. Please log in again.');
      } else {
        const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Unknown error';
        alert(`Failed to update status: ${errorMsg}`);
      }
    }
  };

  // Rest of your component remains the same...
  const getScoreColor = (score) => {
    if (score >= 80) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (score >= 60) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const getStatusBadge = (status, shortlisted) => {
    if (shortlisted) return { 
      color: isDarkMode ? 'bg-green-900/20 text-green-400 border-green-700' : 'bg-green-50 text-green-700 border-green-200', 
      text: '✅ Shortlisted' 
    };
    
    switch (status) {
      case 'interview_scheduled':
        return { 
          color: isDarkMode ? 'bg-blue-900/20 text-blue-400 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200', 
          text: '📅 Interview' 
        };
      case 'hired':
        return { 
          color: isDarkMode ? 'bg-purple-900/20 text-purple-400 border-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200', 
          text: '🎉 Hired' 
        };
      case 'rejected':
        return { 
          color: isDarkMode ? 'bg-red-900/20 text-red-400 border-red-700' : 'bg-red-50 text-red-700 border-red-200', 
          text: '❌ Rejected' 
        };
      default:
        return { 
          color: isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200', 
          text: '⏳ Pending' 
        };
    }
  };

  const filteredAndSortedResumes = resumes
    .filter(resume => {
      if (filter === 'all') return true;
      if (filter === 'shortlisted') return resume.shortlisted;
      if (filter === 'pending') return resume.status === 'pending';
      if (filter === 'high-score') return (resume.score || 0) >= 80;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return (b.score || 0) - (a.score || 0);
      if (sortBy === 'date') return new Date(b.uploaded_at) - new Date(a.uploaded_at);
      return 0;
    });

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-current mx-auto mb-6"></div>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading applications for Job ID: {jobId}...
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
        <div className="text-6xl mb-6">⚠️</div>
        <h3 className="text-2xl font-bold mb-4">Unable to Load Applications</h3>
        <p className="text-lg mb-4">{error}</p>
        <p className="text-sm mb-6">Job ID: {jobId}</p>
        <button
          onClick={fetchResumes}
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
    <div className={`rounded-3xl border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className={`text-4xl font-bold ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              📋 Resume Applications
            </h2>
            <p className={`text-xl mt-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredAndSortedResumes.length} of {resumes.length} applications (Job ID: {jobId})
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-6 py-3 rounded-2xl border text-lg transition-all duration-200 focus:outline-none ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-gray-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-500'
              }`}
            >
              <option value="all">All Applications</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="high-score">High Score (80+)</option>
              <option value="pending">Pending Review</option>
            </select>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-6 py-3 rounded-2xl border text-lg transition-all duration-200 focus:outline-none ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-gray-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-500'
              }`}
            >
              <option value="score">Sort by Score</option>
              <option value="date">Sort by Date</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchResumes}
              className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {filteredAndSortedResumes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-8 opacity-30">📄</div>
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {resumes.length === 0 ? 'No Applications Yet' : 'No Applications Match Filter'}
            </h3>
            <p className={`text-xl ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {resumes.length === 0 
                ? 'Applications will appear here once candidates start applying'
                : 'Try adjusting your filters to see more applications'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedResumes.map((resume, index) => {
              const statusBadge = getStatusBadge(resume.status, resume.shortlisted);
              
              return (
                <div 
                  key={resume.id} 
                  className={`rounded-2xl p-8 border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl border ${
                        isDarkMode 
                          ? 'bg-gray-600 text-white border-gray-500' 
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {resume.candidate_name || 'Unknown Candidate'}
                        </h3>
                        {resume.candidate_email && (
                          <p className={`text-lg ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            📧 {resume.candidate_email}
                          </p>
                        )}
                        <p className={`text-sm mt-1 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          Submitted on {new Date(resume.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(resume.score || 0)}`}>
                        {resume.score || 0}/100
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        AI Score
                      </div>
                      <div className={`mt-3 px-4 py-2 rounded-xl text-sm font-medium border ${statusBadge.color}`}>
                        {statusBadge.text}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {resume.resume_file && (
                      <a
                        href={resume.resume_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 border-gray-500' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                      >
                        📄 View Resume
                      </a>
                    )}
                    {resume.github_url && (
                      <a
                        href={resume.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-200 hover:bg-gray-500 border-gray-500' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                        }`}
                      >
                        💻 GitHub
                      </a>
                    )}
                    {resume.leetcode_username && (
                      <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                        isDarkMode ? 'bg-orange-900/20 text-orange-400 border-orange-700' : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        🧠 LeetCode: {resume.leetcode_username}
                      </span>
                    )}
                  </div>

                  {/* AI Feedback */}
                  {resume.feedback && (
                    <div className={`rounded-2xl p-6 mb-6 border ${
                      isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                    }`}>
                      <h4 className={`font-bold text-lg mb-4 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>
                        🤖 AI Analysis
                      </h4>
                      <div className={`text-base space-y-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {resume.feedback.split('\n').map((line, idx) => (
                          line.trim() && (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="mt-1 text-lg">•</span>
                              <span>{line.trim()}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => handleAction(resume.id, 'shortlist')}
                      disabled={resume.shortlisted}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        resume.shortlisted
                          ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                          : isDarkMode
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      ✅ Shortlist
                    </button>
                    
                    <button
                      onClick={() => handleAction(resume.id, 'interview')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📅 Interview
                    </button>
                    
                    <button
                      onClick={() => handleAction(resume.id, 'hire')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🎉 Hire
                    </button>
                    
                    <button
                      onClick={() => handleAction(resume.id, 'reject')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;
