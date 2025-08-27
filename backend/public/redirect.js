let countdown = 5;

const redirectData = document.getElementById("redirect-data");
const frontendUrl = redirectData.dataset.frontendUrl;

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  countdownEl.textContent = countdown;
  if (countdown <= 0) {
    window.location.href = frontendUrl;
  }
  countdown--;
}

window.onload = () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
};
