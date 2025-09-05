// import React, { useState } from 'react';
// import axios from 'axios';

// const JobPostForm = ({ token, onCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [skills, setSkills] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/company/job/create/',
//         {
//           title,
//           description,
//           skills_required: skills,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ attach JWT
//           },
//         }
//       );

//       onCreated(res.data);
//       setTitle('');
//       setDescription('');
//       setSkills('');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create job post');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create Job Post</h3>
//       <input
//         placeholder="Title"
//         required
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Description"
//         required
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//       />
//       <input
//         placeholder="Required skills (comma separated)"
//         required
//         value={skills}
//         onChange={e => setSkills(e.target.value)}
//       />
//       <button type="submit">Create Job</button>
//     </form>
//   );
// };

// export default JobPostForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const JobPostForm = ({ token, onCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [skills, setSkills] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/company/job/create/',
//         {
//           title,
//           description,
//           skills_required: skills,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       onCreated(res.data);
//       setTitle('');
//       setDescription('');
//       setSkills('');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to create job post');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create Job Post</h3>
//       <input placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)} /><br />
//       <textarea placeholder="Description" required value={description} onChange={e => setDescription(e.target.value)} /><br />
//       <input placeholder="Required skills (comma separated)" required value={skills} onChange={e => setSkills(e.target.value)} /><br />
//       <button type="submit">Create Job</button>
//     </form>
//   );
// };

// export default JobPostForm;


// JobPostForm.jsx (Modern Design)




// import React, { useState } from 'react';
// import axios from 'axios';

