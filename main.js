(() => {
 'use strict';
 document.documentElement.classList.add('js');
 if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
 const $ = (selector, root = document) => root.querySelector(selector);
 const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
 const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const NAV = [
  ['Home', 'index.html', 'home'],
  ['Studio', 'about.html', 'about'],
  ['Services', 'services.html', 'services'],
  ['Work', 'work.html', 'work'],
  ['Contact', 'contact.html', 'contact']
 ];
 const SERVICES = [
  ['code-2', 'Web Development', 'Fast, responsive websites and web applications built around your business goals.', 'web-development'],
  ['shopping-bag', 'E-commerce', 'Online stores with intuitive shopping journeys and a polished brand experience.', 'ecommerce'],
  ['layout-template', 'UI/UX Design', 'Clear interfaces and thoughtful user journeys, from early concepts to final designs.', 'design'],
  ['blocks', 'CMS & WordPress', 'Flexible content-managed websites that are easy to update and grow.', 'wordpress'],
  ['smartphone', 'Web Applications', 'Purpose-built tools and product experiences for real-world workflows.', 'web-apps'],
  ['gauge', 'Ongoing Support', 'Practical improvements, performance tuning, and dependable post-launch care.', 'support']
 ];
 const SKILLS = {
  'Web & Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  'Backend & Data': ['PHP', 'MySQL', 'REST APIs'],
  'Commerce & CMS': ['WordPress', 'Elementor', 'Shopify'],
  'Design & Workflow': ['Figma', 'Git', 'Responsive design']
 };
 const PROJECTS = [
  ['Commerce, reimagined', 'E-commerce concept', 'A considered storefront direction with clear product discovery and a smooth path to checkout.', ['Storefront', 'Responsive UI', 'E-commerce'], '#a8cf38,#243528'],
  ['A clearer business presence', 'Website concept', 'A confident, editorial-style website direction for a growing professional services brand.', ['Web design', 'Development', 'CMS'], '#43b995,#17342b'],
  ['Make data feel simple', 'Dashboard concept', 'A clean dashboard direction that brings key information and everyday actions into focus.', ['Product UI', 'Dashboard', 'Web app'], '#a4b83a,#253522'],
  ['A brand built to move', 'Digital experience concept', 'An expressive digital home for a creative brand, balancing strong visuals with easy navigation.', ['Brand experience', 'Motion', 'Frontend'], '#42a989,#1b3028']
 ];
 const PROCESS = [
  ['01', 'Listen', 'We learn about your business, audience, goals, and what success looks like.'],
  ['02', 'Shape', 'We align on scope and direction, then map out the experience before building.'],
  ['03', 'Build', 'We develop, review, and refine the product together with regular updates.'],
  ['04', 'Launch', 'We test across devices, prepare for launch, and help you take the next step.']
 ];

 const page = document.body.dataset.page || 'home';
 const navLinks = NAV.map(([name, href, key]) => `<li><a href="${href}"${key === page ? ' aria-current="page"' : ''}>${name}</a></li>`).join('');
 if ($('#links')) $('#links').innerHTML = navLinks;
 if ($('#mobile')) $('#mobile').innerHTML = NAV.map(([name, href, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${name}</a>`).join('');

 if ($('#svc')) {
  $('#svc').innerHTML = SERVICES.map(([icon, title, description, id], index) => `
   <article id="${id}" class="card tilt rv service-card">
    <div class="flex justify-between"><i data-lucide="${icon}" class="text-v"></i><span class="text-mute text-sm">0${index + 1}</span></div>
    <h3 class="font-head text-xl mt-9">${title}</h3><p class="text-mute mt-2 text-sm">${description}</p>
    <a class="service-more" href="contact.html">Discuss this service <span aria-hidden="true">↗</span></a>
   </article>`).join('');
 }
 if ($('#skl')) {
  $('#skl').innerHTML = Object.entries(SKILLS).map(([name, skills]) => `
   <div class="card rv skill-card"><h3 class="font-head text-lg mb-4">${name}</h3>${skills.map(skill => `<span class="chip">${skill}</span>`).join('')}</div>`).join('');
 }
 if ($('#prj')) {
  $('#prj').innerHTML = PROJECTS.map((project, index) => `
   <article class="grid lg:grid-cols-2 gap-8 items-center prj">
    <div class="relative ${index % 2 ? 'lg:order-2' : ''}">
     <div class="shot" style="--g:linear-gradient(135deg,${project[4].split(',')[0]}66,${project[4].split(',')[1]})">
      <div class="concept-ui concept-ui-${index + 1}" aria-hidden="true"><span></span><span></span><span></span><b>${project[0]}</b><i></i><i></i><i></i></div>
      <span class="shot-title">${project[0]}</span><small class="concept-tag">CONCEPT DIRECTION</small>
     </div><div class="reveal-mask"></div>
    </div>
    <div class="rv project-copy"><p class="text-c text-sm">${project[1]}</p><h3 class="font-head text-3xl mt-2">${project[0]}</h3>
     <p class="text-mute mt-3">${project[2]}</p><div class="mt-4">${project[3].map(tag => `<span class="chip">${tag}</span>`).join('')}</div>
     <p class="project-note mt-4"><i data-lucide="info"></i> Illustrative concept, not a client project.</p>
    </div>
   </article>`).join('');
 }
 if ($('#prc')) {
  $('#prc').innerHTML = PROCESS.map(([number, title, description]) => `
   <article class="card rv process-card"><p class="font-head text-4xl grad">${number}</p><h3 class="font-head text-xl mt-6">${title}</h3><p class="text-mute text-sm mt-2">${description}</p></article>`).join('');
 }
 if ($('#mq')) {
  const ticker = Object.values(SKILLS).flat().map(skill => `<span>${skill}</span><span>/</span>`).join('');
  $('#mq').innerHTML = ticker + ticker;
 }
 if ($('#yr')) $('#yr').textContent = new Date().getFullYear();
 if (window.lucide) lucide.createIcons();
 else {
  const iconScript = $('script[data-icon-library]');
  if (iconScript) iconScript.addEventListener('load', () => {
   if (window.lucide) window.lucide.createIcons();
  }, { once: true });
 }

 const burger = $('#burger'), mobile = $('#mobile');
 const toggleMenu = open => {
  if (!burger || !mobile) return;
  mobile.classList.toggle('open', open);
  mobile.classList.toggle('hidden', !open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
 };
 if (burger && mobile) {
  burger.addEventListener('click', () => toggleMenu(!mobile.classList.contains('open')));
  mobile.addEventListener('click', event => { if (event.target.closest('a')) toggleMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleMenu(false); });
 }

 let scrollFrame = 0;
 const updateScrollUI = () => {
  const progress = $('#progress'), topButton = $('#top');
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
  if (topButton) {
   const visible = scrollY > 600;
   topButton.style.opacity = visible ? '1' : '0';
   topButton.style.pointerEvents = visible ? 'auto' : 'none';
  }
  scrollFrame = 0;
 };
 addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
 }, { passive: true });
 if ($('#top')) $('#top').addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

 if ('IntersectionObserver' in window) {
  if (!reduceMotion) {
   const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
     if (!entry.isIntersecting) continue;
     entry.target.classList.add('is-visible');
     revealObserver.unobserve(entry.target);
    }
   }, { rootMargin: '0px 0px -7% 0px', threshold: .04 });
   $$('.rv').forEach(element => revealObserver.observe(element));
   $$('.prj .reveal-mask').forEach(mask => {
    const maskObserver = new IntersectionObserver(([entry], observer) => {
     if (!entry.isIntersecting) return;
     mask.classList.add('is-revealed');
     observer.unobserve(mask);
    }, { threshold: .1 });
    maskObserver.observe(mask);
   });
  } else {
   $$('.rv').forEach(element => element.classList.add('is-visible'));
   $$('.prj .reveal-mask').forEach(mask => mask.classList.add('is-revealed'));
  }
 } else {
  $$('.rv').forEach(element => element.classList.add('is-visible'));
  $$('.prj .reveal-mask').forEach(mask => mask.classList.add('is-revealed'));
 }

 const cursor = $('#cursor'), visual = $('.hero-visual'), scene = $('#scene');
 let pointerFrame = 0, pointerX = 0, pointerY = 0;
 if (cursor && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  addEventListener('pointermove', event => {
   pointerX = event.clientX;
   pointerY = event.clientY;
   if (pointerFrame) return;
   pointerFrame = requestAnimationFrame(() => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate3d(${pointerX}px,${pointerY}px,0)`;
    pointerFrame = 0;
   });
  }, { passive: true });
  document.addEventListener('pointerover', event => {
   cursor.classList.toggle('hov', Boolean(event.target.closest('a,button')));
  });
  document.addEventListener('pointerleave', () => { cursor.style.opacity = '0'; });
 }
 if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  $$('.tilt').forEach(card => {
   let frame = 0, x = 0, y = 0;
   card.addEventListener('pointermove', event => {
    const bounds = card.getBoundingClientRect();
    x = (event.clientX - bounds.left) / bounds.width - .5;
    y = (event.clientY - bounds.top) / bounds.height - .5;
    if (frame) return;
    frame = requestAnimationFrame(() => {
     card.style.setProperty('--tilt-x', `${-y * 5}deg`);
     card.style.setProperty('--tilt-y', `${x * 7}deg`);
     card.classList.add('is-tilting');
     frame = 0;
    });
   }, { passive: true });
   card.addEventListener('pointerleave', () => {
    card.classList.remove('is-tilting');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
   });
  });
 }
 if (visual && scene && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  visual.addEventListener('pointermove', event => {
   const bounds = visual.getBoundingClientRect();
   const x = (event.clientX - bounds.left) / bounds.width - .5;
   const y = (event.clientY - bounds.top) / bounds.height - .5;
   scene.style.setProperty('--scene-x', `${-x * 14}px`);
   scene.style.setProperty('--scene-y', `${-y * 14}px`);
  }, { passive: true });
  visual.addEventListener('pointerleave', () => {
   scene.style.setProperty('--scene-x', '0px');
   scene.style.setProperty('--scene-y', '0px');
  });
 }

 const form = $('#form');
 if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const status = $('#status');
  let valid = true;
  form.querySelectorAll('.field').forEach(input => {
   const invalid = !input.value.trim() || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value));
   input.classList.toggle('bad', invalid);
   if (invalid) valid = false;
  });
  if (!valid) {
   status.style.color = '#ff8a8a';
   status.textContent = 'Please complete every field and enter a valid email address.';
   return;
  }
  const data = new FormData(form);
  const body = `${data.get('msg')}\n\nFrom: ${data.get('name')} (${data.get('email')})`;
  status.style.color = '#d7ff4f';
  status.textContent = 'Opening your email app with the inquiry ready to send.';
  location.href = `mailto:fahad.developer3122@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
 });
})();
