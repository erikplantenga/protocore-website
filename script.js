// Single DOMContentLoaded orchestrating all setup
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle (simple version)
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.classList.toggle('no-scroll', !open);
    });

    // Sluit menu bij klik op link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

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

  let isOpen = false;
  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

  const openMenu = () => {
    isOpen = true;
    menu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  };
  const closeMenu = () => {
    isOpen = false;
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  // Link klik: sluit alleen op mobiel
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { if (isMobile()) closeMenu(); });
  });

  // Outside click
  document.addEventListener('click', (evt) => {
    if (!isMobile() || !isOpen) return;
    if (!menu.contains(evt.target) && !burger.contains(evt.target)) {
      closeMenu();
      // extra safeguard: lock netjes los
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }
  }, { capture: true });

  // Reset bij resize
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      isOpen = false;
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
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
      // Start hero-animaties pas als logo staat → iOS doet het dan altijd goed
      document.documentElement.classList.add('hero-ready');
    });
    
    // Fallback voor iPhone - zorg dat logo en content altijd zichtbaar worden na 1.5s
    setTimeout(() => {
      const logo = document.getElementById('logo');
      if (logo && logo.style.opacity !== '1') {
        logo.style.opacity = '1';
        logo.style.transform = 'none';
      }
      const description = document.querySelector('.hero-description');
      if (description) description.style.opacity = '1';
    }, 1500);
  } catch (err) {
    console.error('Logo load error:', err);
    const fallback = 'images/ProtoCore.svg';
    mount.innerHTML = `<img src="${fallback}" alt="Protocore logo" style="max-width:100%;height:auto;" />`;
    // Zorg dat hero-ready altijd wordt toegevoegd, ook bij error
    document.documentElement.classList.add('hero-ready');
  }
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const formMessage = document.getElementById('formMessage');
  const submitButton = document.getElementById('submitButton');
  
  // Helper functie om berichten te tonen
  const showMessage = (message, isError = false) => {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    formMessage.style.background = isError ? '#fee' : '#4ade80';
    formMessage.style.color = isError ? '#c00' : 'white';
    formMessage.style.padding = '16px';
    formMessage.style.borderRadius = '8px';
    formMessage.style.marginBottom = '20px';
    formMessage.style.textAlign = 'center';
    formMessage.style.border = isError ? '2px solid #c00' : 'none';
    
    // Scroll naar bericht
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Verwijder bericht na 5 seconden (behalve bij errors, die blijven staan)
    if (!isError) {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  };
  
  // Formulier submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formAction = form.getAttribute('action');
    
    // Disable submit button tijdens verzending
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Verberg vorige berichten
    if (formMessage) formMessage.style.display = 'none';
    
    // Verzamel formulier data
    const formData = new FormData(form);
    
    // Test payload voor console logging
    const testPayload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      _subject: formData.get('_subject')
    };
    console.log('📤 Verzenden naar Formspree:', testPayload);
    
    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success!
        console.log('✅ Formulier succesvol verzonden:', data);
        showMessage('Bedankt! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.');
        form.reset();
      } else {
        // API error
        console.error('❌ Formspree API error:', data);
        const errorMsg = data.error || 'Er ging iets mis bij het versturen. Probeer het opnieuw.';
        showMessage(`Fout: ${errorMsg}`, true);
      }
    } catch (error) {
      // Network of andere error
      console.error('❌ Network error:', error);
      showMessage('Er ging iets mis bij het versturen. Controleer je internetverbinding en probeer het opnieuw.', true);
    } finally {
      // Herstel submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
  
  // Check voor success parameter in URL (voor directe links)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === '1') {
    showMessage('Bedankt! Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.');
  }
}

function setupNavScrollEffect() {
  // Op mobiel willen we GEEN sticky effect/klassewissel
  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;
  if (isMobile()) return;

  const nav = document.querySelector('.top-nav');
  const aboutSection = document.getElementById('about');
  if (!nav) return;

  const updateNavColor = () => {
    nav.classList.remove('on-dark', 'on-orange');
    const navRect = nav.getBoundingClientRect();
    const navCenter = navRect.top + (navRect.height / 2);
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      if (navCenter >= aboutRect.top && navCenter <= aboutRect.bottom) {
        nav.classList.add('on-dark');
      }
    }
  };

  window.addEventListener('scroll', updateNavColor);
  window.addEventListener('resize', updateNavColor);
  updateNavColor();
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

  let activeCard = null;
  const closeActive = () => {
    if (activeCard) {
      activeCard.classList.remove('card-image-active');
      activeCard = null;
    }
  };

  // Buiten klik sluit image
  document.addEventListener('pointerdown', (e) => {
    if (!activeCard) return;
    if (!activeCard.contains(e.target)) closeActive();
  }, { capture: true });

  cards.forEach(card => {
    const imageUrl = card.getAttribute('data-hover-image');
    const hoverImageDiv = card.querySelector('.card-hover-image');
    if (!imageUrl || !hoverImageDiv) return;
    hoverImageDiv.style.backgroundImage = `url(${imageUrl})`;

    card.addEventListener('pointerup', (e) => {
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      const isTouchish = e.pointerType === 'touch' || navigator.maxTouchPoints > 0;

      if (isMobile && isTouchish) {
        // 1e tap: toon image, 2e tap: ga naar contact
        if (activeCard === card) {
          closeActive();
          const contact = document.getElementById('contact');
          if (contact) {
            contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => document.getElementById('name')?.focus(), 500);
          }
        } else {
          closeActive();
          card.classList.add('card-image-active');
          activeCard = card;
        }
      } else {
        // desktop/tablet: direct naar contact
        const contact = document.getElementById('contact');
        if (contact) {
          contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => document.getElementById('name')?.focus(), 500);
        }
      }
    }, { passive: true });
  });
}

function setupProcessCardClicks() {
  // Luister naar klikken op de process cards (SKETCH IT, RENDER IT, BUILD IT)
  const processCards = document.querySelectorAll('.services-process-card');
  
  processCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Scroll naar het contactformulier
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus op het name veld na een korte delay (voor betere UX)
        setTimeout(() => {
          document.getElementById('name')?.focus();
        }, 500);
      }
    });
  });
}
