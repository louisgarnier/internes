# Architecture Technique

## 🏗️ Vue d'Ensemble

**Type d'application :** Single Page Application (SPA)

**Architecture :** Frontend-only avec stockage local

---

## 📐 Stack Technique

### Frontend
- **Framework** : **Nuxt.js 3** (Vue.js avec SSR)
- **UI Library** : **Tailwind CSS** (utility-first, flexible)
- **Bundler** : **Vite** (inclus dans Nuxt 3)
- **State Management** : **Pinia** (store Vue)
- **Graphiques** : Chart.js / D3.js
- **PDF Generation** : jsPDF / pdfmake
- **Excel Export** : xlsx.js

### Stockage
- **v1.0** : **LocalStorage** ou **SQLite** (données locales)
- **v2.0+** : Migration vers **Airtable**
- **IndexedDB** : Si volumétrie importante (optionnel)

### Outils de Développement
- **Git** : Versioning
- **npm** : Gestionnaire de paquets
- **Vite** : Bundler ultra-rapide (intégré Nuxt)
- **ESLint** : Linter JavaScript/Vue
- **Prettier** : Formatage code
- **Vitest** : Tests unitaires (natif Vite)

---

## 🗂️ Structure de l'Application (Nuxt.js)

```
internes/
├── nuxt.config.ts          # Configuration Nuxt
├── tailwind.config.js      # Configuration Tailwind
├── package.json
│
├── pages/                  # Routes automatiques
│   ├── index.vue           # Dashboard (/)
│   ├── planning/
│   │   ├── [id].vue        # Vue planning (/planning/123)
│   │   ├── [id]/config.vue # Configuration (/planning/123/config)
│   │   └── [id]/stats.vue  # Statistiques (/planning/123/stats)
│   └── wizard/
│       └── [id].vue        # Wizard création
│
├── components/             # Composants Vue réutilisables
│   ├── Dashboard/
│   │   ├── PlanningCard.vue
│   │   └── PlanningList.vue
│   ├── Wizard/
│   │   ├── Step1Params.vue
│   │   ├── Step2Internes.vue
│   │   ├── Step3Practices.vue
│   │   └── Step4Empechements.vue
│   ├── Planning/
│   │   ├── WeekView.vue
│   │   ├── CalendarView.vue
│   │   └── GardesPanel.vue
│   └── Common/
│       ├── Modal.vue
│       ├── Button.vue
│       └── Card.vue
│
├── composables/            # Logique métier réutilisable
│   ├── usePlanning.ts      # CRUD plannings
│   ├── useGenerator.ts     # Algorithme génération
│   ├── useStorage.ts       # LocalStorage/SQLite
│   ├── useExport.ts        # Export PDF/Excel
│   └── useImport.ts        # Import données
│
├── stores/                 # Pinia stores (state management)
│   ├── planning.ts         # Store principal
│   ├── config.ts           # Configuration globale
│   └── ui.ts               # État UI (modals, etc.)
│
├── types/                  # Types TypeScript
│   ├── Planning.ts
│   ├── Interne.ts
│   ├── Practice.ts
│   ├── Garde.ts
│   └── Affectation.ts
│
├── utils/                  # Utilitaires
│   ├── dateUtils.ts
│   ├── validators.ts
│   ├── helpers.ts
│   └── constants.ts
│
├── assets/                 # Assets statiques
│   └── css/
│       └── main.css        # CSS global + Tailwind
│
├── public/                 # Fichiers publics
│   └── images/
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

