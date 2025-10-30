# 🚀 Protocore Website - Gebruiksinstructies

## 📁 Wat heb je ontvangen?

Je hebt nu een complete, moderne website voor Protocore! De bestanden staan in:
```
/Users/erikplantenga/Documents/protocore-website/
```

### Bestanden:
- **index.html** - De hoofdpagina van je website (alle content)
- **style.css** - Alle styling en animaties
- **script.js** - Interactiviteit (menu, smooth scrolling, formulier)
- **INSTRUCTIES.md** - Dit bestand

---

## 🎨 Stap 1: Website Lokaal Bekijken

**Simpel testen op je computer:**

1. Open Finder
2. Ga naar: `/Users/erikplantenga/Documents/protocore-website/`
3. Dubbelklik op `index.html`
4. De website opent in je browser!

**Of via terminal:**
```bash
cd /Users/erikplantenga/Documents/protocore-website/
open index.html
```

---

## 🖼️ Stap 2: Je Logo en Afbeeldingen Toevoegen

### Je Logo Toevoegen:

1. **Zet je logo bestand** in de `protocore-website` map
   - Bijvoorbeeld: `logo.png` of `logo.svg`

2. **Open `index.html`** in een teksteditor (bijv. TextEdit, VS Code, of Sublime)

3. **Zoek deze regel** (ongeveer regel 24):
```html
<div class="logo">
    <h2>PROTOCORE</h2>
</div>
```

4. **Vervang het door:**
```html
<div class="logo">
    <img src="logo.png" alt="Protocore Logo" style="height: 50px;">
</div>
```

### Afbeeldingen Toevoegen:

1. **Maak een map** aan: `protocore-website/images/`

2. **Zet je afbeeldingen** daarin (bijv. `about-image.jpg`, `service1.jpg`, etc.)

3. **In `index.html`, zoek de placeholder** (ongeveer regel 133):
```html
<div class="image-placeholder">
    <p>Jouw afbeelding<br>komt hier</p>
</div>
```

4. **Vervang door:**
```html
<img src="images/about-image.jpg" alt="Protocore werkplaats" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
```

---

## 🎨 Stap 3: Kleuren Aanpassen (Optioneel)

Wil je de kleuren aanpassen naar je bedrijfskleuren?

1. **Open `style.css`**
2. **Bovenaan (regel 11-19) zie je:**

```css
:root {
    --primary-color: #2563eb;      /* Hoofdkleur (blauw) */
    --primary-dark: #1e40af;       /* Donkere variant */
    --secondary-color: #0f172a;    /* Footer kleur (donker) */
    --accent-color: #f59e0b;       /* Accent kleur (oranje) */
}
```

3. **Verander de kleuren** naar jouw bedrijfskleuren:
   - Gebruik een color picker of zoek "color picker" op Google
   - Bijvoorbeeld: `--primary-color: #FF5733;` voor oranje-rood

---

## 📤 Stap 4: Uploaden naar Strato Hosting

### A. Inloggen bij Strato

1. Ga naar: https://www.strato.nl
2. Klik rechtsboven op **"Inloggen"**
3. Log in met je Strato account

### B. FTP Toegang Krijgen

1. Ga naar je **Strato Dashboard**
2. Klik op **"Hosting"** of **"Webhosting"**
3. Zoek naar **"FTP Toegang"** of **"Website beheren"**
4. Noteer je FTP gegevens:
   - **FTP Server:** bijvoorbeeld `ftp.strato.com` of `protocore.nl`
   - **Gebruikersnaam:** je Strato gebruikersnaam
   - **Wachtwoord:** je Strato wachtwoord

### C. FTP Programma Installeren

**Optie 1: FileZilla (Aanbevolen - Gratis)**

1. Download FileZilla van: https://filezilla-project.org
2. Installeer het programma
3. Open FileZilla

**Optie 2: Cyberduck (Mac)**

1. Download van: https://cyberduck.io
2. Installeer en open Cyberduck

### D. Verbinden met je Strato Server

**In FileZilla:**

1. Bovenaan zie je velden voor:
   - **Host:** vul in `ftp.strato.com` (of je specifieke FTP server)
   - **Gebruikersnaam:** je Strato FTP gebruikersnaam
   - **Wachtwoord:** je Strato FTP wachtwoord
   - **Poort:** laat leeg of vul `21` in

