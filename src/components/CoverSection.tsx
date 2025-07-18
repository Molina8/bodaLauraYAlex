import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Play, Pause } from 'lucide-react';

interface CoverSectionProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  scrollToSection: (sectionId: string) => void;
}

const CoverSection: React.FC<CoverSectionProps> = ({ isPlaying, toggleMusic, scrollToSection }) => {
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, left: number, delay: number}>>([]);

  // Generar corazones flotantes
  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2
      };
      setFloatingHearts(prev => [...prev, newHeart]);

      // Remover el corazón después de la animación
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 8000);
    };

    const interval = setInterval(generateHeart, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="cover" className="min-h-screen relative overflow-hidden">
      {/* Imagen de fondo en pantalla completa */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/portada.jpeg)',
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Corazones flotantes */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up pointer-events-none z-5"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            bottom: '-50px'
          }}
        >
          <Heart className="w-6 h-6 text-white/60 fill-white/40" />
        </div>
      ))}

      {/* Contenido superpuesto */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white max-w-4xl">
          {/* Nombres de la pareja */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-wider mb-4">
              Laura <span className="text-rose-300">&</span> Alex
            </h1>
            <div className="flex items-center justify-center gap-6 text-rose-300">
              <div className="h-px bg-rose-300 w-20"></div>
              <Heart className="w-8 h-8" />
              <div className="h-px bg-rose-300 w-20"></div>
            </div>
          </div>

          {/* Frase principal */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-serif font-light leading-relaxed mb-8 text-white/95">
              "Coincidir fue suerte.<br />
              Elegirnos cada día, es amor."
            </h2>
          </div>

          {/* Fecha de la boda */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl font-light tracking-wide text-rose-200">
              18 de Octubre, 2025
            </p>
          </div>

          {/* Indicador de scroll */}
          <div className="mt-16 animate-bounce">
            <button 
              onClick={() => scrollToSection('details')}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ChevronDown className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Botón de música */}
      <div className="absolute bottom-6 right-6 z-20">
        <button 
          onClick={toggleMusic}
          className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-rose-400" />
          ) : (
            <Play className="w-5 h-5 text-rose-400" />
          )}
        </button>
      </div>
    </section>
  );
};

export default CoverSection;
