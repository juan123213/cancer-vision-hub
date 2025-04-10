
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

// For testing purposes, you can set this to false to bypass authentication
const BYPASS_AUTH_FOR_TESTING = false;

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow bypass for testing or check authentication
  if (requireAuth && !isAuthenticated && !BYPASS_AUTH_FOR_TESTING) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {(isAuthenticated || BYPASS_AUTH_FOR_TESTING) && <Navbar />}
      <main className="container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
