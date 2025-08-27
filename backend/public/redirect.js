let countdown = 8;

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
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
