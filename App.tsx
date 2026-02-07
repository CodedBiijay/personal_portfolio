/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Mail, Linkedin, ChevronDown, X, Code, Layers, Sparkles, Cpu, Palette, Globe } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import { Project } from './types';

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Neon Finance',
    category: 'Fintech Dashboard',
    description: 'A real-time cryptocurrency dashboard featuring live market data websockets, interactive charts, and portfolio management tools.',
    tech: ['React', 'TypeScript', 'D3.js', 'Tailwind'],
    gradient: 'from-blue-600 to-cyan-400',
    image: 'https://images.unsplash.com/photo-1611974714658-e4d2243d843a?q=80&w=1000&auto=format&fit=crop',
    challenge: 'Handling massive streams of real-time data while maintaining a consistent 60fps across complex D3.js visualizations.'
  },
  {
    id: '02',
    title: 'Aero Commerce',
    category: 'E-Commerce',
    description: 'A headless e-commerce solution built for speed. Features include optimistic UI updates, cart state management, and seamless checkout flow.',
    tech: ['Next.js', 'Stripe', 'Zustand', 'Framer Motion'],
    gradient: 'from-purple-600 to-pink-400',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    challenge: 'Designing a modular architecture that allows for sub-second page transitions and lightning-fast product discovery.'
  },
  {
    id: '03',
    title: 'Zenith AI',
    category: 'AI Interface',
    description: 'A generative AI chat interface designed for creative professionals. Supports multi-modal inputs and context-aware conversation history.',
    tech: ['Gemini API', 'React', 'Node.js', 'PostgreSQL'],
    gradient: 'from-emerald-600 to-teal-400',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    challenge: 'Creating an intuitive user flow for prompting and iterative content generation using streaming text and media.'
  },
  {
    id: '04',
    title: 'Orbital Social',
    category: 'Social Platform',
    description: 'A decentralized social media protocol focusing on privacy and user data ownership. Fully encrypted messaging and feed algorithms.',
    tech: ['Web3', 'Solidity', 'IPFS', 'React'],
    gradient: 'from-orange-600 to-red-400',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop',
    challenge: 'Bridging the gap between complex blockchain transactions and a familiar, high-performance social UX.'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-cyan-400 selection:text-black cursor-auto md:cursor-none bg-black">
      <CustomCursor />
      <FluidBackground />
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 mix-blend-difference">
        <div className="font-heading text-2xl font-bold tracking-tighter flex items-center gap-2">
          <Sparkles className="text-cyan-400" size={24} />
          <span>PORTFOLIO</span>
        </div>
        
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.3em] uppercase">
          {['Works', 'About', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-cyan-400 transition-colors"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>

        <button 
           className="md:hidden"
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Code />}
        </button>
      </nav>

      {/* Hero */}
      <header id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] tracking-[0.4em] uppercase text-cyan-400 font-bold"
          >
            Senior Frontend Engineer <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          </motion.div>
          
          <GradientText 
            text="BUILDING DIGITAL" 
            as="h1" 
            className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter block" 
          />
          <GradientText 
            text="EXPERIENCES" 
            as="h1" 
            className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter block mb-8" 
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-gray-400 leading-relaxed"
          >
            I blend creative design with technical excellence to build immersive, performant, and engaging web applications.
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12"
        >
          <ChevronDown className="text-gray-500" />
        </motion.div>
      </header>

      {/* Projects */}
      <section id="works" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-baseline gap-4">
            <h2 className="text-6xl md:text-9xl font-heading font-bold opacity-20 uppercase tracking-tighter">
              Selected Works
            </h2>
            <div className="w-full md:w-32 h-1 bg-cyan-400"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="about" className="relative z-10 py-32 bg-black/40 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold mb-12">
                Tech <br/> <GradientText text="EXCELLENCE" className="text-6xl md:text-8xl" />
              </h2>
              <div className="space-y-12">
                {[
                  { icon: Cpu, title: 'Performant Architectures', desc: 'Building high-scale React apps with optimized rendering cycles and intelligent state management.' },
                  { icon: Palette, title: 'Creative UI/UX', desc: 'Crafting pixel-perfect, interactive interfaces using Framer Motion, WebGL, and custom CSS shaders.' },
                  { icon: Globe, title: 'Modern Standards', desc: 'Deep expertise in TypeScript, Next.js, and automated testing frameworks to ensure long-term stability.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                      <item.icon size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-heading">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 group grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Code" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-8 -left-8 p-12 bg-cyan-600 rounded-2xl -z-10 blur-3xl opacity-20 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="relative z-10 py-32 px-6 bg-black border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-heading font-bold mb-8">
            Let's <span className="text-gray-600">Sync.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-16">
            Currently exploring new opportunities and creative collaborations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:hello@example.com" className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
              <Mail size={20} /> Say Hello
            </a>
            <div className="flex gap-4">
              <a href="#" className="p-5 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white" data-hover="true">
                <Github size={24} />
              </a>
              <a href="#" className="p-5 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white" data-hover="true">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div className="mt-32 text-gray-600 text-sm font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} — Built with Precision & Passion
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChat />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedProject.image} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} mix-blend-overlay opacity-50`} />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto max-h-[70vh] md:max-h-none">
                <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-4 block">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-3">The Challenge</h4>
                    <p className="text-gray-400 leading-relaxed text-sm italic border-l-2 border-cyan-400 pl-4">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-3">Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink size={20} /> Live Demo
                  </button>
                  <button className="flex-1 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Github size={20} /> View Code
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default App;
