# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# from django.contrib.auth.models import User
# from .serializers import CandidateSignupSerializer, CompanySignupSerializer

# from django.contrib.auth import authenticate, login
# from rest_framework.views import APIView

# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# from django.contrib.auth.models import User
# from .serializers import CandidateSignupSerializer, CompanySignupSerializer
# from .models import Profile

# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from rest_framework_simplejwt.tokens import RefreshToken

# from rest_framework.parsers import MultiPartParser
# from .resume_parser import parse_resume
# from .github_scraper import get_github_data
# from .scorer import score_resume
# from .leetcode_scraper import get_leetcode_data

# from fpdf import FPDF
# from datetime import datetime
# from django.http import FileResponse
# import os
# from django.conf import settings

# from .models import JobPost, ResumeUpload
# from .serializers import JobPostSerializer, ResumeUploadSerializer
# # --- SIGNUP VIEWS ---

# @api_view(['POST'])
# def candidate_signup(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     if User.objects.filter(email=email).exists():
#         return Response({'email': ['A user with this email already exists.']}, status=status.HTTP_400_BAD_REQUEST)

#     if password is not None and len(password) < 8:
#         return Response({'password': ['Password must be at least 8 characters long.']}, status=status.HTTP_400_BAD_REQUEST)

#     serializer = CandidateSignupSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Candidate account created"}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def company_signup(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     if User.objects.filter(email=email).exists():
#         return Response({'email': ['A user with this email already exists.']}, status=status.HTTP_400_BAD_REQUEST)

#     if password is not None and len(password) < 8:
#         return Response({'password': ['Password must be at least 8 characters long.']}, status=status.HTTP_400_BAD_REQUEST)

#     serializer = CompanySignupSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Company account created"}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # --- LOGIN VIEWS ---

# class CandidateTokenObtainPairView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#         if not user.check_password(password):
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#         if not hasattr(user, 'profile') or user.profile.role != 'candidate':
#             return Response({'error': 'Not a candidate'}, status=status.HTTP_403_FORBIDDEN)

#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'user_id': user.id,
#             'email': user.email,
#             'role': 'candidate'
#         })


# class CompanyTokenObtainPairView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#         if not user.check_password(password):
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#         if not hasattr(user, 'profile') or user.profile.role != 'company':
#             return Response({'error': 'Not a company'}, status=status.HTTP_403_FORBIDDEN)

#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'user_id': user.id,
#             'email': user.email,
#             'role': 'company',
#             'company_name': user.profile.company_name
#         })



# from rest_framework.parsers import MultiPartParser
# from .resume_parser import parse_resume
# # from .linkedin_scraper import get_linkedin_data
# from .github_scraper import get_github_data
# from .scorer import score_resume
# from .leetcode_scraper import get_leetcode_data


# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# @method_decorator(csrf_exempt, name='dispatch')
# class ResumeScoreView(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         resume_file = request.FILES['resume']
#         linkedin_url = request.data['linkedin']
#         github_url = request.data['github']

#         resume_data = parse_resume(resume_file)
#         # linkedin_data = get_linkedin_data(linkedin_url)
#         github_data = get_github_data(github_url)

#         # score, feedback = score_resume(resume_data, linkedin_data, github_data)
#         # score, feedback = score_resume(resume_data, github_data)
#         leetcode_username = request.data['leetcode']
#         leetcode_data = get_leetcode_data(leetcode_username)

#         score, feedback = score_resume(resume_data, github_data, leetcode_data)


#         return Response({'score': score, 'feedback': feedback})

# from fpdf import FPDF
# from datetime import datetime

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .github_scraper import get_github_data
# from .leetcode_scraper import get_leetcode_data
# from django.http import FileResponse
# import os
# from django.conf import settings

# class ResumeFromProfilesView(APIView):
#     def post(self, request):
#         github_url = request.data.get('github', '')
#         leetcode_username = request.data.get('leetcode', '')
#         email = request.data.get('email', 'unknown@example.com')
#         name = request.data.get('name', 'Anonymous')

#         github_data = get_github_data(github_url)
#         leetcode_data = get_leetcode_data(leetcode_username)