2. Klik op **"Verbinding maken"** of **"Quickconnect"**

3. Als het werkt, zie je rechts de mappen op je server!

### E. Bestanden Uploaden

1. **Links in FileZilla** zie je je computer
   - Navigeer naar: `/Users/erikplantenga/Documents/protocore-website/`

2. **Rechts** zie je je Strato server
   - Zoek de map `htdocs` of `public_html` (dit is waar je website komt)
   - Dubbelklik erop om de map te openen

3. **Selecteer deze bestanden LINKS:**
   - `index.html`
   - `style.css`
   - `script.js`
   - Je `logo.png` (als je die hebt toegevoegd)
   - Je `images` map (als je die hebt gemaakt)

4. **Sleep ze naar de RECHTER kant** (of rechtermuisknop > Upload)

5. **Wacht tot alles is geupload** (zie onderaan de voortgang)

### F. Website Controleren

1. Open je browser
2. Ga naar: **https://protocore.nl** (of je domeinnaam)
3. 🎉 **Je website is live!**

**Let op:** Het kan 5-10 minuten duren voordat alles zichtbaar is.

---

## 📧 Stap 5: Contact Formulier Werkend Maken

Het formulier werkt nu alleen lokaal (toont een pop-up). Voor een echt werkend formulier heb je twee opties:

### Optie 1: PHP Script (voor Strato)

1. Vraag aan Strato of PHP beschikbaar is (meestal wel!)
2. Laat me weten, dan maak ik een PHP script voor je

### Optie 2: Email Service (Eenvoudigste)

Gebruik een gratis service zoals:
- **FormSpree**: https://formspree.io (gratis, simpel)
- **EmailJS**: https://emailjs.com (gratis, geen backend nodig)

---

## ✏️ Stap 6: Content Aanpassen

Wil je teksten veranderen?

1. **Open `index.html`** in een teksteditor
2. **Zoek de tekst** die je wilt veranderen
3. **Pas het aan** (tussen de HTML tags)
4. **Upload opnieuw** naar Strato

**Voorbeeld:**
```html
<h3>We maken gedurfde ideeën werkelijkheid — snel.</h3>
```
Verander naar:
```html
<h3>Jouw nieuwe tekst hier</h3>
```

---

## 🆘 Hulp Nodig?

### Veel voorkomende problemen:

**Website niet zichtbaar na upload:**
- Wacht 10 minuten en probeer opnieuw
- Controleer of bestanden in `htdocs` of `public_html` staan
- Check of je domein goed is ingesteld bij Strato

**Kleuren zijn raar:**
- Check `style.css` - misschien verkeerde kleurcode?
- Gebruik hex codes zoals `#FF5733`

**Logo te groot/klein:**
- Pas `height: 50px;` aan naar een andere waarde (bijv. `height: 40px;`)

**Menu werkt niet op mobiel:**
- Controleer of alle 3 de bestanden (HTML, CSS, JS) zijn geupload

---

## 📱 Responsive Design

Je website is volledig responsive! Test op:
- Desktop/laptop
- Tablet (iPad)
- Mobiele telefoon

**Test makkelijk:**
1. Open je website
2. Druk op `F12` (Developer Tools)
3. Klik op het mobiele icoontje (📱)
4. Test verschillende schermformaten!

---

## 🎯 Volgende Stappen

1. ✅ Website lokaal bekijken
2. ✅ Logo en afbeeldingen toevoegen
3. ✅ Kleuren aanpassen (optioneel)
4. ✅ Uploaden naar Strato
5. ✅ Testen of alles werkt!

---

## 📞 Extra Hulp Nodig?

Als je ergens niet uitkomt:
- Screenshot maken van het probleem
- Stuur het naar mij
- Ik help je verder!

**Veel succes! 🚀**

---

## 📝 Handige Links

- **Strato Helpdesk:** https://www.strato.nl/faq/
- **FileZilla Download:** https://filezilla-project.org
- **Kleuren Kiezen:** https://coolors.co
- **Gratis Afbeeldingen:** https://unsplash.com


