let countdown = 10;

function updateCountdown() {
  const el = document.getElementById("countdown");
  if (el) el.textContent = countdown;

  if (countdown <= 0) {
    window.location.href = frontendUrl; 
  }
  countdown--;
}

setInterval(updateCountdown, 1000);
window.onload = updateCountdown;