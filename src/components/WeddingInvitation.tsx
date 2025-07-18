import React, { useState, useRef, useEffect } from 'react';
import { Heart, MapPin, Clock, Users, Bus, Utensils, Play, Pause, ChevronDown } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  lastName: string;
  dietaryRestrictions: string;
}

interface FormData {
  name: string;
  lastName: string;
  willAttend: boolean;
  dietaryRestrictions: string;
  guests: Guest[];
  busService: 'none' | 'roundtrip' | 'oneway-there' | 'oneway-back';
}

const WeddingInvitation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    willAttend: true,
    dietaryRestrictions: '',
    guests: [],
    busService: 'none'
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center">
          <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <h2 className="text-2xl font-serif text-gray-800 mb-4">¡Gracias por confirmar!</h2>
          <p className="text-gray-600 mb-6">
            Hemos recibido tu confirmación. ¡Esperamos verte en nuestro día especial!
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setShowForm(false);
            }}
            className="bg-rose-300 hover:bg-rose-400 text-white px-6 py-2 rounded-full transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Audio de fondo */}
      <audio ref={audioRef} loop>
        <source src="/cancion.mp3" type="audio/mpeg" />
      </audio>

      {!showForm && !showDetails ? (
        // Página principal de la invitación - Portada en pantalla completa
        <div className="min-h-screen relative">
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

              {/* Botones de navegación */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setShowDetails(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white/90 hover:bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  Confirmar Asistencia
                </button>
              </div>

              {/* Indicador de scroll */}
              <div className="mt-16 animate-bounce">
                <ChevronDown className="w-6 h-6 text-white/70 mx-auto" />
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
        </div>
      ) : showDetails ? (
        // Página de detalles del evento
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
                Laura <span className="text-rose-400">&</span> Alex
              </h1>
              <div className="flex items-center justify-center gap-4 text-rose-400 mb-6">
                <div className="h-px bg-rose-300 w-16"></div>
                <Heart className="w-6 h-6" />
                <div className="h-px bg-rose-300 w-16"></div>
              </div>
              <p className="text-xl text-gray-600 font-light">18 de Octubre, 2025</p>
            </div>

            {/* Mensaje personal */}
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 font-light leading-relaxed">
                Lo soñamos, lo vivimos, y ahora queremos compartirlo.<br />
                Celebrad con nosotros este día que marcará nuestro siempre.
              </p>
            </div>

            {/* Detalles del evento */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Ceremonia */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-rose-100 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-rose-500" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-800 mb-3 text-center">Ceremonia</h3>
                <div className="space-y-2 text-gray-600 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Sábado 18 de Octubre - 12:30</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Convento de San Esteban<br />Cehegín</span>
                  </div>
                </div>
              </div>

              {/* Celebración */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-gray-800 mb-3 text-center">Celebración</h3>
                <div className="space-y-2 text-gray-600 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Salones Cristi<br />Caravaca de la Cruz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dress Code */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">Dress Code</h3>
              <div className="text-gray-700 space-y-2 leading-relaxed text-center">
                <p>Ven como quieras, pero trae puesta la alegría.</p>
                <p>No es una pasarela, es una fiesta.</p>
                <p>Queremos abrazos cómodos, zapatos bailongos y ropa con alma.</p>
                <p className="font-medium">Vístete de ti, y ven a celebrar.</p>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                Volver
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Confirmar Asistencia
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Formulario de confirmación
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-gray-800 mb-2">Confirma tu Asistencia</h2>
              <p className="text-gray-600">Ayúdanos a preparar el día perfecto</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos personales */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              {/* Asistencia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ¿Asistirás a la ceremonia? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      checked={formData.willAttend === true}
                      onChange={() => setFormData(prev => ({ ...prev, willAttend: true }))}
                      className="mr-2 text-rose-400 focus:ring-rose-300"
                    />
                    <span className="text-gray-700">Sí, asistiré</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      checked={formData.willAttend === false}
                      onChange={() => setFormData(prev => ({ ...prev, willAttend: false }))}
                      className="mr-2 text-rose-400 focus:ring-rose-300"
                    />
                    <span className="text-gray-700">No podré asistir</span>
                  </label>
                </div>
              </div>

              {formData.willAttend && (
                <>
                  {/* Restricciones alimentarias */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Utensils className="w-4 h-4 inline mr-1" />
                      Restricciones alimentarias
                    </label>
                    <textarea
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                      placeholder="Alergias, intolerancias, preferencias vegetarianas..."
                      rows={3}
                    />
                  </div>

                  {/* Acompañantes */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        <Users className="w-4 h-4 inline mr-1" />
                        Acompañantes
                      </label>
                      <button
                        type="button"
                        onClick={addGuest}
                        className="bg-rose-200 hover:bg-rose-300 text-rose-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        + Añadir acompañante
                      </button>
                    </div>

                    {formData.guests.map((guest, index) => (
                      <div key={guest.id} className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-700">Acompañante {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeGuest(guest.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={guest.name}
                            onChange={(e) => updateGuest(guest.id, 'name', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Apellidos"
                            value={guest.lastName}
                            onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                          />
                        </div>
                        <textarea
                          placeholder="Restricciones alimentarias"
                          value={guest.dietaryRestrictions}
                          onChange={(e) => updateGuest(guest.id, 'dietaryRestrictions', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Servicio de autobús */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Bus className="w-4 h-4 inline mr-1" />
                      Servicio de autobús
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="busService"
                          value="none"
                          checked={formData.busService === 'none'}
                          onChange={(e) => setFormData(prev => ({ ...prev, busService: e.target.value as FormData['busService'] }))}
                          className="mr-2 text-rose-400 focus:ring-rose-300"
                        />
                        <span className="text-sm">No necesito</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="busService"
                          value="roundtrip"
                          checked={formData.busService === 'roundtrip'}
                          onChange={(e) => setFormData(prev => ({ ...prev, busService: e.target.value as FormData['busService'] }))}
                          className="mr-2 text-rose-400 focus:ring-rose-300"
                        />
                        <span className="text-sm">Ida y vuelta</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="busService"
                          value="oneway-there"
                          checked={formData.busService === 'oneway-there'}
                          onChange={(e) => setFormData(prev => ({ ...prev, busService: e.target.value as FormData['busService'] }))}
                          className="mr-2 text-rose-400 focus:ring-rose-300"
                        />
                        <span className="text-sm">Solo ida</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="busService"
                          value="oneway-back"
                          checked={formData.busService === 'oneway-back'}
                          onChange={(e) => setFormData(prev => ({ ...prev, busService: e.target.value as FormData['busService'] }))}
                          className="mr-2 text-rose-400 focus:ring-rose-300"
                        />
                        <span className="text-sm">Solo vuelta</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Botones */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setShowDetails(true);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Confirmar Asistencia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingInvitation;