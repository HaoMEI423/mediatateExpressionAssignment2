// =========================
// Select Elements
// =========================

const mainButton = document.getElementById("mainButton");
const smallButtons = document.querySelectorAll(".small-btn");
const guide = document.getElementById("guideOverlay");


// =========================
// Guide Overlay
// =========================

guide.addEventListener("click", () => {
    guide.classList.add("hidden");
});

// =========================
// Active Effects Storage
// =========================

let activeEffects = [];


// =========================
// Reset Effects
// =========================

function resetVars(el) {

    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--scale", "1");
    el.style.setProperty("--rotate", "0deg");
    el.style.setProperty("--bg", "#333");

    el.classList.remove("glow");
}
// =========================
// Apply Effects
// =========================

function applyEffect(el, effect) {

    // Shake
    if (effect === "shake") {

        el.style.setProperty("--tx", "20px");

        setTimeout(() => {
            el.style.setProperty("--tx", "-20px");
        }, 80);
    }


    // Scale
    if (effect === "scale") {

        el.style.setProperty("--scale", "1.4");

        setTimeout(() => {
            el.style.setProperty("--scale", "1");
        }, 200);
    }
     // Rotate
    if (effect === "rotate") {

        el.style.setProperty("--rotate", "25deg");

        setTimeout(() => {
            el.style.setProperty("--rotate", "-25deg");
        }, 100);
    }


    // Color
    if (effect === "color") {

        el.style.setProperty("--bg", "hotpink");

        setTimeout(() => {
            el.style.setProperty("--bg", "cyan");
        }, 120);
    }
      // Glow
    if (effect === "glow") {
        el.classList.add("glow");
    }
}

// =========================
// Small Button Preview
// =========================

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

// =========================
// Drag Start
// =========================

smallButtons.forEach(btn => {

    btn.addEventListener("dragstart", (e) => {

        e.dataTransfer.setData(
            "effect",
            btn.dataset.effect
        );
    });
});

// =========================
// Allow Drop Area
// =========================

mainButton.addEventListener("dragover", (e) => {

    e.preventDefault();

    mainButton.classList.add("drag-over");
});


mainButton.addEventListener("dragleave", () => {

    mainButton.classList.remove("drag-over");
});

// =========================
// Drop Effect
// =========================

mainButton.addEventListener("drop", (e) => {

    e.preventDefault();

    mainButton.classList.remove("drag-over");


    const effect = e.dataTransfer.getData("effect");


    // Avoid duplicate effects
    if (!activeEffects.includes(effect)) {
        activeEffects.push(effect);
    }
     // Trigger combined effects
    resetVars(mainButton);

    activeEffects.forEach(effect => {
        applyEffect(mainButton, effect);
    });


    // Reset animation
    setTimeout(() => {

        resetVars(mainButton);

        activeEffects.forEach(effect => {
            if (effect === "glow") {
                mainButton.classList.add("glow");
            }
        });

    }, 400);
});

// =========================
// Click Main Button
// Replay All Active Effects
// =========================

mainButton.addEventListener("click", () => {

    resetVars(mainButton);

    activeEffects.forEach(effect => {
        applyEffect(mainButton, effect);
    });


    setTimeout(() => {

        resetVars(mainButton);

        activeEffects.forEach(effect => {
            if (effect === "glow") {
                mainButton.classList.add("glow");
            }
        });
    }, 400);
});