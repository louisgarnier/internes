# 🗺️ ROADMAP - Gestionnaire de Planning Internes

## Vue d'Ensemble

Ce document décrit le plan de développement complet de l'application sur **10 semaines**.

**Version actuelle :** 0.2.0 (Setup technique complété)  
**Version cible v1.0 :** Toutes les fonctionnalités principales implémentées  
**Date de début :** 4 novembre 2025  
**Date de fin prévue :** 13 janvier 2026  
**Progression :** ✅ Phase 1 terminée - Phase 2 en cours

---

## 📅 Planning Global

### Phase 1 : Fondations (Semaines 1-2) 📐

**Objectif :** Avoir une base solide pour le développement

#### Semaine 1 : Documentation & Architecture ✅
- [x] Rédaction des spécifications complètes
- [x] Création du README principal
- [x] Documentation de tous les modules (1-7)
- [x] Documentation technique (architecture, DB, algorithmes)
- [x] Setup du repository GitHub
- [x] Push initial sur GitHub

#### Semaine 2 : Setup Technique ✅
- [x] Choix de la stack technique finale (Nuxt 3 + Pinia + LocalStorage)
- [x] Setup de l'environnement de développement
- [x] Structure des dossiers du projet
- [x] Installation et configuration de Nuxt.js 3
- [x] Page d'accueil fonctionnelle
- [x] Serveur de développement opérationnel

**Livrables Phase 1 :** ✅ COMPLÉTÉS
- ✅ Documentation complète (7 modules + 3 docs techniques)
- ✅ Architecture définie (Nuxt 3 + Pinia + LocalStorage)
- ✅ Environnement prêt et testé
- ✅ Repository GitHub configuré
- ✅ Application Nuxt fonctionnelle

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

**Stack Technique :**
- **Frontend :** Nuxt.js 3 + Tailwind CSS
- **Stockage :** LocalStorage (ou SQLite local)
- **State :** Pinia

**Obligatoire pour la v1.0 (par priorité) :**
1. ✅ **MODULE 4 : Visualisation** 🔥 **PRIORITÉ #1**
   - Vue hebdomadaire claire
   - Navigation entre semaines
   - Affichage des gardes
2. ✅ MODULE 1 : Dashboard et gestion plannings
3. ✅ MODULE 2 : Configuration complète (wizard + modification)
4. ✅ MODULE 3 : Génération automatique
5. ✅ MODULE 5 : Échange de gardes (sans drag & drop)
6. ✅ MODULE 6 : Export PDF
7. ✅ MODULE 7 : Stockage LocalStorage

**Nice-to-have (peut être reporté à v1.1) :**
- ⏳ Drag & drop pour modifications
- ⏳ Fonction "Annuler" (Ctrl+Z)
- ⏳ Vue calendrier mensuelle
- ⏳ Export Excel avancé
- ⏳ Import CSV
- ⏳ Graphiques statistiques avancés

---

### 🔮 V1.1 - Améliorations (Post-lancement)

**Fonctionnalités additionnelles :**
- 🖱️ **Drag & Drop** pour modifications manuelles
- ↩️ **Fonction "Annuler"** (Ctrl+Z)
- 📧 Notifications email aux internes
- 📱 Version mobile responsive
- 🎨 Personnalisation des couleurs
- 📊 Statistiques avancées avec plus de graphiques
- 📥 Import Excel pour internes/practices
- 📅 Vue calendrier mensuelle améliorée

---

### 🚀 V2.0 - Future (Long terme)

**Évolutions majeures :**
- ☁️ **Migration vers Airtable** (backend centralisé)
- 🔄 **Synchronisation multi-devices**
- 💾 **Backup cloud automatique**
- 👥 Multi-utilisateurs avec authentification
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

**1. Stack Technique : Nuxt.js + Tailwind CSS**
- ✅ **Framework :** Nuxt.js 3 (Vue.js avec SSR, excellent DX)
- ✅ **UI :** Tailwind CSS (flexibilité, moderne)
- ✅ **État :** Pinia (store Vue officiel)
- **Décision :** Validé ✅

**2. LocalStorage pour stockage (v1.0)**
- ✅ **Pour :** Simple, pas de serveur, hors ligne
- ❌ **Contre :** Limites de taille (5-10MB), pas de sync
- **Décision :** OK pour v1.0, migration Airtable en v2.0

**3. Priorité : Visualisation d'abord**
- 🎯 **Visualisation = Fonctionnalité #1**
- Interface simple pour utilisateur non-technique
- Test de chaque fonctionnalité une par une
- **Décision :** Développement itératif, focus UX

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

