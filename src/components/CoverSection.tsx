import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

interface CoverSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const CoverSection: React.FC<CoverSectionProps> = ({ scrollToSection }) => {
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, left: number, delay: number}>>([]);

  // Generar corazones flotantes
  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 1
      };
      setFloatingHearts(prev => [...prev, newHeart]);

      // Remover el corazón después de la animación
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 8000);
    };

    // Generar algunos corazones iniciales
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateHeart(), i * 1000);
    }

    const interval = setInterval(generateHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="cover" className="min-h-screen relative overflow-hidden">
      {/* Imagen de fondo en pantalla completa - Mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: 'url(/portada.jpeg)',
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Imagen de fondo en pantalla completa - Desktop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: 'url(/portada-pc.jpeg)',
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Corazones flotantes dinámicos */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-hearts pointer-events-none z-5"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            bottom: '0px'
          }}
        >
          <Heart className="w-6 h-6 text-white/60 fill-white/40" />
        </div>
      ))}

      {/* Corazones flotantes estáticos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20">
          <Heart className="w-4 h-4 text-white/80 fill-white/60 animate-float-hearts" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-32 right-16 opacity-15">
          <Heart className="w-3 h-3 text-white/70 fill-white/50 animate-float-hearts" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-48 left-20 opacity-10">
          <Heart className="w-5 h-5 text-white/60 fill-white/40 animate-float-hearts" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute bottom-32 right-10 opacity-20">
          <Heart className="w-4 h-4 text-rose-200/60 fill-rose-200/40 animate-float-hearts" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-48 left-16 opacity-15">
          <Heart className="w-3 h-3 text-rose-300/50 fill-rose-300/30 animate-float-hearts" style={{ animationDelay: '3s' }} />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <Heart className="w-6 h-6 text-white/40 fill-white/20 animate-float-hearts" style={{ animationDelay: '5s' }} />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <Heart className="w-4 h-4 text-rose-100/60 fill-rose-100/40 animate-float-hearts" style={{ animationDelay: '6s' }} />
        </div>
      </div>

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
            <p className="text-xl md:text-2xl font-light tracking-wide text-rose-200 mb-6">
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
    </section>
  );
};

export default CoverSection;
