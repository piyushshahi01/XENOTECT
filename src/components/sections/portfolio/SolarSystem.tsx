import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechItem {
  name: string;
  icon: string;
  url: string;
}

// All tech stack items with their icons and official URLs
// Perfect inverted pyramid: 12 -> 10 -> 8 -> 6 -> 4 -> 2
const techStack: TechItem[][] = [
  // Row 1 - 12 items (largest)
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/python.svg", url: "https://python.org" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/javascript.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/typescript.svg", url: "https://typescriptlang.org" },
    { name: "C", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/c.svg", url: "https://en.cppreference.com/w/c" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/cplusplus.svg", url: "https://isocpp.org" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/kotlin.svg", url: "https://kotlinlang.org" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/html5.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/css3.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/gnubash.svg", url: "https://www.gnu.org/software/bash/" },
    { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/react.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/nextdotjs.svg", url: "https://nextjs.org" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/bootstrap.svg", url: "https://getbootstrap.com" },
  ],
  // Row 2 - 10 items
  [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/nodedotjs.svg", url: "https://nodejs.org" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/django.svg", url: "https://djangoproject.com" },
    { name: "Flask", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/flask.svg", url: "https://flask.palletsprojects.com" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/fastapi.svg", url: "https://fastapi.tiangolo.com" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/tensorflow.svg", url: "https://tensorflow.org" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/pytorch.svg", url: "https://pytorch.org" },
    { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/scikitlearn.svg", url: "https://scikit-learn.org" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/opencv.svg", url: "https://opencv.org" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/numpy.svg", url: "https://numpy.org" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/tailwindcss.svg", url: "https://tailwindcss.com" },
  ],
  // Row 3 - 8 items
  [
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/pandas.svg", url: "https://pandas.pydata.org" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/mysql.svg", url: "https://mysql.com" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/postgresql.svg", url: "https://postgresql.org" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/mongodb.svg", url: "https://mongodb.com" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/firebase.svg", url: "https://firebase.google.com" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/redis.svg", url: "https://redis.io" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/docker.svg", url: "https://docker.com" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/microsoftazure.svg", url: "https://azure.microsoft.com" },
  ],
  // Row 4 - 6 items
  [
    { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/git.svg", url: "https://git-scm.com" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/github.svg", url: "https://github.com" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/linux.svg", url: "https://linux.org" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/amazonaws.svg", url: "https://aws.amazon.com" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/visualstudiocode.svg", url: "https://code.visualstudio.com" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/vercel.svg", url: "https://vercel.com" },
  ],
  // Row 5 - 4 items
  [
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/jupyter.svg", url: "https://jupyter.org" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/figma.svg", url: "https://figma.com" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/postman.svg", url: "https://postman.com" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/adobephotoshop.svg", url: "https://adobe.com/products/photoshop" },
  ],
  // Row 6 - 2 items (tip of pyramid)
  [
    { name: "Hugging Face", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/huggingface.svg", url: "https://huggingface.co" },
    { name: "MS Office", icon: "https://cdn.jsdelivr.net/npm/simple-icons@13.14.1/icons/microsoft.svg", url: "https://www.microsoft.com/microsoft-365" },
  ],
];

export function SolarSystem() {
  return (
    <div className="relative w-full px-4 flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Inverted Pyramid Container */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center gap-3">
        {techStack.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
            className="flex flex-wrap items-center justify-center gap-[10px] w-full"
          >
            {row.map((tech, techIndex) => (
              <a
                key={techIndex}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                title={tech.name}
                className="group flex flex-col items-center justify-center w-[55px] h-[68px] p-2 rounded-[10px] bg-white/[0.03] hover:bg-[#C2A4FF]/10 border border-white/10 hover:border-[#c2a4ff] backdrop-blur-[8px] transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.08] hover:shadow-[0_8px_30px_rgba(194,164,255,0.25)] cursor-pointer no-underline"
              >
                {/* Tech Icon */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-[30px] h-[30px] object-contain invert opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Tech Name Label */}
                <span className="text-[9px] text-white/70 group-hover:text-white mt-[5px] text-center max-w-[50px] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300">
                  {tech.name}
                </span>
              </a>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
