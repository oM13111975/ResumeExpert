// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div>
//       <nav>
//         <Link to="/signup">Signup</Link>
//         <Link to="/login">Login</Link>
//       </nav>
//       <h1>hello</h1>
//     </div>
//   );
// };

// export default LandingPage;




// import { Link } from 'react-router-dom';

// const TechnicalLandingPage = () => {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 border border-white rounded flex items-center justify-center font-mono">
//                 <span className="text-white font-bold text-sm">{"</>"}</span>
//               </div>
//               <span className="text-xl font-mono font-bold text-white">
//                 resume<span className="text-gray-400">.expert()</span>
//               </span>
//             </div>
//             <div className="flex items-center space-x-6">
//               <Link 
//                 to="/login" 
//                 className="text-gray-300 hover:text-white font-mono text-sm transition-colors border border-gray-700 px-4 py-2 rounded hover:border-white"
//               >
//                 ./login
//               </Link>
//               <Link 
//                 to="/signup" 
//                 className="bg-white text-black px-6 py-2 rounded font-mono text-sm hover:bg-gray-200 transition-colors font-medium"
//               >
//                 git clone career
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative px-6 lg:px-12 pt-20 pb-24">
//         <div className="max-w-7xl mx-auto">
//           {/* Terminal-like header */}
//           <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-12 font-mono text-sm max-w-2xl">
//             <div className="flex items-center space-x-2 mb-2">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-gray-400 ml-4">~/career-optimization</span>
//             </div>
//             <div className="text-green-400">
//               <span className="text-gray-400">$</span> npm install professional-growth
//               <br />
//               <span className="text-gray-400">$</span> node resume-matcher.js --analyze-skills
//               <br />
//               <span className="text-gray-400">$</span> echo "Career advancement initialized"
//             </div>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
//                 <span className="font-mono text-white">
//                   class <span className="text-gray-400">CareerMatcher</span> {`{`}
//                 </span>
//                 <br />
//                 <span className="text-4xl lg:text-5xl text-gray-300 font-mono ml-8">
//                   analyze();
//                 </span>
//                 <br />
//                 <span className="text-4xl lg:text-5xl text-gray-300 font-mono ml-8">
//                   match();
//                 </span>
//                 <br />
//                 <span className="font-mono text-white text-4xl lg:text-5xl">
//                   {`}`}
//                 </span>
//               </h1>
              
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 font-mono text-sm">
//                 <div className="text-gray-400 mb-2">// Technical Profile Analysis</div>
//                 <div className="text-white">
//                   <span className="text-blue-300">const</span> profile = {`{`}
//                   <br />
//                   <span className="ml-4 text-gray-300">github: </span>
//                   <span className="text-green-300">"your-username"</span>,
//                   <br />
//                   <span className="ml-4 text-gray-300">leetcode: </span>
//                   <span className="text-green-300">"your-profile"</span>,
//                   <br />
//                   <span className="ml-4 text-gray-300">aiScore: </span>
//                   <span className="text-yellow-300">calculateSkills()</span>
//                   <br />
//                   {`};`}
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link 
//                   to="/signup" 
//                   className="bg-white text-black px-8 py-4 rounded font-mono font-bold hover:bg-gray-200 transition-colors text-center"
//                 >
//                   {">"} Initialize Career Path
//                 </Link>
//                 <button className="border border-white text-white px-8 py-4 rounded font-mono hover:bg-white hover:text-black transition-colors">
//                   {">"} View Documentation
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {/* Code Editor Mockup */}
//               <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
//                 <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span className="text-gray-400 text-xs font-mono ml-4">skillAnalyzer.js</span>
//                 </div>
//                 <div className="p-4 font-mono text-sm">
//                   <div className="text-gray-400">1</div>
//                   <div className="text-gray-400">2</div>
//                   <div className="text-gray-400">3</div>
//                   <div className="text-gray-400">4</div>
//                   <div className="text-gray-400">5</div>
//                   <div className="text-gray-400">6</div>
//                   <div className="text-gray-400">7</div>
//                   <div className="text-gray-400">8</div>
//                 </div>
//                 <div className="absolute mt-[-180px] ml-8 font-mono text-sm">
//                   <div className="text-purple-300">function</div>
//                   <div className="text-blue-300">analyzeProfile</div>
//                   <div className="text-white">(github, leetcode) {`{`}</div>
//                   <div className="ml-4 text-green-300">return</div>
//                   <div className="ml-8 text-yellow-300">aiEngine.process(</div>
//                   <div className="ml-12 text-white">codeQuality,</div>
//                   <div className="ml-12 text-white">problemSolving</div>
//                   <div className="ml-8 text-yellow-300">);</div>
//                   <div className="text-white">{`}`}</div>
//                 </div>
//               </div>

