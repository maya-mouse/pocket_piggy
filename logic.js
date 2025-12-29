export function isCritical(pet) {
    return pet.health < 25 || pet.happiness < 25 || pet.hunger < 20 || pet.energy < 20;
}

export function getIdleGif(pet) {
    return isCritical(pet) ? "./idle_state/sad_idle.gif" : "./idle_state/idle.gif";
}

export function getIdleMessage(pet) {
    if (pet.health <= 0) return "Я хворію... врятуй мене!";
    if (isCritical(pet)) return "Мені погано... хрю...";
    return "Хрю";
}