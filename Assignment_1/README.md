# Aesthetic Resume Builder

A modern, feature-rich resume builder with live preview, ATS optimization, and intelligent scoring.  
Developed as a student project to practice web technologies and resume design concepts.

---

## Project Overview
This project is a Resume Builder Web Application that allows users to create and preview resumes instantly.  
It supports modern UI features such as glassmorphism, dark mode, and accent color customization, along with resume optimization tools like keyword analysis and a recruiter score.

---

## Features

### Core Functionality
- Two-column layout: form inputs on the left, live preview on the right  
- Live preview updates as the user types  
- ATS Mode: toggle between styled and recruiter-friendly layouts  
- Responsive design for both desktop and mobile  

### Styling and Themes
- Light/Dark mode toggle with persistent storage  
- Accent color picker for customization  
- Glassmorphism design with soft shadows and blur effects  
- Print-optimized one-page layout  

### Resume Sections
- Basics: name, role, contact information, links, summary  
- Skills: interactive skill bars with percentage levels  
- Experience: job history or internships with bullet points  
- Projects: academic or technical projects with tags and links  
- Education: degree, institution, certifications  
- Additional: achievements, certifications, languages, interests  
- Keywords: highlights industry/job-specific keywords  

### Smart Features
- Bullet templates for quick entries  
- Keyword analysis against job descriptions  
- Recruiter score (0–100) showing resume completeness  
- Save and load multiple resume versions  
- Export/Import resume data in JSON format  

---

## File Structure
/
├── index.html # Main structure
├── assets/
│ ├── styles.css # CSS with glassmorphism
│ ├── app.ts # TypeScript source
│ └── app.js # Compiled JavaScript
└── README.md # Project documentation

yaml
Copy code

---

## How to Use
1. Open `index.html` in a modern web browser.  
2. Fill out the form sections (name, skills, experience, etc.).  
3. Watch the resume preview update instantly.  
4. Toggle ATS Mode for recruiter-friendly view.  
5. Export or print the completed resume.  

---

## Browser Compatibility
- Chrome 90+  
- Firefox 88+  
- Safari 14+  
- Edge 90+  

---

## Data Model
The resume data is stored in JSON format. Example:

json
{
  "basics": { "name": "John Doe", "email": "john@student.com", "role": "Student - CSE" },
  "skills": [{ "name": "JavaScript", "level": 80 }],
  "experience": [{ "title": "Intern", "org": "Tech Corp", "from": "2024", "to": "2025" }],
  "projects": [{ "title": "Resume Builder", "tech": ["HTML", "CSS", "JS"], "desc": "Web app for resume building" }],
  "education": [{ "degree": "B.Tech CSE", "org": "Christ University", "from": "2023", "to": "2027" }],
  "achievements": ["Dean’s List 2024"],
  "languages": ["English", "Hindi"]
}
## Recruiter Score
The score (0–100) is calculated based on:

- Basics completeness (20 points)  
- Experience quality (25 points)  
- Skills coverage (15 points)  
- Projects (15 points)  
- Education (10 points)  
- Additional sections (10 points)  
- Professional links (5 points)  

---

## Technologies Used
- HTML5 for semantic structure  
- CSS3 for modern styling  
- JavaScript (ES6) for interactivity  
- TypeScript for type safety  
- Bootstrap 5 for responsive design  
- jQuery for DOM manipulation  

---

## License
This is a student project made for learning purposes.  
It is available under the MIT License.
