"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud } from "lucide-react";

const technologies = [
  {
    category: "Frontend",
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    techs: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "GSAP"]
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6 text-blue-400" />,
    techs: ["Node.js", "Express", "Python", "Java", "Spring Boot", "REST APIs"]
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6 text-purple-400" />,
    techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Supabase"]
  },
  {
    category: "Infrastructure",
    icon: <Cloud className="w-6 h-6 text-orange-400" />,
    techs: ["Vercel", "AWS", "Docker", "GitHub", "CI/CD", "Cloudflare"]
  }
];

export function TechnologiesSection() {
  return (
    <section className="py-24 relative bg-black border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Website Development Technologies
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg font-light leading-relaxed">
            We engineer premium digital products using modern, scalable, and secure technology stacks optimized for performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div 
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#050505] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-6">{tech.category}</h3>
              <ul className="space-y-3">
                {tech.techs.map((item) => (
                  <li key={item} className="text-neutral-400 flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
