# models.py
from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    USER_ROLES = (
        ('candidate', 'Candidate'),
        ('company', 'Company'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=USER_ROLES)
    company_name = models.CharField(max_length=255, blank=True, null=True)


class JobPost(models.Model):
    company = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'role': 'company'})
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills_required = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# class ResumeUpload(models.Model):
#     job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='resumes')
#     resume_file = models.FileField(upload_to='uploaded_resumes/')
#     github_url = models.URLField(blank=True, null=True)
#     leetcode_username = models.CharField(max_length=255, blank=True, null=True)
#     score = models.FloatField(blank=True, null=True)
#     feedback = models.TextField(blank=True, null=True)
#     shortlisted = models.BooleanField(default=False)
#     uploaded_at = models.DateTimeField(auto_now_add=True)
class ResumeUpload(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('hired', 'Hired'),
    ]
    
    # Core fields
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='resumes')
    resume_file = models.FileField(upload_to='uploaded_resumes/')
    
    # ✅ ADD THESE - Candidate Information
    candidate_name = models.CharField(max_length=255, blank=True, null=True)
    candidate_email = models.EmailField(blank=True, null=True)
    
    # Social/Profile URLs
    github_url = models.URLField(blank=True, null=True)
    leetcode_username = models.CharField(max_length=255, blank=True, null=True)
    
    # AI Analysis Results
    score = models.FloatField(blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    
    # Status Tracking
    shortlisted = models.BooleanField(default=False)
    # ✅ ADD THIS - Status field for workflow management
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    uploaded_at = models.DateTimeField(auto_now_add=True)
    # ✅ ADD THIS - Track when status was last updated
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Resume Upload'
        verbose_name_plural = 'Resume Uploads'
    
    def __str__(self):
        candidate = self.candidate_name or self.candidate_email or 'Unknown Candidate'
        return f"Resume for {self.job.title} - {candidate}"
    
    # ✅ ADD THIS - Helper method to get display name
    @property
    def display_name(self):
        return self.candidate_name or self.candidate_email or 'Unknown Candidate'
    
    # ✅ ADD THIS - Helper method for status badge color
    def get_status_color(self):
        status_colors = {
            'pending': 'gray',
            'shortlisted': 'green',
            'rejected': 'red',
            'interview_scheduled': 'blue',
            'hired': 'purple',
        }
        return status_colors.get(self.status, 'gray')

