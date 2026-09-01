(() => {
  "use strict";

  const modeButtons = [...document.querySelectorAll("[data-guide-maze-mode]")];
  const modePanels = [...document.querySelectorAll("[data-guide-maze-panel]")];

  if (!modeButtons.length || !modePanels.length) return;

  function selectMazeMode(mode) {
    modeButtons.forEach(button => {
      const selected = button.dataset.guideMazeMode === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    modePanels.forEach(panel => {
      panel.hidden = panel.dataset.guideMazePanel !== mode;
    });
  }

  modeButtons.forEach(button => {
    button.addEventListener("click", () => selectMazeMode(button.dataset.guideMazeMode));

    button.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      const currentIndex = modeButtons.indexOf(button);
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? modeButtons.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + modeButtons.length) % modeButtons.length;
      const nextButton = modeButtons[nextIndex];

      selectMazeMode(nextButton.dataset.guideMazeMode);
      nextButton.focus();
    });
  });
})();
