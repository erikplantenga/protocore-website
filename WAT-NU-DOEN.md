# 🚨 405 Not Allowed - Wat Nu Doen?

Je krijgt nog steeds een 405 error. Hier is wat je NU moet doen:

## 🎯 DIRECT ACTIE PLAN:

### Stap 1: Upload Test Bestanden (5 minuten)

Upload deze bestanden naar je Strato server (naast `index.html`):

1. ✅ `test-php.php` - Test of PHP werkt
2. ✅ `contact-form-debug.php` - Debug versie die meer info geeft
3. ✅ `contact-form.php` - Zorg dat deze er is
4. ✅ `.htaccess` - Update deze (nieuwe versie)

### Stap 2: Test Direct (2 minuten)

Open in je browser:

1. **Test PHP:** `https://protocore.nl/test-php.php`
   - Zie je PHP informatie? → ✅ PHP werkt!
   - Zie je 404? → Bestand staat niet op server

2. **Test Debug:** `https://protocore.nl/contact-form-debug.php`
   - Werkt dit? → Goed teken!
   - Geeft dit ook 405? → Server probleem

3. **Test Normaal:** `https://protocore.nl/contact-form.php`
   - Word je doorgestuurd? → ✅ Bestand werkt!
   - Krijg je 405? → Server blokkeert POST

### Stap 3: Controleer Locatie

**BELANGRIJK:** Zorg dat `contact-form.php` in de **EXACTE**zelfde map staat als `index.html`

```
✅ GOED:
protocore.nl/
  ├── index.html
  ├── contact-form.php  ← hier!

❌ FOUT:
protocore.nl/
  ├── index.html
  └── contact/
      └── contact-form.php  ← NIET hier!
```

### Stap 4: Als Test Bestanden WEL Werken

Als `test-php.php` en `contact-form-debug.php` WEL werken, maar het normale formulier niet:

**Probeer dit:** Pas in `index.html` regel 177 aan:

```html
<!-- VAN: -->
<form id="contactForm" action="contact-form.php" method="POST">

<!-- NAAR: -->
<form id="contactForm" action="/contact-form.php" method="POST">
```

Of:

```html
<form id="contactForm" action="https://protocore.nl/contact-form.php" method="POST">
```

### Stap 5: Als NIETS Werkt

1. **Verwijder `.htaccess` tijdelijk**
   - Hernoem naar `.htaccess-backup`
   - Test opnieuw

2. **Check Strato Dashboard:**
   - Hosting → PHP Instellingen
   - PHP moet AAN staan
   - Geen beperkingen op POST

3. **Contact Strato Support:**
   - Zeg: "Ik krijg 405 Not Allowed bij POST naar PHP bestanden"
   - Vraag of er beperkingen zijn

## 📋 Wat Je Nu Moet Uploaden:

Upload deze bestanden naar je server:

- ✅ `test-php.php` (nieuw - voor testen)
- ✅ `contact-form-debug.php` (nieuw - voor debug)
- ✅ `contact-form.php` (update)
- ✅ `.htaccess` (update)
- ✅ `405-CHECKLIST.md` (documentatie)

## ❓ Vragen?

Stuur me:
1. Wat zie je als je `test-php.php` opent?
2. Wat zie je als je `contact-form-debug.php` opent?
3. Staat `contact-form.php` in dezelfde map als `index.html`?

Dan kan ik je verder helpen! 🚀

