# import requests


# def get_github_data(username):
    
#     url = f"https://api.github.com/users/{username}"
#     repos_url = f"https://api.github.com/users/{username}/repos"

#     user=requests.get(url)
#     repos=requests.get(repos_url)
#     if user.status_code != 200 or repos.status_code != 200:
#         return {"error": "User not found or API limit exceeded"}
#     user=user.json()
#     repos=repos.json()

#     languages = set()
#     for repo in repos:
#         lang = repo.get("language")
#         if lang:
#             languages.add(lang.lower())

#     return {
#         "name": user.get("name", username),
#         "public_repos": user.get("public_repos"),
#         "followers": user.get("followers"),
#         "following": user.get("following"),
#         "languages": list(languages),
#         "profile_url": user.get("html_url")
#     }


import requests

def get_github_data(input_url):
    try:
        if input_url.startswith("http"):
            username = input_url.rstrip('/').split('/')[-1]
        else:
            return {"error": "Invalid GitHub URL"}

        user_url = f"https://api.github.com/users/{username}"
        repos_url = f"https://api.github.com/users/{username}/repos"

        user_response = requests.get(user_url)
        repos_response = requests.get(repos_url)

        if user_response.status_code != 200 or repos_response.status_code != 200:
            return {"error": "User not found or API limit exceeded"}

        user = user_response.json()
        repos = repos_response.json()

        languages = set()
        repo_names = []

        for repo in repos:
            lang = repo.get("language")
            if lang:
                languages.add(lang.lower())
            name = repo.get("name")
            if name:
                repo_names.append(name.lower())

        return {
            "name": user.get("name", username),
            "public_repos": user.get("public_repos"),
            "followers": user.get("followers"),
            "following": user.get("following"),
            "languages": list(languages),
            "repos": [repo.get("name", "") for repo in repos],
            "profile_url": user.get("html_url")
        }

    except Exception as e:
        return {"error": f"Failed to fetch GitHub data: {str(e)}"}
