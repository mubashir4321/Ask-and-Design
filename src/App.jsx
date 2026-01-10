import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext.jsx';
import NotificationsManager from './components/NotificationsManager';
import HomePage from './pages/HomePage';
import AskAnythingPage from './pages/AskAnythingPage';
import MakeDesignPage from './pages/MakeDesignPage';
import RebuildAnythingPage from './pages/RebuildAnythingPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ask-anything" element={<AskAnythingPage />} />
            <Route path="/make-design" element={<MakeDesignPage />} />
            <Route path="/rebuild-anything" element={<RebuildAnythingPage />} />
          </Routes>
          <NotificationsManager />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
