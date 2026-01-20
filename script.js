let pin = "";
let holdStart = null;

// INPUT DEL PIN
document.querySelectorAll(".key").forEach(key => {
  key.addEventListener("click", () => {
    if (pin.length < 4) {
      pin += key.textContent;
      updateDots();
    }
  });
});

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < pin.length);
  });
}

// GESTO SECRETO (4 segundos esquina superior izquierda)
const secretZone = document.getElementById("secret-zone");

secretZone.addEventListener("touchstart", () => {
  holdStart = Date.now();
});

secretZone.addEventListener("touchend", () => {
  if (!holdStart) return;
  const duration = Date.now() - holdStart;

  if (duration >= 4000) {
    vibratePin();
  }
  holdStart = null;
});

// VIBRACIÓN DEL PIN
function vibratePin() {
  if (!navigator.vibrate) return;

  let pattern = [];
  pin.split("").forEach(digit => {
    let duration = parseInt(digit) * 100;
    if (duration === 0) duration = 100;
    pattern.push(duration);
    pattern.push(200);
  });

  navigator.vibrate(pattern);
}