//               {/* API Response Mockup */}
//               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm">
//                 <div className="text-gray-400 mb-2">// API Response</div>
//                 <div className="text-white">
//                   {`{`}
//                   <br />
//                   <span className="ml-4 text-blue-300">"status"</span>: <span className="text-green-300">"success"</span>,
//                   <br />
//                   <span className="ml-4 text-blue-300">"githubScore"</span>: <span className="text-yellow-300">94</span>,
//                   <br />
//                   <span className="ml-4 text-blue-300">"leetcodeRank"</span>: <span className="text-green-300">"Expert"</span>,
//                   <br />
//                   <span className="ml-4 text-blue-300">"matches"</span>: <span className="text-yellow-300">147</span>
//                   <br />
//                   {`}`}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="px-6 lg:px-12 py-24 bg-gray-950 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold font-mono mb-4">
//               <span className="text-gray-400">// </span>System.features()
//             </h2>
//             <p className="text-xl text-gray-400 font-mono">
//               Advanced algorithms for career optimization
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 {`{}`}
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 github.analyze()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Deep analysis of repository structure, commit patterns, code quality metrics, and project complexity algorithms.
//               </p>
//             </div>

//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 []
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 leetcode.evaluate()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Algorithm performance assessment, problem-solving velocity, and competitive programming ranking analysis.
//               </p>
//             </div>

//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 AI
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 ml.score()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Machine learning models trained on technical competency patterns for accurate skill evaluation.
//               </p>
//             </div>

//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 📄
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 resume.generate()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Automated LaTeX-based resume compilation with dynamic content optimization and ATS compatibility.
//               </p>
//             </div>

//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 ⚡
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 matcher.run()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Real-time job matching engine with weighted scoring algorithms and compatibility matrices.
//               </p>
//             </div>

//             <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/50 hover:border-white transition-colors group">
//               <div className="w-16 h-16 border border-gray-600 rounded flex items-center justify-center mb-6 group-hover:border-white transition-colors font-mono text-2xl">
//                 🔍
//               </div>
//               <h3 className="text-xl font-bold font-mono mb-4 text-white">
//                 filter.candidates()
//               </h3>
//               <p className="text-gray-400 leading-relaxed font-mono text-sm">
//                 Advanced candidate filtering system with multi-dimensional scoring and automated screening protocols.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* API Documentation Style Section */}
//       <section className="px-6 lg:px-12 py-24 bg-black border-t border-gray-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16">
//             <div>
//               <h2 className="text-3xl font-bold font-mono mb-8 text-white">
//                 <span className="text-gray-400"># </span>Quick Start Guide
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="border border-gray-700 rounded-lg p-6 bg-gray-900">
//                   <h3 className="font-mono text-lg font-bold mb-3 text-white">
//                     1. POST /api/profile
//                   </h3>
//                   <div className="bg-black rounded p-4 font-mono text-sm text-green-400">
//                     curl -X POST \<br />
//                     &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
//                     &nbsp;&nbsp;-d '{`{"github": "username", "leetcode": "profile"}`}' \<br />
//                     &nbsp;&nbsp;https://api.resume-expert.dev/profile
//                   </div>
//                 </div>

//                 <div className="border border-gray-700 rounded-lg p-6 bg-gray-900">
//                   <h3 className="font-mono text-lg font-bold mb-3 text-white">
//                     2. GET /api/analysis
//                   </h3>
//                   <div className="bg-black rounded p-4 font-mono text-sm text-blue-400">
//                     Response: AI-powered skill scoring<br />
//                     Status: 200 OK<br />
//                     Processing time: ~2.3s
//                   </div>
//                 </div>

