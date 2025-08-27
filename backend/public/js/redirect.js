const countdownEl = document.getElementById("countdown");
const containerEl = document.getElementById("countdown-container");
const frontendUrl = containerEl.dataset.frontendUrl;

let countdown = 10;

function updateCountdown() {
  countdownEl.textContent = countdown;
  if (countdown <= 0) {
    window.location.href = frontendUrl;
  }
  countdown--;
}

// Start countdown when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
