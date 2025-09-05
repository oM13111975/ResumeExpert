# # def score_resume(resume_data, github_data):
# #     score = 0
# #     feedback = []

# #     skills = resume_data.get("skills", [])
# #     if skills:
# #         score += len(skills) * 2
# #         feedback.append(f"Great! Found {len(skills)} technical skills in your resume.")

# #         if "python" in skills:
# #             score += 5
# #             feedback.append("Python is a strong skill — bonus points!")
# #     else:
# #         feedback.append("No relevant technical skills found in your resume.")

# #     if github_data:
# #         if github_data.get("public_repos", 0) >= 5:
# #             score += 10
# #             feedback.append("Good number of public GitHub repositories.")
# #         else:
# #             feedback.append("Consider adding more public repositories to showcase your work.")

# #         if github_data.get("followers", 0) >= 10:
# #             score += 5
# #             feedback.append("Nice GitHub network (followers).")
# #         else:
# #             feedback.append("Grow your GitHub presence by collaborating or contributing to projects.")

# #         languages = github_data.get("languages", [])
# #         if "python" in languages:
# #             score += 5
# #             feedback.append("Python projects detected on GitHub.")
# #     else:
# #         feedback.append("GitHub profile data could not be fetched.")

# #     score = min(score, 100)
# #     return score, feedback


# # from difflib import SequenceMatcher

# # def similar(a, b):
# #     return SequenceMatcher(None, a.lower(), b.lower()).ratio()

# # def score_resume(resume_data, github_data):
# #     score = 0
# #     feedback = []

# #     # Print extracted data
# #     print("Resume projects:", resume_data.get("projects", []))
# #     print("GitHub repos:", github_data.get("repos", []))

# #     # Scoring based on skills
# #     skills = resume_data.get("skills", [])
# #     if skills:
# #         score += len(skills) * 2
# #         feedback.append(f"✅ Found {len(skills)} technical skills.")
# #         if "python" in [s.lower() for s in skills]:
# #             score += 5
# #             feedback.append("🐍 Python skill detected — bonus points!")
# #     else:
# #         feedback.append("⚠️ No relevant technical skills found.")

# #     # Scoring based on GitHub
# #     if github_data:
# #         if github_data.get("public_repos", 0) >= 5:
# #             score += 10
# #             feedback.append("✅ Good number of public GitHub repos.")
# #         else:
# #             feedback.append("📢 Consider adding more public repositories.")

# #         if github_data.get("followers", 0) >= 10:
# #             score += 5
# #             feedback.append("🌐 Solid GitHub presence.")
# #         else:
# #             feedback.append("📢 Grow your GitHub by collaborating more.")

# #         languages = github_data.get("languages", [])
# #         if "python" in languages:
# #             score += 5
# #             feedback.append("🧠 Python projects detected on GitHub.")

# #         # Matching projects
# #         resume_projects = resume_data.get("projects", [])
# #         github_repos = github_data.get("repos", [])

# #         matched = False
# #         for project in resume_projects:
# #             for repo in github_repos:
# #                 if similar(project, repo) > 0.6:  # Can adjust threshold
# #                     score += 5
# #                     feedback.append(f"✅ Resume project matched with GitHub repo: '{repo}'")
# #                     matched = True
# #                     break
# #         if not matched:
# #             feedback.append("⚠️ No resume project matched your GitHub repositories.")

# #     else:
# #         feedback.append("⚠️ GitHub profile data could not be fetched.")

# #     return min(score, 100), feedback


# linear_model.py
# from sklearn.linear_model import LinearRegression
# import numpy as np

# # === Step 1: Training Data ===
# # Each item: [skills_count, has_python, public_repos, followers, matched_projects]
# X_train = [
#     [10, 1, 7, 20, 2],
#     [4, 0, 3, 5, 0],
#     [8, 1, 6, 8, 1],
#     [2, 0, 1, 1, 0],
#     [15, 1, 10, 30, 3],
#     [6, 1, 5, 10, 1],
#     [9, 1, 4, 15, 1],
#     [5, 0, 2, 5, 0],
#     [12, 1, 9, 25, 2],
#     [3, 0, 1, 2, 0]
# ]
# y_train = [80, 35, 70, 25, 95, 65, 68, 40, 90, 30]  # Industry-aligned score out of 100

# # Train the model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Save the model object
# trained_model = model  # you can reuse this without joblib


# # === Step 2: Scoring Function ===
# def score_resume(resume_data, github_data):
#     skills = resume_data.get("skills", [])
#     skill_count = len(skills)
#     has_python = 1 if "python" in [s.lower() for s in skills] else 0

#     public_repos = github_data.get("public_repos", 0)
#     followers = github_data.get("followers", 0)

#     resume_projects = [p.lower() for p in resume_data.get("projects", [])]
#     github_projects = [r.lower() for r in github_data.get("repos", [])]
#     matched = sum(1 for proj in resume_projects if any(proj in g for g in github_projects))

