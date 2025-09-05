# company_scorer.py
import re
from difflib import SequenceMatcher

def clean_text(text):
    return re.sub(r'[^a-z0-9 ]+', ' ', text.lower())

def similar(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def score_company_resume(resume_text, job_description, required_skills, github_data=None, leetcode_data=None):
    """
    Scores company-uploaded resume against the job description & required skills.
    Optionally considers GitHub and LeetCode data for enhanced scoring.
    Returns (score: float, feedback: str)
    """

    resume_words = set(clean_text(resume_text).split())
    job_words = set(clean_text(job_description).split())
    skills_words = set(s.strip().lower() for s in required_skills.split(',')) if required_skills else set()
    keywords = job_words.union(skills_words)

    matched_keywords = resume_words.intersection(keywords)
    total_keywords = len(keywords) or 1

    # Base score by keyword overlap
    base_score = 50 + 50 * len(matched_keywords) / total_keywords

    feedback_lines = [
        f"Matched {len(matched_keywords)} out of {total_keywords} keywords from job description and skills.",
        f"Keywords matched: {', '.join(list(matched_keywords)[:10]) or 'None'}",
    ]

    # Optional: GitHub scoring
    if github_data:
        repos = github_data.get("repos", [])
        followers = github_data.get("followers", 0)
        public_repos = github_data.get("public_repos", 0)
        
        if public_repos >= 5:
            base_score += 10
            feedback_lines.append("✅ Strong GitHub repo count.")
        if followers >= 10:
            base_score += 5
            feedback_lines.append("🌐 Good GitHub presence.")
        # Match resume project titles with GitHub repos (if available, can parse resume projects)
        # For demo purposes, just add a line
        feedback_lines.append(f"GitHub repos analyzed: {len(repos)}")

    # Optional: LeetCode scoring
    if leetcode_data:
        total_solved = leetcode_data.get("total_solved", 0)
        if total_solved >= 150:
            base_score += 10
            feedback_lines.append("💡 Great LeetCode problem-solving history.")
        elif total_solved > 0:
            feedback_lines.append("📚 Keep improving LeetCode problem solving.")

    # Clamp final score 0-100
    final_score = max(0, min(100, round(base_score)))

    return final_score, "\n".join(feedback_lines)
