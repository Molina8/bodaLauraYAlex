import React, { useState, useRef, useEffect } from 'react';
import CoverSection from './CoverSection';
import DetailsSection from './DetailsSection';
import RSVPSection from './RSVPSection';
import ConfirmationPage from './ConfirmationPage';
import { FormData, Guest } from '../types';

const WeddingInvitation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    willAttend: true,
    dietaryRestrictions: '',
    guests: [],
    busService: 'none',
    songSuggestion: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Función para alternar play/pause
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Efecto para reproducir automáticamente al cargar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Si falla el autoplay (por políticas del navegador), no hacer nada
        setIsPlaying(false);
      });
    }
  }, []);

  const addGuest = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: '',
      lastName: '',
      dietaryRestrictions: ''
    };
    setFormData(prev => ({
      ...prev,
      guests: [...prev.guests, newGuest]
    }));
  };

  const removeGuest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.filter(guest => guest.id !== id)
    }));
  };

  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.map(guest =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    setIsSubmitted(true);
  };

  const handleBackToStart = () => {
    setIsSubmitted(false);
    setShowForm(false);
    scrollToSection('cover');
  };

  if (isSubmitted) {
    return <ConfirmationPage onBackToStart={handleBackToStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Audio de fondo */}
      <audio ref={audioRef} loop>
        <source src="/cancion.mp3" type="audio/mpeg" />
      </audio>

      {!showForm ? (
        // Página principal con scroll - Todas las secciones
        <div>
          <CoverSection 
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
            scrollToSection={scrollToSection}
          />
          <DetailsSection scrollToSection={scrollToSection} />
          <RSVPSection
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            addGuest={addGuest}
            removeGuest={removeGuest}
            updateGuest={updateGuest}
          />
        </div>
      ) : (
        // Página de confirmación enviada (mantener la original)
        <ConfirmationPage onBackToStart={handleBackToStart} />
      )}
    </div>
  );
};

export default WeddingInvitation;