#     # Feature vector
#     features = np.array([[skill_count, has_python, public_repos, followers, matched]])
#     score = trained_model.predict(features)[0]

#     score = max(0, min(100, round(score)))

#     feedback = []
#     if skill_count > 0:
#         feedback.append(f"✅ Found {skill_count} skills.")
#     if has_python:
#         feedback.append("🐍 Python detected — good job!")
#     if public_repos >= 5:
#         feedback.append("✅ Solid number of GitHub repos.")
#     if followers >= 10:
#         feedback.append("📢 Good network on GitHub.")
#     if matched > 0:
#         feedback.append("🔗 Resume projects match GitHub repos.")
#     else:
#         feedback.append("⚠️ No resume project matched GitHub repos.")

#     return score, feedback


# from sklearn.linear_model import LinearRegression
# import numpy as np

# # Training data: [skills_count, has_python, public_repos, followers, matched_projects, leetcode_solved, leetcode_rating]
# X_train = [
#     [10, 1, 7, 20, 2, 300, 1800],
#     [4, 0, 3, 5, 0, 50, 1200],
#     [8, 1, 6, 8, 1, 200, 1500],
#     [2, 0, 1, 1, 0, 20, 900],
#     [15, 1, 10, 30, 3, 400, 2100],
#     [6, 1, 5, 10, 1, 100, 1400],
#     [9, 1, 4, 15, 1, 180, 1600],
#     [5, 0, 2, 5, 0, 60, 1100],
#     [12, 1, 9, 25, 2, 350, 2000],
#     [3, 0, 1, 2, 0, 40, 1000]
# ]

# y_train = [85, 40, 75, 20, 98, 65, 72, 45, 92, 33]  # Realistic scores based on expectations

# model = LinearRegression()
# model.fit(X_train, y_train)
# trained_model = model


# from difflib import SequenceMatcher

# def similar(a, b):
#     return SequenceMatcher(None, a.lower(), b.lower()).ratio()

# def score_resume(resume_data, github_data, leetcode_data):
#     skills = resume_data.get("skills", [])
#     skill_count = len(skills)
#     has_python = 1 if "python" in [s.lower() for s in skills] else 0

#     public_repos = github_data.get("public_repos", 0)
#     followers = github_data.get("followers", 0)
    

#     resume_projects = [p.lower() for p in resume_data.get("projects", [])]
#     github_projects = [r.lower() for r in github_data.get("repos", [])]
#     matched = 0
#     for proj in resume_projects:
#         for repo in github_projects:
#             if similar(proj, repo) > 0.6:
#                 matched += 1
#                 break

#     leet_solved = leetcode_data.get("total_solved", 0)
#     leet_rating = leetcode_data.get("rating", 0)
#     print("LeetCode Data:", leetcode_data)



#     features = np.array([[skill_count, has_python, public_repos, followers, matched, leet_solved, leet_rating]])
#     score = trained_model.predict(features)[0]
#     score = max(0, min(100, round(score)))

#     feedback = []
#     if skill_count > 0:
#         feedback.append(f"✅ {skill_count} skills found.")
#     else:
#         feedback.append("⚠️ No technical skills found.")

#     if has_python:
#         feedback.append("🐍 Python detected — industry essential!")

#     if public_repos >= 5:
#         feedback.append("✅ Strong GitHub repo count.")
#     else:
#         feedback.append("📁 Add more public GitHub projects.")

#     if followers >= 10:
#         feedback.append("🌐 Good GitHub presence.")
#     else:
#         feedback.append("🤝 Collaborate more to grow GitHub followers.")

#     if matched > 0:
#         feedback.append("🔗 Resume project titles match GitHub repos.")
#     else:
#         feedback.append("⚠️ No project titles matched GitHub repos.")

#     if leet_solved >= 100:
#         feedback.append("💡 Great LeetCode problem-solving history.")
#     elif leet_solved > 0:
#         feedback.append("📚 Keep solving more LeetCode problems.")
#     else:
#         feedback.append("⚠️ No LeetCode problems solved.")

#     # if leet_rating >= 1600:
#     #     feedback.append("🏆 Excellent LeetCode contest rating.")
#     # elif leet_rating > 0:
#     #     feedback.append("📈 Improve your contest ratings.")
#     # else:
#     #     feedback.append("⚠️ No contest rating data from LeetCode.")

#     return score, feedback


# from sklearn.linear_model import LinearRegression
# import numpy as np
# from difflib import SequenceMatcher

# # === TRAINING ===
# X_train = [
#     [15, 1, 10, 30, 3, 400],
#     [10, 1, 6, 15, 2, 300],
#     [8, 1, 5, 10, 1, 200],
#     [5, 0, 3, 5, 0, 100],
#     [3, 0, 1, 2, 0, 50],
#     [12, 1, 8, 20, 3, 350],
#     [6, 1, 4, 8, 1, 150],
#     [2, 0, 1, 1, 0, 20],
#     [13, 1, 9, 25, 2, 370],
#     [4, 0, 2, 4, 0, 80]
# ]
# y_train = [95, 85, 70, 55, 30, 90, 68, 25, 92, 45]

