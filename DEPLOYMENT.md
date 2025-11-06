# 🚀 Deployment Instructies - Protocore Website naar Strato

## Stap-voor-stap gids voor het online zetten van je website

---

## 📋 VOORBEREIDING

### 1. Test eerst lokaal (aanbevolen)
Voordat je online gaat, test de website eerst op verschillende apparaten:
- **Desktop** (Chrome, Firefox, Safari)
- **Tablet** (iPad, Android tablet)
- **Mobiel** (iPhone, Android telefoon)
- **Verschillende schermformaten** (klein, medium, groot)

**Tip:** Gebruik de Developer Tools in je browser (F12) om verschillende schermformaten te testen.

---

## 🔧 STAP 1: GitHub Repository Voorbereiden

### 1.1 Bestanden committen
```bash
# Voeg alle bestanden toe
git add .

# Commit met beschrijving
git commit -m "Ready for deployment - contact form working"

# Push naar GitHub
git push origin main
```

### 1.2 Controleer GitHub
- Ga naar je GitHub account
- Controleer of alle bestanden er staan:
  - ✅ index.html
  - ✅ style.css
  - ✅ script.js
  - ✅ contact-form.php
  - ✅ images/ folder (alle afbeeldingen)

---

## 🌐 STAP 2: Strato FTP/File Manager Setup

