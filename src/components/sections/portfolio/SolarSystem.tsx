import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechItem {
  name: string;
  icon: string;
  url: string;
}

// Perfect inverted pyramid: 12 -> 10 -> 8 -> 6 -> 4 -> 2
const techStack: TechItem[][] = [
  // Row 1 - 12 items (largest)
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://python.org" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://typescriptlang.org" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", url: "https://en.cppreference.com/w/c" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", url: "https://kotlinlang.org" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", url: "https://www.gnu.org/software/bash/" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", url: "https://getbootstrap.com" },
  ],
  // Row 2 - 10 items
  [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", url: "https://djangoproject.com" },
    { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", url: "https://flask.palletsprojects.com" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://tensorflow.org" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org" },
    { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", url: "https://scikit-learn.org" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", url: "https://opencv.org" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", url: "https://numpy.org" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
  ],
  // Row 3 - 8 items
  [
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", url: "https://pandas.pydata.org" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://mysql.com" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://postgresql.org" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", url: "https://redis.io" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://docker.com" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", url: "https://azure.microsoft.com" },
  ],
  // Row 4 - 6 items
  [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", url: "https://linux.org" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", url: "https://vercel.com" },
  ],
  // Row 5 - 4 items
  [
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://figma.com" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "https://postman.com" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", url: "https://adobe.com/products/photoshop" },
  ],
  // Row 6 - 2 items (tip of pyramid)
  [
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co" },
    { name: "MS Office", icon: "https://img.icons8.com/color/48/microsoft-office-2019.png", url: "https://www.microsoft.com/microsoft-365" },
  ],
];

export function SolarSystem() {
  return (
    <div className="relative w-full py-12 sm:py-16 px-4 flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background Ambient Glowing Orb & Wireframe Sphere Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] rounded-full bg-gradient-to-tr from-[#B600A8]/30 via-[#7621B0]/20 to-[#31B8FF]/20 blur-[100px] animate-pulse" />
        <div className="absolute w-[400px] sm:w-[580px] md:w-[720px] h-[400px] sm:h-[580px] md:h-[720px] rounded-full border border-white/10 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[280px] sm:w-[420px] md:w-[540px] h-[280px] sm:h-[420px] md:h-[540px] rounded-full border border-[#B600A8]/20 animate-[spin_45s_linear_infinite_reverse]" />
      </div>

      {/* Inverted Pyramid Container */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center gap-2.5 sm:gap-3.5 md:gap-4">
        {techStack.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-3.5 w-full"
          >
            {row.map((tech, techIndex) => (
              <a
                key={techIndex}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                title={tech.name}
                className="group relative flex flex-col items-center justify-center w-[60px] sm:w-[72px] md:w-[84px] h-[72px] sm:h-[86px] md:h-[98px] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] hover:bg-[#B600A8]/15 border border-white/10 hover:border-[#B600A8]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_8px_30px_rgba(182,0,168,0.35)] cursor-pointer no-underline"
              >
                {/* Tech Icon */}
                <div className="relative w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 flex items-center justify-center mb-1 sm:mb-1.5 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain grayscale contrast-125 brightness-150 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Tech Name Label */}
                <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-[#D7E2EA]/70 group-hover:text-white group-hover:font-semibold tracking-tight text-center max-w-[56px] sm:max-w-[64px] md:max-w-[76px] truncate leading-tight">
                  {tech.name}
                </span>

                {/* Subtle Hover Glow Bottom Border */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#B600A8] to-transparent transition-all duration-300 rounded-full" />
              </a>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
