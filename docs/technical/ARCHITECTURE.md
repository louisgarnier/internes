# Architecture Technique

## 🏗️ Vue d'Ensemble

**Type d'application :** Single Page Application (SPA)

**Architecture :** Frontend-only avec stockage local

---

## 📐 Stack Technique

### Frontend
- **HTML5** / **CSS3** / **JavaScript ES6+**
- **Framework** : React / Vue.js / Vanilla JS (à décider)
- **UI Library** : Bootstrap / Tailwind CSS (à décider)
- **Graphiques** : Chart.js / D3.js
- **PDF Generation** : jsPDF / pdfmake
- **Excel Export** : xlsx.js

### Stockage
- **LocalStorage** : Données principales
- **IndexedDB** : Si volumétrie importante (optionnel)

### Outils de Développement
- **Git** : Versioning
- **npm** : Gestionnaire de paquets
- **Webpack / Vite** : Bundler
- **ESLint** : Linter JavaScript
- **Prettier** : Formatage code
- **Jest** : Tests unitaires

---

## 🗂️ Structure de l'Application

```
src/
├── index.html              # Point d'entrée
├── main.js                 # Initialisation
│
├── components/             # Composants UI
│   ├── Dashboard.js
│   ├── Wizard.js
│   ├── PlanningView.js
│   ├── Statistics.js
│   └── ...
│
├── services/               # Logique métier
│   ├── PlanningService.js  # CRUD plannings
│   ├── GeneratorService.js # Algorithme génération
│   ├── StorageService.js   # LocalStorage
│   ├── ExportService.js    # Export PDF/Excel
│   └── ImportService.js    # Import données
│
├── models/                 # Modèles de données
│   ├── Planning.js
│   ├── Interne.js
│   ├── Practice.js
│   ├── Garde.js
│   └── Affectation.js
│
├── utils/                  # Utilitaires
│   ├── dateUtils.js
│   ├── validators.js
│   └── helpers.js
│
├── styles/                 # CSS
│   ├── main.css
│   ├── dashboard.css
│   └── ...
│
└── tests/                  # Tests
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 🔄 Flux de Données

```
User Action (UI)
     ↓
Component (React/Vue)
     ↓
Service (Business Logic)
     ↓
LocalStorage
     ↓
Service (Read Data)
     ↓
Component (Update UI)
```

---

## 💾 Stockage des Données

### LocalStorage Structure

```javascript
// Liste des plannings (métadonnées)
localStorage.getItem("plannings_list")
→ [{id, nom, dateDebut, ...}, ...]

// Données complètes d'un planning
localStorage.getItem("planning_{id}")
→ {internes: [...], practices: [...], ...}
```

---

## 🔗 Liens

- **Modèles de données :** [DATABASE.md](DATABASE.md)
- **Algorithmes :** [ALGORITHMS.md](ALGORITHMS.md)

---

*Dernière mise à jour : 4 novembre 2025*

