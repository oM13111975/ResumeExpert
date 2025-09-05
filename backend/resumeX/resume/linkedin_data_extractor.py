# linkedin_data_extractor.py - Updated with robust error handling
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import random

class LinkedInDataExtractor:
    def __init__(self, email=None, password=None, headless=True):
        self.email = email
        self.password = password
        self.driver = None
        self.setup_driver(headless)
    
    def setup_driver(self, headless=True):
        """Setup Chrome driver with anti-detection measures"""
        chrome_options = Options()
        
        if headless:
            chrome_options.add_argument("--headless")
        
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        
        self.driver = webdriver.Chrome(
            service=webdriver.chrome.service.Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    
    def extract_profile_data(self, profile_url):
        """Extract LinkedIn profile data with robust error handling"""
        try:
            self.driver.get(profile_url)
            time.sleep(5)  # Increased wait time
            
            profile_data = {
                "personal_info": self.extract_personal_info_safe(),
                "professional_summary": self.extract_professional_summary_safe(),
                "experience": self.extract_experience_safe(),
                "education": self.extract_education_safe(),
                "skills": self.extract_skills_safe(),
                "contact_info": {},
                "certifications": [],
                "projects": []
            }
            
            return profile_data
            
        except Exception as e:
            print(f"Error extracting profile data: {e}")
            return None
    
    def extract_personal_info_safe(self):
        """Extract basic personal info with fallback selectors"""
        info = {}
        
        # Name - try multiple selectors
        name_selectors = [
            "h1.text-heading-xlarge",
            "h1.inline.t-24.v-align-middle.break-words",
            ".pv-text-details__left-panel h1",
            "h1"
        ]
        
        for selector in name_selectors:
            try:
                name_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                info["full_name"] = name_element.text.strip()
                break
            except:
                continue
        
        # Headline - try multiple selectors
        headline_selectors = [
            ".text-body-medium.break-words",
            ".pv-text-details__left-panel .text-body-medium",
            ".ph5.pb5 .text-body-medium"
        ]
        
        for selector in headline_selectors:
            try:
                headline_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                info["current_position"] = headline_element.text.strip()
                break
            except:
                continue
        
        # Location - try multiple selectors
        location_selectors = [
            ".text-body-small.inline.t-black--light.break-words",
            ".pv-text-details__left-panel .text-body-small",
            ".ph5.pb5 .text-body-small"
        ]
        
        for selector in location_selectors:
            try:
                location_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                info["location"] = location_element.text.strip()
                break
            except:
                continue
        
        return info
    
    def extract_professional_summary_safe(self):
        """Extract about section with fallback selectors"""
        about_selectors = [
            "#about ~ .artdeco-card .full-width",
            ".pv-about-section .pv-about__summary-text",
            "[data-section='summary'] .full-width"
        ]
        
        for selector in about_selectors:
            try:
                about_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                return about_element.text.strip()
            except:
                continue
        
        return ""
    
    def extract_experience_safe(self):
        """Extract experience with fallback selectors"""
        experiences = []
        
        experience_selectors = [
            "#experience ~ .artdeco-card .pvs-list__paged-list-item",
            ".pv-profile-section.experience-section .pv-entity__summary-info",
            "[data-section='experience'] .pv-entity__summary-info"
        ]
        
        for selector in experience_selectors:
            try:
                experience_items = self.driver.find_elements(By.CSS_SELECTOR, selector)
                
                for item in experience_items[:5]:  # Limit to 5
                    try:
                        experience = {}
                        
                        # Try to get job title
                        title_selectors = [
                            ".mr1.hoverable-link-text",
                            ".pv-entity__summary-info h3",
                            ".t-16.t-black.t-bold"
                        ]
                        
                        for title_sel in title_selectors:
                            try:
                                title_element = item.find_element(By.CSS_SELECTOR, title_sel)
                                experience["job_title"] = title_element.text.strip()
                                break
                            except:
                                continue
                        
                        # Try to get company
                        company_selectors = [
                            ".t-14.t-normal .hoverable-link-text",
                            ".pv-entity__secondary-title",
                            ".t-14.t-black--light.t-normal"
                        ]
                        
                        for company_sel in company_selectors:
                            try:
                                company_element = item.find_element(By.CSS_SELECTOR, company_sel)
                                experience["company_name"] = company_element.text.strip()
                                break
                            except:
                                continue
                        
                        # Try to get duration
                        duration_selectors = [
                            ".t-14.t-normal.t-black--light",
                            ".pv-entity__bullet-item",
                            ".t-12.t-black--light.t-normal"
                        ]
                        
                        for duration_sel in duration_selectors:
                            try:
                                duration_element = item.find_element(By.CSS_SELECTOR, duration_sel)
                                experience["duration"] = duration_element.text.strip()
                                break
                            except:
                                continue
                        
                        if experience.get("job_title"):  # Only add if we got at least a title
                            experiences.append(experience)
                            
                    except Exception as e:
                        continue
                
                if experiences:  # If we found some experiences, break
                    break
                    
            except Exception as e:
                continue
        
        return experiences
    
    def extract_education_safe(self):
        """Extract education with fallback selectors"""
        education = []
        
        education_selectors = [
            "#education ~ .artdeco-card .pvs-list__paged-list-item",
            ".pv-profile-section.education-section .pv-entity__summary-info",
            "[data-section='education'] .pv-entity__summary-info"
        ]
        
        for selector in education_selectors:
            try:
                education_items = self.driver.find_elements(By.CSS_SELECTOR, selector)
                
                for item in education_items[:3]:  # Limit to 3
                    try:
                        edu = {}
                        
                        # School name
                        school_selectors = [
                            ".mr1.hoverable-link-text",
                            ".pv-entity__school-name",
                            ".t-16.t-black.t-bold"
                        ]
                        
                        for school_sel in school_selectors:
                            try:
                                school_element = item.find_element(By.CSS_SELECTOR, school_sel)
                                edu["institution_name"] = school_element.text.strip()
                                break
                            except:
                                continue
                        
                        # Degree
                        degree_selectors = [
                            ".t-14.t-normal",
                            ".pv-entity__degree-name",
                            ".pv-entity__secondary-title"
                        ]
                        
                        for degree_sel in degree_selectors:
                            try:
                                degree_element = item.find_element(By.CSS_SELECTOR, degree_sel)
                                edu["degree"] = degree_element.text.strip()
                                break
                            except:
                                continue
                        
                        if edu.get("institution_name"):  # Only add if we got school name
                            education.append(edu)
                            
                    except Exception as e:
                        continue
                
                if education:  # If we found some education, break
                    break
                    
            except Exception as e:
                continue
        
        return education
    
    def extract_skills_safe(self):
        """Extract skills with fallback selectors"""
        skills = []
        
        skills_selectors = [
            "#skills ~ .artdeco-card .mr1.hoverable-link-text",
            ".pv-skill-category-entity__name-text",
            "[data-section='skills'] .pv-skill-category-entity__name-text"
        ]
        
        for selector in skills_selectors:
            try:
                skill_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                
                for skill_element in skill_elements[:20]:  # Limit to 20
                    skill_name = skill_element.text.strip()
                    if skill_name and skill_name not in skills:
                        skills.append(skill_name)
                
                if skills:  # If we found skills, break
                    break
                    
            except Exception as e:
                continue
        
        return skills
    
    def close(self):
        """Close the browser"""
        if self.driver:
            self.driver.quit()

def extract_linkedin_profile_for_resume(linkedin_url, email=None, password=None):
    """Main function to extract LinkedIn profile data"""
    extractor = LinkedInDataExtractor(email, password, headless=True)
    try:
        if email and password:
            extractor.login()
        
        profile_data = extractor.extract_profile_data(linkedin_url)
        return profile_data
    finally:
        extractor.close()
