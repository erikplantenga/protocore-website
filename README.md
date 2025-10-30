# 🚀 Protocore Website

Moderne, responsive website voor Protocore - Rapid Prototyping voor Industrie

## 📋 Overzicht

Deze website is speciaal gemaakt voor Protocore en is volledig responsive (werkt op desktop, tablet en mobiel).

### ✨ Features:
- 🎨 Modern en professioneel design
- 📱 Volledig responsive (mobile-first)
- ⚡ Snelle laadtijd
- 🎭 Mooie animaties en overgangen
- 📧 Contact formulier
- 🧭 Smooth scrolling navigatie
- 🎯 SEO-vriendelijk

## 📁 Bestanden

```
protocore-website/
├── index.html              # Hoofdpagina
├── style.css              # Alle styling
├── script.js              # JavaScript functionaliteit
├── contact-form.php       # PHP email handler (optioneel)
├── INSTRUCTIES.md         # Uitgebreide handleiding in Nederlands
└── README.md             # Dit bestand
```

## 🚀 Snel Starten

### Lokaal Testen:
1. Open `index.html` in je browser
2. Dat is alles! 🎉

### Online Zetten:
Zie `INSTRUCTIES.md` voor gedetailleerde stappen om je website naar Strato te uploaden.

## 🎨 Aanpassen

### Logo Toevoegen:
Plaats je logo in de map en vervang regel 24 in `index.html`:
```html
<div class="logo">
    <img src="logo.png" alt="Protocore Logo" style="height: 50px;">
</div>
```

### Kleuren Aanpassen:
Open `style.css` en pas de kleuren aan in de `:root` sectie (regel 11-19)

### Content Wijzigen:
Open `index.html` en pas de teksten aan naar wens

## 📧 Contact Formulier

Het formulier heeft twee opties:

### Optie 1: Simpele Alert (Standaard)
Werkt direct, toont een bevestigingsbericht

### Optie 2: Email met PHP
1. Upload `contact-form.php` naar je server
2. Pas email adres aan in `contact-form.php`
3. Wijzig in `script.js` regel 68 naar:
```javascript
contactForm.action = 'contact-form.php';
contactForm.method = 'POST';
```

### Optie 3: Email Service
Gebruik FormSpree of EmailJS (zie INSTRUCTIES.md)

## 🌐 Browser Support

✅ Chrome (laatste 2 versies)
✅ Firefox (laatste 2 versies)  
✅ Safari (laatste 2 versies)
✅ Edge (laatste 2 versies)
✅ Mobile browsers

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🛠️ Technologieën

- HTML5
- CSS3 (Flexbox, Grid, Animaties)
- JavaScript (Vanilla - geen libraries nodig!)
- Google Fonts (Inter)

## 📞 Support

Zie `INSTRUCTIES.md` voor uitgebreide hulp in het Nederlands.

## 📄 Licentie

© 2025 Protocore - Handelsnaam van Plantenga Holding B.V.  
Alle rechten voorbehouden.

---

**Gemaakt met ❤️ voor Protocore**

