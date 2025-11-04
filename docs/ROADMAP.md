# 🗺️ ROADMAP - Gestionnaire de Planning Internes

## Vue d'Ensemble

Ce document décrit le plan de développement complet de l'application sur **10 semaines**.

**Version actuelle :** 0.1.0 (Documentation)  
**Version cible v1.0 :** Toutes les fonctionnalités principales implémentées  
**Date de début :** 4 novembre 2025  
**Date de fin prévue :** 13 janvier 2026

---

## 📅 Planning Global

### Phase 1 : Fondations (Semaines 1-2) 📐

**Objectif :** Avoir une base solide pour le développement

#### Semaine 1 : Documentation & Architecture
- [x] Rédaction des spécifications complètes
- [x] Création du README principal
- [ ] Documentation de tous les modules (1-7)
- [ ] Documentation technique (architecture, DB, algorithmes)
- [ ] Création des maquettes UI/UX (Figma)
- [ ] Setup du repository GitHub

#### Semaine 2 : Setup Technique
- [ ] Choix de la stack technique finale
- [ ] Setup de l'environnement de développement
- [ ] Configuration des outils (linters, formatters)
- [ ] Structure des dossiers du projet
- [ ] Configuration CI/CD de base
- [ ] Premiers tests de faisabilité algorithmique

**Livrables Phase 1 :**
- ✅ Documentation complète
- ✅ Maquettes validées
- ✅ Architecture définie
- ✅ Environnement prêt

---

### Phase 2 : Core Features (Semaines 3-6) 🔨

**Objectif :** Fonctionnalités essentielles opérationnelles

#### Semaine 3 : MODULE 1 - Gestion des Plannings
- [ ] Dashboard principal (liste des plannings)
- [ ] Création d'un planning (formulaire simple)
- [ ] Suppression d'un planning
- [ ] Navigation entre plannings
- [ ] Stockage LocalStorage basique

**Tests :** Créer 3 plannings, naviguer, supprimer

#### Semaine 4 : MODULE 2 - Configuration (Partie 1)
- [ ] Wizard Étape 1 : Paramètres généraux
- [ ] Wizard Étape 2 : Gestion des internes (CRUD)
- [ ] Wizard Étape 3 : Gestion des practices (CRUD)
- [ ] Validation des données à chaque étape

**Tests :** Créer un planning avec 7 internes et 8 practices

#### Semaine 5 : MODULE 2 - Configuration (Partie 2) + MODULE 3 (Partie 1)
- [ ] Wizard Étape 4 : Empêchements
- [ ] Interface de modification post-création
- [ ] Début de l'algorithme de génération (Phase 1 : Gardes)

**Tests :** Ajouter 10 empêchements, vérifier qu'ils sont respectés

#### Semaine 6 : MODULE 3 - Génération Automatique
- [ ] Algorithme Phase 2 : Repos post-garde automatiques
- [ ] Algorithme Phase 3 : Attribution demi-journées OFF
- [ ] Algorithme Phase 4 : Attribution aux practices
- [ ] Système de scoring et équilibrage
- [ ] Gestion des erreurs et conflits

**Tests :** Générer 10 plannings différents, vérifier contraintes

**Livrables Phase 2 :**
- ✅ Application fonctionnelle de base
- ✅ Génération automatique opérationnelle
- ✅ Tests passés

---

### Phase 3 : Visualisation & Features Avancées (Semaines 7-8) 👁️

**Objectif :** Interface riche et fonctionnalités avancées

#### Semaine 7 : MODULE 4 - Visualisation
- [ ] Vue hebdomadaire (tableau)
- [ ] Vue calendrier mensuel
- [ ] Vue par interne
- [ ] Navigation entre semaines
- [ ] Statistiques d'équilibre (tableaux)
- [ ] Graphiques comparatifs

**Tests :** Visualiser un planning de 10 semaines avec 7 internes

#### Semaine 8 : MODULE 5 & 6 - Manipulation & Export
- [ ] Échange de gardes avec validation
- [ ] Modification manuelle avec drag & drop
- [ ] Régénération partielle
- [ ] Export PDF
- [ ] Export Excel
- [ ] Import/Export JSON

**Tests :** Échanger 5 gardes, exporter en PDF et Excel

**Livrables Phase 3 :**
- ✅ Interface complète et intuitive
- ✅ Manipulation flexible
- ✅ Export multi-formats

---

### Phase 4 : Polish, Tests & Déploiement (Semaines 9-10) ✨

**Objectif :** Application production-ready

#### Semaine 9 : Tests & Optimisation
- [ ] Tests unitaires (coverage > 80%)
- [ ] Tests d'intégration
- [ ] Tests end-to-end (Cypress/Playwright)
- [ ] Optimisation des performances
- [ ] Optimisation du stockage LocalStorage
- [ ] Gestion des cas limites

**Tests :** Battery de tests complets

#### Semaine 10 : Documentation & Déploiement
- [ ] Guide utilisateur complet
- [ ] Tutoriel vidéo
- [ ] FAQ
- [ ] Documentation développeur
- [ ] Déploiement sur GitHub Pages / Netlify / Vercel
- [ ] Monitoring et analytics (optionnel)

**Tests :** Tests d'acceptation utilisateur

