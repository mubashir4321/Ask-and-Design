import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext.jsx';
import NotificationsManager from './components/NotificationsManager';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AskAnythingPage from './pages/AskAnythingPage';
import MakeDesignPage from './pages/MakeDesignPage';
import RebuildAnythingPage from './pages/RebuildAnythingPage';
import './App.css';
import './styles/Sidebar.css';

function AppContent() {
  const location = useLocation();
  
  // Define routes where sidebar should be shown
  const showSidebar = ['/ask-anything', '/make-design', '/rebuild-anything'].includes(location.pathname);
  const isHome = location.pathname === '/';
  const isAsk = location.pathname === '/ask-anything';
  
  return (
    <div className="app">
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? `main-content${isAsk ? ' chat' : ''}` : `main-content-full-width${isHome ? ' home' : ''}` }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask-anything" element={<AskAnythingPage />} />
          <Route path="/make-design" element={<MakeDesignPage />} />
          <Route path="/rebuild-anything" element={<RebuildAnythingPage />} />
        </Routes>
        <NotificationsManager />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
