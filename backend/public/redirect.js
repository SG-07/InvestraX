const frontendUrl = "%FRONTEND_URL%"; 

let countdown = 5;
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