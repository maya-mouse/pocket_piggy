import Stats from './components/Stats';
import Piggy from './components/Piggy';
import Actions from './components/Actions';
import Notebook from './components/Notebook';
import { usePet } from './hooks/usePet';
import { saveToFile } from './utils/utils';
import { ACTIONS } from './hooks/constants';

function App() {
  const { 
    pet, setPet, currentGif, message, setMessage, handleAction,
    tabCount, showNotebook, setShowNotebook, handlePigClick 
  } = usePet();

  const cleanTabs = async () => {
    const tabs = await chrome.tabs.query({});
    const seen = new Set();
    let removedCount = 0;

    tabs.forEach(tab => {
      if (seen.has(tab.url)) {
        chrome.tabs.remove(tab.id);
        removedCount++;
      } else {
        seen.add(tab.url);
      }
    });
    setMessage(removedCount > 0 ? `Хрю! Прибрала дублікатів: ${removedCount}` : "Дублікатів не знайдено! ❀");
  };

  if (!pet.name) {
    return (
      <div className="main-card onboarding-clean">
        <div className="pig-animation-container">
          <img src="idle_state/default_idle.gif" className="pig-display" alt="piggy" />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            id="nameInput" 
            className="minimal-input" 
            placeholder="Як назвемо? . . ." 
          />
          <button className="text-link-btn" onClick={() => {
            const val = document.getElementById('nameInput').value;
            if (val) setPet({ ...pet, name: val });
          }}>Оселити 𐙚</button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-card">
      <div className="header-controls">
        <div className="tab-manager-pill" onClick={cleanTabs} title="Прибрати дублікати">
          🖇 {tabCount}
        </div>
        <button className="reset-trigger" onClick={() => setPet({ ...pet, name: '' })}>
          ❀˖°
        </button>
      </div>

      <div className="name-header">
        <div className="name-title">{pet.name}</div>
      </div>

      <div className="pig-click-zone" onClick={handlePigClick} style={{ cursor: 'pointer' }}>
        <Piggy pet={pet} gif={currentGif} message={message} />
      </div>

      <Notebook 
        isVisible={showNotebook} 
        onClose={() => setShowNotebook(false)} 
        onDownload={(textData) => {
          saveToFile(textData, pet.name);
          setMessage("Нотатки заархівовано! ✉");
        }} 
      /> 

      <Stats pet={pet} />
      <Actions onAction={handleAction} actionsConfig={ACTIONS} />
    </div>
  );
}

export default App;