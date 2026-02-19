// MONO Theme System
// Apply saved theme immediately (before DOMContentLoaded) to prevent flash
(function() {
  const saved = localStorage.getItem('mono_theme') || 'light';
  const themes = {
    light: { bg: '#fefefe', card: '#ffffff', text: '#2d2d2d', muted: '#888', accent: '#2d2d2d', border: '#e8e8e8', highlight: '#fff3cd' },
    dark: { bg: '#0a0a0a', card: '#141414', text: '#e8e8e8', muted: '#666', accent: '#e8e8e8', border: '#222', highlight: '#3d3d00' },
    cute: { bg: '#fff5f5', card: '#ffffff', text: '#5c4d4d', muted: '#b8a0a0', accent: '#f472b6', border: '#fecdd3', highlight: '#fce7f3' },
    space: { bg: '#0f0f23', card: '#1a1a35', text: '#e0e0ff', muted: '#7777aa', accent: '#a78bfa', border: '#2a2a4a', highlight: '#2e1a47' },
    forest: { bg: '#0d1f0d', card: '#142814', text: '#d4e8d4', muted: '#6a8a6a', accent: '#4ade80', border: '#1f3d1f', highlight: '#1a3d1a' },
    ocean: { bg: '#0c1929', card: '#0f2238', text: '#d4e8f4', muted: '#6a9ab8', accent: '#38bdf8', border: '#1a3a5a', highlight: '#0a2a4a' }
  };
  const t = themes[saved] || themes.light;
  const r = document.documentElement;
  r.style.setProperty('--bg', t.bg);
  r.style.setProperty('--card', t.card);
  r.style.setProperty('--text', t.text);
  r.style.setProperty('--muted', t.muted);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--border', t.border);
  r.style.setProperty('--highlight', t.highlight);
  // Inject global styles
  const style = document.createElement('style');
  style.textContent = `
    mark { background: var(--highlight); color: var(--text); padding: 2px 6px; border-radius: 4px; }
    .note, .callout, [class*="note"] { border-left-color: var(--accent) !important; }
  `;
  document.head.appendChild(style);
})();

const THEMES = {
  light: {
    name: '極簡白',
    bg: '#fefefe',
    card: '#ffffff',
    text: '#2d2d2d',
    muted: '#888',
    accent: '#2d2d2d',
    border: '#e8e8e8',
    highlight: '#fff3cd'
  },
  dark: {
    name: '極簡黑',
    bg: '#0a0a0a',
    card: '#141414',
    text: '#e8e8e8',
    muted: '#666',
    accent: '#e8e8e8',
    border: '#222',
    highlight: '#3d3d00'
  },
  cute: {
    name: '可愛粉',
    bg: '#fff5f5',
    card: '#ffffff',
    text: '#5c4d4d',
    muted: '#b8a0a0',
    accent: '#f472b6',
    border: '#fecdd3',
    highlight: '#fce7f3'
  },
  space: {
    name: '星空',
    bg: '#0f0f23',
    card: '#1a1a35',
    text: '#e0e0ff',
    muted: '#7777aa',
    accent: '#a78bfa',
    border: '#2a2a4a',
    highlight: '#2e1a47'
  },
  forest: {
    name: '森林',
    bg: '#0d1f0d',
    card: '#142814',
    text: '#d4e8d4',
    muted: '#6a8a6a',
    accent: '#4ade80',
    border: '#1f3d1f',
    highlight: '#1a3d1a'
  },
  ocean: {
    name: '海洋',
    bg: '#0c1929',
    card: '#0f2238',
    text: '#d4e8f4',
    muted: '#6a9ab8',
    accent: '#38bdf8',
    border: '#1a3a5a',
    highlight: '#0a2a4a'
  }
};

function getTheme() {
  return localStorage.getItem('mono_theme') || 'light';
}

function setTheme(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;
  
  localStorage.setItem('mono_theme', themeId);
  applyTheme(theme);
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.bg);
  root.style.setProperty('--card', theme.card);
  root.style.setProperty('--text', theme.text);
  root.style.setProperty('--muted', theme.muted);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--border', theme.border);
  root.style.setProperty('--highlight', theme.highlight);
  
  // Update meta theme-color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme.bg);
  }
}

function initTheme() {
  const themeId = getTheme();
  const theme = THEMES[themeId];
  if (theme) {
    applyTheme(theme);
  }
}

function createSettingsButton() {
  const btn = document.createElement('button');
  btn.innerHTML = '◐';
  btn.className = 'theme-toggle-btn';
  btn.onclick = openThemeModal;
  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--muted);
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.2s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  `;
  document.body.appendChild(btn);
}

function openThemeModal() {
  // Remove existing modal
  const existing = document.getElementById('theme-modal');
  if (existing) existing.remove();
  
  const currentTheme = getTheme();
  
  const modal = document.createElement('div');
  modal.id = 'theme-modal';
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      max-width: 320px;
      width: 100%;
    ">
      <div style="
        font-size: 14px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 16px;
      ">主題</div>
      
      <div id="theme-options" style="
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      ">
        ${Object.entries(THEMES).map(([id, theme]) => `
          <button onclick="selectTheme('${id}')" style="
            padding: 12px;
            border: 2px solid ${id === currentTheme ? 'var(--accent)' : 'var(--border)'};
            border-radius: 8px;
            background: ${theme.bg};
            color: ${theme.text};
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
          ">
            ${theme.name}
          </button>
        `).join('')}
      </div>
      
      <button onclick="closeThemeModal()" style="
        width: 100%;
        margin-top: 16px;
        padding: 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: transparent;
        color: var(--muted);
        font-size: 14px;
        cursor: pointer;
        font-family: inherit;
      ">關閉</button>
      
      <button onclick="forceRefresh()" style="
        width: 100%;
        margin-top: 8px;
        padding: 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: transparent;
        color: var(--muted);
        font-size: 14px;
        cursor: pointer;
        font-family: inherit;
      ">🔄 強制更新</button>
    </div>
  `;
  
  modal.onclick = (e) => {
    if (e.target === modal) closeThemeModal();
  };
  
  document.body.appendChild(modal);
}

function selectTheme(themeId) {
  setTheme(themeId);
  openThemeModal(); // Refresh modal to show selection
}

function closeThemeModal() {
  const modal = document.getElementById('theme-modal');
  if (modal) modal.remove();
}

function forceRefresh() {
  // Clear service worker cache
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
  // Unregister service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => reg.unregister());
    });
  }
  // Hard refresh
  setTimeout(() => {
    window.location.reload(true);
  }, 500);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  createSettingsButton();
});

// Also init immediately if DOM already loaded
if (document.readyState !== 'loading') {
  initTheme();
}
