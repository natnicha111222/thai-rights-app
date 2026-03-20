import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Profile from './components/Profile';
import MyRights from './components/MyRights';
import Timeline from './components/Timeline';
import AllRights from './components/AllRights';
import RightModal from './components/RightModal';
import Chatbot from './components/Chatbot';

const API = 'http://localhost:5000/api';

function App() {
  const [page, setPage] = useState('home');
  const [rights, setRights] = useState([]);
  const [categories, setCategories] = useState([]);
  const [myRights, setMyRights] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(API + '/rights')
      .then(r => r.json())
      .then(d => { setRights(d.rights); setCategories(d.categories); })
      .catch(() => {});
  }, []);

  const filterRights = (prof) => {
    setProfile(prof);
    fetch(API + '/rights/filter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prof)
    })
      .then(r => r.json())
      .then(d => { setMyRights(d.rights); setPage('myRights'); })
      .catch(() => {});
  };

  const nav = [
    { id: 'home', label: '\uD83C\uDFE0 \u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01' },
    { id: 'profile', label: '\uD83D\uDC64 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19' },
    { id: 'myRights', label: '\u2B50 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19' },
    { id: 'timeline', label: '\uD83D\uDCC5 \u0E15\u0E32\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38' },
    { id: 'allRights', label: '\uD83D\uDCCB \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14' }
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setPage('home')}>
          <span>สิทธิคนไทย</span>
        </div>
        <div className="nav-links">
          {nav.map(n => (
            <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => setPage(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {nav.map(n => (
            <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => { setPage(n.id); setMenuOpen(false); }}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {page === 'home' && <Home rights={rights} myRights={myRights} categories={categories} setPage={setPage} onSelect={setSelectedRight} />}
      {page === 'profile' && <Profile onSave={filterRights} />}
      {page === 'myRights' && <MyRights rights={myRights} profile={profile} onSelect={setSelectedRight} setPage={setPage} />}
      {page === 'timeline' && <Timeline rights={rights} profile={profile} onSelect={setSelectedRight} />}
      {page === 'allRights' && <AllRights rights={rights} categories={categories} onSelect={setSelectedRight} />}

      {selectedRight && <RightModal right={selectedRight} onClose={() => setSelectedRight(null)} />}
      <Chatbot />
    </div>
  );
}

export default App;
