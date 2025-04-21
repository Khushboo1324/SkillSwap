import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SkillProvider } from './contexts/SkillContext.jsx';

// Import pages
import HomePage from './pages/HomePage.jsx';
import SkillGiverPage from './pages/SkillGiverPage.jsx';
import SkillGiverPostsPage from './pages/SkillGiverPostsPage.jsx';
import LearnerRegistrationPage from './pages/LearnerRegistrationPage.jsx';
import MatchStatusPage from './pages/MatchStatusPage.jsx';

// Import components
import Navigation from './components/Navigation.jsx';
function App() {
  return (
    <BrowserRouter>
      <SkillProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/skill-giver" element={<SkillGiverPage />} />
              <Route path="/skill-posts" element={<SkillGiverPostsPage />} />
              <Route path="/register-learner" element={<LearnerRegistrationPage />} />
              <Route path="/match-status" element={<MatchStatusPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-4 text-center text-sm">
            <div className="container mx-auto px-4">
              <p>© 2025 SkillCircle - A Skill Swap Community Platform</p>
            </div>
          </footer>
        </div>
      </SkillProvider>
    </BrowserRouter>
  );
}

export default App;