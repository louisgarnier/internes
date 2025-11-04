# 🏥 Gestionnaire de Planning pour Équipe d'Internes

> Application web pour générer et gérer automatiquement les plannings hebdomadaires d'internes avec gestion des gardes, practices médicales et contraintes.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![Status](https://img.shields.io/badge/status-en_développement-orange.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Documentation](#-documentation)
- [Technologies](#-technologies)
- [Roadmap](#-roadmap)
- [Contribution](#-contribution)

---

## 🎯 Vue d'ensemble

Cette application permet de **générer automatiquement des plannings optimisés** pour une équipe d'internes en médecine, en respectant :

- ✅ **3 types de gardes** (semaine, samedi, dimanche)
- ✅ **Repos post-garde obligatoires**
- ✅ **Empêchements individuels** (congés, formations)
- ✅ **Équilibre entre internes** sur 1 à 10 semaines
- ✅ **Couverture de toutes les practices médicales**

### Problème résolu

Créer manuellement un planning pour 7+ internes sur plusieurs semaines en respectant toutes les contraintes peut prendre **plusieurs heures** et comporter des **erreurs humaines**. 

Cette application le fait **en quelques secondes** avec **0% d'erreurs** sur les contraintes obligatoires.

---

## ✨ Fonctionnalités principales

### 📊 Gestion intelligente
- Dashboard avec vue d'ensemble de tous les plannings
- Création guidée en 4 étapes (wizard intuitif)
- Support de 1 à 10 semaines
- Nombre variable d'internes (2-20) et practices (1-20)

### 🤖 Génération automatique
- Algorithme d'optimisation intelligent
- Attribution équilibrée des gardes
- Calcul automatique des repos post-garde
- Respect de tous les empêchements
- Score d'équilibre 0-100

### 📅 Visualisation complète
- Vue hebdomadaire (tableau)
- Vue calendrier mensuel
- Vue par interne individuel
- Statistiques détaillées avec graphiques

### 🔄 Manipulation flexible
- Échange de gardes entre internes
- Modification manuelle avec validation
- Régénération partielle (semaine, jour, slot)

### 📥 Export multi-formats
- PDF imprimable
- Excel avec statistiques
- JSON pour backup/transfert
- CSV pour import de données

### 💾 Stockage local
- Aucun serveur requis
- Sauvegarde automatique (LocalStorage)
- Fonctionne hors ligne
- Export/import pour backup

---

## 📁 Structure du projet

```
Internes/
├── README.md                      # Ce fichier
├── LICENSE                        # Licence MIT
├── .gitignore                     # Fichiers à ignorer par Git
├── package.json                   # Dépendances Node (si applicable)
│
├── docs/                          # 📚 Documentation complète
│   ├── GETTING_STARTED.md         # Guide de démarrage rapide
│   ├── USER_GUIDE.md              # Guide utilisateur
│   ├── ROADMAP.md                 # Plan de développement
│   │
│   ├── modules/                   # Documentation par module
│   │   ├── MODULE-1-gestion-plannings.md
│   │   ├── MODULE-2-configuration.md
│   │   ├── MODULE-3-generation.md
│   │   ├── MODULE-4-visualisation.md
│   │   ├── MODULE-5-manipulation.md
│   │   ├── MODULE-6-export-import.md
│   │   └── MODULE-7-stockage.md
│   │
│   └── technical/                 # Documentation technique
│       ├── ARCHITECTURE.md        # Architecture de l'application
│       ├── DATABASE.md            # Structure de données
│       ├── ALGORITHMS.md          # Algorithmes de génération
│       └── API.md                 # API et interfaces
│
├── src/                          # Code source (à créer)
│   ├── backend/                  # Backend (si applicable)
│   ├── frontend/                 # Frontend
│   └── shared/                   # Code partagé
│
├── tests/                        # Tests (à créer)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── assets/                       # Ressources
    ├── images/
    ├── mockups/
    └── diagrams/
```

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.0.0 (si application web moderne)
- **Python** >= 3.10 (si backend Python)
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Installation rapide

```bash
# Cloner le repository
git clone https://github.com/votre-username/internes-planning.git

# Entrer dans le dossier
cd internes-planning

# Installer les dépendances
npm install
# ou
pip install -r requirements.txt

# Lancer l'application
npm start
# ou
python app.py
```

### Premier lancement

1. Ouvrir `http://localhost:3000` dans votre navigateur
2. Créer votre premier planning via le wizard
3. Ajouter vos internes et practices
4. Générer le planning automatiquement
5. C'est prêt ! 🎉

---

## 📚 Documentation

### Pour les utilisateurs

- 📖 [Guide de démarrage rapide](docs/GETTING_STARTED.md)
- 📘 [Guide utilisateur complet](docs/USER_GUIDE.md)
- ❓ [FAQ](docs/FAQ.md)
- 🎥 [Tutoriel vidéo](docs/VIDEO_TUTORIAL.md)

### Pour les développeurs

- 🏗️ [Architecture technique](docs/technical/ARCHITECTURE.md)
- 💾 [Structure de la base de données](docs/technical/DATABASE.md)
- 🧮 [Algorithmes de génération](docs/technical/ALGORITHMS.md)
- 🔌 [API Documentation](docs/technical/API.md)

### Documentation des modules

Chaque module est documenté en détail dans `docs/modules/` :

1. **[MODULE 1 - Gestion des plannings](docs/modules/MODULE-1-gestion-plannings.md)**
   - Dashboard principal
   - CRUD plannings
   - Navigation

2. **[MODULE 2 - Configuration](docs/modules/MODULE-2-configuration.md)**
   - Wizard 4 étapes
   - Gestion internes
   - Gestion practices
   - Empêchements

3. **[MODULE 3 - Génération automatique](docs/modules/MODULE-3-generation.md)**
   - Algorithme d'optimisation
   - Attribution gardes
   - Calcul repos
   - Score d'équilibre

4. **[MODULE 4 - Visualisation](docs/modules/MODULE-4-visualisation.md)**
   - Vue hebdomadaire
   - Vue calendrier
   - Vue par interne
   - Statistiques

5. **[MODULE 5 - Manipulation](docs/modules/MODULE-5-manipulation.md)**
   - Échange de gardes
   - Modification manuelle
   - Régénération partielle

6. **[MODULE 6 - Export/Import](docs/modules/MODULE-6-export-import.md)**
   - Export PDF/Excel/JSON
   - Import CSV/JSON
   - Backup

7. **[MODULE 7 - Stockage](docs/modules/MODULE-7-stockage.md)**
   - LocalStorage
   - Sauvegarde automatique
   - Restauration

---

## 🛠️ Technologies

### Frontend
- **HTML5** / **CSS3** / **JavaScript ES6+**
- Framework : React / Vue.js / Vanilla JS (à définir)
- UI Library : Bootstrap / Tailwind / Material UI (à définir)

### Backend (si nécessaire)
- **Python** avec Flask/FastAPI
- ou **Node.js** avec Express
- ou **Application web pure** (LocalStorage uniquement)

### Base de données
- **LocalStorage** (navigateur) pour v1.0
- **SQLite** (optionnel pour export)
- **IndexedDB** (pour grandes quantités de données)

### Outils
- **Git** pour versioning
- **GitHub** pour hébergement du code
- **GitHub Actions** pour CI/CD (optionnel)

---

## 📅 Roadmap

### ✅ Phase 1 : Fondations (Semaine 1-2)
- [x] Documentation complète
- [ ] Architecture technique
- [ ] Maquettes UI/UX
- [ ] Setup projet

### 🚧 Phase 2 : Core Features (Semaine 3-6)
- [ ] MODULE 1 : Dashboard et gestion plannings
- [ ] MODULE 2 : Wizard de configuration
- [ ] MODULE 3 : Algorithme de génération
- [ ] MODULE 4 : Visualisation de base

### 🔮 Phase 3 : Features Avancées (Semaine 7-8)
- [ ] MODULE 5 : Manipulation (échange gardes)
- [ ] MODULE 6 : Export/Import
- [ ] MODULE 7 : Stockage optimisé

### 🎨 Phase 4 : Polish & Tests (Semaine 9-10)
- [ ] Tests unitaires et d'intégration
- [ ] Optimisation performances
- [ ] Documentation utilisateur
- [ ] Déploiement

Voir [ROADMAP.md](docs/ROADMAP.md) pour plus de détails.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. **Fork** le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

### Guidelines

- Lire la [documentation des modules](docs/modules/)
- Respecter l'architecture définie
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Auteurs

- **Louis Garnier** - *Développeur principal* - [@louisgarnier](https://github.com/louisgarnier)

---

## 🙏 Remerciements

- Équipe médicale pour les spécifications
- Communauté open source pour les outils utilisés

---

## 📞 Contact

Pour toute question ou suggestion :

- 📧 Email : contact@example.com
- 💬 Issues : [GitHub Issues](https://github.com/votre-username/internes-planning/issues)

---

<p align="center">
  Fait avec ❤️ pour simplifier la vie des équipes médicales
</p>
