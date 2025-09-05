# import fitz
# skills = [
#     "python", "java", "c++", "html", "css", "javascript", "react",
#     "nodejs", "express", "django", "flask", "mysql", "mongodb", "sql",
#     "machine learning", "deep learning", "nlp", "git", "github",
#     "data analysis", "pandas", "numpy", "tensorflow", "keras",
# ]



# def parse_resume(file):
#     text = ""
#     with fitz.open(stream=file.read(), filetype="pdf") as doc:
#         for page in doc:
#             text += page.get_text()

#     return {"text": text, "skills": extract_skills(text)}
# def extract_skills(text):
#     text=text.lower()
#     matched_skills=[]
#     for skill in skills:
#         if skill.lower() in text:
#             matched_skills.append(skill)
#     return list(set(matched_skills))

import fitz  # from PyMuPDF
import re

skills = [
    "python", "java", "c++", "html", "css", "javascript", "react",
    "nodejs", "express", "django", "flask", "mysql", "mongodb", "sql",
    "machine learning", "deep learning", "nlp", "git", "github",
    "data analysis", "pandas", "numpy", "tensorflow", "keras",
]

def extract_skills(text):
    text = text.lower()
    matched_skills = [skill for skill in skills if skill in text]
    return list(set(matched_skills))

def extract_projects(text):
    lines = text.split('\n')
    project_lines = []
    for line in lines:
        if re.search(r"(github|project|app|task|system|tool)", line, re.IGNORECASE):
            project_lines.append(line.strip())
    
    project_titles = []
    for line in project_lines:
        words = line.split()
        if len(words) <= 10:
            project_titles.append(line.split(" - ")[0].strip())  # handle "Title - desc"
    return list(set(project_titles))

def parse_resume(file):
    text = ""
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()

    return {
        "text": text,
        "skills": extract_skills(text),
        "projects": extract_projects(text)
    }
