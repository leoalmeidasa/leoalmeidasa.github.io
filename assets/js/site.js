// Language and theme toggles. Preferences are a per-visitor convenience;
// the page works without storage (private mode) and without JavaScript (English, system theme).
(function () {
  const root = document.documentElement;

  function read(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage blocked */ }
  }

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }

  const savedLang = read('lang');
  setLang(savedLang || ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en'));

  const savedTheme = read('theme');
  if (savedTheme) root.dataset.theme = savedTheme;

  document.getElementById('langToggle').addEventListener('click', () => {
    const next = root.dataset.lang === 'en' ? 'pt' : 'en';
    setLang(next);
    write('lang', next);
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = root.dataset.theme
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    write('theme', next);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
