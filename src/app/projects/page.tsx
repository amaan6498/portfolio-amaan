"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import projects from "../../data/projects.json";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } }
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black selection:bg-purple-900/50">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      <section className="relative z-10 flex flex-col min-h-screen w-full max-w-6xl px-12 sm:px-20 lg:px-32 py-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-16 w-full"
        >
          <motion.div variants={fadeInUp} className="flex flex-col space-y-6">
            <Link href="/" className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-normal text-white font-[family-name:var(--font-tech)]">
              All Projects
            </h1>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} className="group relative w-full flex flex-col space-y-6">
                <div className="w-full aspect-[16/9] bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-zinc-500 transition-colors duration-500">
                  <Image 
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-medium text-white tracking-normal font-[family-name:var(--font-tech)] mb-2">{project.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-6 pt-2">
                    <Link href={project.sourceCodeUrl} target="_blank" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
                      Source Code
                    </Link>
                    <Link href={project.liveDemoUrl} target="_blank" className="flex items-center space-x-2 text-sm text-white hover:text-zinc-300 transition-colors group/link font-medium">
                      <span>Live Demo</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
