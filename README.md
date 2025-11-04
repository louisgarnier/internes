# 🏥 Gestionnaire de Planning pour Internes

Application web pour générer automatiquement des plannings hebdomadaires d'équipes d'internes médicaux, en respectant les contraintes de gardes, repos obligatoires, et empêchements individuels.

---

## 📋 État du Projet

- **Statut** : ✅ Setup terminé - Développement en cours
- **Version** : v0.2 (Setup technique complété)
- **Prochaine étape** : MODULE 1 - Dashboard principal
- **Voir détails** : [PROGRESS.md](PROGRESS.md)

---

## 🎯 Objectif Principal

Générer automatiquement des plannings hebdomadaires pour une équipe d'internes en respectant :
- ✅ Les contraintes de gardes (3 types : semaine, samedi, dimanche)
- ✅ Les repos post-garde obligatoires
- ✅ Les empêchements individuels
- ✅ L'équilibre entre internes sur 1 à 10 semaines
- ✅ La couverture de toutes les practices médicales

---

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Lancer le serveur de développement
npm run dev
```

**L'application sera disponible sur :** http://localhost:3001/

Pour plus de détails : [GETTING_STARTED.md](docs/GETTING_STARTED.md)

---

## 📦 Fonctionnalités Principales

### ✅ Actuellement Disponible
- Configuration de base Nuxt.js 3
- Page d'accueil fonctionnelle

### 🚧 En Développement
- MODULE 1 : Dashboard et gestion des plannings

### 📝 À Venir
- MODULE 2 : Wizard de configuration (internes, practices, empêchements)
- MODULE 3 : Génération automatique de planning
- MODULE 4 : Visualisation (vues hebdo, calendrier, stats)
- MODULE 5 : Manipulation manuelle (échanges, modifications)
- MODULE 6 : Export (PDF, Excel, JSON)
- MODULE 7 : Stockage local (LocalStorage)

---

## 📚 Documentation

- **[ROADMAP.md](docs/ROADMAP.md)** - Plan de développement sur 10 semaines
- **[PROGRESS.md](PROGRESS.md)** - Suivi de la progression
- **[ARCHITECTURE.md](docs/technical/ARCHITECTURE.md)** - Architecture technique
- **[ALGORITHMS.md](docs/technical/ALGORITHMS.md)** - Algorithmes de génération

### Documentation des Modules
1. [MODULE-1 : Gestion des plannings](docs/modules/MODULE-1-gestion-plannings.md)
2. [MODULE-2 : Configuration](docs/modules/MODULE-2-configuration.md)
3. [MODULE-3 : Génération](docs/modules/MODULE-3-generation.md)
4. [MODULE-4 : Visualisation](docs/modules/MODULE-4-visualisation.md)
5. [MODULE-5 : Manipulation](docs/modules/MODULE-5-manipulation.md)
6. [MODULE-6 : Export/Import](docs/modules/MODULE-6-export-import.md)
7. [MODULE-7 : Stockage](docs/modules/MODULE-7-stockage.md)

---

## 🛠️ Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Framework | **Nuxt.js 3** |
| Frontend | **Vue 3** |
| State Management | **Pinia** (à installer) |
| Styles | CSS natif (Tailwind à ajouter) |
| Stockage | **LocalStorage** (v1.0) |
| Runtime | Node.js 18.20.6 |

---

## 📊 Contraintes Métier

### Contraintes DURES (obligatoires)
- ✅ Capacité des practices respectée
- ✅ Repos post-garde obligatoires
- ✅ Unicité des gardes (1 interne/garde)
- ✅ Empêchements respectés
- ✅ 1 demi-journée OFF/semaine/interne
- ✅ Couverture complète des 7 gardes

### Contraintes SOUPLES (objectifs)
- 🎯 Équilibre global des gardes
- 🎯 Équilibre par type de garde (GS/GSam/GDim)
- 🎯 Équilibre des passages en practice
- 🎯 Distribution temporelle équitable

---

## 👥 Contributeurs

- **Louis Garnier** - Développeur principal

---

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

## 🆘 Support

Pour toute question ou problème :
1. Consulter la [documentation](docs/)
2. Vérifier les [issues GitHub](https://github.com/louisgarnier/internes/issues)
3. Créer une nouvelle issue si besoin

---

**Dernière mise à jour :** 4 novembre 2025
