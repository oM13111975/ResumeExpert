// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const CandidateLogin = () => {
// //   const [formData, setFormData] = useState({ email: '', password: '' });
// //   const [message, setMessage] = useState('');
// //   const [errors, setErrors] = useState({});
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({...formData, [e.target.name]: e.target.value});
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage('');
// //     setErrors({});

// //     try {
// //       const res = await axios.post('http://localhost:8000/api/v1/login/candidate/', formData);
// //       const { token, user_id, username } = res.data;

// //       // Save token to localStorage
// //       localStorage.setItem('token', token);
// //       localStorage.setItem('username', username || formData.email || 'Candidate');
// //       localStorage.setItem('user_id', user_id);

// //       setMessage('Login successful');
// //       navigate('/main');
// //     } catch (err) {
// //       if (err.response && err.response.data) {
// //         setErrors(err.response.data);
// //       } else {
// //         setMessage('Login failed');
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Candidate Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input name="email" placeholder="Email" onChange={handleChange} required /><br />
// //         <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
// //         <button type="submit">Login</button>
// //       </form>
// //       {message && <p>{message}</p>}
// //       {Object.keys(errors).map((key) => (
// //         <p key={key} style={{ color: 'red' }}>{key}: {errors[key]}</p>
// //       ))}
// //     </div>
// //   );
// // };

// // export default CandidateLogin;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CandidateLogin = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setErrors({});

//     try {
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/login/candidate/',
//         formData,
//         { withCredentials: true } // ✅ Required for session cookie
//       );

//       const { user_id, email, role } = res.data;

//       // ✅ Save session-based user info
//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('username', email || formData.email);
//       localStorage.setItem('role', role);

//       setMessage('Login successful');
//       navigate('/main');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setErrors(err.response.data);
//       } else {
//         setMessage('Login failed');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Candidate Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         /><br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         /><br />
//         <button type="submit">Login</button>
//       </form>

//       {message && <p>{message}</p>}

//       {Object.keys(errors).map((key) => (
//         <p key={key} style={{ color: 'red' }}>
//           {key}: {errors[key]}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default CandidateLogin;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CandidateLogin = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setErrors({});

//     try {
//       const res = await axios.post('http://localhost:8000/api/v1/login/candidate/', formData);

//       const { access, refresh, user_id, email, role } = res.data;

//       // ✅ Store JWT tokens and user info
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('username', email);
//       localStorage.setItem('role', role);

//       axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

//       setMessage('Login successful');
//       navigate('/main');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setErrors(err.response.data);
//       } else {
//         setMessage('Login failed');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Candidate Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         /><br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         /><br />
//         <button type="submit">Login</button>
//       </form>

//       {message && <p>{message}</p>}

//       {Object.keys(errors).map((key) => (
//         <p key={key} style={{ color: 'red' }}>
//           {key}: {errors[key]}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default CandidateLogin;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CandidateLogin = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/login/candidate/', formData);

      const { access, refresh, user_id, email, role } = res.data;

      // Store JWT tokens and user info
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('username', email);
      localStorage.setItem('role', role);

      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/main'), 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setMessage('Login failed: Server error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">👨‍💻</div>
        <h3 className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Developer Login
        </h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Access your candidate dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-gray-500/20 focus:border-gray-500'
              }`}
              placeholder="Enter your email"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-400">📧</span>
            </div>
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <span className="mr-1">⚠️</span>
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-gray-500/20 focus:border-gray-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-gray-500/20 focus:border-gray-500'
              }`}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <span className="mr-1">⚠️</span>
              {Array.isArray(errors.password) ? errors.password[0] : errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            isLoading
              ? 'opacity-50 cursor-not-allowed'
              : isDarkMode
              ? 'bg-gray-200 text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500/20'
              : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500/20'
          } focus:outline-none transform hover:scale-105`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
              Signing In...
            </span>
          ) : (
            'Sign In as Developer'
          )}
        </button>
      </form>

      {/* Messages */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          message.includes('successful') 
            ? isDarkMode 
              ? 'bg-green-900/20 text-green-400 border border-green-800' 
              : 'bg-green-50 text-green-700 border border-green-200'
            : isDarkMode
            ? 'bg-red-900/20 text-red-400 border border-red-800'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.includes('successful') ? '✅' : '❌'} {message}
        </div>
      )}

      {/* Additional Errors */}
      {Object.keys(errors).filter(key => !['email', 'password'].includes(key)).map((key) => (
        <div key={key} className={`mt-2 p-3 rounded-lg ${
          isDarkMode 
            ? 'bg-red-900/20 text-red-400 border border-red-800' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <span className="font-medium capitalize">{key}:</span> {errors[key]}
        </div>
      ))}

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link 
            to="/signup/candidate" 
            className={`font-medium ${
              isDarkMode ? 'text-gray-200 hover:text-gray-100' : 'text-gray-900 hover:text-gray-800'
            }`}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CandidateLogin;