#         output_dir = os.path.join(settings.MEDIA_ROOT, 'generated_resumes')
#         os.makedirs(output_dir, exist_ok=True)
#         resume_path = os.path.join(output_dir, f"{name.replace(' ', '_')}_resume.pdf")

#         generate_resume(name, email, github_data, leetcode_data, resume_path)

#         return FileResponse(open(resume_path, 'rb'), content_type='application/pdf')


# class ResumePDF(FPDF):
#     def header(self):
#         self.set_font('Arial', 'B', 16)
#         self.cell(0, 10, 'Auto-Generated Resume', ln=True, align='C')

#     def add_section(self, title):
#         self.set_font('Arial', 'B', 14)
#         self.cell(0, 10, title, ln=True)

#     def add_bullet(self, text):
#         self.set_font('Arial', '', 12)
#         self.cell(10)
#         self.multi_cell(0, 10, f'- {text}')

# def generate_resume(name, email, github_data, leetcode_data, output_path):
#     pdf = ResumePDF()
#     pdf.add_page()

#     # Personal Info
#     pdf.set_font('Arial', '', 12)
#     pdf.cell(0, 10, f"Name: {name}", ln=True)
#     pdf.cell(0, 10, f"Email: {email}", ln=True)
#     pdf.cell(0, 10, f"Generated on: {datetime.now().strftime('%d %b %Y')}", ln=True)
#     pdf.ln(5)

#     # GitHub Summary
#     pdf.add_section("GitHub Summary")
#     pdf.add_bullet(f"Public Repositories: {github_data.get('public_repos', 0)}")
#     pdf.add_bullet(f"Followers: {github_data.get('followers', 0)}")
#     for repo in github_data.get("repos", [])[:5]:
#         pdf.add_bullet(f"Project: {repo}")

#     pdf.ln(5)

#     # LeetCode Summary
#     pdf.add_section("LeetCode Summary")
#     pdf.add_bullet(f"Total Solved: {leetcode_data.get('total_solved', 0)}")
#     pdf.add_bullet(f"Easy: {leetcode_data.get('solved_easy', 0)}, Medium: {leetcode_data.get('solved_medium', 0)}, Hard: {leetcode_data.get('solved_hard', 0)}")

#     pdf.output(output_path)

# from rest_framework.parsers import MultiPartParser
# from .models import JobPost, ResumeUpload
# from .serializers import JobPostSerializer, ResumeUploadSerializer
# from .resume_parser import parse_resume
# from .github_scraper import get_github_data
# from .leetcode_scraper import get_leetcode_data
# from .scorer import score_resume

# # class JobPostCreateView(APIView):
# #     def post(self, request):
# #         company_profile = request.user.profile
# #         if company_profile.role != 'company':
# #             return Response({"error": "Only companies can post jobs."}, status=403)

# #         data = request.data.copy()
# #         data['company'] = company_profile.id
# #         serializer = JobPostSerializer(data=data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data, status=201)
# #         return Response(serializer.errors, status=400)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import JobPost
# from .serializers import JobPostSerializer

# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# @method_decorator(csrf_exempt, name='dispatch')
# class JobPostCreateView(APIView):
#     def post(self, request):
#         if not request.user.is_authenticated:
#             return Response({"error": "Authentication required."}, status=401)

#         company_profile = request.user.profile
#         if company_profile.role != 'company':
#             return Response({"error": "Only companies can post jobs."}, status=403)

#         data = request.data.copy()
#         data['company'] = company_profile.id

#         serializer = JobPostSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)



# class ResumeUploadView(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         job_id = request.data.get('job')
#         resume_file = request.FILES['resume_file']
#         github_url = request.data.get('github_url')
#         leetcode_username = request.data.get('leetcode_username')

#         job = JobPost.objects.get(id=job_id)

#         resume_data = parse_resume(resume_file)
#         github_data = get_github_data(github_url)
#         leetcode_data = get_leetcode_data(leetcode_username)

#         score, feedback = score_resume(resume_data, github_data, leetcode_data)

#         upload = ResumeUpload.objects.create(
#             job=job,
#             resume_file=resume_file,
#             github_url=github_url,
#             leetcode_username=leetcode_username,
#             score=score,
#             feedback=feedback,
#         )

#         return Response(ResumeUploadSerializer(upload).data, status=201)
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import ResumeUpload
# from .serializers import ResumeUploadSerializer
# from rest_framework import status

