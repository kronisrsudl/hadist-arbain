import React from 'react';

const BottomNavbar = ({ filterMode, setFilterMode, setDzikirOpen, isSearchVisible, setIsSearchVisible, theme, toggleTheme }) => {
  const handleSearchClick = () => {
    setIsSearchVisible(prev => !prev);
  };

  return (
    <nav className="bottom-navbar">
      <button
        className={`bottom-navbar__button ${filterMode === 'all' ? 'is-active' : ''}`}
        onClick={() => setFilterMode('all')}
        title="Semua Hadis"
      >
        <span className="material-symbols-outlined">book</span>
        <span className="bottom-navbar__label">Semua</span>
      </button>
      <button
        className={`bottom-navbar__button ${filterMode === 'favorites' ? 'is-active' : ''}`}
        onClick={() => setFilterMode('favorites')}
        title="Hadis Favorit"
      >
        <span className="material-symbols-outlined">bookmark</span>
        <span className="bottom-navbar__label">Favorit</span>
      </button>
      <button
        className="bottom-navbar__button"
        onClick={() => setDzikirOpen(true)}
        title="Dzikir Pagi & Petang"
      >
        <span className="material-symbols-outlined">self_improvement</span>
        <span className="bottom-navbar__label">Dzikir</span>
      </button>
      <button
        className={`bottom-navbar__button ${isSearchVisible ? 'is-active' : ''}`}
        onClick={handleSearchClick}
        title="Cari Hadis"
      >
        <span className="material-symbols-outlined">search</span>
        <span className="bottom-navbar__label">Cari</span>
      </button>
      <button
        className="bottom-navbar__button"
        onClick={toggleTheme}
        title="Ganti Tema"
      >
        <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
        <span className="bottom-navbar__label">Tema</span>
      </button>
    </nav>
  );
};

export default BottomNavbar;
