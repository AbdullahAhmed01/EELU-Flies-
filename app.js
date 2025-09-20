// Theme switcher logic

(function() {
  const THEME_KEY = 'theme';
  const root = document.documentElement;
  const darkVars = {
    '--bg': '#344671',
    '--panel': '#0f172a',
    '--text': '#e5e7eb',
    '--muted': '#cbd5e1',
  };
  const lightVars = {
    '--bg': '#f3f4f6',
    '--panel': '#fff',
    '--text': '#222',
    '--muted': '#555',
  };

  function setTheme(mode) {
    const vars = mode === 'light' ? lightVars : darkVars;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem(THEME_KEY, mode);
    // Update switch UI
    const sw = document.getElementById('theme-toggle');
    if (sw) {
      if (mode === 'dark') sw.classList.add('dark');
      else sw.classList.remove('dark');
    }
  }

  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY) === 'light' ? 'dark' : 'light';
    setTheme(current);
  }

  window.toggleTheme = toggleTheme;

  // On load, set theme from localStorage
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || !saved) setTheme('dark');
  else setTheme('light');

  // Switch interaction
  function setupSwitch() {
    const sw = document.getElementById('theme-toggle');
    if (!sw) return;
    let dragging = false;
    let dragStartX = 0;
    sw.addEventListener('click', function(e) {
      toggleTheme();
    });
    sw.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
    sw.addEventListener('mousedown', function(e) {
      dragging = true;
      dragStartX = e.clientX;
    });
    sw.addEventListener('touchstart', function(e) {
      dragging = true;
      dragStartX = e.touches[0].clientX;
    });
    sw.addEventListener('mousemove', function(e) {
      if (!dragging) return;
      const dx = (e.clientX || 0) - dragStartX;
      if (Math.abs(dx) > 20) {
        toggleTheme();
        dragging = false;
      }
    });
    sw.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      const dx = e.touches[0].clientX - dragStartX;
      if (Math.abs(dx) > 20) {
        toggleTheme();
        dragging = false;
      }
    });
    sw.addEventListener('mouseup', function() { dragging = false; });
    sw.addEventListener('mouseleave', function() { dragging = false; });
    sw.addEventListener('touchend', function() { dragging = false; });
  }
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(setupSwitch);
})();
