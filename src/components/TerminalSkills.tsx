"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skillsData = [
  { category: "languages", items: "HTML, CSS, C, JavaScript (ES6+), TypeScript, Python, SQL" },
  { category: "frontend", items: "React.js, Tailwind CSS, ShadCN UI, Bootstrap, Zustand, Zod" },
  { category: "backend", items: "Node.js, Express.js, FastAPI, NestJS, RESTful APIs, GraphQL, Pydantic" },
  { category: "databases", items: "PostgreSQL, MySQL, MongoDB, pgvector" },
  { category: "ai", items: "RAG Architecture, Text Embeddings, Semantic Search, Gemini API, Hugging Face Inference" },
  { category: "tools", items: "Git, GitHub, Vercel, VTEX IO, Jest, CI/CD, Postman" },
];

export default function TerminalSkills() {
  // State for whether the animation has been triggered
  const [hasStarted, setHasStarted] = useState(false);
  
  // Window states
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // State for which step we are on (0 to skillsData.length - 1)
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for what's currently being typed
  const [typedCommand, setTypedCommand] = useState("");
  
  // State for whether the output of the current step is showing
  const [showOutput, setShowOutput] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new content is added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [currentStep, typedCommand, showOutput]);

  useEffect(() => {
    if (!hasStarted) return;
    if (currentStep >= skillsData.length) return;

    const fullCommand = `cat ${skillsData[currentStep].category}.txt`;
    
    if (typedCommand.length < fullCommand.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(fullCommand.slice(0, typedCommand.length + 1));
      }, 20); // typing speed
      return () => clearTimeout(timeout);
    } else if (!showOutput) {
      const timeout = setTimeout(() => {
        setShowOutput(true);
      }, 100); // slight pause before showing output
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedCommand("");
        setShowOutput(false);
        setCurrentStep(prev => prev + 1);
      }, 400); // delay before typing next command
      return () => clearTimeout(timeout);
    }
  }, [hasStarted, currentStep, typedCommand, showOutput]);

  // Window Controls
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasStarted(false);
    setCurrentStep(0);
    setTypedCommand("");
    setShowOutput(false);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    if (isMinimized) setIsMinimized(false);
  };

  return (
    <>
      {/* Backdrop for maximized state */}
      {isMaximized && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" 
          onClick={() => setIsMaximized(false)} 
        />
      )}
      
      <div 
        className={`
          mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-zinc-800 font-mono text-sm sm:text-base flex flex-col transition-all duration-300
          ${isMaximized ? "fixed inset-4 sm:inset-10 z-50 max-w-none" : "relative w-full max-w-4xl"}
          ${!hasStarted && !isMinimized ? "cursor-pointer hover:border-zinc-700" : ""}
        `}
        onClick={() => {
          if (!hasStarted && !isMinimized) setHasStarted(true);
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-zinc-800 select-none">
          <div className="flex space-x-2">
            <button 
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              title="Close/Reset"
            />
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
              title="Minimize"
            />
            <button 
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
              title="Maximize"
            />
          </div>
          <div className="flex-1 text-center text-zinc-400 text-xs cursor-default">
            amaan@portfolio: ~/skills
          </div>
        </div>
        
        {/* Terminal Body */}
        {!isMinimized && (
          <div 
            ref={terminalBodyRef}
            className={`p-6 space-y-4 text-zinc-300 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent ${isMaximized ? "flex-1" : "min-h-[300px]"}`}
          >
            {/* The initial command that was executed */}
            <div className="mb-4">
              <div>
                <span className="text-green-400">amaan@portfolio</span>
                <span className="text-zinc-400">:</span>
                <span className="text-blue-400">~/skills</span>
                <span className="text-zinc-400">$</span>{" "}
                <span className="text-zinc-100">./view_skills.sh</span>
                {!hasStarted && <span className="inline-block w-2 h-4 bg-zinc-300 align-middle ml-1 animate-pulse"></span>}
              </div>
              {!hasStarted && (
                <div className="text-zinc-500 text-xs mt-4">
                  (Click anywhere in terminal to execute)
                </div>
              )}
            </div>

            {hasStarted && (
              <>
                {/* Render fully completed steps */}
                {skillsData.slice(0, currentStep).map((skill, index) => (
                  <div 
                    key={index} 
                    className="space-y-1"
                  >
                    <div>
                      <span className="text-green-400">amaan@portfolio</span>
                      <span className="text-zinc-400">:</span>
                      <span className="text-blue-400">~/skills</span>
                      <span className="text-zinc-400">$</span> cat {skill.category}.txt
                    </div>
                    <div className="pl-4 text-yellow-300">
                      {skill.items}
                    </div>
                  </div>
                ))}
                
                {/* Render current typing step */}
                {currentStep < skillsData.length && (
                  <div className="space-y-1">
                    <div>
                      <span className="text-green-400">amaan@portfolio</span>
                      <span className="text-zinc-400">:</span>
                      <span className="text-blue-400">~/skills</span>
                      <span className="text-zinc-400">$</span> {typedCommand}
                      <span className={`inline-block w-2 h-4 bg-zinc-300 align-middle ml-1 ${showOutput ? 'opacity-0' : 'animate-pulse'}`}></span>
                    </div>
                    {showOutput && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pl-4 text-yellow-300"
                      >
                        {skillsData[currentStep].items}
                      </motion.div>
                    )}
                  </div>
                )}
                
                {/* Final blinking cursor when done */}
                {currentStep >= skillsData.length && (
                  <div>
                    <span className="text-green-400">amaan@portfolio</span>
                    <span className="text-zinc-400">:</span>
                    <span className="text-blue-400">~/skills</span>
                    <span className="text-zinc-400">$</span> <span className="inline-block w-2 h-4 bg-zinc-300 align-middle ml-1 animate-pulse"></span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
