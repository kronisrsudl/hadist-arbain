
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

const MobileMenu = ({ isOpen, onClose, searchQuery, setSearchQuery, hadithList, onJumpToHadith, fontSize, setFontSize, filterMode, setFilterMode, setDzikirOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu__overlay" onClick={onClose}>
      <div className={`mobile-menu__panel ${isOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu__header">
          <h2 className="mobile-menu__title">Menu</h2>
          <button onClick={onClose} className="mobile-menu__close-button">&times;</button>
        </div>
        <div className="mobile-menu__controls">
          <input
            type="text"
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mobile-menu__input"
          />
          <select
            onChange={(e) => {
              onJumpToHadith(e.target.value);
              onClose(); // Close menu after jumping
            }}
            className="mobile-menu__select"
            defaultValue=""
          >
            <option value="" disabled>Lompat ke...</option>
            {hadithList.map(h => (
              <option key={h.id} value={h.id}>Hadis #{h.id}</option>
            ))}
          </select>
          <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
          <FilterModeToggle filterMode={filterMode} setFilterMode={setFilterMode} />
          <button
            onClick={() => {
              setDzikirOpen(true);
              onClose(); // Close menu after opening dzikir
            }}
            className="mobile-menu__button"
            title="Dzikir Pagi & Petang"
          >
            Dzikir
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
