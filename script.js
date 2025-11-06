// Single DOMContentLoaded orchestrating all setup
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  loadLogoInline();
  setupContactForm();
  setupNavScrollEffect();
  setupHoverImages();
  setupProcessCardClicks();
});

function setupMobileNav() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!burger || !menu) return;
  const isMobile = () => window.innerWidth <= 640;

  const openMenu = () => {
    menu.style.display = 'flex';
    menu.style.setProperty('flex-direction', 'column', 'important');
    menu.style.setProperty('gap', '12px', 'important');
    burger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.style.display = 'none';
    menu.style.setProperty('display', 'none', 'important');
    burger.setAttribute('aria-expanded', 'false');
  };

  // Toggle (hamburger becomes X via CSS). Tapping again closes.
  burger.addEventListener('click', () => {
    const currentlyOpen = menu.style.display === 'flex';
    if (currentlyOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Menu sluit direct na klikken op een link (alleen op mobiel)
  // Op desktop blijft menu altijd zichtbaar (fixed position)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Alleen op mobiel: sluit menu direct na klik
      if (isMobile()) {
        closeMenu();
      }
      // Op desktop blijft menu gewoon zichtbaar (fixed position zorgt hiervoor)
    });
  });

  // Close on outside click (mobile only)
  document.addEventListener('click', (evt) => {
    if (!isMobile()) return;
    const target = evt.target;
    const clickInsideMenu = menu.contains(target);
    const clickOnBurger = burger.contains(target);
    const isOpenNow = menu.style.display === 'flex';
    if (isOpenNow && !clickInsideMenu && !clickOnBurger) {
      closeMenu();
    }
  });

  // Close on Escape (mobile only)
  document.addEventListener('keydown', (evt) => {
    if (!isMobile()) return;
    if (evt.key === 'Escape') {
      closeMenu();
    }
  });
}

async function loadLogoInline() {
  const mount = document.getElementById('logo');
  if (!mount) return;
  try {
    const logoPath = 'images/ProtoCore.svg';
    const res = await fetch(encodeURI(logoPath)); // Cache gebruiken voor betere performance
    if (!res.ok) throw new Error(`SVG not found: ${res.status}`);
    const svg = await res.text();
    mount.innerHTML = svg;

    const svgEl = mount.querySelector('svg');
    if (!svgEl) return;

    ['Logo_x5F_Basis','_x23_Letter_x5F_x5F_x5F_E','_x23_Letter_x5F_x5F_x5F_Punt'].forEach(id => {
      if (!svgEl.querySelector(`#${id}`)) console.warn(`Missing: #${id}`);
    });

    // Crop-logica UITGESCHAKELD - logo staat perfect zonder crop
    // Animaties werken gewoon op de SVG-elementen en hebben geen crop nodig
    // fixLogoTightCrop();
    
    // Animaties direct inschakelen (zonder crop-logica)
    requestAnimationFrame(() => {
      svgEl.classList.add('run-anim');
    });
    
    // Fallback voor iPhone - zorg dat logo en content altijd zichtbaar worden na 1.5s
    setTimeout(() => {
      const logo = document.getElementById('logo');
      if (logo && logo.style.opacity !== '1') {
        logo.style.opacity = '1';
        logo.style.transform = 'none';
      }
      const subtitle = document.querySelector('.hero-subtitle');
      const description = document.querySelector('.hero-description');
      if (subtitle) subtitle.style.opacity = '1';
      if (description) description.style.opacity = '1';
    }, 1500);
  } catch (err) {
    console.error('Logo load error:', err);
    const fallback = 'images/ProtoCore.svg';
    mount.innerHTML = `<img src="${fallback}" alt="Protocore logo" style="max-width:100%;height:auto;" />`;
  }
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Check voor success parameter in URL (na redirect van PHP)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === '1') {
    // Toon success melding
    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'background: #4ade80; color: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;';
    successMsg.textContent = 'Bedankt! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.';
    form.parentNode.insertBefore(successMsg, form);
    
    // Verwijder melding na 5 seconden
    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }
  
  // Laat formulier normaal verzenden naar PHP
  // Geen preventDefault meer nodig
}

function setupNavScrollEffect() {
  const nav = document.querySelector('.top-nav');
  const expertiseSection = document.getElementById('expertise');
  const aboutSection = document.getElementById('about');
  const servicesSection = document.getElementById('services');
  if (!nav) return;

  function updateNavColor() {
    // Reset all classes
    nav.classList.remove('on-dark', 'on-orange');
    
    const navRect = nav.getBoundingClientRect();
    const navCenter = navRect.top + (navRect.height / 2);
    
    // Check Expertise section (light background - keep nav dark, don't add on-dark)
    // Expertise has light background, so navigation stays dark (default)
    
    // Check About section (gray background)
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      if (navCenter >= aboutRect.top && navCenter <= aboutRect.bottom) {
        nav.classList.add('on-dark');
      }
    }
    
    // Check Services/Expertise section (white with gray stripes - keep nav dark, don't add on-orange)
    // Services has light background, so navigation stays dark (default)
  }

  window.addEventListener('scroll', updateNavColor);
  window.addEventListener('resize', updateNavColor);
  updateNavColor(); // Check initial state
}

