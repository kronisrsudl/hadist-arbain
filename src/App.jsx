import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import HadithCard from './components/HadithCard';
import DzikirModal from './components/DzikirModal';
import BottomNavbar from './components/BottomNavbar';
import { hadithList } from './data';
import './App.css';

// Simple debounce function
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize'), 10) || 2);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'favorites'
  const [isDzikirOpen, setDzikirOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lastReadHadith, setLastReadHadith] = useState(() => parseInt(localStorage.getItem('lastReadHadith'), 10) || 1);

  const observer = useRef(null);
  const hadithRefs = useRef(new Map());

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to last read hadith on initial load
  useEffect(() => {
    if (lastReadHadith) {
      const element = document.getElementById(`hadith-${lastReadHadith}`);
      if (element) {
        // Timeout to ensure all elements are rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Debounced function to save the last read hadith
  const saveLastRead = useCallback(debounce((id) => {
    localStorage.setItem('lastReadHadith', id);
  }, 500), []);

  const filteredHadiths = useMemo(() => {
    const sourceList = filterMode === 'favorites'
      ? hadithList.filter(h => favorites.includes(h.id))
      : hadithList;

    if (!searchQuery) {
      return sourceList;
    }

    return sourceList.filter(hadith =>
      hadith.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, filterMode, favorites]);

  // Setup Intersection Observer
  useEffect(() => {
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          saveLastRead(entry.target.dataset.id);
        }
      });
    };

    observer.current = new IntersectionObserver(callback, { threshold: 0.5 });

    const currentObserver = observer.current;
    const refs = hadithRefs.current;

    refs.forEach(ref => {
      if (ref) {
        currentObserver.observe(ref);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [saveLastRead, filteredHadiths]); // Re-run when filteredHadiths changes


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleFavorite = (hadithId) => {
    setFavorites(prev =>
      prev.includes(hadithId)
        ? prev.filter(id => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  const handleJumpToHadith = (id) => {
    const element = document.getElementById(`hadith-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-container">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hadithList={hadithList}
        onJumpToHadith={handleJumpToHadith}
        fontSize={fontSize}
        setFontSize={setFontSize}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        setDzikirOpen={setDzikirOpen}
        isSearchVisible={isSearchVisible}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="main-content">
        <div className="main-content-inner">
          {filteredHadiths.length > 0 ? (
            filteredHadiths.map((hadith) => (
              <HadithCard
                key={hadith.id}
                ref={node => {
                  if (node) {
                    hadithRefs.current.set(hadith.id, node);
                  } else {
                    hadithRefs.current.delete(hadith.id);
                  }
                }}
                hadith={hadith}
                fontSize={fontSize}
                isFavorite={favorites.includes(hadith.id)}
                toggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <div className="no-results">
              <p>Tidak ada hadis yang ditemukan.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="app-footer">
        Dibuat oleh Tri Setyo Pamungkas
      </footer>
      <DzikirModal isOpen={isDzikirOpen} onClose={() => setDzikirOpen(false)} />
      <BottomNavbar
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        setDzikirOpen={setDzikirOpen}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
