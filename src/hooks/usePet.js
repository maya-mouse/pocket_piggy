import { useState, useEffect } from 'react';
import { ACTIONS, RANDOM_ACTS } from './constants';
import { getIdleGif, getIdleMessage, isCritical } from './logic';

export function usePet() {
  const [pet, setPet] = useState({ name: '', hunger: 90, happiness: 100, health: 100, energy: 95 });
  const [currentGif, setCurrentGif] = useState('idle_state/default_idle.gif');
  const [message, setMessage] = useState('Хрю');
  const [isBusy, setIsBusy] = useState(false);
  
  const [tabCount, setTabCount] = useState(0);
  const [showNotebook, setShowNotebook] = useState(false);


  useEffect(() => {
    chrome.storage.local.get(['petData'], (result) => {
      if (result.petData) setPet(result.petData);
    });
    updateTabCount();
  }, []);


  const updateTabCount = () => {
    if (chrome.tabs) {
      chrome.tabs.query({}, (tabs) => setTabCount(tabs.length));
    }
  };

  useEffect(() => {
    if (!chrome.tabs) return;
    chrome.tabs.onCreated.addListener(updateTabCount);
    chrome.tabs.onRemoved.addListener(updateTabCount);
    return () => {
      chrome.tabs.onCreated.removeListener(updateTabCount);
      chrome.tabs.onRemoved.removeListener(updateTabCount);
    };
  }, []);


  useEffect(() => {
    if (pet.name) {
      chrome.storage.local.set({ petData: pet });
      if (!isBusy) {
        setCurrentGif(getIdleGif(pet));
        setMessage(getIdleMessage(pet));
      }
    }
  }, [pet, isBusy]); 

 
  useEffect(() => {
    if (!pet.name) return;
    const randomInterval = setInterval(() => {
      if (!isBusy && !isCritical(pet) && Math.random() < 0.6) {
        const act = RANDOM_ACTS[Math.floor(Math.random() * RANDOM_ACTS.length)];
        setCurrentGif(act.gif);
        setMessage(act.msg);
        setTimeout(() => {
          if (!isBusy) {
            setCurrentGif(getIdleGif(pet));
            setMessage(getIdleMessage(pet));
          }
        }, 2000);
      }
    }, 3000);
    return () => clearInterval(randomInterval);
  }, [pet.name, isBusy, pet]);


  useEffect(() => {
    if (!pet.name) return;
    const timer = setInterval(() => {
      setPet(prev => {
        let n = { ...prev, hunger: Math.max(0, prev.hunger - 0.5), energy: Math.max(0, prev.energy - 0.3) };
        if (n.hunger < 30) { n.health = Math.max(0, n.health - 1); n.happiness = Math.max(0, n.happiness - 1); }
        else { n.happiness = Math.max(0, n.happiness - 0.2); }
        const clamped = {};
        Object.keys(n).forEach(k => {
          if (typeof n[k] === 'number') clamped[k] = Math.min(100, Math.max(0, n[k]));
          else clamped[k] = n[k];
        });
        return clamped;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [pet.name]);

  const handleAction = (id) => {
    if (isBusy) return;
    const [msg, hun, hap, hel, nrg, gif] = ACTIONS[id];
    if ((id === 'play' || id === 'dance') && pet.energy < 15) {
      setMessage("Занадто мало сил... ");
      return;
    }
    setIsBusy(true);
    setCurrentGif(gif);
    setMessage(msg);
    setPet(p => ({
      ...p,
      hunger: Math.min(100, Math.max(0, p.hunger + hun)),
      happiness: Math.min(100, Math.max(0, p.happiness + hap)),
      health: Math.min(100, Math.max(0, p.health + hel)),
      energy: Math.min(100, Math.max(0, p.energy + nrg))
    }));
    setTimeout(() => setIsBusy(false), 3500);
  };


  const handlePigClick = () => {
    setShowNotebook(!showNotebook);
    if (!showNotebook) setMessage("Слухаю... ✎");
  };

  return { 
    pet, setPet, currentGif, message, setMessage, isBusy, handleAction,
    tabCount, showNotebook, setShowNotebook, handlePigClick 
  };
}