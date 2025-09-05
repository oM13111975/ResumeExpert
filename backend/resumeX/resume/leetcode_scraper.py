# import requests
# from bs4 import BeautifulSoup

# def get_leetcode_data(username):
#     url = f"https://leetcode.com/{username}/"
#     response = requests.get(url)
#     if response.status_code != 200:
#         return {"error": "LeetCode profile not found"}

#     soup = BeautifulSoup(response.text, 'html.parser')

#     try:
#         solved = soup.find("div", class_="total-solved-count").text.strip()
#         return {
#             "username": username,
#             "problems_solved": int(solved.split()[0])
#         }
#     except Exception:
#         return {"error": "Failed to parse LeetCode data"}


# import requests

# def get_leetcode_data(input_url_or_username):
#     if input_url_or_username.startswith("http"):
#         username = input_url_or_username.rstrip('/').split('/')[-1]
#     else:
#         username = input_url_or_username.strip()

#     query = """
#     query userProfile($username: String!) {
#       matchedUser(username: $username) {
#         username
#         submitStats {
#           acSubmissionNum {
#             difficulty
#             count
#           }
#         }
#         contestRanking {
#           rating
#         }
#       }
#     }
#     """

#     url = "https://leetcode.com/graphql"

#     headers = {
#         "Content-Type": "application/json",
#         "Referer": f"https://leetcode.com/{username}/",
#         "Origin": "https://leetcode.com",
#         "User-Agent": "Mozilla/5.0"
#     }

#     payload = {
#         "query": query,
#         "variables": {
#             "username": username
#         }
#     }

#     try:
#         response = requests.post(url, json=payload, headers=headers)

#         if response.status_code != 200:
#             return {"error": f"Failed to fetch data: status {response.status_code}"}

#         result = response.json()
#         user = result.get("data", {}).get("matchedUser")
#         if not user:
#             return {"error": "User not found or profile is private"}

#         submissions = user["submitStats"]["acSubmissionNum"]
#         total = sum(item["count"] for item in submissions)
#         easy = next((i["count"] for i in submissions if i["difficulty"] == "Easy"), 0)
#         medium = next((i["count"] for i in submissions if i["difficulty"] == "Medium"), 0)
#         hard = next((i["count"] for i in submissions if i["difficulty"] == "Hard"), 0)
#         rating = user.get("contestRanking", {}).get("rating", 0)

#         return {
#             "username": username,
#             "total_solved": total,
#             "solved_easy": easy,
#             "solved_medium": medium,
#             "solved_hard": hard,
#             "rating": rating
#         }

#     except Exception as e:
#         return {"error": f"Exception occurred: {str(e)}"}
# print(get_leetcode_data("RajGajjar_04"))

import requests

def get_leetcode_data(input_url_or_username):
    if input_url_or_username.startswith("http"):
        username = input_url_or_username.rstrip('/').split('/')[-1]
    else:
        username = input_url_or_username.strip()

    query = """
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    """

    url = "https://leetcode.com/graphql"

    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com/{username}/",
        "Origin": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0"
    }

    payload = {
        "query": query,
        "variables": {
            "username": username
        }
    }

    try:
        response = requests.post(url, json=payload, headers=headers)

        print("Status:", response.status_code)
        print("Raw Response:", response.text)

        if response.status_code != 200:
            return {"error": f"Failed to fetch data: status {response.status_code}"}

        result = response.json()
        user = result.get("data", {}).get("matchedUser")
        if not user:
            return {"error": "User not found or profile is private"}

        submissions = user["submitStats"]["acSubmissionNum"]
        total = sum(item["count"] for item in submissions)
        easy = next((i["count"] for i in submissions if i["difficulty"] == "Easy"), 0)
        medium = next((i["count"] for i in submissions if i["difficulty"] == "Medium"), 0)
        hard = next((i["count"] for i in submissions if i["difficulty"] == "Hard"), 0)

        return {
            "username": username,
            "total_solved": total,
            "solved_easy": easy,
            "solved_medium": medium,
            "solved_hard": hard,
            "rating": 0  # ❌ Not available anymore
        }

    except Exception as e:
        return {"error": f"Exception occurred: {str(e)}"}


print(get_leetcode_data("RajGajjar_04"))