# class ResumeListView(APIView):
#     def get(self, request, job_id):
#         resumes = ResumeUpload.objects.filter(job__id=job_id)
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from .serializers import CandidateSignupSerializer, CompanySignupSerializer
from .models import Profile

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.parsers import MultiPartParser
from .resume_parser import parse_resume
from .github_scraper import get_github_data
from .scorer import score_resume
from .leetcode_scraper import get_leetcode_data

from fpdf import FPDF
from datetime import datetime
from django.http import FileResponse
import os
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

# from .models import JobPost,ResumeUpload
# from .serializers import JobPostSerializer,ResumeUploadSerializer


# --- SIGNUP VIEWS ---

@api_view(['POST'])
@permission_classes([AllowAny])  # ✅ Allow access without authentication
def candidate_signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(email=email).exists():
        return Response({'email': ['A user with this email already exists.']}, status=status.HTTP_400_BAD_REQUEST)

    if password is not None and len(password) < 8:
        return Response({'password': ['Password must be at least 8 characters long.']}, status=status.HTTP_400_BAD_REQUEST)

    serializer = CandidateSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Candidate account created"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])  # ✅ Allow access without authentication
def company_signup(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(email=email).exists():
        return Response({'email': ['A user with this email already exists.']}, status=status.HTTP_400_BAD_REQUEST)

    if password is not None and len(password) < 8:
        return Response({'password': ['Password must be at least 8 characters long.']}, status=status.HTTP_400_BAD_REQUEST)

    serializer = CompanySignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Company account created"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- JWT LOGIN VIEWS ---

class CandidateLoginJWTView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not hasattr(user, 'profile') or user.profile.role != 'candidate':
            return Response({'error': 'Not a candidate'}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'email': user.email,
            'role': 'candidate'
        })


class CompanyLoginJWTView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not hasattr(user, 'profile') or user.profile.role != 'company':
            return Response({'error': 'Not a company'}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'email': user.email,
            'role': 'company',
            'company_name': user.profile.company_name
        })


# --- Resume Score View ---

class ResumeScoreView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        resume_file = request.FILES['resume']
        linkedin_url = request.data['linkedin']
        github_url = request.data['github']

        resume_data = parse_resume(resume_file)
        github_data = get_github_data(github_url)
        leetcode_username = request.data['leetcode']
        leetcode_data = get_leetcode_data(leetcode_username)

        score, feedback = score_resume(resume_data, github_data, leetcode_data)

        return Response({'score': score, 'feedback': feedback})


# --- Resume Generator ---

class ResumePDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'Auto-Generated Resume', ln=True, align='C')

    def add_section(self, title):
        self.set_font('Arial', 'B', 14)
        self.cell(0, 10, title, ln=True)

    def add_bullet(self, text):
        self.set_font('Arial', '', 12)
        self.cell(10)
        self.multi_cell(0, 10, f'- {text}')


def generate_resume(name, email, github_data, leetcode_data, output_path):
    pdf = ResumePDF()
    pdf.add_page()
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f"Name: {name}", ln=True)
    pdf.cell(0, 10, f"Email: {email}", ln=True)
    pdf.cell(0, 10, f"Generated on: {datetime.now().strftime('%d %b %Y')}", ln=True)
    pdf.ln(5)

    pdf.add_section("GitHub Summary")
    pdf.add_bullet(f"Public Repositories: {github_data.get('public_repos', 0)}")
    pdf.add_bullet(f"Followers: {github_data.get('followers', 0)}")
    for repo in github_data.get("repos", [])[:5]:
        pdf.add_bullet(f"Project: {repo}")

    pdf.ln(5)
    pdf.add_section("LeetCode Summary")
    pdf.add_bullet(f"Total Solved: {leetcode_data.get('total_solved', 0)}")
    pdf.add_bullet(f"Easy: {leetcode_data.get('solved_easy', 0)}, Medium: {leetcode_data.get('solved_medium', 0)}, Hard: {leetcode_data.get('solved_hard', 0)}")
    pdf.output(output_path)


