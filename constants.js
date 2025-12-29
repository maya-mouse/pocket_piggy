export const STAT_GIFS = {
    hunger: "./bar_icons/stat_hunger.gif",
    happiness: "./bar_icons/stat_happiness.gif",
    health: "./bar_icons/stat_health.gif",
    energy: "./bar_icons/stat_energy.gif"
};

export const ACTIONS = {
    feed:  ["Смачно!", 25, 5, 2, -5, "./click_state/eat.gif"],
    play:  ["Ура-а!", -10, 25, 5, -15, "./click_state/play.gif"],
    sleep: ["Zzz... ", -10, 5, 10, 45, "./click_state/sleep.gif"],
    clean: ["Чистота! ", 0, 10, 15, -5, "./click_state/wash.gif"],
    heal:  ["Гірко, але оживляюче! ", 0, -10, 50, 5, "./click_state/heal.gif"],
    dance: ["Уіу!", -15, 30, 5, -20, "./click_state/dance.gif"]
};

export const RANDOM_ACTS = [
    { gif: "./idle_state/idle_1.gif", msg: "Хрю?..." },
    { gif: "./idle_state/idle_2.gif", msg: "Цьом!" },
    { gif: "./idle_state/idle_3.gif", msg: "Дивись як я кручусь!" }
];