// const JobPostForm = ({ token, onCreated, isDarkMode }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     skills_required: '',
//     job_type: 'full-time',
//     experience_level: 'mid',
//     location: '',
//     remote_ok: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/company/job/create/',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       onCreated(res.data);
//       setFormData({
//         title: '',
//         description: '',
//         skills_required: '',
//         job_type: 'full-time',
//         experience_level: 'mid',
//         location: '',
//         remote_ok: false,
//       });
//       setMessage('✅ Job posted successfully!');
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Failed to create job post');
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
//           📝 Create Job Post
//         </h3>
//         <p className={`text-lg mt-2 ${
//           isDarkMode ? 'text-gray-400' : 'text-gray-600'
//         }`}>
//           Post a new job opening and attract top talent
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Job Title *
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => handleInputChange('title', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="e.g., Senior React Developer"
//               required
//             />
//           </div>

//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Experience Level
//             </label>
//             <select
//               value={formData.experience_level}
//               onChange={(e) => handleInputChange('experience_level', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//             >
//               <option value="entry">Entry Level (0-2 years)</option>
//               <option value="mid">Mid Level (2-5 years)</option>
//               <option value="senior">Senior Level (5+ years)</option>
//               <option value="lead">Lead/Principal (8+ years)</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className={`block text-sm font-semibold mb-2 ${
//             isDarkMode ? 'text-gray-200' : 'text-gray-700'
//           }`}>
//             Job Description *
//           </label>
//           <textarea
//             rows={5}
//             value={formData.description}
//             onChange={(e) => handleInputChange('description', e.target.value)}
//             className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
//               isDarkMode
//                 ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                 : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//             }`}
//             placeholder="Describe the role, responsibilities, and requirements..."
//             required
//           />
//         </div>

//         <div>
//           <label className={`block text-sm font-semibold mb-2 ${
//             isDarkMode ? 'text-gray-200' : 'text-gray-700'
//           }`}>
//             Required Skills * (comma-separated)
//           </label>
//           <input
//             type="text"
//             value={formData.skills_required}
//             onChange={(e) => handleInputChange('skills_required', e.target.value)}
//             className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//               isDarkMode
//                 ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                 : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//             }`}
//             placeholder="React, JavaScript, Node.js, MongoDB"
//             required
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Job Type
//             </label>
//             <select
//               value={formData.job_type}
//               onChange={(e) => handleInputChange('job_type', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//             >
//               <option value="full-time">Full Time</option>
//               <option value="part-time">Part Time</option>
//               <option value="contract">Contract</option>
//               <option value="internship">Internship</option>
//             </select>
//           </div>

//           <div>
//             <label className={`block text-sm font-semibold mb-2 ${
//               isDarkMode ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Location
//             </label>
//             <input
//               type="text"
//               value={formData.location}
//               onChange={(e) => handleInputChange('location', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
//                 isDarkMode
//                   ? 'border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
//                   : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
//               }`}
//               placeholder="San Francisco, CA"
//             />
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             id="remote"
//             checked={formData.remote_ok}
//             onChange={(e) => handleInputChange('remote_ok', e.target.checked)}
//             className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//           />
//           <label htmlFor="remote" className={`text-sm font-medium ${
//             isDarkMode ? 'text-gray-200' : 'text-gray-700'
//           }`}>
//             🌐 Remote work allowed
//           </label>
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
//           disabled={loading}
//           className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
//             loading
//               ? 'opacity-50 cursor-not-allowed'
//               : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl'
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center space-x-3">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//               <span>Creating Job...</span>
//             </span>
//           ) : (
//             <span className="flex items-center justify-center space-x-3">
//               <span>🚀</span>
//               <span>Create Job Post</span>
//             </span>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPostForm;








// src/assets/components/JobPostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const JobPostForm = ({ token, onCreated, isDarkMode, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills_required: '',
    job_type: 'full-time',
    experience_level: 'mid',
    location: '',
    remote_ok: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/company/job/create/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onCreated(res.data);
      setFormData({
        title: '',
        description: '',
        skills_required: '',
        job_type: 'full-time',
        experience_level: 'mid',
        location: '',
        remote_ok: false,
      });
      setMessage('✅ Job posted successfully! Redirecting to candidate management...');
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        onCreated(res.data);
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create job post. Please try again.');
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
    <div className={`rounded-3xl p-12 ${
      isDarkMode 
        ? 'bg-gray-800/30 border border-gray-700/50 backdrop-blur-lg' 
        : 'bg-white/30 border border-white/50 shadow-2xl backdrop-blur-lg'
    }`}>
      <div className="text-center mb-12">
        <div className="text-6xl mb-6">📝</div>
        <h3 className={`text-4xl font-bold mb-4 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Create Job Post
        </h3>
        <p className={`text-xl ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Craft the perfect job description to attract top talent
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className={`block text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm'
                  : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm'
              }`}
              placeholder="e.g., Senior React Developer"
              required
            />
          </div>

          <div>
            <label className={`block text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Experience Level
            </label>
            <select
              value={formData.experience_level}
              onChange={(e) => handleInputChange('experience_level', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            >
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (2-5 years)</option>
              <option value="senior">Senior Level (5+ years)</option>
              <option value="lead">Lead/Principal (8+ years)</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Job Description *
          </label>
          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 resize-none ${
              isDarkMode
                ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
            placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
            required
          />
        </div>

        <div>
          <label className={`block text-lg font-semibold mb-3 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Required Skills * (comma-separated)
          </label>
          <input
            type="text"
            value={formData.skills_required}
            onChange={(e) => handleInputChange('skills_required', e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
              isDarkMode
                ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
            placeholder="React, JavaScript, Node.js, MongoDB, TypeScript"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className={`block text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Job Type
            </label>
            <select
              value={formData.job_type}
              onChange={(e) => handleInputChange('job_type', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className={`block text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700/50 text-gray-100 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'border-gray-300 bg-white/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="remote"
            checked={formData.remote_ok}
            onChange={(e) => handleInputChange('remote_ok', e.target.checked)}
            className="w-6 h-6 text-blue-600 rounded-lg focus:ring-blue-500"
          />
          <label htmlFor="remote" className={`text-lg font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            🌐 Remote work allowed
          </label>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-6 rounded-2xl text-center text-lg font-medium ${
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
        <div className="flex gap-6">
          <button
            type="button"
            onClick={onCancel}
            className={`flex-1 py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-200 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg'
            }`}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-200 transform hover:scale-105 ${
              loading
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <span>Creating Job...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-3">
                <span>🚀</span>
                <span>Post Job</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
