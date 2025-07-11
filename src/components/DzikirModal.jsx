


import React, { useState, useEffect } from 'react';
import { morningDhikr, eveningDhikr } from '../dzikirData';

const DzikirItem = ({ dzikir, onIncrement, currentCount }) => {
  const isCompleted = currentCount >= dzikir.count;
  return (
    <div
      className={`dzikir-item-card ${isCompleted ? 'is-completed' : ''}`}
      onClick={() => onIncrement(dzikir.id)}
    >
      <div className="dzikir-item-card__header">
        <p className="dzikir-item-card__notes">{dzikir.notes}</p>
        <span className={`dzikir-item-card__count ${isCompleted ? 'is-completed' : ''}`}>
          {currentCount} / {dzikir.count}
        </span>
      </div>
      <p dir="rtl" className="dzikir-item-card__arabic">{dzikir.arabic}</p>
      <p className="dzikir-item-card__translation">{dzikir.translation}</p>
    </div>
  );
};

const DzikirModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('morning');
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem('dzikirCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  useEffect(() => {
    localStorage.setItem('dzikirCounts', JSON.stringify(counts));
  }, [counts]);

  if (!isOpen) return null;

  const handleIncrement = (id) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua hitungan dzikir?')) {
      setCounts({});
    }
  };

  const currentDzikirList = activeTab === 'morning' ? morningDhikr : eveningDhikr;

  return (
    <div className="dzikir-modal__overlay">
      <div className="dzikir-modal__content">
        <div className="dzikir-modal__header">
          <h2 className="dzikir-modal__title">Dzikir Pagi & Petang</h2>
          <button onClick={onClose} className="dzikir-modal__close-button">&times;</button>
        </div>

        <div className="dzikir-modal__tabs">
          <button
            className={`dzikir-modal__tab-button ${activeTab === 'morning' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('morning')}
          >
            Dzikir Pagi
          </button>
          <button
            className={`dzikir-modal__tab-button ${activeTab === 'evening' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('evening')}
          >
            Dzikir Petang
          </button>
        </div>

        <div className="dzikir-modal__body">
          {currentDzikirList.map(dzikir => (
            <DzikirItem
              key={dzikir.id}
              dzikir={dzikir}
              onIncrement={handleIncrement}
              currentCount={counts[dzikir.id] || 0}
            />
          ))}
        </div>

        <div className="dzikir-modal__footer">
          <button
            onClick={handleReset}
            className="dzikir-modal__reset-button"
          >
            Reset Hitungan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DzikirModal;