**Livrables Phase 4 :**
- ✅ Application déployée en production
- ✅ Documentation utilisateur complète
- ✅ Tests passés (>80% coverage)

---

## 🎯 Fonctionnalités par Phase

### ✅ V1.0 - MVP (Minimum Viable Product)

**Obligatoire pour la v1.0 :**
- ✅ MODULE 1 : Dashboard et gestion plannings
- ✅ MODULE 2 : Configuration complète (wizard + modification)
- ✅ MODULE 3 : Génération automatique
- ✅ MODULE 4 : Visualisation (tableau + stats)
- ✅ MODULE 5 : Échange de gardes
- ✅ MODULE 6 : Export PDF et JSON
- ✅ MODULE 7 : Stockage LocalStorage

**Nice-to-have (peut être reporté) :**
- ⏳ Vue calendrier (peut être simplifié)
- ⏳ Export Excel (peut attendre v1.1)
- ⏳ Import CSV
- ⏳ Drag & drop pour modification manuelle
- ⏳ Graphiques avancés

---

### 🔮 V1.1 - Améliorations (Post-lancement)

**Fonctionnalités additionnelles :**
- 📧 Notifications email aux internes
- 📱 Version mobile responsive
- 🎨 Personnalisation des couleurs
- 📊 Statistiques avancées avec plus de graphiques
- 💾 Backup cloud (optionnel)
- 🔄 Synchronisation multi-devices
- 📥 Import Excel pour internes/practices

---

### 🚀 V2.0 - Future (Long terme)

**Évolutions majeures :**
- 👥 Multi-utilisateurs avec authentification
- ☁️ Backend avec base de données centralisée
- 📲 Application mobile native (iOS/Android)
- 🤝 Système de préférences des internes
- 🔗 Intégration avec systèmes RH hospitaliers
- 🗓️ Gestion des congés annuels
- 📅 Planification > 10 semaines
- 🔔 Notifications push
- 📈 Analytics avancées

---

## 📊 Indicateurs de Succès

### Métriques Techniques
- ✅ **Performance** : Génération < 5 secondes
- ✅ **Fiabilité** : 0% d'erreurs sur contraintes dures
- ✅ **Qualité** : Score d'équilibre > 75/100 dans 95% des cas
- ✅ **Tests** : Coverage > 80%
- ✅ **Accessibilité** : Score WCAG AA

### Métriques Utilisateur
- ✅ **Temps de création** : < 10 minutes pour un planning complet
- ✅ **Facilité d'utilisation** : 0 formation requise (intuitif)
- ✅ **Satisfaction** : Score NPS > 8/10
- ✅ **Adoption** : 100% de l'équipe utilise l'outil

---

## ⚠️ Risques & Mitigations

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Algorithme trop complexe | 🔴 Haut | Moyen | Simplifier les contraintes souples |
| LocalStorage limité | 🟡 Moyen | Faible | Utiliser IndexedDB si nécessaire |
| Performance sur 10 semaines | 🟡 Moyen | Moyen | Optimiser algorithme, générer par semaine |
| Bugs sur échange de gardes | 🔴 Haut | Moyen | Tests intensifs, validation stricte |
| Interface trop complexe | 🟡 Moyen | Faible | Itérations avec utilisateurs |

---

## 🎓 Apprentissages & Décisions

### Décisions Architecturales

**1. Application Web Pure (sans backend lourd)**
- ✅ **Pour :** Simplicité, déploiement facile, hors ligne
- ❌ **Contre :** Pas de collaboration temps-réel
- **Décision :** OK pour v1.0, backend en v2.0 si besoin

**2. LocalStorage pour stockage**
- ✅ **Pour :** Simple, pas de serveur, hors ligne
- ❌ **Contre :** Limites de taille (5-10MB), pas de sync
- **Décision :** OK pour v1.0, migration IndexedDB si nécessaire

**3. Framework Frontend : À définir**
- **Option 1 :** React (moderne, populaire, bon écosystème)
- **Option 2 :** Vue.js (plus simple, courbe d'apprentissage douce)
- **Option 3 :** Vanilla JS (pas de dépendances, léger)
- **Décision :** À valider Semaine 2

---

## 📝 Notes de Version

### v0.1.0 - 4 novembre 2025 (Documentation)
- ✅ Spécifications complètes
- ✅ README
- ✅ Structure de documentation
- ✅ ROADMAP

### v0.2.0 - Semaine 2 (Setup)
- [ ] Architecture définie
- [ ] Stack technique choisie
- [ ] Environnement configuré

### v0.5.0 - Semaine 6 (Core MVP)
- [ ] Génération automatique fonctionnelle
- [ ] Configuration complète
- [ ] Visualisation de base

### v1.0.0 - Semaine 10 (Production)
- [ ] Toutes les fonctionnalités principales
- [ ] Tests complets
- [ ] Documentation utilisateur
- [ ] Déployé en production

---

## 🔄 Processus de Développement

### Workflow Git
```
main (production)
  ↑
develop (développement principal)
  ↑
feature/nom-fonctionnalite (branches de fonctionnalité)
```

### Sprints
- **Durée :** 1 semaine
- **Rétrospective :** Chaque lundi
- **Demo :** Chaque vendredi

### Code Review
- Obligatoire pour toute PR
- Au moins 1 reviewer
- Tests passés requis

---

*Dernière mise à jour : 4 novembre 2025*

