import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResumeListTable = () => {
  const { jobId } = useParams();
  const [resumes, setResumes] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios.get(`http://localhost:8000/api/v1/company/resumes/${jobId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setResumes(res.data));
  }, [jobId]);
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Resumes for Job #{jobId}</h3>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-6 py-2">File</th>
            <th className="px-6 py-2">Score</th>
            <th className="px-6 py-2">Feedback</th>
            <th className="px-6 py-2">Shortlisted</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map(r => (
            <tr key={r.id}>
              <td className="px-6 py-2">{r.resume_file?.split("/").pop()}</td>
              <td className="px-6 py-2">{r.score}</td>
              <td className="px-6 py-2">{r.feedback}</td>
              <td className="px-6 py-2">
                <input type="checkbox" checked={r.shortlisted} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ResumeListTable;
