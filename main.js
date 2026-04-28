// Select the main button in the centre
const mainButton = document.getElementById("mainButton");
// Select all small preview buttons
const smallButtons = document.querySelectorAll(".small-btn");
// Select all checkboxes used for effect selection
const checkboxes = document.querySelectorAll("input[type=checkbox]");

// Reset all visual effects back to default state
function resetVars(el) {
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--scale", "1");
    el.style.setProperty("--rotate", "0deg");
    el.style.setProperty("--bg", "#6d6d6d");
    el.classList.remove("glow");
}

// Apply a selected feedback effect
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

// Small preview buttons
// Each button demonstrates its own effect
smallButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const effect = btn.dataset.effect;

         // Reset button before animation
        resetVars(btn);
        // Apply selected effect
        applyEffect(btn, effect);

         // Return to default state after animation
        setTimeout(() => {
            resetVars(btn);
        }, 400);
    });
});

// Combines all checked effects together
mainButton.addEventListener("click", () => {

    const active = [];

    // Find all selected checkboxes
    checkboxes.forEach(box => {
        if (box.checked) {
            active.push(box.dataset.effect);
        }
    });

    // Do nothing if no effect is selected
    if (active.length === 0) return;

    // Reset before applying new effects
    resetVars(mainButton);

    // Apply all selected effects
    active.forEach(effect => {
        applyEffect(mainButton, effect);
    });

     // Reset after animation completes
    setTimeout(() => {
        resetVars(mainButton);
    }, 400);
});