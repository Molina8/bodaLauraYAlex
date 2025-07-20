import React from 'react';
import { Heart, Music, VolumeX } from 'lucide-react';

interface WelcomeScreenProps {
  onEnterWithMusic: () => void;
  onEnterWithoutMusic: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterWithMusic, onEnterWithoutMusic }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{ backgroundImage: 'url(/portada.jpg)' }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
        {/* Corazón decorativo */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
          Bienvenidos a la<br />
          invitación de<br />
          <span className="text-rose-200">Laura y<br />Alex</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
          La música de fondo es parte de la experiencia
        </p>

        {/* Botones de entrada */}
        <div className="space-y-4">
          <button
            onClick={onEnterWithMusic}
            className="w-full max-w-xs mx-auto block bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-4 px-8 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center">
              <Music className="w-5 h-5 mr-3" />
              INGRESAR CON MÚSICA
            </div>
          </button>

          <button
            onClick={onEnterWithoutMusic}
            className="w-full max-w-xs mx-auto block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-4 px-8 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 border border-white/30"
          >
            <div className="flex items-center justify-center">
              <VolumeX className="w-5 h-5 mr-3" />
              INGRESAR SIN MÚSICA
            </div>
          </button>
        </div>

        {/* Texto adicional */}
        <p className="text-sm text-gray-300 mt-6 leading-relaxed">
          Puedes cambiar la música en cualquier momento<br />
          usando el botón de música en la esquina
        </p>
      </div>

      {/* Decoración adicional - corazones flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20">
          <Heart className="w-4 h-4 text-white fill-white animate-float-hearts" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-32 right-16 opacity-15">
          <Heart className="w-3 h-3 text-white fill-white animate-float-hearts" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-48 left-20 opacity-10">
          <Heart className="w-5 h-5 text-white fill-white animate-float-hearts" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute bottom-32 right-10 opacity-20">
          <Heart className="w-4 h-4 text-white fill-white animate-float-hearts" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-48 left-16 opacity-15">
          <Heart className="w-3 h-3 text-white fill-white animate-float-hearts" style={{ animationDelay: '3s' }} />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
