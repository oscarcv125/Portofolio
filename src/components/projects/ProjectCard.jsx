import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    anime({
      targets: imageRef.current,
      scale: 1.05,
      duration: 800,
      easing: 'easeOutQuint'
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: imageRef.current,
      scale: 1,
      duration: 800,
      easing: 'easeOutQuint'
    });
  };

  return (
    <div 
      className="group relative"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={project.link} className="block w-full h-full">
        {/* Structural Card Container */}
        <div className="border border-editorial bg-white dark:bg-[#0a0a0a] overflow-hidden relative shadow-editorial transition-shadow duration-500 hover:shadow-2xl flex flex-col h-full">
          
          {/* Top Image / Logo Section */}
          <div className={`relative h-64 overflow-hidden border-b border-editorial flex items-center justify-center ${project.mainLogoDark ? 'bg-[#1a1a1a]' : 'bg-gray-50 dark:bg-[#111]'}`}>
             <div ref={imageRef} className="relative w-full h-full">
                {project.mainLogo ? (
                  <>
                    {/* Main logo - shown by default */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-[opacity,transform] duration-500 opacity-100 group-hover:opacity-0 group-hover:scale-95 z-10">
                      <img
                        src={project.mainLogo}
                        alt={project.title}
                        loading="lazy"
                        className={`object-contain ${project.id === 'iberdrola' ? 'max-w-[100%] max-h-[100%] scale-150' : 'max-w-[80%] max-h-[80%]'}`}
                      />
                    </div>
                    {/* Tech logos - shown on hover */}
                    <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-5 p-8 transition-[opacity,transform] duration-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 z-10">
                      {project.logos && project.logos.map((logo, idx) => (
                        <img
                          key={idx}
                          src={logo}
                          alt={`${project.title} tech ${idx}`}
                          className="w-14 h-14 object-contain transition-all duration-500"
                        />
                      ))}
                    </div>
                  </>
                ) : project.logos && project.logos.length > 0 ? (
                  <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-6 p-8">
                    {project.logos.map((logo, idx) => (
                      <img
                        key={idx}
                        src={logo}
                        alt={`${project.title} tech ${idx}`}
                        className="w-16 h-16 object-contain filter grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                      />
                    ))}
                  </div>
                ) : project.logo ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      src={project.logo}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl font-bold opacity-20">PROJECT</h3>
                  </div>
                )}
             </div>
             
             {/* Hover Accent Overlay */}
             <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-0"></div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-4 font-serif text-black dark:text-white group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed flex-grow">
              {project.description}
            </p>
            
            {/* Minimalist Link */}
            <div className="mt-8 flex items-center text-sm font-bold tracking-widest uppercase">
              <span className="text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                {project.linkText || 'View Project'}
              </span>
              <span className="ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 text-accent">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
