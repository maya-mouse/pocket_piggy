import { STAT_GIFS, ACTIONS, RANDOM_ACTS } from './constants.js';
import { isCritical, getIdleGif, getIdleMessage } from './logic.js';

let pet = { name: '', hunger: 90, happiness: 100, health: 100, energy: 95 };
let animationTimer = null;
let isBusy = false;


chrome.storage.local.get(['petData'], (result) => {
    if (result.petData) pet = result.petData;
    render();
});

function save() {
    chrome.storage.local.set({ petData: pet });
}

function render() {
    const app = document.getElementById('app');
    if (!pet.name) {
        app.innerHTML = `
            <div class="name-title">Привіт! 🐷</div>
            <div class="pig-animation-container"><img src="${getIdleGif(pet)}" id="pigImg" class="pig-display"></div>
            <input type="text" id="nameInput" placeholder="Як назвемо?" maxlength="10">
            <button id="startBtn" class="btn-play" style="width: 100%">Почати!</button>`;
        document.getElementById('startBtn').onclick = () => {
            const val = document.getElementById('nameInput').value.trim();
            if (val) { pet.name = val; save(); render(); }
        };
    } else {
        app.innerHTML = `
            <div class="name-title">${pet.name}</div>
            <div class="pig-animation-container"><img src="${getIdleGif(pet)}" id="pigImg" class="pig-display"></div>
            <div id="bubble">${getIdleMessage(pet)}</div>
            <div class="stat-row">${drawBar("Ситість", pet.hunger, STAT_GIFS.hunger)}</div>
            <div class="stat-row">${drawBar("Щастя", pet.happiness, STAT_GIFS.happiness)}</div>
            <div class="stat-row">${drawBar("Здоров'я", pet.health, STAT_GIFS.health)}</div>
            <div class="stat-row">${drawBar("Енергія", pet.energy, STAT_GIFS.energy)}</div>
            <div class="btn-grid">
                ${Object.keys(ACTIONS).map(id => `<button id="${id}" class="btn-${id}">${id === 'feed' ? 'Їсти' : id === 'play' ? 'Грати' : id === 'sleep' ? 'Спати' : id === 'clean' ? 'Мити' : id === 'heal' ? 'Ліки' : 'Танці'}</button>`).join('')}
            </div>`;
        setup();
    }
}

function setup() {
    Object.keys(ACTIONS).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.onclick = () => {
            const bubble = document.getElementById('bubble');
            const [msg, hun, hap, hel, nrg, gif] = ACTIONS[id];

            if ((id === 'play' || id === 'dance') && pet.energy < 15) { bubble.innerText = "Занадто мало сил... "; return; }
            if (id === 'feed' && pet.hunger >= 100) { bubble.innerText = "Я вже не можу їсти! "; return; }
            if ((id === 'play' || id === 'dance') && pet.health < 25) { bubble.innerText = "Погано почуваюсь для ігор..."; return; }

            isBusy = true;
            const img = document.getElementById('pigImg');
            if (img) img.src = gif;
            if (bubble) bubble.innerText = msg;

            if (animationTimer) clearTimeout(animationTimer);
            animationTimer = setTimeout(() => {
                if (img) img.src = getIdleGif(pet);
                if (bubble) bubble.innerText = getIdleMessage(pet);
                isBusy = false;
            }, 3500);

            pet.hunger += hun; pet.happiness += hap; pet.health += hel; pet.energy += nrg;
            applyLimitsAndSave();
            updateUI();
        };
    });
}

function applyLimitsAndSave() {
    ["hunger", "happiness", "health", "energy"].forEach(k => pet[k] = Math.min(100, Math.max(0, pet[k])));
    save();
}

function updateUI() {
    const stats = ["hunger", "happiness", "health", "energy"];
    const labels = ["Ситість", "Щастя", "Здоров'я", "Енергія"];
    const rows = document.querySelectorAll('.stat-row');
    stats.forEach((key, index) => {
        if (rows[index]) rows[index].innerHTML = drawBar(labels[index], pet[key], STAT_GIFS[key]);
    });
    
    const img = document.getElementById('pigImg');
    const bubble = document.getElementById('bubble');
    if (img && !isBusy) {
        img.src = getIdleGif(pet);
        if (bubble) bubble.innerText = getIdleMessage(pet);
    }
}

function drawBar(label, val, iconSrc) {
    const barColor = val < 20 ? "#ff4d4d" : "#ff69b4";
    return `
        <div class="stat-label">
            <div class="stat-info"><img src="${iconSrc}" class="stat-icon"><span>${label}</span></div>
            <span style="color: ${val < 20 ? 'red' : 'inherit'}">${Math.round(val)}%</span>
        </div>
        <div class="bar-bg"><div class="bar-fill" style="width: ${val}%; background: ${barColor}"></div></div>`;
}


setInterval(() => {
    if (pet.name && !isBusy) {
        if (isCritical(pet)) return;
        if (Math.random() < 0.6) {
            const act = RANDOM_ACTS[Math.floor(Math.random() * RANDOM_ACTS.length)];
            const img = document.getElementById('pigImg');
            const bubble = document.getElementById('bubble');
            if (img) img.src = act.gif;
            if (bubble) bubble.innerText = act.msg;
            setTimeout(() => {
                if (!isBusy) {
                    if (img) img.src = getIdleGif(pet);
                    if (bubble) bubble.innerText = getIdleMessage(pet);
                }
            }, 2000);
        }
    }
}, 3000);


setInterval(() => {
    if (pet.name) {
        pet.hunger -= 0.5; pet.energy -= 0.3;
        if (pet.hunger < 30) { pet.health -= 1; pet.happiness -= 1; }
        else { pet.happiness -= 0.2; }
        applyLimitsAndSave();
        updateUI();
    }
}, 8000);

render();