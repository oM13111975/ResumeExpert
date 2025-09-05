// src/api/companyApi.js (Create this file)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Get auth token
const getToken = () => localStorage.getItem('access_token');

// API headers
const getHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
});

// Company Dashboard APIs
export const companyApi = {
  // Dashboard data
  getDashboardData: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/company/dashboard/`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  // Job management
  createJob: async (jobData) => {
    const response = await axios.post(
      `${API_BASE_URL}/company/job/create/`,
      jobData,
      { headers: getHeaders() }
    );
    return response.data;
  },

  getJobs: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/company/jobs/`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  updateJob: async (jobId, jobData) => {
    const response = await axios.put(
      `${API_BASE_URL}/company/jobs/${jobId}/`,
      jobData,
      { headers: getHeaders() }
    );
    return response.data;
  },

  deleteJob: async (jobId) => {
    const response = await axios.delete(
      `${API_BASE_URL}/company/jobs/${jobId}/`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  // Candidate management
  fetchRankedCandidates: async (jobId, filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(
      `${API_BASE_URL}/company/candidates/${jobId}/?${params}`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  getTopMatches: async (jobId) => {
    const response = await axios.get(
      `${API_BASE_URL}/company/candidates/${jobId}/?top_matches=true`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  compareCandidates: async (resumeIds) => {
    const response = await axios.post(
      `${API_BASE_URL}/company/candidates/compare/`,
      { resume_ids: resumeIds },
      { headers: getHeaders() }
    );
    return response.data;
  },

  updateCandidateStatus: async (resumeId, status, notes = '') => {
    const response = await axios.patch(
      `${API_BASE_URL}/company/resume/${resumeId}/`,
      { status, hr_notes: notes },
      { headers: getHeaders() }
    );
    return response.data;
  },

  shortlistCandidate: async (resumeId) => {
    const response = await axios.patch(
      `${API_BASE_URL}/company/resume/${resumeId}/`,
      { shortlisted: true, status: 'shortlisted' },
      { headers: getHeaders() }
    );
    return response.data;
  },

  // Analytics
  getJobInsights: async (jobId) => {
    const response = await axios.get(
      `${API_BASE_URL}/company/job/${jobId}/insights/`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  // Profile management
  getCompanyProfile: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/company/profile/`,
      { headers: getHeaders() }
    );
    return response.data;
  },

  updateCompanyProfile: async (profileData) => {
    const response = await axios.put(
      `${API_BASE_URL}/company/profile/`,
      profileData,
      { headers: getHeaders() }
    );
    return response.data;
  }
};

// Export individual functions for direct use
export const {
  getDashboardData,
  createJob,
  getJobs,
  fetchRankedCandidates,
  getTopMatches,
  compareCandidates,
  getJobInsights,
  getCompanyProfile,
  updateCompanyProfile
} = companyApi;
