# Aesthetic Resume Builder

A modern, feature-rich resume builder with live preview, ATS optimization, and intelligent scoring.

## Features

### Core Functionality
- **Two-Column Layout**: Form inputs on the left, live preview on the right
- **Live Preview**: Resume updates instantly as you type
- **ATS Mode**: Toggle between styled and ATS-friendly layouts
- **Responsive Design**: Mobile-friendly with collapsible columns

### Styling & Themes
- **Light/Dark Mode**: Toggle between themes with persistent storage
- **Accent Color Picker**: Customize the primary color scheme
- **Glassmorphism Design**: Modern UI with soft shadows and blur effects
- **Print-Ready**: One-page optimized print layout

### Resume Sections
- **Basics**: Name, role, contact info, professional links, summary
- **Skills**: Interactive skill bars with percentage levels
- **Experience**: Job history with bullet point achievements
- **Projects**: Technical projects with technology tags
- **Education**: Academic background and certifications
- **Additional**: Achievements, certifications, languages, interests
- **Keywords**: Industry-specific keywords for ATS optimization

### Smart Features
- **Bullet Templates**: Quick templates for achievement bullets
- **Keyword Analysis**: Paste job descriptions to see keyword match percentage
- **Recruiter Score**: 0-100 scoring based on resume completeness and quality
- **Version Management**: Save/load multiple resume variants
- **Data Export/Import**: JSON format for backup and sharing

### Technical Features
- **TypeScript Support**: Type-safe development with compiled JavaScript
- **Local Storage**: Persistent data storage in browser
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Debounced updates and optimized rendering

## File Structure

\`\`\`
/
├── index.html          # Main HTML structure
├── assets/
│   ├── styles.css      # CSS with glassmorphism design
│   ├── app.ts          # TypeScript source code
│   └── app.js          # Compiled JavaScript
└── README.md           # This file
\`\`\`

## Usage

1. **Open `index.html`** in a modern web browser
2. **Fill out the form** sections on the left side
3. **Watch the live preview** update on the right side
4. **Toggle ATS Mode** for recruiter-friendly formatting
5. **Analyze keywords** by pasting job descriptions
6. **Save versions** for different job applications
7. **Export/Print** your completed resume

## Keyboard Shortcuts

- **Ctrl/Cmd + P**: Print resume
- **Escape**: Close modals

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Model

The resume data follows this JSON structure:

\`\`\`json
{
  "basics": {
    "name": "string",
    "role": "string", 
    "email": "string",
    "phone": "string",
    "location": "string",
    "links": ["string"],
    "avatar": "string",
    "summary": "string"
  },
  "skills": [{"name": "string", "level": "number"}],
  "experience": [{
    "title": "string",
    "org": "string", 
    "loc": "string",
    "from": "string",
    "to": "string",
    "bullets": ["string"],
    "link": "string"
  }],
  "projects": [{
    "title": "string",
    "tech": ["string"],
    "desc": "string", 
    "link": "string"
  }],
  "education": [{
    "degree": "string",
    "org": "string",
    "loc": "string", 
    "from": "string",
    "to": "string",
    "notes": "string",
    "link": "string"
  }],
  "achievements": ["string"],
  "certifications": ["string"], 
  "languages": ["string"],
  "interests": ["string"],
  "keywords": ["string"]
}
\`\`\`

## Scoring Algorithm

The recruiter score (0-100) is calculated based on:

- **Basics Completeness** (20 points): Name, role, contact info, summary
- **Experience Quality** (25 points): Quantified bullets, action verbs
- **Skills Coverage** (15 points): Number and relevance of skills
- **Projects** (15 points): Technical projects with links
- **Education** (10 points): Academic background
- **Additional Sections** (10 points): Achievements, certifications, etc.
- **Professional Links** (5 points): LinkedIn, GitHub, portfolio

## Keyword Analysis

The keyword matching algorithm:

1. Extracts keywords from job descriptions
2. Searches resume content for matches
3. Calculates coverage percentage
4. Highlights found/missing keywords
5. Provides improvement recommendations

## Development

### Console Tests

The application includes automated tests that run on page load:

- **Keyword Coverage Test**: Validates keyword matching algorithm
- **Clamp Function Test**: Ensures proper value clamping (0-100)
- **Recruiter Score Test**: Verifies scoring algorithm range

### Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6)**: Interactive functionality
- **TypeScript**: Type safety and development experience
- **Bootstrap 5**: Responsive grid and components
- **jQuery**: DOM manipulation and event handling

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
