import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

const ProtectedRoute: React.FC = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-400 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} loading={loading} />;
  }

  return <AdminDashboard onLogout={logout} userEmail={user.email || 'Usuario'} />;
};

export default ProtectedRoute;
