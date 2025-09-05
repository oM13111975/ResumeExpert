// import React, { useState } from 'react';
// import axios from 'axios';

// const ResumeUploadForm = ({ token, jobId, onUploaded }) => {
//   const [file, setFile] = useState(null);
//   const [github, setGithub] = useState('');
//   const [leetcode, setLeetcode] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('job', jobId);
//     data.append('resume_file', file);
//     if (github) data.append('github_url', github);
//     if (leetcode) data.append('leetcode_username', leetcode);

//     try {
//       const res = await axios.post('/api/v1/company/resume/upload/', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         }
//       });
//       onUploaded(res.data);
//       setFile(null); setGithub(''); setLeetcode('');
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Upload Resume</h3>
//       <input type="file" accept=".pdf,.docx" required onChange={e => setFile(e.target.files[0])} />
//       <input placeholder="GitHub Profile URL" value={github} onChange={e => setGithub(e.target.value)} />
//       <input placeholder="LeetCode Username/URL" value={leetcode} onChange={e => setLeetcode(e.target.value)} />
//       <button type="submit">Upload + Score</button>
//     </form>
//   );
// };

// export default ResumeUploadForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const ResumeUploadForm = ({ token, jobId, onUploaded }) => {
//   const [file, setFile] = useState(null);
//   const [github, setGithub] = useState('');
//   const [leetcode, setLeetcode] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('job', jobId);
//     data.append('resume_file', file);
//     if (github) data.append('github_url', github);
//     if (leetcode) data.append('leetcode_username', leetcode);

//     try {
//       const res = await axios.post('http://localhost:8000/api/v1/company/resume/upload/', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         }
//       });
//       onUploaded(res.data);
//       setFile(null); setGithub(''); setLeetcode('');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Upload failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Upload Resume</h3>
//       <input type="file" accept=".pdf,.docx" required onChange={e => setFile(e.target.files[0])} /><br />
//       <input placeholder="GitHub Profile URL" value={github} onChange={e => setGithub(e.target.value)} /><br />
//       <input placeholder="LeetCode Username/URL" value={leetcode} onChange={e => setLeetcode(e.target.value)} /><br />
//       <button type="submit">Upload + Score</button>
//     </form>
//   );
// };

// export default ResumeUploadForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ResumeUploadForm = ({ token, jobId, onUploaded }) => {
//   const [file, setFile] = useState(null);
//   const [github, setGithub] = useState('');
//   const [leetcode, setLeetcode] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('job', jobId);
//     data.append('resume_file', file);
//     if (github) data.append('github_url', github);
//     if (leetcode) data.append('leetcode_username', leetcode);

//     try {
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/company/resume/upload/',
//         data,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       onUploaded(res.data);
//       setFile(null);
//       setGithub('');
//       setLeetcode('');
//     } catch (err) {
//       console.error(err);
//       alert('Upload failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Upload Resume</h3>
//       <input type="file" required accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} /><br />
//       <input placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} /><br />
//       <input placeholder="LeetCode Username" value={leetcode} onChange={(e) => setLeetcode(e.target.value)} /><br />
//       <button type="submit">Upload + Score</button>
//     </form>
//   );
// };

// export default ResumeUploadForm;


// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ResumeUploadForm = () => {
//   const { jobId } = useParams();
//   const [file, setFile] = useState(null);
//   const [github, setGithub] = useState("");
//   const [leetcode, setLeetcode] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("job", jobId);
//     data.append("resume_file", file);
//     if (github) data.append("github_url", github);
//     if (leetcode) data.append("leetcode_username", leetcode);
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post(
//         "http://localhost:8000/api/v1/company/resume/upload/",
//         data,
//         { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
//       );
//       setMsg("Resume uploaded!");
//       setFile(null); setGithub(""); setLeetcode("");
//     } catch {
//       setMsg("Failed to upload.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white rounded px-8 py-6 shadow max-w-lg mx-auto mt-6">
//       <h2 className="text-xl mb-4 font-semibold">Upload Resume</h2>
//       <input type="file" required accept=".pdf,.docx" onChange={e => setFile(e.target.files[0])} className="mb-2" />
//       <input placeholder="GitHub URL" value={github} onChange={e => setGithub(e.target.value)} className="mb-2 p-2 w-full border rounded" />
//       <input placeholder="LeetCode Username" value={leetcode} onChange={e => setLeetcode(e.target.value)} className="mb-4 p-2 w-full border rounded" />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload + Score</button>
//       {msg && <div className="mt-2">{msg}</div>}
//     </form>
//   );
// };
// export default ResumeUploadForm;

// ResumeUploadForm.jsx (Modern Design)
// import React, { useState } from "react";
// import axios from "axios";

// const ResumeUploadForm = ({ token, jobId, onUploaded, isDarkMode }) => {
//   const [formData, setFormData] = useState({
//     file: null,
//     github_url: "",
//     leetcode_username: "",
//     candidate_name: "",
//     candidate_email: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const data = new FormData();
//     data.append("job", jobId);
//     data.append("resume_file", formData.file);
//     if (formData.github_url) data.append("github_url", formData.github_url);
//     if (formData.leetcode_username) data.append("leetcode_username", formData.leetcode_username);
//     if (formData.candidate_name) data.append("candidate_name", formData.candidate_name);
//     if (formData.candidate_email) data.append("candidate_email", formData.candidate_email);

//     try {
//       await axios.post(
//         "http://localhost:8000/api/v1/company/resume/upload/",
//         data,
//         { 
//           headers: { 
//             "Content-Type": "multipart/form-data", 
//             Authorization: `Bearer ${token}` 
//           } 
//         }
//       );
      
//       setMessage("✅ Resume uploaded and analyzed successfully!");
//       setFormData({
//         file: null,
//         github_url: "",
//         leetcode_username: "",
//         candidate_name: "",
//         candidate_email: ""
//       });
//       onUploaded();
//     } catch (err) {
//       setMessage("❌ Failed to upload resume. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

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
//           📤 Upload Resume
//         </h3>
//         <p className={`text-lg mt-2 ${
//           isDarkMode ? 'text-gray-400' : 'text-gray-600'
//         }`}>
//           Submit candidate resumes for AI analysis
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Candidate Name
//             </label>
//             <input
//               type="text"
//               value={formData.candidate_name}
//               onChange={(e) => handleInputChange('candidate_name', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="John Doe"
//             />
//           </div>

//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Candidate Email
//             </label>
//             <input
//               type="email"
//               value={formData.candidate_email}
//               onChange={(e) => handleInputChange('candidate_email', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="john@example.com"
//             />
//           </div>
//         </div>

//         <div>
//           <label className={`block text-sm font-semibold mb-2 ${
//             isDarkMode ? 'text-gray-200' : 'text-gray-700'
//           }`}>
//             Resume File *
//           </label>
//           <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
//             formData.file 
//               ? isDarkMode 
//                 ? 'border-green-500 bg-green-900/20' 
//                 : 'border-green-500 bg-green-50'
//               : isDarkMode
//               ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
//               : 'border-gray-300 bg-gray-50 hover:border-gray-400'
//           }`}>
//             <input
//               type="file"
//               required
//               accept=".pdf,.docx,.doc"
//               onChange={(e) => handleInputChange('file', e.target.files[0])}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <div className="text-4xl mb-4">
//               {formData.file ? '✅' : '📄'}
//             </div>
//             <div className={`text-lg font-medium ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               {formData.file ? formData.file.name : 'Click to upload resume'}
//             </div>
//             <div className={`text-sm mt-2 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>
//               Supports PDF, DOC, DOCX files
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               GitHub Profile URL
//             </label>
//             <input
//               type="url"
//               value={formData.github_url}
//               onChange={(e) => handleInputChange('github_url', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="https://github.com/username"
//             />
//           </div>

//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               LeetCode Username
//             </label>
//             <input
//               type="text"
//               value={formData.leetcode_username}
//               onChange={(e) => handleInputChange('leetcode_username', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="leetcode_username"
//             />
//           </div>
//         </div>

//         {/* Message Display */}
//         {message && (
//           <div className={`p-4 rounded-xl text-center font-medium ${
//             message.includes('✅') 
//               ? isDarkMode 
//                 ? 'bg-green-900/30 text-green-400 border border-green-800' 
//                 : 'bg-green-50 text-green-700 border border-green-200'
//               : isDarkMode 
//               ? 'bg-red-900/30 text-red-400 border border-red-800' 
//               : 'bg-red-50 text-red-700 border border-red-200'
//           }`}>
//             {message}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading || !formData.file}
//           className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
//             loading || !formData.file
//               ? 'opacity-50 cursor-not-allowed bg-gray-400'
//               : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl'
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center space-x-3">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//               <span>Analyzing Resume...</span>
//             </span>
//           ) : (
//             <span className="flex items-center justify-center space-x-3">
//               <span>🤖</span>
//               <span>Upload & Analyze Resume</span>
//             </span>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResumeUploadForm;


// src/assets/components/ResumeUploadModal.jsx
import React, { useState } from "react";
import axios from "axios";

const ResumeUploadModal = ({ job, token, isDarkMode, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    file: null,
    github_url: "",
    leetcode_username: "",
    candidate_name: "",
    candidate_email: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("❌ Failed to upload resume. Please try again.");
      console.error(err);
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
                For: {job.title}
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

        {/* Form */}
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
