import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CompletedTasks from './pages/CompletedTask';
import AllTasks from './pages/AllTask';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <Link to="/" className="nav-brand" aria-label="Go to home page">
          <div className="nav-logo">S</div>
          <span className="nav-title">Spry Tasks</span>
        </Link>
        <div className="nav-links">
          <Link to="/">All Tasks</Link>
          <Link to="/completed">Completed Tasks</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
