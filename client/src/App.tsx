import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContent } from './app/app-content/AppContent';
import { AuthProvider } from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};
export default App;
