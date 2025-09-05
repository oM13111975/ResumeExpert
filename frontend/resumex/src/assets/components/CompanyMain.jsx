// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CompanyMain = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login/company');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     const userType = localStorage.getItem('userType');
    
//     // Clear everything
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     localStorage.removeItem('user_id');
//     localStorage.removeItem('userType');

//     // Redirect to correct login page
//     if (userType === 'company') {
//       navigate('/login/company');
//     } else {
//       navigate('/login/candidate');
//     }
//   };

//   return (
//     <div>
//       <h2>Welcome, {localStorage.getItem('username')}</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default CompanyMain;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import JobPostForm from './JobPostForm';
// import ResumeUploadForm from './ResumeUploadForm';
// import ResumeList from './ResumeList';

// const CompanyMain = () => {
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');  // ✅ Use correct key
//     const role = localStorage.getItem('role');
//     const name = localStorage.getItem('company_name');

//     if (!token || role !== 'company') {
//       navigate('/login/company');
//     } else {
//       setUsername(name);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('email');
//     localStorage.removeItem('role');
//     localStorage.removeItem('company_name');
//     navigate('/login/company');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Welcome, {username} 👋</h2>
//       <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>

//       <JobPostForm token={localStorage.getItem('access_token')} onCreated={setJob} />

//       {job && (
//         <>
//           <h3>Job: {job.title}</h3>
//           <ResumeUploadForm token={localStorage.getItem('access_token')} jobId={job.id} onUploaded={() => {}} />
//           <ResumeList token={localStorage.getItem('access_token')} jobId={job.id} />
//         </>
//       )}
//     </div>
//   );
// };

// export default CompanyMain;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobPostForm from './JobPostForm';
import ResumeUploadForm from './ResumeUploadForm';
import ResumeList from './ResumeList';

const CompanyMain = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('company_name');
    if (!token || role !== 'company') {
      navigate('/login/');
    } else {
      setUsername(name || 'Company');
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {username} 👋</h2>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>

      <JobPostForm token={token} onCreated={setJob} />

      {job && (
        <>
          <h3>Job: {job.title}</h3>
          <ResumeUploadForm token={token} jobId={job.id} onUploaded={() => {}} />
          <ResumeList token={token} jobId={job.id} />
        </>
      )}
    </div>
  );
};

export default CompanyMain;
