// Content is visible immediately; this deferred script only adds controls.
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let remaining = Number(hours.textContent) * 3600 + Number(minutes.textContent) * 60 + Number(seconds.textContent);
setInterval(() => {
  if (document.hidden || remaining <= 0) return;
  remaining--;
  hours.textContent = String(Math.floor(remaining / 3600)).padStart(2, '0');
  minutes.textContent = String(Math.floor(remaining / 60) % 60).padStart(2, '0');
  seconds.textContent = String(remaining % 60).padStart(2, '0');
}, 1000);
const track = document.querySelector('.slider-track');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
    dot.setAttribute('aria-pressed', String(i === current));
  });
  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', String(i !== current));
    slide.inert = i !== current;
  });
}
document.querySelector('.slider-arrow.prev').addEventListener('click', () => showSlide(current - 1));
document.querySelector('.slider-arrow.next').addEventListener('click', () => showSlide(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
const slider = document.querySelector('.slider-container');
slider.tabIndex = 0;
slider.setAttribute('aria-label', 'Відгуки учнів. Використовуйте стрілки для перемикання.');
slider.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchX = 0;
slider.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, {passive:true});
slider.addEventListener('touchend', e => {
  const delta = touchX - e.changedTouches[0].screenX;
  if (Math.abs(delta) > 50) showSlide(current + (delta > 0 ? 1 : -1));
}, {passive:true});
showSlide(0);
const questions = [...document.querySelectorAll('.faq-question')];
questions.forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  questions.forEach(other => {
    const active = other === button && open;
    other.setAttribute('aria-expanded', String(active));
    other.parentElement.classList.toggle('active', active);
  });
}));
const viewer = document.querySelector('.media-viewer');
document.querySelectorAll('.review-open').forEach(button => button.addEventListener('click', () => {
  const source = button.querySelector('img');
  const image = new Image();
  image.src = source.src;
  image.alt = source.alt;
  viewer.querySelector('.media-body').replaceChildren(image);
  viewer.showModal();
}));
viewer.querySelector('.media-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
