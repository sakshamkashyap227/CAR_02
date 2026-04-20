'use strict';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 2200);
});


const cursor     = document.getElementById('cursor');
const cursorDot  = document.getElementById('cursor-dot');
const cursorLbl  = document.getElementById('cursor-label');

let mouseX = 0, mouseY = 0;
let dotX   = 0, dotY   = 0;
let curX   = 0, curY   = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

 
  cursorLbl.style.left = mouseX + 'px';
  cursorLbl.style.top  = mouseY + 'px';
});


function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  dotX += (mouseX - dotX) * 0.55;
  dotY += (mouseY - dotY) * 0.55;

  cursor.style.left    = curX + 'px';
  cursor.style.top     = curY + 'px';
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top  = dotY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();


document.querySelectorAll('a, button, .model-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


document.querySelectorAll('[data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorLbl.textContent = el.dataset.cursor;
    document.body.classList.add('cursor-label-visible');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-label-visible');
  });
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-item, .reveal').forEach(el => {
  revealObserver.observe(el);
});

document.querySelectorAll('.model-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / r.height) * -12;
    const ry = ((e.clientX - cx) / r.width)  *  12;
    card.style.transform = `scale(1.03) translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const modelData = {
  '90': {
    name:    'Defender 90',
    tag:     '3-Door · Compact Icon',
    desc:    'The original shape reimagined for the modern world. Compact, nimble, and devastatingly capable — the 90 is the purest expression of the Defender DNA.',
    accentColor: '#C8A96E',
    specs: [
      { label: 'Engine',       value: '3.0L Ingenium P400' },
      { label: 'Power',        value: '400 hp / 550 Nm' },
      { label: '0–100 km/h',   value: '5.6 seconds' },
      { label: 'Top Speed',    value: '191 km/h' },
      { label: 'Wading Depth', value: '900 mm' },
      { label: 'Ground Clearance', value: '291 mm' },
    ]
  },
  '110': {
    name:    'Defender 110',
    tag:     '5-Door · Family Conqueror',
    desc:    'The benchmark 5-door Defender. Versatile enough for the school run, capable enough for the Camel Trophy — the 110 does it all without compromising either.',
    accentColor: '#C8A96E',
    specs: [
      { label: 'Engine',       value: '3.0L Ingenium P400' },
      { label: 'Power',        value: '400 hp / 550 Nm' },
      { label: '0–100 km/h',   value: '5.4 seconds' },
      { label: 'Top Speed',    value: '191 km/h' },
      { label: 'Seating',      value: '5–7 passengers' },
      { label: 'Boot Space',   value: '1,075 litres' },
    ]
  },
  '130': {
    name:    'Defender 130',
    tag:     '8-Seat · Expedition Grade',
    desc:    'The largest Defender ever built. Eight seats, expedition-grade capability, and a luxurious interior that makes even the remotest journeys feel like first class.',
    accentColor: '#C8A96E',
    specs: [
      { label: 'Engine',       value: '3.0L Ingenium P400' },
      { label: 'Power',        value: '400 hp / 550 Nm' },
      { label: '0–100 km/h',   value: '5.4 seconds' },
      { label: 'Seating',      value: '8 passengers' },
      { label: 'Wheelbase',    value: '3,022 mm' },
      { label: 'Towing',       value: '3,500 kg' },
    ]
  }
};


const overlay   = document.getElementById('pop-overlay');
const popClose  = document.getElementById('pop-close');
const popDetail = document.getElementById('pop-details');
const carCube   = document.getElementById('car-cube');

function openPop(model) {
  const d = modelData[model];
  if (!d) return;

  
  popDetail.innerHTML = `
    <h2>${d.name}</h2>
    <p class="pop-tag">${d.tag}</p>
    <p class="pop-desc">${d.desc}</p>
    <ul class="pop-spec-list">
      ${d.specs.map(s => `
        <li>${s.label}<strong>${s.value}</strong></li>
      `).join('')}
    </ul>
    <button class="pop-cta" onclick="closePop()">Configure This Model →</button>
  `;

 
  document.querySelectorAll('.cube-face').forEach(f => {
    f.style.borderColor = d.accentColor;
  });

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePop() {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

popClose.addEventListener('click', closePop);
overlay.addEventListener('click', e => { if (e.target === overlay) closePop(); });

document.querySelectorAll('.model-btn').forEach(btn => {
  btn.addEventListener('click', () => openPop(btn.dataset.target));
});


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePop();
});


const specData = {
  p400: {
    cells: [
      { label: 'Engine',        value: '3.0L', unit: 'P400' },
      { label: 'Power',         value: '400',  unit: 'hp' },
      { label: 'Torque',        value: '550',  unit: 'Nm' },
      { label: '0–100 km/h',   value: '5.4',  unit: 's' },
      { label: 'Top Speed',     value: '191',  unit: 'km/h' },
      { label: 'Cylinders',     value: '6',    unit: 'Inline' },
      { label: 'Fuel',          value: '11.2', unit: 'L/100km' },
      { label: 'Emissions',     value: '257',  unit: 'g/km' },
    ],
    bars: [
      { label: 'Power Output',  pct: 90 },
      { label: 'Torque',        pct: 85 },
      { label: 'Off-road Prowess', pct: 97 },
      { label: 'Fuel Economy',  pct: 55 },
      { label: 'Top Speed',     pct: 75 },
    ]
  },
  d250: {
    cells: [
      { label: 'Engine',        value: '3.0L', unit: 'D250' },
      { label: 'Power',         value: '249',  unit: 'hp' },
      { label: 'Torque',        value: '570',  unit: 'Nm' },
      { label: '0–100 km/h',   value: '6.7',  unit: 's' },
      { label: 'Top Speed',     value: '191',  unit: 'km/h' },
      { label: 'Cylinders',     value: '6',    unit: 'Diesel' },
      { label: 'Fuel',          value: '7.4',  unit: 'L/100km' },
      { label: 'Emissions',     value: '195',  unit: 'g/km' },
    ],
    bars: [
      { label: 'Power Output',  pct: 65 },
      { label: 'Torque',        pct: 88 },
      { label: 'Off-road Prowess', pct: 96 },
      { label: 'Fuel Economy',  pct: 78 },
      { label: 'Top Speed',     pct: 72 },
    ]
  },
  phev: {
    cells: [
      { label: 'System Power',  value: '404', unit: 'hp' },
      { label: 'Electric Range',value: '43',  unit: 'km' },
      { label: 'Torque',        value: '640', unit: 'Nm' },
      { label: '0–100 km/h',   value: '5.6', unit: 's' },
      { label: 'Battery',       value: '19.2',unit: 'kWh' },
      { label: 'Charge Time',   value: '1.5', unit: 'hrs (AC)' },
      { label: 'Fuel (Hybrid)', value: '3.3', unit: 'L/100km' },
      { label: 'CO₂',           value: '74',  unit: 'g/km' },
    ],
    bars: [
      { label: 'Power Output',   pct: 91 },
      { label: 'Torque',         pct: 94 },
      { label: 'Off-road Prowess', pct: 95 },
      { label: 'Fuel Economy',   pct: 92 },
      { label: 'Top Speed',      pct: 74 },
    ]
  }
};

function renderSpecs(engine) {
  const d = specData[engine];
  const grid = document.getElementById('specs-grid');
  const bars = document.getElementById('spec-bars');

 
  grid.innerHTML = d.cells.map(c => `
    <div class="spec-cell">
      <div class="spec-cell-label">${c.label}</div>
      <div class="spec-cell-value">${c.value}<span class="spec-cell-unit">${c.unit}</span></div>
    </div>
  `).join('');

  bars.innerHTML = d.bars.map(b => `
    <div class="spec-bar-row">
      <span class="spec-bar-label">${b.label}</span>
      <div class="spec-bar-track"><div class="spec-bar-fill" style="width:0" data-pct="${b.pct}"></div></div>
      <span class="spec-bar-pct">${b.pct}%</span>
    </div>
  `).join('');


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.spec-bar-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    });
  });
}

document.querySelectorAll('.spec-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderSpecs(tab.dataset.engine);
  });
});


renderSpecs('p400');


window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo && scrolled < window.innerHeight) {
    heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      galleryObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(el => {
  el.classList.add('reveal');
  galleryObserver.observe(el);
});


const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.model-card').forEach(el => {
  el.classList.add('reveal');
  cardObserver.observe(el);
});