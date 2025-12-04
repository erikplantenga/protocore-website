# 🔍 405 Not Allowed - Checklist

Als je nog steeds een **405 Not Allowed** error krijgt, controleer dit stap voor stap:

## ✅ Stap 1: Is het bestand op de server?

**Test dit eerst:**

1. Open in je browser: `https://protocore.nl/contact-form.php`
   - ✅ Als je direct wordt doorgestuurd naar `index.html`: Bestand bestaat en werkt!
   - ❌ Als je 404 krijgt: Bestand staat niet op server → **Upload het!**
   - ❌ Als je 405 krijgt: Server probleem → Ga naar Stap 2

2. Test PHP: Open `https://protocore.nl/test-php.php`
   - ✅ Als je PHP info ziet: PHP werkt!
   - ❌ Als je 404 krijgt: Upload `test-php.php` eerst

## ✅ Stap 2: Controleer bestandslocatie

Het bestand `contact-form.php` moet **exact** hier staan:

```
protocore.nl/
├── index.html          ← hier
├── contact-form.php    ← hier (in dezelfde map!)
├── .htaccess
├── style.css
└── script.js
```

**NIET in een submap zoals:**
- ❌ `protocore.nl/contact/contact-form.php`
- ❌ `protocore.nl/forms/contact-form.php`

## ✅ Stap 3: Test met debug versie

Upload `contact-form-debug.php` naar je server en open:
`https://protocore.nl/contact-form-debug.php`

- ✅ Als dit WEL werkt: Dan is er een probleem met de normale versie
- ❌ Als dit ook 405 geeft: Server blokkeert alle PHP POST requests

## ✅ Stap 4: Controleer Strato instellingen

1. **Log in op Strato Dashboard**
2. Ga naar **"Hosting"** of **"Website"**
3. Ga naar **"PHP Instellingen"**
4. Controleer:
   - ✅ PHP is **ingeschakeld**
   - ✅ PHP versie is 7.4 of hoger
   - ✅ Geen beperkingen op POST requests

## ✅ Stap 5: Test .htaccess

1. **Verwijder tijdelijk `.htaccess`** (hernoem naar `.htaccess-backup`)
2. Test het formulier opnieuw
3. Als het NU werkt: `.htaccess` was het probleem

## ✅ Stap 6: Controleer bestandsrechten

Via FTP/File Manager:
- `contact-form.php` moet zijn: **644** of **755**
- `.htaccess` moet zijn: **644**

## ✅ Stap 7: Test met absolute URL

Probeer in `index.html` de form action aan te passen naar:

```html
<!-- Probeer deze: -->
<form action="https://protocore.nl/contact-form.php" method="POST">
```

Of:

```html
<!-- Of deze: -->
<form action="/contact-form.php" method="POST">
```

## ✅ Stap 8: Contact Strato Support

Als NIETS werkt, neem contact op met Strato en vraag:

> "Waarom krijg ik 405 Not Allowed bij POST requests naar mijn PHP bestanden?  
> Mijn bestand staat op: /contact-form.php  
> PHP is ingeschakeld in mijn dashboard."

## 🚀 Snelle Test Volgorde:

1. Upload `test-php.php` → Open in browser → Werkt PHP?
2. Upload `contact-form-debug.php` → Open in browser → Werkt dit?
3. Controleer of `contact-form.php` in dezelfde map staat als `index.html`
4. Verwijder `.htaccess` tijdelijk → Test opnieuw
5. Check Strato PHP instellingen

---

**Begin bij Stap 1 en werk door totdat je het probleem vindt!**

