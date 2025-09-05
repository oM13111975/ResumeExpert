# from resume import views as resume_views  # importing from resume app
# from django.urls import path
# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path
# urlpatterns = [
#     path('signup/candidate/', resume_views.candidate_signup, name='candidate_signup'),
#     path('signup/company/', resume_views.company_signup, name='company_signup'),
#     path('login/candidate/', resume_views.CandidateLoginView.as_view(), name='candidate_login'),
#     path('login/company/', resume_views.CompanyLoginView.as_view(), name='company_login'),
#     path('score/', resume_views.ResumeScoreView.as_view(), name='resume_score'),
#     path('generate-resume/', resume_views.ResumeFromProfilesView.as_view(), name='generate-resume'),
#     path('company/job/create/', resume_views.JobPostCreateView.as_view(), name='create-job'),
#     path('company/resume/upload/', resume_views.ResumeUploadView.as_view(), name='upload-resume'),
#     path('company/resumes/<int:job_id>/', resume_views.ResumeListView.as_view(), name='resume-list'),  # <-- ADD THIS




#  ]
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from resume import views as resume_views  # importing from resume app
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

# JWT views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Signups
    path('signup/candidate/', resume_views.candidate_signup, name='candidate_signup'),
    path('signup/company/', resume_views.company_signup, name='company_signup'),

    # JWT login (replace these two if using JWT)
    path('login/candidate/', resume_views.CandidateLoginJWTView.as_view(), name='candidate_login'),  # ✅ updated
    path('login/company/', resume_views.CompanyLoginJWTView.as_view(), name='company_login'),        # ✅ updated

    # JWT token refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Resume scoring & generation
    path('score/', resume_views.ResumeScoreView.as_view(), name='resume_score'),
    path('generate-resume/', resume_views.ResumeFromProfilesView.as_view(), name='generate-resume'),
    path('company/job/create/', resume_views.JobPostCreateView.as_view()),
    path('company/resume/upload/', resume_views.ResumeUploadView.as_view()),
    path('company/resumes/<int:job_id>/', resume_views.ResumeListView.as_view()),
    # urls.py
     path('company/job/create/', resume_views.JobPostCreateView.as_view(), name='create_job'),
    path('company/jobs/', resume_views.JobPostsListView.as_view(), name='list_jobs'),

    # 📥 Resume Upload & View
    # path('company/resume/upload/', resume_views.ResumeUploadView.as_view(), name='upload_resume'),
    # path('company/resumes/<int:job_id>/', resume_views.ResumeListView.as_view(), name='resume_list'),
     path('company/resume/upload/', resume_views.ResumeUploadView.as_view(), name='upload_resume'),
    
    # ✅ Your existing ResumeListView (keep this)
    path('company/resumes/<int:job_id>/', resume_views.ResumeListView.as_view(), name='resume_list'),
    
    # ✅ Add this new ResumeUpdateView for individual resume updates
    path('company/resume/<int:resume_id>/', resume_views.ResumeUpdateView.as_view(), name='resume_update'),
    
    # 📊 Dashboard Stats
    path('company/stats/', resume_views.CompanyStatsView.as_view(), name='company_stats'),
      

    # path('company/job/create/', resume_views.JobPostCreateView.as_view(), name='create-job'),
    # path('company/resume/upload/', resume_views.ResumeUploadView.as_view(), name='upload-resume'),
    # path('company/resumes/<int:job_id>/', resume_views.ResumeListView.as_view(), name='resume-list'),
]

# Static media config
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