// Strak croppen + gelijke marge - getCTM-aware (inclusief transforms/rotaties)
function fixLogoTightCrop() {
  const svg = document.querySelector('#logo svg');
  if (!svg) {
    setTimeout(fixLogoTightCrop, 50);
    return;
  }

  try {
    // 1) Animaties tijdelijk UIT (zorgt dat alles in rustpositie staat)
    svg.classList.remove('run-anim');

    // 2) Alle grafische elementen pakken
    const graphics = Array.from(svg.querySelectorAll('*'))
      .filter(el => typeof el.getBBox === 'function' && typeof el.getCTM === 'function');

    if (graphics.length === 0) {
      setTimeout(fixLogoTightCrop, 80);
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const pt = svg.createSVGPoint();

    // Helper: hoekpunt transformeren met CTM
    const tx = (m, x, y) => {
      pt.x = x; pt.y = y;
      const p = pt.matrixTransform(m);
      return { x: p.x, y: p.y };
    };

    // 3) Unie-bbox opbouwen in userspace mét transforms
    graphics.forEach(el => {
      let b;
      try { b = el.getBBox(); } catch(_) { return; }
      const m = el.getCTM();
      if (!b || !m) return;

      const corners = [
        tx(m, b.x, b.y),
        tx(m, b.x + b.width, b.y),
        tx(m, b.x + b.width, b.y + b.height),
        tx(m, b.x, b.y + b.height)
      ];

      corners.forEach(p => {
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
      });
    });

    // 4) Padding + symmetrische viewBox
    const width = maxX - minX;
    const height = maxY - minY;
    const pad = Math.round(height * 0.18);

    const vbX = Math.floor(minX - pad);
    const vbY = Math.floor(minY - pad);
    const vbW = Math.ceil(width + pad * 2);
    const vbH = Math.ceil(height + pad * 2);

    svg.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    // 5) Nu pas animaties AAN
    // kleine timeout om reflow te forceren zodat viewBox actief is vóór animaties starten
    requestAnimationFrame(() => {
      svg.classList.add('run-anim');
    });

    console.log('[Logo TightCrop] viewBox:', vbX, vbY, vbW, vbH);
  } catch (e) {
    console.warn('[Logo TightCrop] retry...', e);
    setTimeout(fixLogoTightCrop, 80);
  }
}

function setupHoverImages() {
  const cards = document.querySelectorAll('.services-process-card[data-hover-image]');
  const subjectInput = document.getElementById('subject');
  
  cards.forEach(card => {
    const imageUrl = card.getAttribute('data-hover-image');
    const hoverImageDiv = card.querySelector('.card-hover-image');
      const cardTitle = card.querySelector('h3').textContent.trim();
    let isActive = false;
    
    if (imageUrl && hoverImageDiv) {
      hoverImageDiv.style.backgroundImage = `url(${imageUrl})`;
      
      // Touch/click event handler - werkt op alle apparaten
      const handleCardInteraction = (e) => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth <= 1024;
        
        // Op touch devices (iPad, telefoons): toggle image visibility eerst
        if (isTouchDevice && isMobile) {
          e.preventDefault();
          isActive = !isActive;
          if (isActive) {
            card.classList.add('card-image-active');
            return; // Laat gebruiker eerst de foto zien
          } else {
            card.classList.remove('card-image-active');
          }
        }
        
        // Vul subject in en scroll naar contact
        if (subjectInput) {
          subjectInput.value = cardTitle.toUpperCase();
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
          }, 500);
        }
      };
      
      // Gebruik zowel touch als click events voor betere compatibiliteit
      card.addEventListener('click', handleCardInteraction);
      card.addEventListener('touchend', handleCardInteraction);
      
      // Sluit bij klik/touch buiten de card (alleen op touch devices)
      const handleOutsideClick = (e) => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice && window.innerWidth <= 1024) {
          if (!card.contains(e.target)) {
            card.classList.remove('card-image-active');
            isActive = false;
          }
        }
      };
      
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchend', handleOutsideClick);
    }
  });
}

function setupProcessCardClicks() {
  // Luister naar klikken op de process cards (SKETCH IT, RENDER IT, BUILD IT)
  const processCards = document.querySelectorAll('.services-process-card');
  const subjectInput = document.getElementById('subject');
  
  if (!subjectInput) return;
  
  processCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Zoek de h3 tekst in de card (SKETCH IT, RENDER IT, of BUILD IT)
      const h3 = card.querySelector('h3');
      if (h3 && h3.textContent) {
        // Vul het subject veld in met "Subject: " + de tekst uit de h3
        subjectInput.value = 'Subject: ' + h3.textContent.trim();
        
        // Scroll naar het contactformulier
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Focus op het subject veld na een korte delay (voor betere UX)
          setTimeout(() => {
            subjectInput.focus();
          }, 500);
        }
      }
    });
  });
}
