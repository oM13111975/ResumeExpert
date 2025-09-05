# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class CandidateSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        Profile.objects.create(user=user, role='candidate')
        return user

class CompanySignupSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['company_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        company_name = validated_data.pop('company_name')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        Profile.objects.create(user=user, role='company', company_name=company_name)
        return user
from .models import JobPost, ResumeUpload

class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = '__all__'

# class ResumeUploadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ResumeUpload
#         fields = '__all__'
# class JobPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = JobPost
#         fields = '__all__'

# class ResumeUploadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ResumeUpload
#         fields = '__all__'
# In your serializers.py
from rest_framework import serializers
from .models import ResumeUpload

class ResumeUploadSerializer(serializers.ModelSerializer):
    display_name = serializers.ReadOnlyField()
    status_color = serializers.SerializerMethodField()
    
    class Meta:
        model = ResumeUpload
        fields = [
            'id', 'job', 'resume_file', 'candidate_name', 'candidate_email',
            'github_url', 'leetcode_username', 'score', 'feedback', 
            'shortlisted', 'status', 'uploaded_at', 'updated_at',
            'display_name', 'status_color'
        ]
        read_only_fields = ['id', 'uploaded_at', 'updated_at', 'display_name']
    
    def get_status_color(self, obj):
        return obj.get_status_color()
