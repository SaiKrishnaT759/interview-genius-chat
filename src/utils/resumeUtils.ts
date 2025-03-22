
import { AnalysisResult } from '@/components/ResumeAnalysis';
import { Question } from '@/components/InterviewQuestions';

// Mock function to simulate resume parsing - in a real app, this would parse the uploaded file
export const parseResume = async (file: File): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is mock data - in a real implementation this would be extracted from the resume
  return {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "555-123-4567",
    summary: "Software engineer with 5 years of experience building web applications with React, Node.js, and TypeScript. Passionate about creating intuitive user experiences and solving complex problems.",
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "REST APIs", 
      "MongoDB", "PostgreSQL", "AWS", "Git", "Agile", "CI/CD"
    ],
    experience: [
      {
        company: "Tech Innovations Inc.",
        title: "Senior Frontend Engineer",
        duration: "2021 - Present",
        description: [
          "Lead a team of 5 engineers in developing a complex SaaS application using React and TypeScript",
          "Implemented state management with Redux and improved application performance by 40%",
          "Established coding standards and review processes that increased code quality metrics"
        ]
      },
      {
        company: "WebDev Solutions",
        title: "Frontend Developer",
        duration: "2018 - 2021",
        description: [
          "Developed responsive web applications for clients using React and Node.js",
          "Collaborated with designers to implement pixel-perfect UIs and smooth animations",
          "Integrated RESTful APIs and implemented real-time functionality with WebSockets"
        ]
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "BS in Computer Science",
        year: "2018"
      }
    ],
    strengths: [
      "Strong frontend development skills with React",
      "Experience with full-stack JavaScript development",
      "Good understanding of CI/CD pipelines and DevOps practices",
      "Experience leading a small engineering team"
    ],
    weaknesses: [
      "Limited experience with mobile app development",
      "Could improve knowledge of newer backend frameworks",
      "No formal project management experience"
    ],
    missingSkills: [
      "React Native", "Docker", "Kubernetes", "Python", "System Design"
    ]
  };
};

// Mock function to generate interview questions based on resume analysis
export const generateInterviewQuestions = async (analysis: AnalysisResult): Promise<Question[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // This is mock data - in a real implementation this would be generated based on the analysis
  return [
    {
      id: "1",
      text: "Can you describe your experience leading a team of engineers and what challenges you faced?",
      type: "experience",
      difficulty: "medium",
      notes: "Look for leadership style, problem-solving approach, and team management skills.",
      idealAnswer: "A good answer would include specific examples of leadership challenges, how they were addressed, and the outcomes. Mention of communication strategies, conflict resolution, and project management would be valuable."
    },
    {
      id: "2",
      text: "Explain how you implemented state management with Redux and achieved a 40% performance improvement.",
      type: "technical",
      difficulty: "hard",
      notes: "Assess technical depth, performance optimization knowledge, and problem-solving approach.",
      idealAnswer: "Should include specifics about Redux implementation, performance profiling methods used, optimization techniques applied, and metrics for measuring the 40% improvement."
    },
    {
      id: "3",
      text: "How do you approach learning new technologies, like the React Native or Docker skills you haven't yet developed?",
      type: "weakness",
      difficulty: "medium",
      notes: "Evaluate learning strategies, self-awareness, and professional development approach.",
      idealAnswer: "Look for a structured approach to learning, examples of past technology adaptation, and realistic timeframes for skill acquisition."
    },
    {
      id: "4",
      text: "Describe a situation where you had to meet a tight deadline with your development team. How did you manage it?",
      type: "behavioral",
      difficulty: "medium",
      idealAnswer: "Should demonstrate prioritization skills, team coordination, possibly mentioning agile methodologies, and clear communication with stakeholders."
    },
    {
      id: "5",
      text: "What aspects of your experience with CI/CD pipelines and DevOps do you find most valuable for frontend development?",
      type: "strength",
      difficulty: "medium",
      notes: "Assess understanding of how DevOps integrates with frontend development workflows.",
      idealAnswer: "Good answers would connect CI/CD to improved code quality, faster deployments, reduced bugs in production, and better development team efficiency."
    },
    {
      id: "6",
      text: "Can you walk through your approach to implementing a complex feature in React, from requirement to deployment?",
      type: "technical",
      difficulty: "hard",
      idealAnswer: "Should include requirements analysis, component architecture planning, state management considerations, testing strategy, and deployment process."
    },
    {
      id: "7",
      text: "How have you collaborated with designers to implement pixel-perfect UIs? Can you describe your workflow?",
      type: "experience",
      difficulty: "easy",
      notes: "Look for communication skills, attention to detail, and understanding of design-development handoff.",
      idealAnswer: "Should mention tools used for collaboration, feedback cycles, design system implementation, and examples of addressing design challenges."
    },
    {
      id: "8",
      text: "What strategies would you employ to improve knowledge of newer backend frameworks, given your identified weakness in this area?",
      type: "weakness",
      difficulty: "easy",
      idealAnswer: "Look for specific learning plans, prioritization based on industry trends, and practical application strategies."
    },
    {
      id: "9",
      text: "Explain how you'd design a real-time collaborative editing feature using your WebSocket experience.",
      type: "technical",
      difficulty: "hard",
      notes: "Assess system design skills, real-time protocol understanding, and state synchronization knowledge.",
      idealAnswer: "Should cover WebSocket architecture, conflict resolution strategies, optimistic updates, error handling, and scalability considerations."
    },
    {
      id: "10",
      text: "How do you stay current with frontend development trends and evaluate which new technologies to adopt?",
      type: "behavioral",
      difficulty: "easy",
      idealAnswer: "Should mention information sources, evaluation criteria, experimentation process, and examples of technology adoption decisions."
    }
  ];
};
