# import re
# from difflib import SequenceMatcher
# from django.db.models import Q
# from .models import ResumeUpload, JobPost

# class CompanyResumeAnalyzer:
#     def __init__(self):
#         self.skill_keywords = {
#             'python': ['python', 'django', 'flask', 'fastapi', 'pytorch', 'tensorflow'],
#             'javascript': ['javascript', 'js', 'node', 'react', 'angular', 'vue', 'typescript'],
#             'java': ['java', 'spring', 'hibernate', 'maven', 'gradle'],
#             'frontend': ['html', 'css', 'react', 'angular', 'vue', 'frontend', 'ui', 'ux'],
#             'backend': ['backend', 'api', 'server', 'database', 'sql', 'nosql'],
#             'devops': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins'],
#             'mobile': ['android', 'ios', 'react native', 'flutter', 'mobile', 'app development'],
#             'database': ['mysql', 'postgresql', 'mongodb', 'redis', 'sql', 'database'],
#             'cloud': ['aws', 'azure', 'gcp', 'cloud', 'serverless', 'lambda'],
#             'ml': ['machine learning', 'ml', 'ai', 'data science', 'tensorflow', 'pytorch']
#         }

#     def extract_skills_from_feedback(self, feedback_text):
#         if not feedback_text:
#             return []
#         feedback_lower = feedback_text.lower()
#         extracted_skills = []
#         for keywords in self.skill_keywords.values():
#             for keyword in keywords:
#                 if keyword in feedback_lower:
#                     extracted_skills.append(keyword.title())
#         return list(set(extracted_skills))

#     def calculate_skill_match_percentage(self, candidate_feedback, job_required_skills):
#         if not job_required_skills or not candidate_feedback:
#             return 0.0
#         candidate_skills = self.extract_skills_from_feedback(candidate_feedback)
#         job_skills = [s.strip().lower() for s in job_required_skills.split(',')]
#         if not job_skills or not candidate_skills:
#             return 0.0
#         matches = 0
#         candidate_skills_lower = [c.lower() for c in candidate_skills]
#         for skill in job_skills:
#             for cskill in candidate_skills_lower:
#                 if (skill in cskill or cskill in skill or SequenceMatcher(None, skill, cskill).ratio() > 0.8):
#                     matches += 1
#                     break
#         return min(100.0, (matches / len(job_skills)) * 100)

#     def _calculate_ranking_score(self, resume, skill_match, job):
#         base = resume.score or 0
#         weights = {'score': 0.6, 'skill': 0.4}
#         bonus = 0
#         if resume.github_url:
#             bonus += 5
#         if resume.leetcode_username:
#             bonus += 5
#         total = base * weights['score'] + skill_match * weights['skill'] + bonus
#         return min(100, total)

#     def score_resume(self, resume_text, job):
#         # Basic keyword matching for scoring (can be improved with ML later)
#         text = resume_text.lower()
#         job_keywords = (job.skills_required or "") + " " + (job.description or "")
#         job_keywords = job_keywords.lower().split(',')
#         job_keywords = [k.strip() for k in job_keywords if k.strip()]
#         if not job_keywords:
#             return 50, "No job skills specified; default score."

#         matched = sum(1 for k in job_keywords if k in text)
#         score = 50 + 50 * (matched / len(job_keywords))
#         score = min(100, round(score))

#         feedback_lines = [
#             f"Matched {matched} of {len(job_keywords)} required skills/keywords.",
#             f"Matched skills: {', '.join([k for k in job_keywords if k in text])}" if matched else "No keyword matches found.",
#             "Consider enhancing your resume with more job-relevant skills."
#         ]
#         feedback = "\n".join(feedback_lines)
#         return score, feedback

#     def rank_candidates(self, job_id):
#         try:
#             job = JobPost.objects.get(id=job_id)
#         except JobPost.DoesNotExist:
#             return []

#         resumes = ResumeUpload.objects.filter(job=job)
#         ranked = []

#         for r in resumes:
#             skill_match = self.calculate_skill_match_percentage(r.feedback or "", job.skills_required or "")
#             ranking_score = self._calculate_ranking_score(r, skill_match, job)
#             ranked.append({
#                 'id': r.id,
#                 'candidate_name': r.candidate_name or "Unknown",
#                 'candidate_email': r.candidate_email,
#                 'score': r.score,
#                 'skill_match_percentage': skill_match,
#                 'ranking_score': ranking_score,
#                 'status': r.status,
#                 'github_url': r.github_url,
#                 'leetcode_username': r.leetcode_username,
#                 'uploaded_at': r.uploaded_at,
#                 'feedback': r.feedback,
#                 'shortlisted': r.shortlisted,
#             })

#         ranked.sort(key=lambda x: x['ranking_score'], reverse=True)
#         return ranked
import re

def score_resume_against_job(resume_text, job_description, required_skills):
    """
    Score the resume based on keyword/phrase overlap with job description and required skills.
    Returns (score out of 100, feedback string).
    """
    # Clean and tokenize text into lower-cased unique words
    def tokenize(text):
        return set(re.findall(r'\b\w+\b', text.lower()))
    
    resume_words = tokenize(resume_text)
    description_words = tokenize(job_description)
    skills_words = set(s.strip().lower() for s in required_skills.split(',') if s.strip())

    # Keywords to match against (union of description and required skills)
    keywords = description_words.union(skills_words)

    if not keywords:
        return 50, "No job description or skills provided for matching."

    matched_keywords = resume_words.intersection(keywords)
    match_ratio = len(matched_keywords) / len(keywords)

    score = 50 + (match_ratio * 50)  # Scale from 50 to 100
    score = round(min(100, score))

    feedback = [
        f"Matched {len(matched_keywords)} out of {len(keywords)} keywords from job description and skills.",
        f"Matched keywords: {', '.join(sorted(matched_keywords)) if matched_keywords else 'None'}",
        "Consider improving your resume by including relevant keywords aligned with this job."
    ]

    return score, "\n".join(feedback)
