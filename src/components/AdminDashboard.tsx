import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar, 
  Bus, 
  Utensils, 
  Music, 
  Baby,
  Download,
  LogOut,
  Heart,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { getRSVPData, FirestoreFormData } from '../services/firebaseService';

interface AdminDashboardProps {
  onLogout: () => Promise<{ success: boolean; error?: string }>;
  userEmail: string;
}

type RSVPData = FirestoreFormData & { id: string };

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, userEmail }) => {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadRSVPs();
  }, []);

  const loadRSVPs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
        setError(null);
      } else {
        setLoading(true);
      }
      
      const data = await getRSVPData();
      setRsvps(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleRefresh = () => {
    loadRSVPs(true);
  };

  const handleLogout = async () => {
    await onLogout();
  };

  // Filtrar datos
  const filteredRSVPs = rsvps.filter(rsvp => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'attending' && rsvp.willAttend) ||
      (filter === 'not-attending' && !rsvp.willAttend);
    
    const matchesSearch = 
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rsvp.companionName && rsvp.companionName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (rsvp.companionLastName && rsvp.companionLastName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Estadísticas
  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.willAttend).length,
    notAttending: rsvps.filter(r => !r.willAttend).length,
    withCompanion: rsvps.filter(r => r.willAttend && r.hasCompanion).length,
    totalGuests: rsvps.reduce((acc, r) => {
      if (!r.willAttend) return acc;
      let guests = 1; // La persona principal
      if (r.hasCompanion) guests += 1; // Acompañante
      if (r.numberOfChildren) guests += r.numberOfChildren; // Niños
      return acc + guests;
    }, 0)
  };

  const formatDate = (timestamp: { toDate?: () => Date } | null | undefined) => {
    if (!timestamp || !timestamp.toDate) return 'Fecha inválida';
    return timestamp.toDate().toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = [
      'Nombre', 'Apellido', 'Asiste', 'Restricciones Dietéticas', 
      'Tiene Acompañante', 'Nombre Acompañante', 'Apellido Acompañante',
      'Restricciones Acompañante', 'Número de Niños', 'Servicio Bus',
      'Sugerencia Musical', 'Fecha Envío'
    ];

    const csvData = filteredRSVPs.map(rsvp => [
      rsvp.name,
      rsvp.lastName,
      rsvp.willAttend ? 'Sí' : 'No',
      rsvp.dietaryRestrictions || '',
      rsvp.hasCompanion ? 'Sí' : 'No',
      rsvp.companionName || '',
      rsvp.companionLastName || '',
      rsvp.companionDietaryRestrictions || '',
      rsvp.numberOfChildren || 0,
      rsvp.busService || '',
      rsvp.songSuggestion || '',
      formatDate(rsvp.submittedAt)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rsvps_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md w-full">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => loadRSVPs()}
            className="mt-4 bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-500 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-rose-400 mr-3" />
              <div>
                <h1 className="text-2xl font-serif text-gray-800">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Laura & Alex - Boda</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm text-gray-600">Conectado: {userEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total RSVPs</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </div> */}

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Asisten</p>
                <p className="text-2xl font-bold text-gray-800">{stats.attending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">No Asisten</p>
                <p className="text-2xl font-bold text-gray-800">{stats.notAttending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-pink-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Con Acompañante</p>
                <p className="text-2xl font-bold text-gray-800">{stats.withCompanion}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Invitados</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalGuests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filtro */}
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'attending' | 'not-attending')}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <option value="all">Todos ({rsvps.length})</option>
                  <option value="attending">Asisten ({stats.attending})</option>
                  <option value="not-attending">No Asisten ({stats.notAttending})</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div className="flex items-center">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Botón de recargar */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300 ${
                  isRefreshing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-400'
                }`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Recargando...' : 'Recargar'}
              </button>

              {/* Export */}
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-white rounded-lg transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV ({filteredRSVPs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Lista de RSVPs */}
        <div className="space-y-4">
          {filteredRSVPs.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center">
              <p className="text-gray-600">No se encontraron resultados.</p>
            </div>
          ) : (
            filteredRSVPs.map((rsvp) => (
              <div
                key={rsvp.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Información Principal */}
                  <div>
                    <div className="flex items-center mb-4">
                      {rsvp.willAttend ? (
                        <UserCheck className="w-6 h-6 text-green-500 mr-3" />
                      ) : (
                        <UserX className="w-6 h-6 text-red-500 mr-3" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {rsvp.name} {rsvp.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {rsvp.willAttend ? 'Confirmó asistencia' : 'No asistirá'}
                        </p>
                      </div>
                    </div>

                    {rsvp.willAttend && (
                      <div className="space-y-3">
                        {rsvp.dietaryRestrictions && (
                          <div className="flex items-center">
                            <Utensils className="w-4 h-4 text-orange-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              Restricciones: {rsvp.dietaryRestrictions}
                            </span>
                          </div>
                        )}

                        {rsvp.numberOfChildren! > 0 && (
                          <div className="flex items-center">
                            <Baby className="w-4 h-4 text-purple-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              Niños: {rsvp.numberOfChildren}
                            </span>
                          </div>
                        )}

                        {rsvp.busService && rsvp.busService !== 'none' && (
                          <div className="flex items-center">
                            <Bus className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              Bus: {
                                rsvp.busService === 'roundtrip' ? 'Ida y vuelta' :
                                rsvp.busService === 'oneway-there' ? 'Solo ida' :
                                rsvp.busService === 'oneway-back' ? 'Solo vuelta' : ''
                              }
                            </span>
                          </div>
                        )}

                        {rsvp.songSuggestion && (
                          <div className="flex items-center">
                            <Music className="w-4 h-4 text-pink-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              Canción: {rsvp.songSuggestion}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Información del Acompañante y Metadatos */}
                  <div>
                    {rsvp.willAttend && rsvp.hasCompanion && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <Heart className="w-4 h-4 text-rose-400 mr-2" />
                          Acompañante
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-800">
                            {rsvp.companionName} {rsvp.companionLastName}
                          </p>
                          {rsvp.companionDietaryRestrictions && (
                            <p className="text-sm text-gray-600 mt-1">
                              Restricciones: {rsvp.companionDietaryRestrictions}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {formatDate(rsvp.submittedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
