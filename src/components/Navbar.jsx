import React from 'react';

const FontSizeControl = ({ fontSize, setFontSize }) => {
    const increase = () => setFontSize(size => Math.min(size + 1, 5));
    const decrease = () => setFontSize(size => Math.max(size - 1, 1));

    return (
        <div className="font-size-control">
            <button title="Perkecil Font" onClick={decrease} className="font-size-button font-size-button-left">-A</button>
            <span className="font-size-display">{fontSize}</span>
            <button title="Perbesar Font" onClick={increase} className="font-size-button font-size-button-right">+A</button>
        </div>
    )
}

const FilterModeToggle = ({ filterMode, setFilterMode }) => {
    return (
        <div className="filter-mode-toggle">
            <button onClick={() => setFilterMode('all')} className={`filter-button ${filterMode === 'all' ? 'is-active' : ''}`}>Semua</button>
            <button onClick={() => setFilterMode('favorites')} className={`filter-button filter-button-right ${filterMode === 'favorites' ? 'is-active' : ''}`}>Favorit</button>
        </div>
    )
}

const Navbar = ({ searchQuery, setSearchQuery, hadithList, onJumpToHadith, fontSize, setFontSize, isSearchVisible, theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1 className="navbar__title">Hadis Arbain An-Nawawi</h1>
        <p className="navbar__subtitle">Edisi Lengkap & Interaktif</p>
      </div>

      {/* Desktop Controls */}
      <div className="navbar__controls--desktop">
        <input
          type="text"
          placeholder="Cari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="navbar__input"
        />
        <select
          onChange={(e) => onJumpToHadith(e.target.value)} 
          className="navbar__select"
        >
          <option value="">Lompat ke...</option>
          {hadithList.map(h => (
            <option key={h.id} value={h.id}>Hadis #{h.id}</option>
          ))}
        </select>
        <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
        <button onClick={toggleTheme} className="navbar__button">
          <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
        </button>
      </div>

      {/* Mobile Search Input (conditionally rendered) */}
      {isSearchVisible && (
        <div className="navbar__mobile-search-container">
          <input
            type="text"
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar__input navbar__input--mobile"
          />
        </div>
      )}

      {/* Mobile Controls (conditionally rendered when search is not visible) */}
      {!isSearchVisible && (
        <div className="navbar__controls--mobile">
          <select
            onChange={(e) => onJumpToHadith(e.target.value)}
            className="navbar__select navbar__select--mobile"
          >
            <option value="">Lompat ke...</option>
            {hadithList.map(h => (
              <option key={h.id} value={h.id}>Hadis #{h.id}</option>
            ))}
          </select>
          <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
