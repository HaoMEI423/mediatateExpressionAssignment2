const mainButton = document.getElementById("mainButton");
const smallButtons = document.querySelectorAll(".small-btn");
const checkboxes = document.querySelectorAll("input[type=checkbox]");

function resetVars(el) {
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--scale", "1");
    el.style.setProperty("--rotate", "0deg");
    el.style.setProperty("--bg", "#444");
    el.classList.remove("glow");
}

function applyEffect(el, effect) {

    if (effect === "shake") {
        el.style.setProperty("--tx", "20px");

        setTimeout(() => {
            el.style.setProperty("--tx", "-20px");
        }, 80);

        setTimeout(() => {
            el.style.setProperty("--tx", "15px");
        }, 160);
    }

    if (effect === "scale") {
        el.style.setProperty("--scale", "1.6");

        setTimeout(() => {
            el.style.setProperty("--scale", "0.9");
        }, 120);
    }

    if (effect === "rotate") {
        el.style.setProperty("--rotate", "25deg");

        setTimeout(() => {
            el.style.setProperty("--rotate", "-25deg");
        }, 100);
    }

    if (effect === "color") {
        el.style.setProperty("--bg", "hotpink");

        setTimeout(() => {
            el.style.setProperty("--bg", "cyan");
        }, 120);
    }

    if (effect === "glow") {
        el.classList.add("glow");
    }
}

smallButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const effect = btn.dataset.effect;

        resetVars(btn);
        applyEffect(btn, effect);

        setTimeout(() => {
            resetVars(btn);
        }, 400);
    });
});

mainButton.addEventListener("click", () => {

    const active = [];

    checkboxes.forEach(box => {
        if (box.checked) {
            active.push(box.dataset.effect);
        }
    });

    if (active.length === 0) return;

    resetVars(mainButton);

    active.forEach(effect => {
        applyEffect(mainButton, effect);
    });

    setTimeout(() => {
        resetVars(mainButton);
    }, 400);
});