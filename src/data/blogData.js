// src/data/blogData.js
const blogPosts = [
  {
    id: 1,
    title: "5 Resume Mistakes That Are Costing You Interviews",
    excerpt: "Learn about the most common resume pitfalls and how to avoid them to increase your interview chances.",
    date: "June 15, 2025",
    readTime: "5 min read",
    author: "Subham Dalabehera",
    category: "Resume Tips",
    image: "ljk.png",
    tags: ["Resume Tips", "Job Search", "Career Advice"],
    slug: "5-resume-mistakes-costing-interviews", // Added slug
    content: `
      <p>In today's competitive job market, even small mistakes on your resume can have big consequences. After analyzing thousands of resumes through our platform, we've identified the top 5 resume mistakes that consistently lead to rejection:</p>
      
      <h3>1. Typos and Grammatical Errors</h3>
      <p>This might seem obvious, but 58% of resumes we analyzed contained at least one spelling or grammar mistake. These errors signal carelessness to hiring managers. Always use spellcheck and have someone else review your resume.</p>
      
      <h3>2. Lack of Quantifiable Achievements</h3>
      <p>Simply listing job responsibilities isn't enough. Employers want to see measurable results. Instead of "Responsible for social media accounts," try "Grew Instagram following by 250% in 6 months through targeted content strategy."</p>
      
      <h3>3. Generic Objective Statements</h3>
      <p>Outdated objective statements waste valuable space. Replace with a powerful summary that highlights your unique value proposition tailored to the specific role.</p>
      
      <h3>4. Poor Formatting</h3>
      <p>ATS systems struggle with complex layouts. Avoid tables, columns, and graphics. Stick to a clean, reverse-chronological format with standard section headings.</p>
      
      <h3>5. Length Issues</h3>
      <p>For most professionals, 1-2 pages is ideal. Recent graduates should aim for one page, while executives may need two. Never go beyond two pages.</p>
      
      <p>Using Irisne᙭' AI-powered analysis can help you identify and fix these common mistakes before submitting your application.</p>
    `
  },
  {
    id: 2,
    title: "How to Tailor Your Resume for Different Job Applications",
    excerpt: "Discover strategies to customize your resume for each position you apply to without starting from scratch.",
    date: "June 5, 2025",
    readTime: "7 min read",
    author: "Subham Dalabehera",
    category: "Job Search",
    image: "og-image.jpg",
    tags: ["Job Search", "Resume Tips"],
    slug: "tailor-resume-for-different-job-applications", // Added slug
    content: `
      <p>One-size-fits-all resumes rarely stand out in today's job market. Customizing your resume for each application significantly increases your chances of getting noticed. Here's how to do it efficiently:</p>
      
      <h3>Understand the Job Description</h3>
      <p>Carefully analyze the job posting and identify:</p>
      <ul>
        <li>Key responsibilities</li>
        <li>Required skills and qualifications</li>
        <li>Preferred experience</li>
        <li>Company culture indicators</li>
      </ul>
      
      <h3>Create a Master Resume</h3>
      <p>Maintain a comprehensive document containing all your:</p>
      <ul>
        <li>Work experiences</li>
        <li>Projects</li>
        <li>Skills</li>
        <li>Accomplishments</li>
        <li>Education</li>
      </ul>
      
      <h3>Select Relevant Content</h3>
      <p>For each application, choose the most relevant:</p>
      <ul>
        <li>3-5 key experiences</li>
        <li>Skills that match the job requirements</li>
        <li>Quantifiable achievements</li>
      </ul>
      
      <h3>Incorporate Keywords</h3>
      <p>Use Irisne᙭' ATS optimization tool to identify the right keywords from the job description and integrate them naturally throughout your resume.</p>
      
      <h3>Adjust Your Professional Summary</h3>
      <p>Customize your summary to address the specific role, highlighting how your unique skills solve the employer's problems.</p>
    `
  },
  {
    id: 3,
    title: "The Future of Hiring: AI and ATS Systems Explained",
    excerpt: "Understand how AI is transforming recruitment and what it means for your job search strategy.",
    date: "May 28, 2025",
    readTime: "8 min read",
    author: "Subham Dalabehera",
    category: "Industry Trends",
    image: "fl.png",
    tags: ["Industry Trends", "Technology"],
    slug: "future-of-hiring-ai-ats-systems", // Added slug
    content: `
      <p>Artificial Intelligence is revolutionizing the hiring process, with 75% of resumes now being screened by ATS before reaching human eyes. Understanding this technology is crucial for modern job seekers.</p>
      
      <h3>What is an ATS?</h3>
      <p>Applicant Tracking Systems (ATS) are software applications that help employers manage recruitment processes. They:</p>
      <ul>
        <li>Parse and store resumes</li>
        <li>Screen applications based on predefined criteria</li>
        <li>Rank candidates</li>
        <li>Help with interview scheduling</li>
      </ul>
      
      <h3>How ATS Screening Works</h3>
      <p>Most ATS systems follow this process:</p>
      <ol>
        <li>Resume parsing - extracting information into structured data</li>
        <li>Keyword matching - comparing resume content to job description</li>
        <li>Scoring - assigning points based on relevance</li>
        <li>Ranking - ordering candidates by score</li>
      </ol>
      
      <h3>Common ATS Mistakes to Avoid</h3>
      <ul>
        <li>Using images and graphics that can't be parsed</li>
        <li>Uncommon section headings (use standard terms like "Work Experience")</li>
        <li>Tables and columns that disrupt parsing</li>
        <li>Unconventional file formats (stick to .docx or .pdf)</li>
      </ul>
      
      <h3>The Rise of AI in Recruitment</h3>
      <p>Beyond ATS, AI is now being used for:</p>
      <ul>
        <li>Video interview analysis</li>
        <li>Skill assessments</li>
        <li>Predictive hiring analytics</li>
        <li>Chatbot screening</li>
      </ul>
      
      <p>Irisne᙭ stays ahead of these trends, ensuring your resume performs well in both current and future hiring systems.</p>
    `
  },
];

const categories = [
  "All Posts",
  "Resume Tips",
  "Job Search",
  "Industry Trends",
  "Career Advice",
  "Career Change",
  "Success Stories"
];

export { blogPosts, categories };