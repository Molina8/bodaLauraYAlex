import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Clock, Users, Music, Sparkles, ExternalLink, Hotel, Bus, X, Star, ChevronLeft, ChevronRight, Gift, Calendar, Info } from 'lucide-react';

interface DetailsSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ scrollToSection }) => {
  const [showHotelsModal, setShowHotelsModal] = useState(false);
  const [showBusModal, setShowBusModal] = useState(false);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para generar enlace de Google Calendar
  const generateCalendarLink = () => {
    const startDate = '20251018T103000Z'; // 18 Oct 2025, 12:30 (converted to UTC)
    const endDate = '20251019T020000Z';   // 19 Oct 2025, 04:00 (estimated end time)
    const title = encodeURIComponent('Boda de Laura & Alex');
    const details = encodeURIComponent('Ceremonia: Convento de San Esteban, Cehegín (12:30)\nCelebración: Salones Cristi, Caravaca de la Cruz');
    const location = encodeURIComponent('Convento de San Esteban, Cehegín');
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  // Array de imágenes del carrusel
  const carouselImages = [
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.05 (1).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.05.jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06 (1).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06 (2).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06 (3).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06 (4).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06 (5).jpeg',
    '/carrusel/WhatsApp Image 2025-07-14 at 20.04.06.jpeg'
  ];

  // Función para ir a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  // Función para ir a la imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Cambiar cada 4 segundos

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section id="details" className="min-h-screen flex items-center justify-center p-4 py-20">
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
          <p className="text-xl text-gray-600 font-light mb-4">18 de Octubre, 2025</p>
          
          {/* Botón Agendar */}
          <div className="flex justify-center">
            <a
              href={generateCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 px-6 py-3 rounded-full transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Agendar</span>
            </a>
          </div>
        </div>

        {/* Mensaje personal */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <p className="text-xl text-gray-700 font-light leading-relaxed">
            Lo soñamos, lo vivimos, y ahora queremos compartirlo.<br />
            Celebrad con nosotros este día que marcará nuestro siempre.
          </p>
        </div>

        {/* Carrusel de fotos */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={carouselImages[currentImageIndex]}
                alt={`Foto ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 min-h-80 md:min-h-96"
              />
              
              {/* Botones de navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Indicadores */}
            <div className="flex justify-center mt-4 gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-rose-400 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
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
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Convento de San Esteban</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=Convento+de+San+Esteban+Cehegín"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 hover:text-rose-600 underline flex items-center gap-1 text-sm transition-colors"
                >
                  Cehegín
                  <ExternalLink className="w-3 h-3" />
                </a>
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
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Salones Cristi</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=Salones+Cristi+Caravaca+de+la+Cruz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 underline flex items-center gap-1 text-sm transition-colors"
                >
                  Caravaca de la Cruz
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional - Hoteles, Autobús, Regalos y Tips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {/* Hoteles */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setShowHotelsModal(true)}>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-amber-100 p-2 md:p-3 rounded-full">
                <Hotel className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-2 md:mb-3 text-center">Hoteles</h3>
            <div className="flex justify-center mb-2 md:mb-3">
              <div className="flex gap-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-current" />
                <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-current" />
              </div>
            </div>
            <p className="text-gray-600 text-center text-xs md:text-sm mb-3 md:mb-4">¿Necesitas alojamiento?</p>
            <div className="text-center">
              <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-colors">
                VER MÁS
              </button>
            </div>
          </div>

          {/* Autobús */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setShowBusModal(true)}>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                <Bus className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-2 md:mb-3 text-center">Autobús</h3>
            <p className="text-gray-600 text-center text-xs md:text-sm mb-3 md:mb-4">Conoce todos los detalles sobre el autobús</p>
            <div className="text-center">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-colors">
                + INFO
              </button>
            </div>
          </div>

          {/* Regalos */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setShowGiftsModal(true)}>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-rose-100 p-2 md:p-3 rounded-full">
                <Gift className="w-5 h-5 md:w-6 md:h-6 text-rose-600" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-2 md:mb-3 text-center">Regalos</h3>
            <p className="text-gray-600 text-center text-xs md:text-sm mb-3 md:mb-4">Información sobre regalos</p>
            <div className="text-center">
              <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-colors">
                VER MÁS
              </button>
            </div>
          </div>

          {/* Tips y Notas */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setShowTipsModal(true)}>
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <div className="bg-green-100 p-2 md:p-3 rounded-full">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-2 md:mb-3 text-center">Tips & Notas</h3>
            <p className="text-gray-600 text-center text-xs md:text-sm mb-3 md:mb-4">Información importante</p>
            <div className="text-center">
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-colors">
                LEER MÁS
              </button>
            </div>
          </div>
        </div>

        {/* Dress Code */}
        <div className="bg-gradient-to-br from-white/70 to-purple-50/80 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-lg border border-purple-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-serif text-gray-800">Dress Code</h3>
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-3 rounded-full">
              <Music className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          
          <div className="text-gray-700 space-y-3 leading-relaxed text-center">
            <div className="flex items-center justify-center gap-2 text-lg">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <p className="font-medium">Ven como quieras, pero trae puesta la alegría.</p>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            
            <p className="text-gray-600">No es una pasarela, es una fiesta.</p>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 my-4">
              <p className="flex items-center justify-center gap-2">
                <Music className="w-4 h-4 text-pink-500" />
                <span>Queremos abrazos cómodos, zapatos bailongos y ropa con alma.</span>
                <Music className="w-4 h-4 text-pink-500" />
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex gap-1">
                <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
              <p className="font-medium text-purple-700">Vístete de ti, y ven a celebrar.</p>
              <div className="flex gap-1">
                <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" style={{animationDelay: '0.6s'}} />
                <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" style={{animationDelay: '0.8s'}} />
                <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" style={{animationDelay: '1s'}} />
              </div>
            </div>
          </div>
        </div>

        {/* Botón para ir al formulario */}
        <div className="text-center">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mr-4"
          >
            Confirmar Asistencia
          </button>
        </div>
      </div>

      {/* Modal de Hoteles */}
      {showHotelsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowHotelsModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Hotel className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Hoteles</h3>
              </div>
              <button 
                onClick={() => setShowHotelsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Si vienes de lejos o quieres olvidarte del coche te dejamos una lista de alojamientos para que tengas en cuenta:
              </p>
              
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Hostal HS Cehegín</h4>
                  <a 
                    href="https://hostalcehegin.es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 underline flex items-center gap-1 transition-colors"
                  >
                    hostalcehegin.es
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Parador 10 Apartamentos</h4>
                  <a 
                    href="https://www.booking.com/searchresults.es.html?aid=311090&label=parador-10-apartamentos-w_0v6qXA2yUbZSSviMUhsAS704513628392%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1930355773649%3Alp9218374%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YcGt_tphEo8pawEozW2KQ80&gclid=CjwKCAjwp_LDBhBCEiwAK7Fnku1ad8DxvLcZWPUYbCey31gWispTr21bSCF-dOJ1ykfoH7rXgFyVixoCyT0QAvD_BwE&highlighted_hotels=9143244&redirected=1&city=-377432&hlrd=no_dates&source=hotel&expand_sb=1&keep_landing=1&sid=8bad91c6199d815d6631f2af4f189467"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 underline flex items-center gap-1 transition-colors"
                  >
                    Booking - Parador 10 Apartamentos
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Autobús */}
      {showBusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowBusModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Bus className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Autobús</h3>
              </div>
              <button 
                onClick={() => setShowBusModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Horarios de Ida
                </h4>
                <p className="text-gray-700">
                  <strong>13:30</strong> - "El Alpargatero, Cehegín" hacia el restaurante "Salones Cristi", Caravaca de la Cruz
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Horarios de Vuelta
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>21:30</strong> - Restaurante "Salones Cristi" Caravaca de la Cruz hacia "El Alpargatero", Cehegín
                  </p>
                  <p>
                    <strong>23:30</strong> - Segundo bus, igual, hasta que el cuerpo aguante y la barra libre
                  </p>
                </div>
              </div>
              
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <p className="text-rose-700 font-medium text-center">
                  ⚠️ Recuerda confirmar autobús cuando confirmes asistencia
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Regalos */}
      {showGiftsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowGiftsModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-full">
                  <Gift className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Regalos</h3>
              </div>
              <button 
                onClick={() => setShowGiftsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Vuestra presencia es lo más importante.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Pero si deseáis hacernos un regalo, agradecemos de corazón cualquier aporte para seguir construyendo nuestro hogar y nuestros sueños.
                </p>
              </div>
              
              <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
                <div className="text-center space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    Número de cuenta
                    <Heart className="w-4 h-4 text-rose-600" />
                  </h4>
                  <div className="bg-white rounded-lg p-4 font-mono text-lg font-semibold text-gray-800 tracking-wider border border-rose-300">
                    ES68 2100 8226 1713 0022 3360
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('ES68 2100 8226 1713 0022 3360')}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2 rounded-full text-sm transition-colors mt-3"
                  >
                    Copiar número de cuenta
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 italic text-sm">
                  Con amor, Laura & Alex 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Tips y Notas */}
      {showTipsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowTipsModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Tips & Notas</h3>
              </div>
              <button 
                onClick={() => setShowTipsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Puntualidad</h4>
                </div>
                <p className="text-gray-700">
                  Por favor sed puntuales
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Confirmación</h4>
                </div>
                <p className="text-gray-700">
                  Confirmad asistencia antes del <strong>22.09.2025</strong>
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Contacto</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  Para cualquier consulta, nuestros móviles son:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-300">
                    <div>
                      <p className="font-medium text-gray-800">Laura</p>
                      <p className="text-green-600 font-mono">636 440 766</p>
                    </div>
                    <button 
                      onClick={() => window.open('tel:636440766')}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      Llamar
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-300">
                    <div>
                      <p className="font-medium text-gray-800">Alex</p>
                      <p className="text-green-600 font-mono">615 406 069</p>
                    </div>
                    <button 
                      onClick={() => window.open('tel:615406069')}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      Llamar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsSection;
