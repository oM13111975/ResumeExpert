// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setMessage('');

//     try {
//       const res = await axios.post('http://localhost:8000/api/v1/login/company/', formData);

//       setMessage(res.data.message);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userType', 'company');
//       localStorage.setItem('userId', res.data.user_id);
//       localStorage.setItem('username', res.data.username);

//       navigate('/main/company');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setErrors(err.response.data);
//       } else {
//         setMessage('Login failed: Server error');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
//       <h2>Company Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Work Email"
//           onChange={handleChange}
//           required
//         /><br />
//         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         /><br />
//         {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CompanyLogin;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setMessage('');

//     try {
//       const res = await axios.post('http://localhost:8000/api/v1/login/company/', formData);

//       const { access, refresh, user_id, email, role, company_name } = res.data;

//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       localStorage.setItem('userId', user_id);
//       localStorage.setItem('email', email);
//       localStorage.setItem('role', role);
//       localStorage.setItem('company_name', company_name);

//       setMessage('Login successful!');
//       navigate('/dashboard');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setErrors(err.response.data);
//       } else {
//         setMessage('Login failed: Server error');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
//       <h2>Company Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Work Email"
//           onChange={handleChange}
//           required
//         /><br />
//         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         /><br />
//         {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

//         <button type="submit">Login</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CompanyLogin;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CompanyLogin = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
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
    setErrors({});
    setMessage('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/login/company/', formData);

      const { access, refresh, user_id, email, role, company_name } = res.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('userId', user_id);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('company_name', company_name);

      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/company-dashboard'), 1500);
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
        <div className="text-4xl mb-2">🏢</div>
        <h3 className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Company Login
        </h3>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Access your company dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Work Email
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
              placeholder="company@example.com"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-400">🏢</span>
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
            'Sign In as Company'
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
          Don't have a company account?{' '}
          <Link 
            to="/signup/company" 
            className={`font-medium ${
              isDarkMode ? 'text-gray-200 hover:text-gray-100' : 'text-gray-900 hover:text-gray-800'
            }`}
          >
            Register your company
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