# model = LinearRegression()
# model.fit(X_train, y_train)
# trained_model = model

# # === SIMILARITY FUNCTION ===
# def similar(a, b):
#     return SequenceMatcher(None, a.lower(), b.lower()).ratio()

# # === MAIN SCORING FUNCTION ===
# def score_resume(resume_data, github_data, leetcode_data):
#     skills = resume_data.get("skills", [])
#     skill_count = len(skills)
#     has_python = 1 if "python" in [s.lower() for s in skills] else 0

#     public_repos = github_data.get("public_repos", 0)
#     followers = github_data.get("followers", 0)

#     resume_projects = [p.lower() for p in resume_data.get("projects", [])]
#     github_projects = [r.lower() for r in github_data.get("repos", [])]
#     matched = sum(1 for proj in resume_projects if any(similar(proj, repo) > 0.6 for repo in github_projects))

#     leet_solved = leetcode_data.get("total_solved", 0)

#     # Final feature vector
#     features = np.array([[skill_count, has_python, public_repos, followers, matched, leet_solved]])
#     score = trained_model.predict(features)[0]
#     score = max(0, min(100, round(score)))

#     # Feedback (no extra fields)
#     feedback = []
#     if skill_count > 0:
#         feedback.append(f"✅ {skill_count} skills found.")
#     else:
#         feedback.append("⚠️ No technical skills found.")

#     if has_python:
#         feedback.append("🐍 Python detected — industry essential!")

#     if public_repos >= 5:
#         feedback.append("✅ Strong GitHub repo count.")
#     else:
#         feedback.append("📁 Add more public GitHub projects.")

#     if followers >= 10:
#         feedback.append("🌐 Good GitHub presence.")
#     else:
#         feedback.append("🤝 Collaborate more to grow GitHub followers.")

#     if matched > 0:
#         feedback.append("🔗 Resume project titles match GitHub repos.")
#     else:
#         feedback.append("⚠️ No project titles matched GitHub repos.")

#     if leet_solved >= 150:
#         feedback.append("💡 Great LeetCode problem-solving history.")
#     elif leet_solved > 0:
#         feedback.append("📚 Keep solving more LeetCode problems.")
#     else:
#         feedback.append("⚠️ No LeetCode problems solved.")

#     return score, feedback



from sklearn.ensemble import RandomForestRegressor
import numpy as np
from difflib import SequenceMatcher

# === TRAINING ===
X_train = [
    [15, 1, 10, 30, 3, 400],
    [10, 1, 6, 15, 2, 300],
    [8, 1, 5, 10, 1, 200],
    [5, 0, 3, 5, 0, 100],
    [3, 0, 1, 2, 0, 50],
    [12, 1, 8, 20, 3, 350],
    [6, 1, 4, 8, 1, 150],
    [2, 0, 1, 1, 0, 20],
    [13, 1, 9, 25, 2, 370],
    [4, 0, 2, 4, 0, 80]
]

y_train = [95, 85, 70, 55, 30, 90, 68, 25, 92, 45]

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
trained_model = model


def similar(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def score_resume(resume_data, github_data, leetcode_data):
    skills = resume_data.get("skills", [])
    skill_count = len(skills)
    has_python = 1 if "python" in [s.lower() for s in skills] else 0

    public_repos = github_data.get("public_repos", 0)
    followers = github_data.get("followers", 0)

    resume_projects = [p.lower() for p in resume_data.get("projects", [])]
    github_projects = [r.lower() for r in github_data.get("repos", [])]
    matched = sum(1 for proj in resume_projects if any(similar(proj, repo) > 0.6 for repo in github_projects))

    leet_solved = leetcode_data.get("total_solved", 0)

    features = np.array([[skill_count, has_python, public_repos, followers, matched, leet_solved]])
    score = trained_model.predict(features)[0]
    score = max(0, min(100, round(score)))  # clamp to [0, 100]

    feedback = []
    if skill_count > 0:
        feedback.append(f"✅ {skill_count} skills found.")
    else:
        feedback.append("⚠️ No technical skills found.")

    if has_python:
        feedback.append("🐍 Python detected — industry essential!")

    if public_repos >= 5:
        feedback.append("✅ Strong GitHub repo count.")
    else:
        feedback.append("📁 Add more public GitHub projects.")

    if followers >= 10:
        feedback.append("🌐 Good GitHub presence.")
    else:
        feedback.append("🤝 Collaborate more to grow GitHub followers.")

    if matched > 0:
        feedback.append("🔗 Resume project titles match GitHub repos.")
    else:
        feedback.append("⚠️ No project titles matched GitHub repos.")

    if leet_solved >= 150:
        feedback.append("💡 Great LeetCode problem-solving history.")
    elif leet_solved > 0:
        feedback.append("📚 Keep solving more LeetCode problems.")
    else:
        feedback.append("❌ No LeetCode problems solved — major gap.")

    return score, feedback