//                 <div className="border border-gray-700 rounded-lg p-6 bg-gray-900">
//                   <h3 className="font-mono text-lg font-bold mb-3 text-white">
//                     3. GET /api/matches
//                   </h3>
//                   <div className="bg-black rounded p-4 font-mono text-sm text-yellow-400">
//                     Returns: Ranked job opportunities<br />
//                     Algorithm: ML-based compatibility<br />
//                     Accuracy: 94.7%
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold font-mono mb-8 text-white">
//                 <span className="text-gray-400">/* </span>Performance Metrics<span className="text-gray-400"> */</span>
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-mono text-white">Analysis Speed</span>
//                     <span className="font-mono text-green-400">99.2%</span>
//                   </div>
//                   <div className="w-full bg-gray-700 rounded-full h-2">
//                     <div className="bg-green-400 h-2 rounded-full w-[99%]"></div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-mono text-white">Match Accuracy</span>
//                     <span className="font-mono text-blue-400">94.7%</span>
//                   </div>
//                   <div className="w-full bg-gray-700 rounded-full h-2">
//                     <div className="bg-blue-400 h-2 rounded-full w-[95%]"></div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-mono text-white">System Uptime</span>
//                     <span className="font-mono text-yellow-400">99.9%</span>
//                   </div>
//                   <div className="w-full bg-gray-700 rounded-full h-2">
//                     <div className="bg-yellow-400 h-2 rounded-full w-full"></div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 font-mono text-sm">
//                   <div className="text-gray-400 mb-2">// Real-time Statistics</div>
//                   <div className="text-white space-y-1">
//                     <div>Active Users: <span className="text-green-400">12,847</span></div>
//                     <div>Profiles Analyzed: <span className="text-blue-400">156,923</span></div>
//                     <div>Jobs Matched: <span className="text-yellow-400">89,432</span></div>
//                     <div>Success Rate: <span className="text-green-400">87.3%</span></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-6 lg:px-12 py-24 bg-white text-black">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
//             system.deploy(<span className="text-gray-600">"your-career"</span>);
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 font-mono">
//             Execute your career advancement protocol
//           </p>
          
//           <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 font-mono text-sm mb-8 text-left max-w-md mx-auto">
//             <div className="text-gray-600">$ npm start career-optimization</div>
//             <div className="text-green-600">✓ GitHub profile connected</div>
//             <div className="text-green-600">✓ LeetCode analysis complete</div>
//             <div className="text-blue-600">→ Initializing job matching...</div>
//           </div>

//           <Link 
//             to="/signup" 
//             className="inline-block bg-black text-white px-8 py-4 rounded font-mono font-bold hover:bg-gray-800 transition-colors mr-4"
//           >
//             {">"} git commit -m "start career"
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black border-t border-gray-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-8 h-8 border border-white rounded flex items-center justify-center font-mono">
//                   <span className="text-white font-bold text-sm">{"</>"}</span>
//                 </div>
//                 <span className="text-xl font-mono font-bold">
//                   resume<span className="text-gray-400">.expert()</span>
//                 </span>
//               </div>
//               <p className="text-gray-400 font-mono text-sm">
//                 // Advanced career optimization platform
//               </p>
//             </div>
//             <div>
//               <h3 className="font-mono font-bold mb-4">./candidates</h3>
//               <ul className="space-y-2 text-gray-400 font-mono text-sm">
//                 <li><a href="#" className="hover:text-white transition-colors">profile.setup()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">skills.analyze()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">resume.build()</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-mono font-bold mb-4">./companies</h3>
//               <ul className="space-y-2 text-gray-400 font-mono text-sm">
//                 <li><a href="#" className="hover:text-white transition-colors">jobs.post()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">candidates.filter()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">hiring.optimize()</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-mono font-bold mb-4">./support</h3>
//               <ul className="space-y-2 text-gray-400 font-mono text-sm">
//                 <li><a href="#" className="hover:text-white transition-colors">docs.read()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">help.contact()</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">api.reference()</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-mono text-sm">
//             <p>© 2025 resume.expert() // All rights reserved</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TechnicalLandingPage;








import { Link } from 'react-router-dom';
import { useState } from 'react';

const SoftDualModeLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navigation */}
      <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-900/95 backdrop-blur-sm' 
          : 'border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-300 bg-gray-800' 
                  : 'border-gray-700 bg-gray-100'
              }`}>
                <span className={`font-bold text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>R</span>
              </div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                ResumeExpert
              </span>
            </div>
            <div className="flex items-center space-x-6">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <Link 
                to="/login" 
                className={`font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-gray-100' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className={`inline-flex items-center space-x-2 border rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 bg-gray-800/50' 
                    : 'border-gray-300 text-gray-700 bg-gray-50'
                }`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isDarkMode ? 'bg-gray-300' : 'bg-gray-700'
                  }`}></div>
                  <span>AI-Powered Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>Smart Resume</span>
                  <br />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Matching System</span>
                </h1>
                
                <p className={`text-xl leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Connect your GitHub and LeetCode profiles. Our AI analyzes your technical skills and matches you with the perfect job opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup" 
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center ${
                    isDarkMode 
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-100' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Start Analysis
                </Link>
                <button className={`border-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-gray-500 text-gray-200 hover:border-gray-300 hover:text-gray-100' 
                    : 'border-gray-400 text-gray-800 hover:border-gray-600 hover:text-gray-900'
                }`}>
                  View Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>15K+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Developers</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>94%</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>2K+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Companies</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Dashboard Preview */}
              <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Skill Analysis
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Real-time evaluation
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>GitHub Score</span>
                      <span className={`font-bold text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>94/100</span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                      <div className={`h-3 rounded-full w-[94%] ${isDarkMode ? 'bg-gray-200' : 'bg-gray-800'}`}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>LeetCode Rating</span>
                      <span className={`font-bold text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Expert</span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                      <div className={`h-3 rounded-full w-[88%] ${isDarkMode ? 'bg-gray-200' : 'bg-gray-800'}`}></div>
                    </div>
                  </div>

                  <div className={`border rounded-xl p-4 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-500' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Job Matches</span>
                      <span className={`font-bold text-2xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>47</span>
                    </div>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Perfect opportunities found
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`border rounded-lg p-4 text-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-2xl font-bold">⚡</div>
                  <div className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Fast Analysis</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}> 30 seconds</div>
                </div>
                <div className={`border rounded-lg p-4 text-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-2xl font-bold">🎯</div>
                  <div className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Smart Match</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>AI-powered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`px-6 lg:px-12 py-24 border-t transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Simple process, powerful results
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className={`border rounded-2xl p-8 text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <div className={`w-16 h-16 border-2 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-300' 
                  : 'border-gray-700'
              }`}>
                🔗
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Connect Profiles</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Link your GitHub and LeetCode accounts for comprehensive technical skill analysis.
              </p>
            </div>

            <div className={`border rounded-2xl p-8 text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <div className={`w-16 h-16 border-2 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-300' 
                  : 'border-gray-700'
              }`}>
                🧠
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>AI Analysis</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Advanced algorithms evaluate your coding skills and problem-solving abilities.
              </p>
            </div>

            <div className={`border rounded-2xl p-8 text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}>
              <div className={`w-16 h-16 border-2 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-300' 
                  : 'border-gray-700'
              }`}>
                🎯
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Smart Matching</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get matched with relevant opportunities and generate tailored resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className={`px-6 lg:px-12 py-24 border-t transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Platform Features
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need for career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "GitHub Analysis", desc: "Repository analysis and code quality metrics" },
              { icon: "🏆", title: "LeetCode Scoring", desc: "Problem-solving skills assessment" },
              { icon: "📝", title: "Resume Builder", desc: "Automated professional resume generation" },
              { icon: "🤝", title: "Job Matching", desc: "Smart algorithm connects you with opportunities" },
              { icon: "⚡", title: "Real-time Processing", desc: "Instant analysis and immediate results" },
              { icon: "🛡️", title: "Secure Platform", desc: "Enterprise-grade data protection" }
            ].map((feature, index) => (
              <div key={index} className={`border rounded-xl p-6 transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 hover:border-gray-500' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`px-6 lg:px-12 py-24 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-100 text-gray-900' 
          : 'bg-gray-900 text-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Advance Your Career?
          </h2>
          <p className={`text-xl mb-8 ${
            isDarkMode ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Join thousands of developers who've transformed their careers with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Get Started Free
            </Link>
            <button className={`border-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-700 hover:border-gray-500 hover:text-gray-600' 
                : 'border-gray-400 text-gray-300 hover:border-gray-300 hover:text-white'
            }`}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700 text-gray-100' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'border-gray-300 bg-gray-800' 
                    : 'border-gray-700 bg-gray-100'
                }`}>
                  <span className={`font-bold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>R</span>
                </div>
                <span className="text-xl font-bold">ResumeExpert</span>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Advanced career matching platform for tech professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Candidates</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Profile Analysis</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Resume Builder</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Job Matching</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Companies</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Post Jobs</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Find Talent</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Screen Candidates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Help Center</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Contact Us</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'}`}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'
          }`}>
            <p>© 2025 ResumeExpert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SoftDualModeLandingPage;


