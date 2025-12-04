# 🔧 Protocore Website - Onderhoud & Troubleshooting

**Laatste update:** 2025  
**Website:** https://protocore.nl  
**Hosting:** GitHub Pages (statisch)

---

## 📋 Inhoudsopgave

1. [Overzicht](#overzicht)
2. [Belangrijke Bestanden](#belangrijke-bestanden)
3. [Formspree Configuratie](#formspree-configuratie)
4. [GitHub Pages Setup](#github-pages-setup)
5. [Troubleshooting](#troubleshooting)
6. [Aanpassingen Maken](#aanpassingen-maken)
7. [Back-up & Herstel](#back-up--herstel)
8. [Contact & Support](#contact--support)

---

## 🎯 Overzicht

De Protocore website is een **volledig statische website** die draait op **GitHub Pages**. Er wordt **geen PHP of server-side code** gebruikt.

### Technologie Stack:
- **HTML5** - Structuur
- **CSS3** - Styling (geen frameworks)
- **Vanilla JavaScript** - Functionaliteit (geen libraries)
- **Formspree** - Contactformulier email service
- **GitHub Pages** - Hosting

### Belangrijke URLs:
- **Live website:** https://protocore.nl
- **GitHub repository:** https://github.com/erikplantenga/protocore-website
- **Formspree dashboard:** https://formspree.io

---

## 📁 Belangrijke Bestanden

### Core Bestanden:
```
protocore-website/
├── index.html          # Hoofdpagina (ALLE content staat hier)
├── style.css          # Alle styling en CSS
├── script.js          # Alle JavaScript functionaliteit
├── CNAME              # Custom domain configuratie (protocore.nl)
└── ONDERHOUD.md       # Dit bestand
```

### Image Mappen:
```
images/
├── ProtoCore.svg              # Logo (SVG)
├── ProtoCore-03.png tot 08.png  # Iconen
├── Expertise/                 # Expertise sectie afbeeldingen
│   ├── sketch-it.jpg
│   ├── render-it.jpeg
│   └── build-it.webp
└── Images/
    ├── About Us/About.jpeg
    └── Services/              # Service afbeeldingen
```

### Wat ELKE bestand doet:

**index.html:**
- Bevat alle HTML structuur
- Contactformulier met Formspree endpoint
- Alle secties: Hero, Expertise, About, Contact, Footer

**style.css:**
- Alle styling (responsive design)
- Animaties en transitions
- Mobile-first approach
- Breakpoints: mobile (<768px), tablet (768-968px), desktop (>968px)

**script.js:**
- Hamburger menu functionaliteit
- Logo animaties
- Contactformulier handling (Formspree)
- Smooth scrolling
- Hover effects op expertise cards
- Formulier validatie en error handling

**CNAME:**
- Zorgt dat GitHub Pages de custom domain (protocore.nl) gebruikt
- **NIET aanpassen** tenzij je de domain wilt wijzigen

---

## 📧 Formspree Configuratie

### Huidige Setup:
- **Endpoint:** `https://formspree.io/f/xyzrpyob`
- **Email ontvanger:** info@protocore.nl (configureer in Formspree dashboard)
- **Formulier velden:** name, email, message
- **Hidden field:** `_subject` = "Nieuw bericht via protocore.nl"

### Waar staat het endpoint?
**Bestand:** `index.html`  
**Regel:** ~186  
```html
<form id="contactForm" action="https://formspree.io/f/xyzrpyob" method="POST">
```

### Formspree Problemen Oplossen:

#### ❌ Formulier werkt niet / Geen emails ontvangen

1. **Check Formspree Dashboard:**
   - Ga naar https://formspree.io
   - Login met je account
   - Check of formulier `xyzrpyob` actief is
   - Check of email adres correct is ingesteld (info@protocore.nl)

2. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Ga naar "Console" tab
   - Verzend test formulier
   - Kijk naar errors:
     - `❌ Formspree API error:` = API probleem
     - `❌ Network error:` = Netwerk probleem
     - `📤 Verzenden naar Formspree:` = Formulier wordt verzonden (goed!)

3. **Test Endpoint:**
   - Check of endpoint correct is in `index.html`
   - Endpoint moet zijn: `https://formspree.io/f/xyzrpyob`
   - **GEEN** `<hier-formspree-endpoint>` placeholder!

4. **Check Formspree Limits:**
   - Gratis plan: 50 submissions/maand
   - Check in dashboard of je over limit bent

#### ✅ Formulier werkt, maar emails komen niet aan

1. **Check Spam Folder:**
   - Emails kunnen in spam terecht komen
   - Check info@protocore.nl spam folder

2. **Check Formspree Email Settings:**
   - Ga naar Formspree dashboard
   - Check "Notifications" sectie
   - Zorg dat email notifications aan staan
   - Check of email adres correct is

3. **Test met ander email adres:**
   - Voeg tijdelijk ander email toe in Formspree
   - Test of die wel emails ontvangt

#### 🔄 Endpoint Wijzigen

Als je een nieuw Formspree endpoint nodig hebt:

1. Maak nieuw formulier in Formspree dashboard
2. Kopieer nieuwe endpoint ID
3. Pas aan in `index.html` regel ~186:
   ```html
   <form id="contactForm" action="https://formspree.io/f/NIEUWE_ENDPOINT" method="POST">
   ```
4. Commit en push naar GitHub
5. Test formulier op live website

---

## 🚀 GitHub Pages Setup

### Huidige Configuratie:
- **Repository:** erikplantenga/protocore-website
- **Branch:** main
- **Custom Domain:** protocore.nl (via CNAME bestand)
- **Auto-deploy:** Ja (elke push naar main = automatische deploy)

### GitHub Pages Problemen Oplossen:

#### ❌ Website is niet bereikbaar / 404 Error

1. **Check GitHub Pages Settings:**
   - Ga naar repository op GitHub
   - Settings → Pages
   - Check of "Source" is ingesteld op "Deploy from a branch"
   - Check of branch is "main" en folder is "/ (root)"

2. **Check CNAME Bestand:**
   - Bestand `CNAME` moet in root staan
   - Inhoud moet zijn: `protocore.nl` (geen http:// of https://)
   - Check of bestand in repository staat

3. **Check DNS Settings:**
   - DNS moet wijzen naar GitHub Pages
   - A record: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME record: `protocore.nl` → `erikplantenga.github.io`

4. **Check Repository Status:**
   - Check of repository public is (GitHub Pages werkt alleen met public repos op gratis plan)
   - Check of laatste commit succesvol was

#### ⚠️ Website werkt, maar wijzigingen verschijnen niet

1. **Check GitHub Actions:**
   - Ga naar repository → Actions tab
   - Check of laatste deploy succesvol was
   - Als er errors zijn, bekijk de logs

2. **Force Refresh:**
   - GitHub Pages kan 1-10 minuten duren om te updaten
   - Hard refresh: Ctrl+Shift+R (Windows) of Cmd+Shift+R (Mac)
   - Check of cache het probleem is

3. **Check Branch:**
   - Zorg dat je naar `main` branch pusht
   - GitHub Pages deployt alleen van `main` branch

#### 🔄 Custom Domain Problemen

1. **Domain werkt niet:**
   - Check CNAME bestand in repository
   - Check DNS records bij je domain provider
   - Wacht 24-48 uur na DNS wijziging (propagatie tijd)

2. **HTTPS werkt niet:**
   - GitHub Pages biedt automatisch HTTPS
   - Kan 24 uur duren na eerste setup
   - Check in GitHub Pages settings of "Enforce HTTPS" aan staat

---

## 🔍 Troubleshooting

### Algemene Problemen:

#### ❌ Website laadt niet / Blank pagina

1. **Check Browser Console:**
   - F12 → Console tab
   - Kijk naar JavaScript errors (rode tekst)
   - Veelvoorkomende errors:
     - `404` = Bestand niet gevonden (check image paths)
     - `CORS error` = Cross-origin probleem (zeldzaam bij statische site)

2. **Check Bestanden:**
   - Zorg dat `index.html` in root staat
   - Zorg dat `style.css` en `script.js` bestaan
   - Check of image paths correct zijn

3. **Test Lokaal:**
   - Open `index.html` direct in browser
   - Werkt het lokaal? → GitHub Pages probleem
   - Werkt het niet lokaal? → Code probleem

#### ❌ Styling werkt niet / Website ziet er raar uit

1. **Check CSS Bestand:**
   - Zorg dat `style.css` geladen wordt in `index.html`
   - Check regel ~21 in `index.html`:
     ```html
     <link rel="stylesheet" href="style.css?v=207" />
     ```
   - Cache busting parameter (`?v=207`) kan verhoogd worden

2. **Check Browser Cache:**
   - Hard refresh: Ctrl+Shift+R / Cmd+Shift+R
   - Of gebruik incognito/private window

3. **Check CSS Syntax:**
   - Open `style.css` in code editor
   - Check op syntax errors (rode onderstreping)
   - Zorg dat alle `{` en `}` gesloten zijn

#### ❌ JavaScript werkt niet / Menu werkt niet

1. **Check JavaScript Bestand:**
   - Zorg dat `script.js` geladen wordt in `index.html`
   - Check regel ~209 in `index.html`:
     ```html
     <script src="script.js" defer></script>
     ```
   - `defer` attribuut zorgt dat script na HTML laadt

2. **Check Browser Console:**
   - F12 → Console tab
   - Kijk naar JavaScript errors
   - Veelvoorkomende errors:
     - `Cannot read property of null` = Element niet gevonden
     - `is not a function` = Functie bestaat niet

3. **Check Element IDs:**
   - Zorg dat alle IDs in HTML overeenkomen met JavaScript
   - Bijvoorbeeld: `id="contactForm"` moet bestaan in HTML

#### ❌ Afbeeldingen laden niet

1. **Check Image Paths:**
   - Paths zijn relatief (bijv. `images/ProtoCore.svg`)
   - Zorg dat images in `images/` map staan
   - Check of bestandsnamen exact overeenkomen (hoofdletters/kleine letters!)

2. **Check Bestandsformaten:**
   - Ondersteunde formaten: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
   - Zorg dat bestanden niet corrupt zijn

3. **Check GitHub Repository:**
   - Zorg dat images gecommit zijn naar repository
   - Check of images zichtbaar zijn op GitHub

---

## ✏️ Aanpassingen Maken

### Content Wijzigen:

**Teksten aanpassen:**
- Open `index.html`
- Zoek naar de tekst die je wilt wijzigen
- Pas aan en save
- Commit en push naar GitHub

**Afbeeldingen vervangen:**
1. Vervang bestand in `images/` map
2. Zorg dat bestandsnaam hetzelfde blijft, OF
3. Update path in `index.html` naar nieuwe bestandsnaam
4. Commit en push

**Kleuren aanpassen:**
- Open `style.css`
- Zoek naar `:root` sectie (regel ~11-19)
- Pas CSS variabelen aan:
  ```css
  :root {
    --primary-color: #jouw-kleur;
    --secondary-color: #jouw-kleur;
  }
  ```

**Styling aanpassen:**
- Open `style.css`
- Zoek naar de selector die je wilt aanpassen
- Pas CSS aan
- Test lokaal voordat je pusht

### Functionaliteit Toevoegen:

**Nieuwe sectie toevoegen:**
1. Voeg HTML toe in `index.html`
2. Voeg styling toe in `style.css`
3. Voeg eventuele JavaScript toe in `script.js`
4. Test lokaal
5. Commit en push

**Nieuwe JavaScript functionaliteit:**
- Open `script.js`
- Voeg functie toe
- Zorg dat functie wordt aangeroepen in `DOMContentLoaded` event listener
- Test in browser console

### Formspree Aanpassen:

**Nieuwe velden toevoegen:**
1. Voeg input toe in `index.html` formulier
2. Zorg dat `name` attribuut correct is
3. Formspree pikt automatisch nieuwe velden op
4. Test in Formspree dashboard

**Email template aanpassen:**
- Ga naar Formspree dashboard
- Selecteer je formulier
- Ga naar "Settings" → "Email Notifications"
- Pas email template aan

---

## 💾 Back-up & Herstel

### Automatische Back-up:

GitHub is automatisch je back-up! Elke commit is een snapshot.

**Bekijk oude versies:**
```bash
git log                    # Zie alle commits
git show <commit-hash>     # Zie specifieke commit
```

**Herstel bestand van vorige versie:**
```bash
git checkout <commit-hash> -- <bestandsnaam>
```

### Handmatige Back-up Maken:

1. **Download Repository:**
   - Ga naar GitHub repository
   - Klik "Code" → "Download ZIP"
   - Bewaar ZIP op veilige locatie

2. **Clone Repository:**
   ```bash
   git clone https://github.com/erikplantenga/protocore-website.git
   ```

### Herstel na Probleem:

**Website volledig kapot:**
1. Ga naar GitHub repository
2. Ga naar "Releases" of "Commits"
3. Vind laatste werkende versie
4. Herstel bestanden:
   ```bash
   git checkout <commit-hash> -- index.html
   git checkout <commit-hash> -- style.css
   git checkout <commit-hash> -- script.js
   ```
5. Commit en push

**Enkel bestand herstellen:**
```bash
git checkout HEAD -- <bestandsnaam>
```

**Alles terugzetten naar laatste commit:**
```bash
git reset --hard HEAD
```

⚠️ **WAARSCHUWING:** `git reset --hard` verwijdert alle uncommitted wijzigingen!

---

## 📞 Contact & Support

### Belangrijke Accounts:

- **GitHub:** erikplantenga/protocore-website
- **Formspree:** https://formspree.io (login met je account)
- **Domain:** protocore.nl (check bij je domain provider)

### Hulp Nodig?

1. **Check dit document eerst** - meeste problemen staan hier
2. **Check Browser Console** - errors geven vaak de oplossing
3. **Check GitHub Issues** - kijk of iemand hetzelfde probleem heeft
4. **Formspree Support** - voor formulier problemen: https://help.formspree.io

### Belangrijke Links:

- **GitHub Repository:** https://github.com/erikplantenga/protocore-website
- **Live Website:** https://protocore.nl
- **Formspree Dashboard:** https://formspree.io
- **GitHub Pages Docs:** https://docs.github.com/en/pages

---

## 📝 Checklist bij Problemen

Gebruik deze checklist wanneer iets niet werkt:

- [ ] Browser console gecheckt voor errors?
- [ ] Hard refresh geprobeerd (Ctrl+Shift+R)?
- [ ] Incognito/private window geprobeerd?
- [ ] Lokaal getest (index.html direct openen)?
- [ ] GitHub Pages deployment status gecheckt?
- [ ] Laatste commit succesvol?
- [ ] Formspree dashboard gecheckt?
- [ ] DNS records correct?
- [ ] CNAME bestand aanwezig?
- [ ] Alle bestanden gecommit en gepusht?

---

## 🔐 Beveiliging

### Best Practices:

1. **Geen gevoelige data in code:**
   - Geen API keys in JavaScript
   - Geen wachtwoorden in code
   - Formspree endpoint is OK (publiek zichtbaar)

2. **GitHub Repository:**
   - Repository is public (nodig voor gratis GitHub Pages)
   - Geen gevoelige informatie committen

3. **Formspree:**
   - Gebruik rate limiting in Formspree dashboard
   - Check regelmatig submissions voor spam

---

## 📅 Onderhoud Schema

### Maandelijks:
- [ ] Check Formspree submissions (spam check)
- [ ] Test contactformulier
- [ ] Check website laadt snel
- [ ] Check alle links werken

### Bij Updates:
- [ ] Test lokaal voordat je pusht
- [ ] Check browser console voor errors
- [ ] Test op mobiel en desktop
- [ ] Check Formspree werkt nog

---

**Laatste update:** 2025  
**Versie:** 1.0  
**Status:** Actief

---

*Dit document wordt bijgewerkt wanneer er belangrijke wijzigingen zijn. Bewaar dit bestand op een veilige plek!*

