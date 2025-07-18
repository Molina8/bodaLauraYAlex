import React from 'react';
import { Heart } from 'lucide-react';

interface ConfirmationPageProps {
  onBackToStart: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onBackToStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center">
        <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6" />
        <h2 className="text-2xl font-serif text-gray-800 mb-4">¡Gracias por confirmar!</h2>
        <p className="text-gray-600 mb-6">
          Hemos recibido tu confirmación. ¡Esperamos verte en nuestro día especial!
        </p>
        <button
          onClick={onBackToStart}
          className="bg-rose-300 hover:bg-rose-400 text-white px-6 py-2 rounded-full transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
