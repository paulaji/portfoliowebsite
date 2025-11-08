import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, ChevronUp, Moon, Sun, Download } from 'lucide-react';

export default function Portfolio() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FindASide - Sports Facility Booking Marketplace",
      company: "Pixel Forge Design Limited",
      role: "Backend Engineer",
      description: "A sports facility booking and payment marketplace with real-time payment processing.",
      highlights: [
        "Architected scalable payment marketplace using Stripe Connect handling real-time payment intents, secure payouts, automated refunds, and recurring transactions",
        "Developed distributed Node.js backend with Firestore NoSQL database, optimized for performance and horizontal scalability",
        "Designed RESTful APIs for booking management and payment processing with Firebase Authentication",
        "Established CI/CD pipeline using GitHub Actions enabling automated testing and zero-downtime deployments",
        "Implemented comprehensive error handling, distributed logging, and real-time monitoring"
      ],
      tech: ["Node.js", "Firestore", "Stripe Connect", "Firebase", "GitHub Actions", "RESTful APIs"],
      images: ['./projectsnippets/FindASide.png', './projectsnippets/FindASideLogin.png', './projectsnippets/FindASidePayment.png'],
    },
    {
      id: 2,
      title: "MahaMeru Innovations - Full Stack Web App",
      company: "Ineffable Design Solutions",
      role: "Lead Full Stack Engineer",
      description: "Dynamic, multilingual full-stack application with advanced animations and CDN optimization.",
      highlights: [
        "Led team to build dynamic, multilingual full-stack app using Next.js with server-side rendering",
        "Designed and implemented data structures, managed MySQL database, and developed custom APIs for production traffic",
        "Integrated TailwindCSS, GSAP-like animations and Lottie animations for interactive user experience",
        "Built custom CMS dashboard to manage all site content and images",
        "Architected network infrastructure using Cloudflare CDN with intelligent routing and edge caching"
      ],
      tech: ["Next.js", "React", "MySQL", "TailwindCSS", "Cloudflare CDN", "Lottie"],
      images: ['./projectsnippets/MahaMeru.png', './projectsnippets/MahaMeruAnimation.png', './projectsnippets/MahaMeruLogo.png'],
    },
    {
      id: 3,
      title: "TrustPMS - Internal Project Management System",
      company: "Trusttech Solutions LLP",
      role: "Fullstack Python Developer",
      description: "Enterprise project management system handling payroll, attendance, and bug tracking for 50+ employees.",
      highlights: [
        "Built TrustPMS handling payroll, attendance, and bug tracking for 50+ employees",
        "Implemented using React.js, Redux, Socket.io, Django/DRF, MSSQL, and Docker",
        "Container orchestration on AWS ECS for high availability, auto-scaling, and health checks",
        "Real-time notifications and data synchronization across distributed teams"
      ],
      tech: ["React.js", "Redux", "Django", "DRF", "MSSQL", "Docker", "AWS ECS", "Socket.io"],
      images: ['./projectsnippets/TrustPMS.png'],
    },
    {
      id: 4,
      title: "Trust Capital CRM - Cryptocurrency Trading Platform",
      company: "Trusttech Solutions LLP",
      role: "Fullstack Python Developer",
      description: "High-performance CRM serving 4000+ active traders with real-time market data and WebSocket notifications.",
      highlights: [
        "Maintained and extended cryptocurrency trading platform CRM built with Django and Django REST Framework",
        "Served 4000+ active traders with real-time market data integration",
        "Developed new APIs for trade execution and integrated MetaTrader 5 DLL for account data",
        "Implemented WebSocket-based notifications for instant alerts to concurrent traders",
        "Optimized MSSQL queries for high-frequency trading data retrieval"
      ],
      tech: ["Django", "Django REST Framework", "WebSockets", "MetaTrader 5", "MSSQL", "Real-time Systems"],
      images: ['./projectsnippets/TrustCapitalCRM.png'],
    },
    {
      id: 5,
      title: "Learning to Program with Comprehensive Feedback",
      company: "University of Limerick",
      role: "MEng Thesis Project",
      description: "AI-powered Python learning platform using LLMs to generate personalized feedback and programming questions.",
      highlights: [
        "Built full-stack web app to teach Python using React.js (frontend) and Flask (backend)",
        "Leveraged Groq API, Prompt Engineering, NLP techniques and Llama 3.3 70B AI model",
        "Generated programming questions, feedback, and tips across six topics",
        "Implemented Pyodide for in-browser Python code execution with real-time feedback",
        "Grade: A1 | Demonstrates expertise in GenAI and agentic AI workflows"
      ],
      tech: ["React.js", "Flask", "Groq API", "Llama 3.3", "Pyodide", "NLP", "Prompt Engineering"],
      images: ['./projectsnippets/FinalProject.jpeg'],
    },
    {
      id: 6,
      title: "Carvetpro",
      company: "Ineffable Design Solutions",
      role: "Development Coordinator",
      description: "Full-stack platform with advanced AWS network architecture and automated PDF generation.",
      highlights: [
        "Coordinated 3-person engineering team using agile methodologies and conducted code reviews",
        "Designed AWS network architecture with CloudFront CDN, S3 origin configuration, and CloudWatch monitoring",
        "Built React.js frontend and Node.js backend with Google OAuth authentication",
        "Automated PDF generation via Twilio WhatsApp integration"
      ],
      tech: ["React.js", "Node.js", "AWS", "CloudFront", "Google OAuth", "Twilio", "WhatsApp API"],
      images: ['./projectsnippets/CarvetPro.png'],
    },
    {
      id: 7,
      title: "Discord Bots",
      company: "Wrecked Tech Private Limited",
      role: "Solutions Developer",
      description: "Development of multiple Discord bots for user engagement.",
      highlights: [
        "OpenAI API powered community chatbot",
        "cr(AI)yon API powered image generator",
        "Poll bot",
        "Feedback bot - Routed to Admin channels",
      ],
      tech: ["Discord.js", "Discord.py"],
      images: ['./projectsnippets/gator1.png', './projectsnippets/gator2.png', './projectsnippets/gator3.png', './projectsnippets/gptbot1.png', './projectsnippets/gptbot2.png', './projectsnippets/nortpoll1.png', './projectsnippets/nortpoll2.png'],
    },
    {
      id: 8,
      title: "Biowel Website",
      company: "Biowel Industries",
      role: "Web Developer",
      description: "Design, Development, Hosting and Maintenance of the company website.",
      highlights: [
        "Company Website",
      ],
      tech: ["Figma", "Node.js", "React.js", "AWS", "VPS"],
      images: ['./projectsnippets/biowelweb1.png', './projectsnippets/biowelweb2.png', './projectsnippets/biowelweb3.png'],
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const achievements = [
    {
      title: "AI & Agentic Systems Consultant",
      subtitle: "Medical Company Mentorship",
      description: "Consulting on building agentic AI systems to improve sales, sales insights, and business automation"
    },
    {
      title: "Frontend Developer",
      subtitle: "Edith - EdTech Startup",
      description: "Built user-facing features for an educational technology platform"
    },
    {
      title: "AI & Prompt Engineering Educator",
      subtitle: "Sevana Electricals & Biowel Inc",
      description: "Conducted multiple Prompt Engineering and AI classes for businesses (30-50 attendees each)"
    },
    {
      title: "Java Teaching Assistant",
      subtitle: "University of Limerick",
      description: "Mentored undergrad software engineering students for a brief time"
    },
    {
      title: "Lead Vocal Singer",
      subtitle: "College Band - ASIET",
      description: "Performed at college events and cultural activities"
    },
    {
      title: "Event Organizer & Coordinator",
      subtitle: "Adi Shankara Institute",
      description: "Organized and coordinated Industrial Visits, Cultural Fests (Christmas, Halloween), and college events"
    },
    {
      title: "Academic Awards",
      subtitle: "Proficiency Award & Student of the Year",
      description: "Recognized for academic excellence and leadership throughout schooling"
    },
    {
      title: "Community Mentor",
      subtitle: "Peer Programming Educator",
      description: "Helped friends and peers learn programming concepts and best practices"
    },
    {
      title: "Sports & Cultural Activities",
      subtitle: "Multi-Sport Participant",
      description: "Active participation in multiple sports and cultural events at ASIET"
    }
  ];

  const bgClass = darkMode ? 'bg-white' : 'bg-black';
  const textClass = darkMode ? 'text-slate-900' : 'text-slate-100';
  const borderClass = darkMode ? 'border-slate-200' : 'border-slate-800';
  const cardBgClass = darkMode ? 'bg-slate-50' : 'bg-slate-900/50';
  const secondaryBgClass = darkMode ? 'bg-slate-100/30' : 'bg-slate-900/30';
  const hoverBgClass = darkMode ? 'hover:bg-slate-100/50' : 'hover:bg-slate-900/50';
  const mutedTextClass = darkMode ? 'text-slate-600' : 'text-slate-400';
  const buttonBgClass = darkMode ? 'bg-slate-200' : 'bg-white';
  const buttonHoverClass = darkMode ? 'hover:bg-slate-300' : 'hover:bg-slate-700';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgClass}`}>
      <style>{`
        @keyframes color-cycle {
          0%, 100% { 
            --tw-bg-opacity: 1;
          }
        }
        
        .animate-green-cycle {
          animation: green-glow 0.6s ease-in-out infinite;
        }
        
        @keyframes green-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 16px rgba(34, 197, 94, 0.8); }
        }
      `}</style>

      {/* Header */}
      <header className={`border-b ${borderClass} ${cardBgClass} sticky top-0 z-50 backdrop-blur transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className={`text-xl font-bold ${textClass}`}>
            <span className="text-red-500">&lt;</span>
            <span><span className="text-red-500">p</span>aulaji</span>
            <span className="text-red-500">/&gt;</span>
          </div>
          <div className="flex gap-6 items-center">
            <nav className="flex gap-6 items-center">
              <a href="#projects" className={`${mutedTextClass} hover:${textClass} transition`}>Projects</a>
              <a href="#achievements" className={`${mutedTextClass} hover:${textClass} transition`}>Achievements</a>
              <a href="#contact" className={`${mutedTextClass} hover:${textClass} transition`}>Contact</a>
            </nav>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 ${buttonBgClass} ${buttonHoverClass} rounded transition`}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={`max-w-6xl mx-auto px-6 py-20 ${secondaryBgClass} transition-colors duration-300`}>
        <div className="space-y-4">
          <div className="space-y-4 flex items-center">
            {/* Profile Image */}
            <img
              src="./otherimages/profilephoto.jpg" // Replace with your actual image path
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mr-4" // Makes the image round and adds some margin
            />

            {/* Name */}
            <h1 className={`text-5xl font-bold ${textClass}`}>Paul Aji</h1>
          </div>

          <p className={`text-xl ${mutedTextClass}`}>Full-stack Software Engineer • Cloud Architecture • GenAI & LLMs</p>
          <p className={`${mutedTextClass} max-w-2xl`}>
            Full Stack Engineer with experience in building scalable backend systems on AWS and GCP. Specialised in Node.js, Python, React.js
            and distributed architectures, delivering systems with 99.9% uptime and handling thousands of concurrent users. Expert in RESTful
            APIs, payment processing, and CI/CD automation. MEng in Computer Vision and AI (First Class Honours), combining production
            engineering with AI capabilities.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="https://github.com/paulaji" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 ${buttonBgClass} ${buttonHoverClass} rounded transition`}>
              <Github size={20} /> GitHub
            </a>
            <a href="https://linkedin.com/in/paulaji/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 ${buttonBgClass} ${buttonHoverClass} rounded transition`}>
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="mailto:paulajiparayil123@gmail.com" className={`inline-flex items-center gap-2 px-4 py-2 ${buttonBgClass} ${buttonHoverClass} rounded transition`}>
              <Mail size={20} /> Email
            </a>
          </div>
        </div>
      </section>


      {/* Skills */}
      <section className={`border-t ${borderClass} ${secondaryBgClass} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className={`text-2xl font-bold ${textClass} mb-8`}>Tech Stack</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Languages</h3>
              <p className={`${mutedTextClass} text-sm`}>Python, JavaScript, TypeScript, Go, HTML/CSS</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Backend</h3>
              <p className={`${mutedTextClass} text-sm`}>Django, Flask, FastAPI, Node.js, Express.js</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Frontend</h3>
              <p className={`${mutedTextClass} text-sm`}>React, Redux, Next.js, TailwindCSS, jQuery</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Cloud & DevOps</h3>
              <p className={`${mutedTextClass} text-sm`}>AWS, GCP, Azure, Firebase, Docker, CI/CD, Cloudflare, Github Actions, Kubernetes</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">AI/ML</h3>
              <p className={`${mutedTextClass} text-sm`}>LLMs, Prompt Engineering, Agentic AI, AI APIs</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Databases</h3>
              <p className={`${mutedTextClass} text-sm`}>PostgreSQL, MySQL, MSSQL, MongoDB, Firestore, DynamoDB</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Real-time</h3>
              <p className={`${mutedTextClass} text-sm`}>WebSockets, Socket.io, Event-driven</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Tools & Services</h3>
              <p className={`${mutedTextClass} text-sm`}>Stripe, Twilio, GitHub, Postman, WhatsApp Business</p>
            </div>
            <div>
              <h3 className="text-red-500 font-mono font-bold mb-3">Development Practices & Others</h3>
              <p className={`${mutedTextClass} text-sm`}>TDD, Agile/Kanban, code reviews, OAuth, SSL/TLS, CDN, DNS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`border-t ${borderClass} max-w-6xl mx-auto px-6 py-16 transition-colors duration-300`}>
        <h2 className={`text-2xl font-bold ${textClass} mb-8`}>Projects & Experience</h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className={`border ${borderClass} rounded-lg overflow-hidden ${darkMode ? 'hover:border-slate-700' : 'hover:border-slate-400'} transition cursor-pointer`}>
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className={`w-full p-6 ${hoverBgClass} transition text-left`}
              >
                <div className="flex justify-between items-start cursor-pointer">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${textClass} mb-1`}>{project.title}</h3>
                    <p className="text-red-500 text-sm font-mono mb-2">{project.company}</p>
                  </div>
                  {expandedProject === project.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {expandedProject === project.id && (
                <div className={`border-t ${borderClass} p-6 ${secondaryBgClass}`}>
                  <p className={`${mutedTextClass} mb-4`}>{project.description}</p>
                  <div className="mb-6">
                    <div className="mb-6">
                      <h4 className="text-red-600 font-mono font-bold mb-3">Project Photos</h4>
                      <span className="text-red-300 text-sm">click on image(s) to expand</span>

                      {/* Horizontal scrolling container */}
                      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-300">
                        <div className="flex gap-4">
                          {project.images.map((image, i) => (
                            <img
                              key={i}
                              src={image}
                              alt={`Project ${project.id} Image ${i + 1}`}
                              className="w-64 h-64 object-cover rounded-lg shadow-lg cursor-pointer"  // Fixed size for images
                              onClick={() => openModal(image)} // Open modal on image click
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* Modal for Image Expansion */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] p-6">
                        {/* Scrollable container for the image */}
                        <div className="overflow-auto max-h-full">
                          <img src={selectedImage} alt="Expanded view" className="w-full h-auto" />
                        </div>
                        <button
                          onClick={closeModal}
                          className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}


                  <div className="mb-6">
                    <h4 className="text-red-500 font-mono font-bold mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className={`${mutedTextClass} text-sm flex gap-3`}>
                          <span className="text-red-500 mt-1">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-red-500 font-mono font-bold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 ${buttonBgClass} ${mutedTextClass} text-xs rounded font-mono`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>


                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Leadership */}
      <section id="achievements" className={`border-t ${borderClass} ${secondaryBgClass} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className={`text-2xl font-bold ${textClass} mb-8`}>Achievements & Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, i) => (
              <div key={i} className={`border ${borderClass} rounded-lg p-6 ${darkMode ? 'hover:border-slate-700' : 'hover:border-slate-400'} transition`}>
                <h3 className={`${textClass} font-bold mb-1`}>{achievement.title}</h3>
                <p className="text-red-500 text-sm font-mono mb-2">{achievement.subtitle}</p>
                <p className={mutedTextClass}>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={`border-t ${borderClass} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className={`text-2xl font-bold ${textClass} mb-8`}>Education</h2>
          <div className="space-y-6">
            <div className={`border ${borderClass} rounded-lg p-6`}>
              <h3 className={`text-lg font-bold ${textClass} mb-1`}>MEng – Computer Vision and Artificial Intelligence</h3>
              <p className="text-red-500 text-sm font-mono mb-2">University of Limerick | September 2024 - September 2025</p>
              <p className={mutedTextClass}>First Class Honours | QCA: 3.37</p>
            </div>
            <div className={`border ${borderClass} rounded-lg p-6`}>
              <h3 className={`text-lg font-bold ${textClass} mb-1`}>Bachelor of Technology – Computer Science</h3>
              <p className="text-red-500 text-sm font-mono mb-2">Adi Shankara Institute of Engineering and Technology | 2018 - February 2023</p>
              <p className={mutedTextClass}>GPA: 2.76</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`border-t ${borderClass} ${secondaryBgClass} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Let's Connect</h2>
          <p className={`${mutedTextClass} mb-8`}>Feel free to reach out for opportunities, collaborations, or just to chat about tech.</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/paulaji" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-mono font-bold transition">
              <Github size={20} /> GitHub
            </a>
            <a href="mailto:paulajiparayil123@gmail.com" className={`inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-mono font-bold transition`}>
              <Mail size={20} /> Email
            </a>
            <a href="https://linkedin.com/in/paulaji/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-mono font-bold transition`}>
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${borderClass} ${cardBgClass} py-8 transition-colors duration-300`}>
        <div className={`max-w-6xl mx-auto px-6 text-center ${mutedTextClass} text-sm font-mono`}>
          <p>Built with React & TailwindCSS | Hosted on GitHub Pages</p>
          <p className="mt-2">© 2025 Paul Aji. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};