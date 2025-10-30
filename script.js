// Single DOMContentLoaded orchestrating all setup
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  loadLogoInline();
  setupContactForm();
});

function setupMobileNav() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    menu.style.flexDirection = 'column';
    menu.style.gap = '12px';
    menu.style.padding = '12px 0';
  });
}

async function loadLogoInline() {
  const mount = document.getElementById('logo');
  if (!mount) return;
  try {
    const logoPath = 'images/ProtoCore.svg';
    const res = await fetch(encodeURI(logoPath), { cache: 'no-cache' });
    if (!res.ok) throw new Error(`SVG not found: ${res.status}`);
    const svg = await res.text();
    mount.innerHTML = svg;

    const svgEl = mount.querySelector('svg');
    if (!svgEl) return;

    ['Logo_x5F_Basis','Letter_x5F_E','Letter_x5F_Punt','Letter_x5F_TM'].forEach(id => {
      if (!svgEl.querySelector(`#${id}`)) console.warn(`Missing: #${id}`);
    });

    // Strak croppen met gelijke marges
    fixLogoTightCrop();
  } catch (err) {
    console.error('Logo load error:', err);
    const fallback = 'images/ProtoCore.svg';
    mount.innerHTML = `<img src="${fallback}" alt="Protocore logo" style="max-width:100%;height:auto;" />`;
  }
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Bedankt! We nemen snel contact met je op.');
    form.reset();
  });
}

// Strak croppen + gelijke marge
function fixLogoTightCrop(){
  const svg = document.querySelector('#logo svg');
  if(!svg) return;

  const content = svg.querySelector('#Protocore') || svg;
  try {
    const b = content.getBBox();
    const pad = Math.round(b.height * 0.18);

    svg.setAttribute('viewBox', [
      (b.x - pad),
      (b.y - pad),
      (b.width  + pad*2),
      (b.height + pad*2)
    ].join(' '));

    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
  } catch(e){
    setTimeout(fixLogoTightCrop, 50);
  }
}
