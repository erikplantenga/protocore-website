# 📧 Strato Email Configuratie Instructies

Je contactformulier is nu geconfigureerd om te werken met Strato's mail pakket!

## ✅ Wat is aangepast:

1. **contact-form.php** - Aangepast voor Strato email configuratie
2. **.htaccess** - Toegevoegd voor PHP mail ondersteuning

## 🔧 Controleer in je Strato Dashboard:

### 1. Mail Pakket Activeren
- Log in op je Strato account
- Ga naar "Email" of "Mailpakket"
- Zorg dat het mail pakket **actief** is

### 2. Email Adres Controleren
- Controleer dat **info@protocore.nl** bestaat in je Strato account
- Als het niet bestaat: maak het email adres aan in Strato

### 3. DNS Records Controleren
- Ga naar DNS instellingen in Strato
- Controleer dat MX records correct zijn ingesteld
- (Dit is meestal automatisch gedaan door Strato)

## 📤 Uploaden naar Strato:

Upload de volgende bestanden naar je website root directory:
- ✅ `contact-form.php` (aangepast)
- ✅ `.htaccess` (nieuw bestand)

## 🧪 Testen:

1. Ga naar je website: https://protocore.nl#contact
2. Vul het contactformulier in
3. Verstuur het formulier
4. Controleer of je een email ontvangt op info@protocore.nl

## ❗ Problemen oplossen:

Als emails niet aankomen:

1. **Controleer spam folder** - emails kunnen in spam belanden
2. **Check Strato error logs** - kijk in je Strato dashboard naar error logs
3. **Test email adres** - test of info@protocore.nl normaal werkt door er zelf een email naartoe te sturen
4. **Contact Strato support** - als het nog steeds niet werkt, neem contact op met Strato

## 📝 Belangrijk:

- Het formulier gebruikt nu `info@protocore.nl` als "From" adres (vereist door Strato)
- De bezoeker zijn email staat in "Reply-To", zodat je direct kunt antwoorden
- De website zelf is **niet aangepast**, alleen de email configuratie

## ✉️ Aanpassen Email Adres:

Als je een ander email adres wilt gebruiken, pas dit aan in `contact-form.php`:

```php
$to_email = "jouw-email@protocore.nl";     // Waar berichten naartoe gaan
$from_email = "jouw-email@protocore.nl";   // Van adres (moet bestaan in Strato)
```

**Let op:** Het `$from_email` adres MOET een geldig Strato email adres zijn van je domein (protocore.nl)!

---

Veel succes! 🚀

