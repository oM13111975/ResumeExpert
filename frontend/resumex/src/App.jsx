
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupSelector from './assets/components/Selector';
import Landing from './assets/components/LandingPage';
import LoginSelector from './assets/components/LoginSelector';
import MainPage from './assets/components/MainPage';
import CandidateLogin from './assets/components/CandidateLogin';
import CompanyLogin from './assets/components/CompanyLogin';
import CompanyMain from './assets/components/CompanyMain'
import "./assets/css/style.css"
import GenerateResume from "./assets/components/GenerateResume";
import DashboardLayout from "./assets/components/DashboardLayout";
import DashboardHome from "./assets/components/DashboardStats";
import JobPostsTable from "./assets/components/JobPostsTable";
import ResumeListTable from "./assets/components/ResumeListTable";
import ResumeUploadForm from './assets/components/ResumeUploadForm';
import ProfilePage from './assets/components/ProfilePage';
import CompanyProfile from './assets/components/CompanyProfile';

import CompanyDashboard from './assets/components/CompanyDashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginSelector />} />
        <Route path="/signup" element={<SignupSelector />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/company" element={<CompanyMain />}/>
        <Route path="/login/candidate" element={<CandidateLogin />} />
        <Route path="/login/company" element={<CompanyLogin />} />
         <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="jobs" element={<JobPostsTable />} />
          <Route path="jobs/:jobId/resumes" element={<ResumeListTable />} />
          <Route path="jobs/:jobId/upload" element={<ResumeUploadForm />} />
        </Route>
        <Route path="/generate-resume" element={<GenerateResume />} />
        <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/CompanyProfile" element={<CompanyProfile />}/>
          <Route path="/company-dashboard" element={<CompanyDashboard/>}/>





      </Routes>
    </Router>
  );
};

export default App;
