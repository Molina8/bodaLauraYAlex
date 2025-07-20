import React from 'react';
import { Heart, Utensils, Users, Bus, Music, Baby } from 'lucide-react';
import { FormData, Guest } from '../types';

interface RSVPSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  toggleCompanion: () => void;
  updateCompanion: (field: keyof Guest, value: string) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({
  formData,
  setFormData,
  handleSubmit,
  toggleCompanion,
  updateCompanion,
  isSubmitting = false,
  submitError = null,
}) => {
  return (
    <section id="rsvp" className="min-h-screen flex items-center justify-center p-4 py-20">
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

              {/* Sugerencia de canción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Music className="w-4 h-4 inline mr-1" />
                  Canción que te gustaría escuchar
                </label>
                <input
                  type="text"
                  value={formData.songSuggestion}
                  onChange={(e) => setFormData(prev => ({ ...prev, songSuggestion: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  placeholder="Título y artista de la canción que te gustaría que sonara..."
                />
              </div>

              {/* Acompañante */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 inline mr-1" />
                    ¿Vienes con acompañante?
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasCompanion}
                      onChange={toggleCompanion}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-400"></div>
                  </label>
                </div>

                {formData.hasCompanion && formData.companion && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-medium text-gray-700 mb-3">Datos del acompañante</h4>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.companion.name}
                        onChange={(e) => updateCompanion('name', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Apellidos"
                        value={formData.companion.lastName}
                        onChange={(e) => updateCompanion('lastName', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      />
                    </div>
                    <textarea
                      placeholder="Restricciones alimentarias del acompañante"
                      value={formData.companion.dietaryRestrictions}
                      onChange={(e) => updateCompanion('dietaryRestrictions', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                )}
              </div>

              {/* Número de niños */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Baby className="w-4 h-4 inline mr-1" />
                  En caso de asistir con niños, indica cuántos
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.numberOfChildren}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfChildren: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  placeholder="0"
                />
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

          {/* Mensaje de error */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{submitError}</p>
            </div>
          )}

          {/* Botón de envío */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl transition-all duration-300 transform ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 hover:scale-105'
              } text-white`}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPSection;
