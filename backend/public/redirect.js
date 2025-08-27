let countdown = 10;

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  const fallbackLink = document.getElementById("fallback-link");
  if (!countdownEl || !window.frontendUrl) return;

  countdownEl.textContent = countdown;
  if (countdown <= 0) {
    window.location.href = window.frontendUrl;
  }
  countdown--;
}

window.onload = () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
};