class ResumeFromProfilesView(APIView):
    def post(self, request):
        github_url = request.data.get('github', '')
        leetcode_username = request.data.get('leetcode', '')
        email = request.data.get('email', 'unknown@example.com')
        name = request.data.get('name', 'Anonymous')

        github_data = get_github_data(github_url)
        leetcode_data = get_leetcode_data(leetcode_username)

        output_dir = os.path.join(settings.MEDIA_ROOT, 'generated_resumes')
        os.makedirs(output_dir, exist_ok=True)
        resume_path = os.path.join(output_dir, f"{name.replace(' ', '_')}_resume.pdf")

        generate_resume(name, email, github_data, leetcode_data, resume_path)

        return FileResponse(open(resume_path, 'rb'), content_type='application/pdf')




# class JobPostCreateView(APIView):
#     def post(self, request):
#         if not request.user.is_authenticated:
#             return Response({"error": "Authentication required."}, status=401)

#         company_profile = request.user.profile
#         if company_profile.role != 'company':
#             return Response({"error": "Only companies can post jobs."}, status=403)

#         data = request.data.copy()
#         data['company'] = company_profile.id

#         serializer = JobPostSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


# class ResumeUploadView(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         job_id = request.data.get('job')
#         resume_file = request.FILES['resume_file']
#         github_url = request.data.get('github_url')
#         leetcode_username = request.data.get('leetcode_username')

#         job = JobPost.objects.get(id=job_id)
#         resume_data = parse_resume(resume_file)
#         github_data = get_github_data(github_url)
#         leetcode_data = get_leetcode_data(leetcode_username)

#         score, feedback = score_resume(resume_data, github_data, leetcode_data)

#         upload = ResumeUpload.objects.create(
#             job=job,
#             resume_file=resume_file,
#             github_url=github_url,
#             leetcode_username=leetcode_username,
#             score=score,
#             feedback=feedback,
#         )

#         return Response(ResumeUploadSerializer(upload).data, status=201)


# class ResumeListView(APIView):
#     def get(self, request, job_id):
#         resumes = ResumeUpload.objects.filter(job__id=job_id)
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser
# from .models import JobPost, ResumeUpload
# from .serializers import JobPostSerializer, ResumeUploadSerializer
# from rest_framework_simplejwt.authentication import JWTAuthentication

# class JobPostCreateView(APIView):
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = [JWTAuthentication]


#     def post(self, request):
#         if request.user.profile.role != 'company':
#             return Response({'error': 'Only companies can post jobs'}, status=403)

#         data = request.data.copy()
#         data['company'] = request.user.profile.id
#         serializer = JobPostSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

# class ResumeUploadView(APIView):
#     # authentication_classes = [JWTAuthentication]

#     parser_classes = [MultiPartParser]
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         file = request.FILES.get('resume_file')
#         job_id = request.data.get('job')
#         github = request.data.get('github_url')
#         leetcode = request.data.get('leetcode_username')
#         score, feedback = score_resume(file, github, leetcode)

#         upload = ResumeUpload.objects.create(
#             job_id=job_id,
#             resume_file=file,
#             github_url=github,
#             leetcode_username=leetcode,
#             score=score,
#             feedback=feedback,
#         )

#         return Response(ResumeUploadSerializer(upload).data, status=201)
# class ResumeUploadView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser]

#     def post(self, request):
#         job_id = request.data.get('job')
#         resume_file = request.FILES.get('resume_file')
#         github_url = request.data.get('github_url')
#         leetcode_username = request.data.get('leetcode_username')

#         if not resume_file:
#             return Response({"error": "Resume file is required."}, status=400)

#         try:
#             # 🔍 Parse the uploaded resume file to extract skills and other info
#             resume_data = parse_resume(resume_file)  # ✅ this returns a dict
#         except Exception as e:
#             return Response({"error": f"Failed to parse resume: {str(e)}"}, status=400)

#         # ⏳ Extract GitHub & LeetCode data (you can mock if needed)
#         github_data = get_github_data(github_url) if github_url else {}
#         leetcode_data = get_leetcode_data(leetcode_username) if leetcode_username else {}

#         # 🧠 Score the resume using the parsed data
#         score, feedback = score_resume(resume_data, github_data, leetcode_data)

