import { useState, useEffect } from 'react';
const Notebook = ({ isVisible, onClose, onDownload }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (isVisible) {
      chrome.storage.local.get(['userNotes'], (res) => {
        if (res.userNotes) setText(res.userNotes);
      });
    }
  }, [isVisible]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    chrome.storage.local.set({ userNotes: newText });
  };

  if (!isVisible) return null;

  return (
    <div className="notebook-container">
      <div className="notebook-header">
        <span className="notebook-dots">Нотатки . . .</span>
        <div className="notebook-controls">
          {}
          <button onClick={() => onDownload(text)} className="subtle-icon" title="Завантажити .txt">✉</button>
          {}
          <button onClick={onClose} className="subtle-icon" title="Закрити">✕</button>
        </div>
      </div>
      <div className="notebook-scroll-area">
        <textarea 
          className="notebook-textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Напиши щось розумне тут..."
        />
      </div>
    </div>
  );
};

export default Notebook;