"use client";

import { useState, useEffect } from "react";
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
  // State for which step we are on (0 to skillsData.length - 1)
  const [currentStep, setCurrentStep] = useState(0);
  
  // State for what's currently being typed
  const [typedCommand, setTypedCommand] = useState("");
  
  // State for whether the output of the current step is showing
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentStep >= skillsData.length) return;

    const fullCommand = `cat ${skillsData[currentStep].category}.txt`;
    
    if (typedCommand.length < fullCommand.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(fullCommand.slice(0, typedCommand.length + 1));
      }, 50); // typing speed
      return () => clearTimeout(timeout);
    } else if (!showOutput) {
      const timeout = setTimeout(() => {
        setShowOutput(true);
      }, 200); // slight pause before showing output
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedCommand("");
        setShowOutput(false);
        setCurrentStep(prev => prev + 1);
      }, 800); // delay before typing next command
      return () => clearTimeout(timeout);
    }
  }, [currentStep, typedCommand, showOutput]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-zinc-800 font-mono text-sm sm:text-base">
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-zinc-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-zinc-400 text-xs">
          amaan@portfolio: ~/skills
        </div>
      </div>
      
      <div className="p-6 space-y-4 text-zinc-300 min-h-[300px]">
        {/* Render fully completed steps */}
        {skillsData.slice(0, currentStep).map((skill, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
          </motion.div>
        ))}
        
        {/* Render current typing step */}
        {currentStep < skillsData.length && (
          <div className="space-y-1">
            <div>
              <span className="text-green-400">amaan@portfolio</span>
              <span className="text-zinc-400">:</span>
              <span className="text-blue-400">~/skills</span>
              <span className="text-zinc-400">$</span> {typedCommand}
              {!showOutput && <span className="inline-block w-2 h-4 bg-zinc-300 align-middle ml-1 animate-pulse"></span>}
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
      </div>
    </div>
  );
}