#         # 🎯 Save to DB
#         job = JobPost.objects.get(id=job_id)
#         upload = ResumeUpload.objects.create(
#             job=job,
#             resume_file=resume_file,
#             github_url=github_url,
#             leetcode_username=leetcode_username,
#             score=score,
#             feedback=feedback,
#         )

#         return Response(ResumeUploadSerializer(upload).data, status=201)

# class ResumeListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, job_id):
#         resumes = ResumeUpload.objects.filter(job_id=job_id)
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data)




from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import ResumeUpload, JobPost
from .serializers import ResumeUploadSerializer

# class ResumeListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, job_id):
#         try:
#             job = JobPost.objects.get(id=job_id)
#         except JobPost.DoesNotExist:
#             return Response({'error': 'Job not found.'}, status=status.HTTP_404_NOT_FOUND)
        
#         print("ResumeListView: request.user.id =", request.user.id)
#         print("ResumeListView: job.company.user.id =", job.company.user.id)
#         # Ensure the logged-in user is the company that owns the job
#         if job.company.user != request.user:
#             print("ResumeListView: request.user.id =", request.user.id)
#             print("ResumeListView: job.company.user.id =", job.company.user.id)
#             return Response({'error': 'Unauthorized access to this job\'s resumes.'}, status=status.HTTP_403_FORBIDDEN)

#         resumes = ResumeUpload.objects.filter(job=job)
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import JobPost, ResumeUpload
from .serializers import ResumeUploadSerializer

# class ResumeListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, job_id):
#         print("ResumeListView CALLED")
#         try:
#             job = JobPost.objects.get(id=job_id)
#         except JobPost.DoesNotExist:
#             print("Job not found:", job_id)
#             return Response({'error': 'Job not found.'}, status=status.HTTP_404_NOT_FOUND)

#         print("Request user id:", request.user.id)
#         print("Job's company user id:", job.company.user.id)
#         if job.company.user.id != request.user.id:
#             print("Permission denied for user", request.user.id)
#             return Response({'error': 'Unauthorized access to this job\'s resumes.'}, status=status.HTTP_403_FORBIDDEN)

#         resumes = ResumeUpload.objects.filter(job=job)
#         print(f"Returning {resumes.count()} resumes for job {job_id}")
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# from resume.models import ResumeUpload, JobPost
# print(ResumeUpload.objects.count())  # how many uploads in total?
# print(ResumeUpload.objects.filter(job_id=8))  # are there objects here?

# job = JobPost.objects.get(pk=8)
# print("Job.company.user.id:", job.company.user.id)


# from resume.models import ResumeUpload
# ResumeUpload.objects.filter(job_id=12)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser
from django.contrib.auth.models import User
from .models import Profile, JobPost, ResumeUpload
from .serializers import JobPostSerializer
from django.db import models



class JobPostCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        if profile.role != "company":
            return Response({"error": "Only companies can post jobs."}, status=status.HTTP_403_FORBIDDEN)
        data = request.data.copy()
        data['company'] = profile.id
        serializer = JobPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class JobPostsListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        jobs = JobPost.objects.filter(company=profile).annotate(resumes_count=models.Count('resumes'))
        serializer = JobPostSerializer(jobs, many=True)
        results = []
        for i, s in enumerate(serializer.data):
            d = dict(s)
            d["resumes_count"] = jobs[i].resumes_count
            results.append(d)
        return Response(results)

# class ResumeUploadView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser]
#     def post(self, request):
#         job_id = request.data.get('job')
#         resume_file = request.FILES.get('resume_file')
#         github_url = request.data.get('github_url', '')
#         leetcode_username = request.data.get('leetcode_username', '')
#         candidate_name = request.data.get('candidate_name', '')
#         candidate_email = request.data.get('candidate_email', '')
#         job = JobPost.objects.get(id=job_id)
#         resume_data = parse_resume(resume_file)
#         github_data = get_github_data(github_url)
#         leetcode_username = request.data['leetcode']
#         leetcode_data = get_leetcode_data(leetcode_username)
#         # score, feedback = 88.0, 'Sample feedback'
#         score, feedback = score_resume(resume_data, github_data, leetcode_data)
#         upload = ResumeUpload.objects.create(
#             job=job, resume_file=resume_file,
#             github_url=github_url,
#             leetcode_username=leetcode_username,
#             candidate_email=candidate_email,
#             candidate_name=candidate_name,
#             score=score, feedback=feedback
#         )
#         serializer = ResumeUploadSerializer(upload)
#         return Response(serializer.data, status=201)

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

