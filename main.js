const mainButton = document.getElementById("mainButton");

const smallButtons =
    document.querySelectorAll(".small-btn");


// popup elements
const guideButton =
    document.getElementById("guideButton");

const guidePopup =
    document.getElementById("guidePopup");

const closeGuide =
    document.getElementById("closeGuide");


// active effects
let activeEffects = [];



/* =========================
   guide popup
========================= */

guideButton.addEventListener("click", () => {

    guidePopup.classList.remove("hidden");

});

closeGuide.addEventListener("click", () => {

    guidePopup.classList.add("hidden");

});



/* =========================
   reset effects
========================= */

function resetVars(el) {

    el.style.setProperty("--tx", "0px");

    el.style.setProperty("--scale", "1");

    el.style.setProperty("--rotate", "0deg");

    el.style.setProperty("--bg", "#444");

    el.classList.remove("glow");
}



/* =========================
   apply effect
========================= */

function applyEffect(el, effect) {

    if (effect === "shake") {

        el.style.setProperty("--tx", "20px");

        setTimeout(() => {

            el.style.setProperty("--tx", "-20px");

        }, 80);
    }


    if (effect === "scale") {

        el.style.setProperty("--scale", "1.5");
    }


    if (effect === "rotate") {

        el.style.setProperty("--rotate", "25deg");
    }


    if (effect === "color") {

        el.style.setProperty("--bg", "hotpink");
    }


    if (effect === "glow") {

        el.classList.add("glow");
    }
}



/* =========================
   small button preview
========================= */

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



/* =========================
   drag start
========================= */

smallButtons.forEach(btn => {

    btn.addEventListener("dragstart", (e) => {

        e.dataTransfer.setData(
            "effect",
            btn.dataset.effect
        );

    });

});



/* =========================
   allow drop
========================= */

mainButton.addEventListener("dragover", (e) => {

    e.preventDefault();

    mainButton.classList.add("drag-over");

});


mainButton.addEventListener("dragleave", () => {

    mainButton.classList.remove("drag-over");

});



/* =========================
   drop effect
========================= */

mainButton.addEventListener("drop", (e) => {

    e.preventDefault();

    mainButton.classList.remove("drag-over");


    const effect =
        e.dataTransfer.getData("effect");


    // store effect
    activeEffects.push(effect);


    resetVars(mainButton);


    // apply all effects
    activeEffects.forEach(effect => {

        applyEffect(mainButton, effect);

    });


    setTimeout(() => {

        resetVars(mainButton);

    }, 400);

});



/* =========================
   replay effects
========================= */

mainButton.addEventListener("click", () => {

    resetVars(mainButton);

    activeEffects.forEach(effect => {

        applyEffect(mainButton, effect);

    });

});