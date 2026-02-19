// script.js — Interactivity for portfolio
// - Theme toggle (light/dark)
// - Contact form basic front-end validation
// - Set current year

(function(){
  // Elements
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const body = document.body;
  const yearEl = document.getElementById('year');

  // Initialize year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Persist theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') document.body.classList.add('dark');

  // Toggle handler
  themeToggle && themeToggle.addEventListener('click', ()=>{
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Contact form handling (front-end only)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){
        alert('Please fill out all fields.');
        return;
      }
      // Placeholder behaviour: show a success message. Replace with real submission endpoint.
      alert('Thanks, ' + name + '! Your message was submitted (demo).');
      form.reset();
    });
  }

  // Smooth reveal for elements (very small, performant)
  document.addEventListener('DOMContentLoaded', ()=>{
    const reveals = document.querySelectorAll('.glass');
    reveals.forEach((el,i)=>{
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
      setTimeout(()=>{el.style.transition = 'opacity 420ms ease, transform 420ms ease'; el.style.opacity = 1; el.style.transform = 'none';}, 80*i);
    });
  });
})();