from .models import JobPost, ResumeUpload
from .serializers import ResumeUploadSerializer
from .utils import extract_text_from_resume_file
from .company_scorer import score_resume_against_job


class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        job_id = request.data.get('job')
        resume_file = request.FILES.get('resume_file')
        candidate_name = request.data.get('candidate_name', '')
        candidate_email = request.data.get('candidate_email', '')
        github_url = request.data.get('github_url', '')
        leetcode_username = request.data.get('leetcode_username', '')

        if not job_id or not resume_file:
            return Response({"error": "Job and resume file are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            job = JobPost.objects.get(id=job_id, company__user=request.user)
        except JobPost.DoesNotExist:
            return Response({"error": "Job not found or unauthorized."}, status=status.HTTP_404_NOT_FOUND)

        # Extract resume text
        resume_text = extract_text_from_resume_file(resume_file)

        # Compute score and feedback based on matching description and skills
        score, feedback = score_resume_against_job(resume_text, job.description or "", job.skills_required or "")

        # Save ResumeUpload with computed score and feedback
        upload = ResumeUpload.objects.create(
            job=job,
            resume_file=resume_file,
            candidate_name=candidate_name,
            candidate_email=candidate_email,
            github_url=github_url,
            leetcode_username=leetcode_username,
            score=score,
            feedback=feedback,
        )

        serializer = ResumeUploadSerializer(upload)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# class ResumeListView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, job_id):
#         job = JobPost.objects.get(id=job_id)
#         if job.company.user.id != request.user.id:
#             return Response({'error': 'Unauthorized'}, status=403)
#         resumes = ResumeUpload.objects.filter(job=job)
#         serializer = ResumeUploadSerializer(resumes, many=True)
#         return Response(serializer.data, status=200)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class ResumeListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, job_id):
        """Get all resumes for a specific job"""
        try:
            job = JobPost.objects.get(id=job_id)
            if job.company.user.id != request.user.id:
                return Response({'error': 'Unauthorized'}, status=403)
            
            resumes = ResumeUpload.objects.filter(job=job)
            serializer = ResumeUploadSerializer(resumes, many=True)
            return Response(serializer.data, status=200)
            
        except JobPost.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class CompanyStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)

        total_jobs = JobPost.objects.filter(company=profile).count()
        total_resumes = ResumeUpload.objects.filter(job__company=profile).count()
        avg_score = ResumeUpload.objects.filter(job__company=profile).aggregate(models.Avg('score'))['score__avg'] or 0
        shortlisted = ResumeUpload.objects.filter(job__company=profile, shortlisted=True).count()

        return Response({
            'open_jobs': total_jobs,
            'resumes_received': total_resumes,
            'avg_score': avg_score,
            'shortlisted': shortlisted
        })
class ResumeUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, resume_id):
        """Update resume status (shortlist, reject, interview, hire)"""
        try:
            # Get the resume and verify ownership
            resume = ResumeUpload.objects.get(id=resume_id)
            
            # Check if the resume belongs to a job owned by the authenticated user
            if resume.job.company.user.id != request.user.id:
                return Response({'error': 'Unauthorized'}, status=403)
            
            # Update fields from request data
            if 'shortlisted' in request.data:
                resume.shortlisted = request.data['shortlisted']
            
            if 'status' in request.data:
                resume.status = request.data['status']
            
            # Save the changes
            resume.save()
            
            # Return updated resume data
            serializer = ResumeUploadSerializer(resume)
            return Response(serializer.data, status=200)
            
        except ResumeUpload.DoesNotExist:
            return Response({'error': 'Resume not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    
    def get(self, request, resume_id):
        """Get a specific resume by ID (optional)"""
        try:
            resume = ResumeUpload.objects.get(id=resume_id)
            
            # Check ownership
            if resume.job.company.user.id != request.user.id:
                return Response({'error': 'Unauthorized'}, status=403)
            
            serializer = ResumeUploadSerializer(resume)
            return Response(serializer.data, status=200)
            
        except ResumeUpload.DoesNotExist:
            return Response({'error': 'Resume not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)