### 2.1 Inloggen op Strato
1. Ga naar [strato.nl](https://www.strato.nl)
2. Log in op je account
3. Ga naar **"Webhosting"** of **"Mijn Producten"**

### 2.2 FTP Gegevens ophalen
1. Klik op je hostingpakket
2. Ga naar **"FTP-accounts"** of **"Bestandsbeheer"**
3. Noteer deze gegevens:
   - **FTP Server:** (bijv. `ftp.strato.com` of `ftp.jouwdomein.nl`)
   - **FTP Gebruikersnaam:** (bijv. `ftp@jouwdomein.nl`)
   - **FTP Wachtwoord:** (je wachtwoord)
   - **FTP Poort:** (meestal 21)

### 2.3 File Manager gebruiken (eenvoudiger)
- Strato heeft vaak een **"File Manager"** in het controlepaneel
- Dit is makkelijker dan FTP software

---

## 📤 STAP 3: Bestanden Uploaden naar Strato

### Optie A: Via File Manager (aanbevolen)
1. Open **File Manager** in Strato controlepaneel
2. Ga naar de **root directory** (meestal `htdocs/` of `www/` of `public_html/`)
3. Upload alle bestanden:
   - `index.html`
   - `style.css`
   - `script.js`
   - `contact-form.php`
   - Hele `images/` folder

### Optie B: Via FTP Software
Gebruik een FTP programma zoals:
- **FileZilla** (gratis, Windows/Mac)
- **Cyberduck** (gratis, Mac)
- **WinSCP** (gratis, Windows)

**FTP Instellingen:**
- Protocol: **FTP** of **SFTP**
- Host: je FTP server adres
- Gebruikersnaam: je FTP gebruikersnaam
- Wachtwoord: je FTP wachtwoord
- Poort: 21 (of 22 voor SFTP)

**Upload naar:** `htdocs/` of `www/` of `public_html/`

---

## 📁 STAP 4: Bestandsstructuur op Strato

Zorg dat je bestanden zo staan:
```
htdocs/ (of www/ of public_html/)
├── index.html
├── style.css
├── script.js
├── contact-form.php
└── images/
    ├── ProtoCore.svg
    ├── ProtoCore-03.png
    ├── ProtoCore-04.png
    ├── ...
    └── Images/
        ├── About Us/
        ├── Services/
        └── Expertise/
```

---

## ✉️ STAP 5: Email Configuratie

### 5.1 Email adres controleren
1. Open `contact-form.php` op de server
2. Controleer regel 16:
   ```php
   $to_email = "info@protocore.nl";
   ```
3. Zorg dat dit email adres bestaat in je Strato account

### 5.2 Email adres aanmaken in Strato
1. Ga naar **"E-mail"** in Strato controlepaneel
2. Maak email adres aan: `info@protocore.nl`
3. Noteer het wachtwoord (je hebt dit nodig voor email lezen)

### 5.3 PHP mail() functie testen
- Strato ondersteunt standaard PHP `mail()` functie
- Als emails niet aankomen, controleer:
  - Spam folder
  - Email adres bestaat
  - PHP is actief op je hostingpakket

---

## 🔍 STAP 6: Testen Online

### 6.1 Website testen
1. Ga naar `https://jouwdomein.nl` (of `https://www.jouwdomein.nl`)
2. Test alle pagina's:
   - ✅ Homepage laadt
   - ✅ Navigatie werkt
   - ✅ Alle afbeeldingen laden
   - ✅ Contact formulier werkt

### 6.2 Contact formulier testen
1. Vul het contact formulier in
2. Verstuur een test bericht
3. Controleer je email inbox (en spam folder!)
4. Je zou een email moeten ontvangen

### 6.3 Responsive testen
Test op verschillende apparaten:
- **Desktop:** Chrome, Firefox, Safari
- **Tablet:** iPad, Android tablet
- **Mobiel:** iPhone, Android

**Online test tools:**
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- Browser Developer Tools (F12 → Device Toolbar)

---

## ⚠️ VEELVOORKOMENDE PROBLEMEN

### Probleem: Website laadt niet
**Oplossing:**
- Controleer of `index.html` in de root staat (htdocs/www/public_html)
- Controleer bestandsnamen (hoofdletters/kleine letters belangrijk!)
- Wacht 5-10 minuten (DNS kan tijd nodig hebben)

### Probleem: Afbeeldingen laden niet
**Oplossing:**
- Controleer of `images/` folder is geüpload
- Controleer padnamen (hoofdletters/kleine letters!)
- Controleer bestandsnamen in `index.html`

### Probleem: Contact formulier werkt niet
**Oplossing:**
- Controleer of `contact-form.php` is geüpload
- Controleer of PHP actief is op je hostingpakket
- Controleer email adres in `contact-form.php`
- Controleer spam folder voor test emails

### Probleem: CSS/JavaScript werkt niet
**Oplossing:**
- Controleer of `style.css` en `script.js` zijn geüpload
- Controleer bestandsnamen (exacte spelling!)
- Hard refresh: Ctrl+F5 (Windows) of Cmd+Shift+R (Mac)

---

## 📞 STRATO SUPPORT

Als je hulp nodig hebt:
- **Strato Support:** [support.strato.nl](https://support.strato.nl)
- **Telefoon:** Check je Strato account voor support nummer
- **Live Chat:** Beschikbaar in Strato controlepaneel

---

## ✅ CHECKLIST VOOR DEPLOYMENT

- [ ] Alle bestanden zijn gecommit naar GitHub
- [ ] FTP/File Manager gegevens zijn bekend
- [ ] Alle bestanden zijn geüpload naar Strato
- [ ] Bestandsstructuur klopt (images/ folder aanwezig)
- [ ] Email adres `info@protocore.nl` bestaat in Strato
- [ ] Website laadt op `jouwdomein.nl`
- [ ] Alle afbeeldingen laden correct
- [ ] Contact formulier werkt en verstuurt emails
- [ ] Website werkt op desktop, tablet en mobiel
- [ ] Test email is ontvangen

---

## 🎉 KLAAR!

Als alles werkt, is je website online! 🚀

**Belangrijk:** Houd je GitHub repository up-to-date. Maak altijd eerst een backup voordat je wijzigingen maakt op de live website.

---

## 📝 WIJZIGINGEN MAKEN

### Lokaal wijzigen:
1. Wijzig bestanden lokaal
2. Test lokaal
3. Commit naar GitHub: `git add . && git commit -m "Beschrijving" && git push`
4. Upload gewijzigde bestanden naar Strato

### Direct op server wijzigen (niet aanbevolen):
- Gebruik File Manager of FTP
- **Let op:** Wijzigingen gaan verloren als je later opnieuw uploadt!

---

**Succes met je deployment! 🎊**

