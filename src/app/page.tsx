"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Code, Terminal, Layers, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroIllustration from "../components/HeroIllustration";
import TerminalSkills from "../components/TerminalSkills";
import projects from "../data/projects.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeProject, setActiveProject] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const firstChild = scrollContainerRef.current.firstChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 32; // item width + 32px gap
        const index = Math.round(scrollPosition / itemWidth);
        setActiveProject(Math.min(Math.max(index, 0), projects.length - 1));
      }
    }
  };

  const scrollToProject = (index: number) => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 32;
        scrollContainerRef.current.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
        });
        setActiveProject(index);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <motion.div 
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black"
        >
          <div className="flex flex-col items-start space-y-8 max-w-3xl px-8">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-wide">Hi, I'm Peshimam Amaan.</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light tracking-wide">Software Engineer, a full stack developer.</h2>
            </div>
            <button 
              onClick={() => setShowIntro(false)}
              className="px-6 py-2.5 bg-transparent border border-zinc-700 hover:border-white hover:text-white rounded-md text-zinc-300 font-[family-name:var(--font-tech)] tracking-wider transition-colors text-sm uppercase"
            >
              See My Journey
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.2 } }}
          className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black"
        >
      
      {/* Background Grid */}
      <div className="fixed inset-0 h-screen w-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-6xl px-12 sm:px-20 lg:px-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12 lg:gap-8 pt-20 lg:pt-0"
        >
          {/* Text Content */}
          <div className="flex flex-col items-start w-full lg:w-3/5 space-y-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className="text-zinc-400 font-mono tracking-widest text-sm uppercase">Peshimam Amaan</h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-normal leading-tight text-white font-[family-name:var(--font-tech)]">
                Software Engineer, <br/> a full stack developer.
              </h1>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="max-w-xl text-lg sm:text-xl text-zinc-400 leading-relaxed font-light">
              I'm Amaan, I craft responsive, high-performance web applications with a strong focus on minimal design, robust backend architectures, and AI integrations.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex items-center space-x-8 pt-4">
              <Link href="#contact" className="group flex items-center space-x-2 text-white hover:text-zinc-300 transition-colors">
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors"
              >
                <span>Resume</span>
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div variants={fadeInUp} className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <HeroIllustration />
          </motion.div>
        </motion.div>
        
      </section>

      {/* Skills Section */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen w-full max-w-6xl px-12 sm:px-20 lg:px-32 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16 w-full"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-normal font-[family-name:var(--font-tech)]">Skills</h2>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <TerminalSkills />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen w-full max-w-6xl px-12 sm:px-20 lg:px-32 py-24 border-t border-zinc-900">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16 w-full"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-normal font-[family-name:var(--font-tech)]">Work Experience</h2>
          </motion.div>
          
          <div className="relative border-l border-zinc-800 ml-3 md:ml-4 space-y-16 mt-8">
            <motion.div variants={fadeInUp} className="relative pl-8">
              <div className="absolute w-4 h-4 bg-black border-2 border-zinc-500 rounded-full -left-[8.5px] top-1.5"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="text-2xl font-medium text-white tracking-normal font-[family-name:var(--font-tech)]">Associate Software Engineer</h3>
                <span className="text-sm text-zinc-500 font-mono mt-1 sm:mt-0">June 2025 — Present</span>
              </div>
              <h4 className="text-lg text-zinc-400 mb-4">Logixal Cloud Solutions • Bengaluru, KA</h4>
              <ul className="list-disc list-outside ml-4 text-zinc-400 space-y-2 max-w-2xl text-sm leading-relaxed">
                <li>Built and maintained production micro frontends on the VTEX IO platform, developing custom React components and integrating VTEX Master Data APIs to centralize customer and product records.</li>
                <li>Built real-time custom event listeners for platform-triggered events; participated in Agile sprint cycles, daily standups, and peer code reviews.</li>
                <li>Designed and developed RESTful APIs using Commerce tools, integrating product, cart, and customer data endpoints into React/Next.js frontends.</li>
                <li>Built scalable, reusable frontend components in React and Next.js, ensuring consistent UI patterns, accessibility standards, and cross-browser compatibility.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative pl-8">
              <div className="absolute w-4 h-4 bg-black border-2 border-zinc-700 rounded-full -left-[8.5px] top-1.5"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="text-2xl font-medium text-white tracking-normal font-[family-name:var(--font-tech)]">Web Developer Intern</h3>
                <span className="text-sm text-zinc-500 font-mono mt-1 sm:mt-0">Feb 2025 — March 2025</span>
              </div>
              <h4 className="text-lg text-zinc-400 mb-4">RK Technologies • Kurnool, AP</h4>
              <ul className="list-disc list-outside ml-4 text-zinc-400 space-y-2 max-w-2xl text-sm leading-relaxed">
                <li>Delivered 5+ responsive React UI components for production features, ensuring consistent cross-device rendering across mobile, tablet, and desktop breakpoints.</li>
                <li>Applied accessibility and UX best practices (semantic HTML, ARIA labels, keyboard navigation) to improve usability across core user flows.</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 flex flex-col justify-center min-h-screen w-full max-w-6xl px-12 sm:px-20 lg:px-32 py-24 border-t border-zinc-900">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16 w-full"
        >
          <motion.div variants={fadeInUp} className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-normal font-[family-name:var(--font-tech)]">Selected Work</h2>
            </div>
            <Link 
              href="/projects" 
              className="group flex items-center space-x-2 text-sm sm:text-base text-zinc-400 hover:text-white transition-colors mb-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="w-full">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {projects.map((project) => (
                <div key={project.id} className="snap-start shrink-0 w-[80vw] sm:w-[360px] md:w-[400px] lg:w-[420px] group relative bg-zinc-950 border border-white/[0.09] hover:border-white/[0.25] transition-colors duration-300 rounded overflow-hidden flex flex-col">
                  <div className="w-full aspect-[16/9] bg-[#252525] overflow-hidden relative">
                    <Image 
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover opacity-60 grayscale-[0.4] group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700"
                    />
                  </div>
                  <div className="flex flex-col p-6 flex-grow">
                    <h3 className="text-xl sm:text-2xl font-medium text-[#f0f0ee] tracking-normal font-[family-name:var(--font-tech)] mb-2">{project.title}</h3>
                    <p className="text-[#a2a29e] text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex items-center gap-6 mt-auto">
                      <Link href={project.sourceCodeUrl} target="_blank" className="text-sm text-[#a2a29e] hover:text-white transition-colors font-medium">
                        Source Code
                      </Link>
                      <Link href={project.liveDemoUrl} target="_blank" className="flex items-center space-x-2 text-sm text-[#f0f0ee] hover:text-white transition-colors group/link font-medium">
                        <span>Live Demo</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeProject === index 
                      ? "bg-zinc-300 w-6" 
                      : "bg-zinc-600 w-2 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="relative z-10 flex flex-col justify-center min-h-[50vh] w-full max-w-6xl px-12 sm:px-20 lg:px-32 py-24 border-t border-zinc-900">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-normal font-[family-name:var(--font-tech)]">
            Let's build something together.
          </motion.h2>
          
          <motion.div variants={fadeInUp}>
            <a href="mailto:amaanamn585@gmail.com" className="text-xl sm:text-2xl text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 hover:border-white pb-1">
              amaanamn585@gmail.com
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex space-x-8 pt-12">
            <a href="https://github.com/amaan6498" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://linkedin.com/in/amaanpeshimam" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:amaanamn585@gmail.com" className="text-zinc-500 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
