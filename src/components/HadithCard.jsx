import React, { useState, forwardRef, useEffect } from 'react';

const HadithCard = forwardRef(({ hadith, fontSize, isFavorite, toggleFavorite }, ref) => {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopy = (textToCopy, type) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(''), 2000);
    }, () => {
      alert('Gagal menyalin teks.');
    });
  }

  const handleShare = async () => {
    const shareText = `Hadis #${hadith.id}: ${hadith.title}\n\n${hadith.arabic}\n\n${hadith.translation}\n\nSumber: Hadis Arbain An-Nawawi`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hadis #${hadith.id}: ${hadith.title}`,
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Teks hadis telah disalin ke clipboard!');
      }, () => {
        alert('Gagal menyalin teks.');
      });
    }
  };

  return (
    <div ref={ref} id={`hadith-${hadith.id}`} data-id={hadith.id} className="hadith-card">
      <div className="hadith-card__header">
        <h2 className="hadith-card__id">Hadis #{hadith.id}</h2>

        <p className="hadith-card__title">{hadith.title}</p>
      </div>
      <div dir="rtl" className="hadith-card__arabic-section">
        <p className="hadith-card__arabic-text" style={{ fontSize: `var(--font-size-arabic-${fontSize})` }}>{hadith.arabic}</p>
      </div>
      <div>
        <h3 className="hadith-card__translation-header">Terjemahan:</h3>
        <p className="hadith__translation-text" style={{ fontSize: `var(--font-size-translation-${fontSize})` }}>{hadith.translation}</p>
      </div>
      <div className="hadith-card__actions">
        <button onClick={() => toggleFavorite(hadith.id)} title="Tandai sebagai Favorit" className={`hadith-card__favorite-button ${isFavorite ? 'is-favorite' : ''}`}>
          <span className="material-symbols-outlined">
            {isFavorite ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
        <button onClick={() => handleCopy(hadith.arabic, 'arabic')} className="hadith-card__action-button">
          {copyStatus === 'arabic' ? 'Tersalin!' : 'Salin Teks Arab'}
        </button>
        <button onClick={() => handleCopy(hadith.translation, 'translation')} className="hadith-card__action-button">
          {copyStatus === 'translation' ? 'Tersalin!' : 'Salin Terjemahan'}
        </button>
        <button onClick={handleShare} className="hadith-card__action-button">
          Bagikan
        </button>
      </div>
    </div>
  );
});

export default HadithCard;