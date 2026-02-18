// MONO Theme Background Effects

function createThemeEffects(themeId) {
  // Remove existing effects
  const existing = document.getElementById('theme-effects');
  if (existing) existing.remove();
  
  if (!['space', 'forest', 'ocean'].includes(themeId)) return;
  
  const container = document.createElement('div');
  container.id = 'theme-effects';
  container.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  `;
  
  if (themeId === 'space') {
    createStars(container);
  } else if (themeId === 'forest') {
    createFireflies(container);
  } else if (themeId === 'ocean') {
    createBubbles(container);
  }
  
  document.body.insertBefore(container, document.body.firstChild);
}

function createStars(container) {
  // Add CSS for twinkling
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes shoot {
      0% { transform: translateX(0) translateY(0); opacity: 1; }
      100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
    }
    .star {
      position: absolute;
      background: #fff;
      border-radius: 50%;
    }
    .shooting-star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: linear-gradient(to right, #fff, transparent);
      border-radius: 50%;
    }
  `;
  container.appendChild(style);
  
  // Create stars
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(star);
  }
  
  // Occasional shooting star
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
      left: ${20 + Math.random() * 60}%;
      top: ${Math.random() * 40}%;
      width: ${50 + Math.random() * 50}px;
      animation: shoot 1s ease-out forwards;
    `;
    container.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  }
  
  setInterval(() => {
    if (Math.random() > 0.7) createShootingStar();
  }, 3000);
}

function createFireflies(container) {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(10px, -10px); }
      50% { transform: translate(-5px, -20px); }
      75% { transform: translate(-15px, -5px); }
    }
    @keyframes glow {
      0%, 100% { opacity: 0.2; box-shadow: 0 0 2px #4ade80; }
      50% { opacity: 0.8; box-shadow: 0 0 8px #4ade80, 0 0 12px #4ade80; }
    }
    .firefly {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #4ade80;
      border-radius: 50%;
    }
  `;
  container.appendChild(style);
  
  for (let i = 0; i < 20; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: 
        float ${8 + Math.random() * 6}s ease-in-out infinite,
        glow ${2 + Math.random() * 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s, ${Math.random() * 2}s;
    `;
    container.appendChild(firefly);
  }
}

function createBubbles(container) {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rise {
      0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 0.6; }
      50% { transform: translateY(50vh) translateX(20px) scale(1.1); }
      100% { transform: translateY(-20px) translateX(-10px) scale(0.9); opacity: 0; }
    }
    @keyframes sway {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(15px); }
    }
    .bubble {
      position: absolute;
      bottom: -20px;
      background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.3), rgba(56, 189, 248, 0.1));
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 50%;
    }
  `;
  container.appendChild(style);
  
  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = 8 + Math.random() * 20;
    bubble.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation: rise ${10 + Math.random() * 10}s ease-in infinite;
    `;
    container.appendChild(bubble);
    
    setTimeout(() => bubble.remove(), 20000);
  }
  
  // Initial bubbles
  for (let i = 0; i < 8; i++) {
    setTimeout(createBubble, i * 500);
  }
  
  // Continuous bubbles
  setInterval(createBubble, 2000);
}

// Hook into theme changes
const originalSetTheme = window.setTheme;
window.setTheme = function(themeId) {
  originalSetTheme(themeId);
  createThemeEffects(themeId);
};

// Init effects for current theme
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const theme = localStorage.getItem('mono_theme') || 'light';
    createThemeEffects(theme);
  }, 100);
});
