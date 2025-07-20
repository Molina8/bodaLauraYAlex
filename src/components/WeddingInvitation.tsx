import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import CoverSection from './CoverSection';
import DetailsSection from './DetailsSection';
import RSVPSection from './RSVPSection';
import ConfirmationPage from './ConfirmationPage';
import { FormData, Guest } from '../types';
import { saveRSVPData, validateFormData } from '../services/firebaseService';

const WeddingInvitation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    willAttend: true,
    dietaryRestrictions: '',
    hasCompanion: false,
    companion: undefined,
    numberOfChildren: 0,
    busService: 'none',
    songSuggestion: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Función para alternar play/pause
  const toggleMusic = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.currentTime = 0; // Reiniciar desde el principio
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('❌ Error al reproducir música:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  // Funciones para manejar la entrada desde la pantalla de bienvenida
  const handleEnterWithMusic = async () => {
    setMusicEnabled(true);
    setShowWelcome(false);
    
    // Reproducir música inmediatamente tras la interacción del usuario
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.volume = 0.7;
      
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('❌ Error al reproducir música:', error);
        setIsPlaying(false);
      }
    }
    
    // Scroll al inicio
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleEnterWithoutMusic = () => {
    setMusicEnabled(false);
    setShowWelcome(false);
    setIsPlaying(false);
    
    // Scroll al inicio
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para resetear el formulario al estado inicial
  const resetForm = () => {
    setFormData({
      name: '',
      lastName: '',
      willAttend: true,
      dietaryRestrictions: '',
      hasCompanion: false,
      companion: undefined,
      numberOfChildren: 0,
      busService: 'none',
      songSuggestion: ''
    });
    setSubmitError(null);
    setIsSubmitting(false);
  };

  // Efecto para scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleCompanion = () => {
    setFormData(prev => ({
      ...prev,
      hasCompanion: !prev.hasCompanion,
      companion: !prev.hasCompanion ? {
        id: Date.now().toString(),
        name: '',
        lastName: '',
        dietaryRestrictions: ''
      } : undefined
    }));
  };

  const updateCompanion = (field: keyof Guest, value: string) => {
    setFormData(prev => ({
      ...prev,
      companion: prev.companion ? { ...prev.companion, [field]: value } : undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setSubmitError(null);
    
    // Validar datos
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      setSubmitError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);

    try {
    await saveRSVPData(formData);
      
      // Resetear formulario después del envío exitoso
      resetForm();
      
      // Mostrar página de confirmación
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar RSVP:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido al enviar la confirmación');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToStart = () => {
    setIsSubmitted(false);
    resetForm();
    scrollToSection('cover');
  };

  if (isSubmitted) {
    return <ConfirmationPage onBackToStart={handleBackToStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/cancion.mp3"
        loop
        preload="auto"
      />

      {/* Pantalla de bienvenida */}
      {showWelcome && (
        <WelcomeScreen 
          onEnterWithMusic={handleEnterWithMusic}
          onEnterWithoutMusic={handleEnterWithoutMusic}
        />
      )}

      {/* Contenido principal */}
      {!showWelcome && (
        <>
          {/* Botón de control de música - solo mostrar si la música está habilitada */}
          {musicEnabled && (
            <button
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-rose-500" />
              ) : (
                <Play className="w-6 h-6 text-rose-500" />
              )}
            </button>
          )}

          <CoverSection scrollToSection={scrollToSection} />
          <DetailsSection scrollToSection={scrollToSection} />
          <RSVPSection 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            toggleCompanion={toggleCompanion}
            updateCompanion={updateCompanion}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </>
      )}
    </div>
  );
};

export default WeddingInvitation;