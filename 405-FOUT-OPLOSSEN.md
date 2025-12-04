# 🔧 405 Not Allowed Error Oplossen

Als je een **405 Not Allowed** error krijgt bij het contactformulier, probeer deze oplossingen:

## ✅ Controleer eerst:

### 1. Bestanden op de server geüpload?
Zorg dat deze bestanden op je Strato server staan:
- ✅ `contact-form.php` (in dezelfde map als `index.html`)
- ✅ `.htaccess` (in dezelfde map als `index.html`)

### 2. Staat contact-form.php op de juiste locatie?
- Het moet in de **root directory** staan (waar ook `index.html` staat)
- Niet in een submap!
- Check via FTP/File Manager of het bestand er staat

### 3. Werkt PHP op je server?
Test of PHP werkt door een testbestand te maken:
- Maak `test.php` met alleen: `<?php phpinfo(); ?>`
- Open in browser: `https://protocore.nl/test.php`
- Als je PHP info ziet, werkt PHP. Verwijder daarna `test.php` weer.

## 🔧 Oplossingen:

### Oplossing 1: Controleer bestandslocatie
Zorg dat `contact-form.php` in dezelfde directory staat als `index.html`.

```
protocore.nl/
├── index.html
├── contact-form.php    ← moet hier staan!
├── .htaccess
├── style.css
└── script.js
```

### Oplossing 2: Verwijder .htaccess tijdelijk
Soms kan `.htaccess` problemen veroorzaken:
1. Hernoem `.htaccess` naar `.htaccess-backup`
2. Test het formulier opnieuw
3. Als het werkt, is het probleem in `.htaccess`

### Oplossing 3: Gebruik absolute URL
Probeer in `index.html` de form action aan te passen:

```html
<!-- In plaats van: -->
<form action="contact-form.php" method="POST">

<!-- Probeer: -->
<form action="/contact-form.php" method="POST">
<!-- of -->
<form action="https://protocore.nl/contact-form.php" method="POST">
```

### Oplossing 4: Controleer Strato PHP instellingen
1. Log in op je Strato dashboard
2. Ga naar "Hosting" → "PHP Instellingen"
3. Zorg dat PHP is **ingeschakeld**
4. Zorg dat de PHP versie up-to-date is (bijv. PHP 7.4 of 8.x)

### Oplossing 5: Check server logs
1. Log in op Strato dashboard
2. Ga naar "Logs" of "Error Logs"
3. Kijk naar foutmeldingen rond de tijd dat je het formulier probeerde

### Oplossing 6: Test het PHP bestand direct
Open in browser: `https://protocore.nl/contact-form.php`

Als je direct naar de homepage wordt doorgestuurd, werkt het bestand.
Als je een 404 of 405 error krijgt, bestaat het bestand niet of staat het verkeerd.

### Oplossing 7: Controleer bestandsrechten
Via FTP/File Manager:
- `contact-form.php` moet lees- en uitvoerbaar zijn (chmod 644 of 755)
- `.htaccess` moet leesbaar zijn (chmod 644)

### Oplossing 8: Alternatieve .htaccess
Als de huidige `.htaccess` problemen geeft, vervang hem tijdelijk door:

```apache
# Minimale .htaccess voor Strato
AddDefaultCharset UTF-8
```

## 📞 Als niets werkt:

1. **Contact Strato support** en vraag:
   - "Waarom krijg ik 405 Not Allowed bij POST requests naar PHP bestanden?"
   - "Is PHP correct geconfigureerd voor mijn domein?"
   - "Zijn er beperkingen op POST requests?"

2. **Test met een simpel testbestand:**
   Maak `test-form.php`:
   ```php
   <?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       echo "POST werkt!";
       print_r($_POST);
   } else {
       echo "<form method='POST'><input name='test'><button>Test</button></form>";
   }
   ?>
   ```
   
   Test dit bestand. Als dit ook 405 geeft, is het een serverconfiguratie probleem.

## ✅ Als het werkt:

Vergeet niet:
- Verwijder test bestanden (`test.php`, `test-form.php`)
- Test het echte contactformulier opnieuw
- Check of emails aankomen op `info@protocore.nl`

---

**Veel succes!** 🚀

