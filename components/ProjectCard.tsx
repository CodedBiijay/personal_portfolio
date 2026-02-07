/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-[450px] w-full overflow-hidden border border-white/10 bg-black cursor-pointer rounded-xl perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-hover="true"
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${project.gradient} group-hover:opacity-60 transition-opacity duration-700`} />
      
      {/* Visual Pattern */}
      <div className="absolute inset-0 flex items-center justify-center text-[150px] font-black text-white/5 select-none pointer-events-none">
        {project.id}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ transform: 'translateZ(50px)' }}>
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/30 px-3 py-1 rounded-full backdrop-blur-md bg-white/5 uppercase tracking-widest text-cyan-400">
             {project.category}
           </span>
           <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ExternalLink size={18} className="text-white" />
           </div>
        </div>

        <div>
          <h3 className="text-4xl font-heading font-bold uppercase text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded text-gray-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
