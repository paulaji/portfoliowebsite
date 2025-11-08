import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, ArrowUpRight } from 'lucide-react';

import TechBanner from './components/TechBanner';

const Banner = () => {
    const texts = [
        "Full Stack Engineer",
        "Cloud",
        "AI/ML",
        "DevOps"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 overflow-hidden">
            <div
                className="transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${currentIndex * 2}rem)` }}
            >
                {texts.map((text, i) => (
                    <div key={i} className="h-8 flex items-center text-xl font-light text-neutral-400">
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Portfolio() {
    const [expandedProject, setExpandedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const projects = [
        {
            id: 1,
            title: "FindASide",
            subtitle: "Sports Facility Booking Marketplace",
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
            title: "MahaMeru Innovations",
            subtitle: "Full Stack Web Application",
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
            title: "TrustPMS",
            subtitle: "Internal Project Management System",
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
            title: "Trust Capital CRM",
            subtitle: "Cryptocurrency Trading Platform",
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
            title: "Learning to Program",
            subtitle: "AI-Powered Educational Platform",
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
            subtitle: "Full-Stack Platform",
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
            subtitle: "Community Engagement Tools",
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
            subtitle: "Corporate Web Presence",
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

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.5rem;
          padding: 1px;
          background: linear-gradient(135deg, #ef4444, #000);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        
        .gradient-border:hover::before {
          opacity: 1;
        }
      `}</style>

            {/* Minimal Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="text-sm font-medium tracking-wider">PAUL AJI</a>
                    <div className="flex items-center gap-8">
                        <a href="#work" className="text-sm text-neutral-400 hover:text-white transition">Work</a>
                        <a href="#about" className="text-sm text-neutral-400 hover:text-white transition">About</a>
                        <a href="#contact" className="text-sm text-neutral-400 hover:text-white transition">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-6 pt-16">
                <div className="max-w-5xl w-full">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src="./otherimages/profilephoto.jpg"
                                    alt="Paul Aji"
                                    className="w-20 h-20 rounded-full object-cover ring-1 ring-white/10"
                                />
                                <div>
                                    <h1 className="text-6xl font-light tracking-tight">Paul Aji</h1>
                                    <Banner />
                                </div>
                            </div>
                            <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
                                I build full-stack applications and cloud systems. From modern frontends to distributed backends, I focus on creating reliable, scalable solutions that handle real users and real problems.
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <a
                                href="https://github.com/paulaji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                            </a>
                            <a
                                href="https://linkedin.com/in/paulaji/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                            </a>
                            <a
                                href="mailto:paulajiparayil123@gmail.com"
                                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            {/* Tech Stack */}
            <section className="py-32 px-6 border-t border-white/5" id="about">
                <TechBanner />
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-sm font-medium tracking-wider text-neutral-500 mb-12">TECHNICAL EXPERTISE</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Go"] },
                            { label: "Backend", items: ["Django", "Flask", "Node.js", "Express"] },
                            { label: "Frontend", items: ["React", "Next.js", "Redux", "TailwindCSS"] },
                            { label: "Cloud", items: ["AWS", "GCP", "Azure", "Firebase"] },
                            { label: "Databases", items: ["PostgreSQL", "MongoDB", "Firestore", "MSSQL", "MySQL"] },
                            { label: "DevOps", items: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions"] },
                            { label: "AI/ML", items: ["LLMs", "Prompt Engineering", "Agentic AI"] },
                            { label: "Real-time", items: ["WebSockets", "Socket.io", "Event-driven"] },
                        ].map((category, i) => (
                            <div key={i} className="space-y-3">
                                <h3 className="text-xs font-medium text-neutral-500 tracking-wider">{category.label}</h3>
                                <div className="space-y-2">
                                    {category.items.map((item, j) => (
                                        <div key={j} className="text-sm text-neutral-400">{item}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section className="py-32 px-6 border-t border-white/5" id="work">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-sm font-medium tracking-wider text-neutral-500 mb-12">SELECTED WORK</h2>

                    <div className="space-y-1">
                        {projects.map((project) => (
                            <div key={project.id} className="group">
                                <button
                                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                                    className="w-full py-4 sm:py-6 flex items-center justify-between border-t border-white/5 hover:border-white/20 transition"
                                >
                                    <div className="flex-1 text-left">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                            <h3 className="text-lg sm:text-xl font-light">{project.title}</h3>
                                            <span className="text-sm text-neutral-500">{project.subtitle}</span>
                                        </div>
                                        <p className="text-sm text-neutral-500 mt-1">{project.company}</p>
                                    </div>
                                    <ChevronRight
                                        className={`w-5 h-5 text-neutral-500 transition-transform flex-shrink-0 ml-2 sm:ml-4 ${expandedProject === project.id ? 'rotate-90' : ''}`}
                                    />
                                </button>

                                {expandedProject === project.id && (
                                    <div className="py-6 sm:py-8 space-y-6 sm:space-y-8 border-t border-white/5">
                                        {/* Images */}
                                        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4">
                                            {project.images.map((image, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => openModal(image)}
                                                    className="relative flex-shrink-0 w-64 sm:w-80 h-40 sm:h-52 bg-neutral-900 rounded cursor-pointer overflow-hidden group/img"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${project.title} ${i + 1}`}
                                                        className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition"
                                                    />
                                                    <div className="absolute inset-0 border border-white/10 rounded pointer-events-none" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{project.description}</p>

                                        {/* Highlights */}
                                        <div className="space-y-3">
                                            {project.highlights.map((highlight, i) => (
                                                <div key={i} className="flex gap-3 sm:gap-4">
                                                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                                    <p className="text-sm text-neutral-400 leading-relaxed">{highlight}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs text-neutral-400 border border-white/10 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-32 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-sm font-medium tracking-wider text-neutral-500 mb-12">ACHIEVEMENTS & LEADERSHIP</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {achievements.map((achievement, i) => (
                            <div key={i} className="p-6 border border-white/5 rounded hover:border-white/20 transition">
                                <h3 className="font-medium mb-1">{achievement.title}</h3>
                                <p className="text-sm text-red-500 mb-3">{achievement.subtitle}</p>
                                <p className="text-sm text-neutral-400 leading-relaxed">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="py-32 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-sm font-medium tracking-wider text-neutral-500 mb-12">EDUCATION</h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-medium mb-1">MEng – Computer Vision and Artificial Intelligence</h3>
                            <p className="text-sm text-neutral-500 mb-2">University of Limerick · September 2024 - September 2025</p>
                            <p className="text-sm text-neutral-400">First Class Honours · QCA: 3.37</p>
                        </div>

                        <div>
                            <h3 className="font-medium mb-1">Bachelor of Technology – Computer Science</h3>
                            <p className="text-sm text-neutral-500 mb-2">Adi Shankara Institute of Engineering and Technology · 2018 - February 2023</p>
                            <p className="text-sm text-neutral-400">GPA: 2.76</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-32 px-6 border-t border-white/5" id="contact">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl font-light">Let's work together</h2>
                    <p className="text-neutral-400">Open to new opportunities and collaborations</p>

                    <div className="flex justify-center gap-8 pt-4">
                        <a
                            href="https://github.com/paulaji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                        <a
                            href="https://linkedin.com/in/paulaji/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                        <a
                            href="mailto:paulajiparayil123@gmail.com"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
                        >
                            <Mail className="w-4 h-4" />
                            Email
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-neutral-500">
                    <p>© 2025 Paul Aji</p>
                    <p>Built with React & TailwindCSS</p>
                </div>
            </footer>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div className="relative max-w-7xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Expanded view"
                            className="w-full h-auto rounded"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur text-white rounded transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}