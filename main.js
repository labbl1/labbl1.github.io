const screens = {
  home: document.getElementById('homeScreen'),
  neutralization: document.getElementById('neutralizationScreen'),
  redox: document.getElementById('redoxScreen')
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.add('hidden'));
  (screens[name] || screens.home).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => showScreen(button.dataset.open));
});
document.querySelectorAll('[data-home]').forEach(button => {
  button.addEventListener('click', () => showScreen('home'));
});
document.getElementById('homeLink').addEventListener('click', event => {
  event.preventDefault();
  showScreen('home');
});
