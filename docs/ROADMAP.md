# 🗺️ ROADMAP - Gestionnaire de Planning Internes

**Dernière mise à jour :** 5 novembre 2025 - 15h00

---

## 📊 Vue d'Ensemble

**Version actuelle :** 0.9.0 (Module 3 génération à 80%)  
**Version cible v1.0 (MVP) :** Application fonctionnelle complète  
**Date de début :** 4 novembre 2025  
**Date de fin prévue v1.0 :** Mi-novembre 2025  
**Progression globale :** 🟢 80% complété

---

## 🎯 Objectif v1.0 (MVP)

**Fonctionnalités essentielles :**
- ✅ Dashboard avec gestion des plannings
- ✅ Configuration complète (wizard 4 étapes + édition)
- ✅ Génération automatique (gardes, repos, practices, OFFs)
- ⏳ Sauvegarde locale (LocalStorage)
- ⏳ Visualisation basique du planning généré
- ⏳ Navigation entre semaines

**Fonctionnalités avancées reportées à v1.1+ :**
- Voir **[V2-ROADMAP.md](V2-ROADMAP.md)** pour les fonctionnalités avancées

---

## ✅ PHASE 1 : FONDATIONS (COMPLÉTÉ)

### Semaine 1 : Documentation & Architecture ✅
- ✅ Spécifications complètes (7 modules + 3 docs techniques)
- ✅ README principal
- ✅ Setup repository GitHub
- ✅ Push initial

### Semaine 2 : Setup Technique ✅
- ✅ Choix stack : **Nuxt 3 + Pinia + LocalStorage**
- ✅ Installation Nuxt.js 3 (compatible Node 18.20.6)
- ✅ Configuration Pinia pour state management
- ✅ Structure dossiers projet
- ✅ Serveur dev opérationnel (http://localhost:3001)

**Résultat :** 🎉 Application Nuxt fonctionnelle avec state management

---

## ✅ PHASE 2 : MODULE 1 - DASHBOARD (COMPLÉTÉ)

### Fonctionnalités implémentées ✅
- ✅ Dashboard principal avec liste plannings
- ✅ Store Pinia configuré (`stores/plannings.js`)
- ✅ État vide (0 plannings) avec message CTA
- ✅ Cartes planning avec :
  - Badge statut (✅ Généré / ⏳ Config / ❌ Erreur)
  - Infos : semaines, internes, practices
  - Date dernière modification
- ✅ Actions fonctionnelles :
  - 👁️ Voir le planning
  - ✏️ Modifier le planning
  - 📋 Dupliquer
  - 🗑️ Supprimer (avec confirmation)
- ✅ Tri automatique par date modification
- ✅ Animations et hover effects
- ✅ Bouton "➕ Nouveau" dans header

**Fichiers créés :**
- `stores/plannings.js`
- `pages/index.vue`

**Résultat :** 🎉 Dashboard complet et fonctionnel

---

## ✅ PHASE 3 : MODULE 2 - CONFIGURATION (COMPLÉTÉ)

### F2.1 : Wizard 4 Étapes (COMPLÉTÉ) ✅

**Étape 1 : Paramètres Généraux** ✅
- Nom du planning (min 3 caractères)
- Date de début (validation lundi obligatoire)
- Nombre de semaines (slider 1-10)
- Calcul automatique période
- Progress bar dynamique

**Étape 2 : Gestion des Internes** ✅
- Store global internes (`stores/interns.js`)
- Formulaire : Prénom, Nom, Email, Téléphone
- Sélection rapide depuis contacts existants
- Actions : Ajouter, Modifier, Supprimer
- Validation : min 2 internes

**Étape 3 : Gestion des Practices** ✅
- Formulaire complet :
  - Nom practice
  - Nb internes requis (radio : 1 ou 2)
  - Grille horaires (Lun-Sam, matin/après-midi)
  - Samedi après-midi désactivé
- Affichage intelligent (formatage jours)
- Actions : Ajouter, Modifier, Supprimer
- Validation : min 1 practice

**Étape 4 : Empêchements** ✅
- Formulaire :
  - Dropdown interne
  - Date picker
  - Période (radio : Matin / AM / Journée)
  - Raison optionnelle
- Liste empêchements avec compteur
- Actions : Ajouter, Supprimer
- Étape optionnelle

### F2.2 : Modification Planning (COMPLÉTÉ) ✅

**Page d'édition** (`/planning/[id]/edit`) ✅
- 4 sections accordéon (repliables/dépliables)
- Section 1 : Paramètres généraux
- Section 2 : Gestion internes (avec email/phone)
- Section 3 : Gestion practices (avec grille horaires)
- Section 4 : Gestion empêchements
- Actions :
  - 💾 Sauvegarder (validation + recalcul)
  - 🔄 Régénérer (si déjà généré)
- Alert orange si planning déjà généré
- Bouton "← Retour" vers visualisation

**Fichiers créés :**
- `stores/interns.js`
- `pages/planning/new.vue` (wizard)
- `pages/planning/[id]/index.vue` (visualisation)
- `pages/planning/[id]/edit.vue` (édition)

**Résultat :** 🎉 Configuration complète fonctionnelle

---

## 🔄 PHASE 4 : MODULE 3 - GÉNÉRATION (EN COURS - 55%)

### ✅ Réalisations (m3-3 à m3-11)

#### m3-3 : Interface Génération ✅
- Radio buttons : Toutes semaines / Semaine spécifique
- Dropdown sélection semaine
- Bouton "🚀 Générer" ou "🔄 Régénérer"
- Confirmation avant régénération
- Modal résultats scrollable (remplace alert())

#### m3-4 : PHASE 1a - Structure Base ✅
- Fonction `initWeekStructure()` : structure semaine vide
- 11 slots travail (Lun-Ven: 2/jour, Sam: 1)
- 7 gardes à attribuer
- Tableaux : repos, OFFs, affectations
- Fonction `generatePlanning()` orchestration

#### m3-5 : PHASE 1b - Garde Dimanche ✅
- Système scoring sélection internes
- Fonction `selectInterneForGarde()` : critères multiples
- Fonction `calculateInterneScore()` : équilibre + évite doublons
- Fonction `checkUnavailability()` : respect empêchements
- Stats globales mises à jour

#### m3-6 : PHASE 1c - 5 Gardes Semaine ✅
- Fonction `assignGardesSemaine()` : 5 gardes Lun-Ven
- Scoring équilibrage internes
- Accepte doublons si nécessaire (contrainte DURE)
- 🎉 **6/7 gardes attribuées**

#### m3-7 : PHASE 1d - Garde Samedi ✅
- Fonction `assignGardeSamedi()` : garde Sam 13h→Dim 8h
- CONTRAINTE DURE : attribuée même si doublon
- Scoring pénalise mais n'empêche pas
- 🎉 **PHASE 1 COMPLÈTE : 7/7 gardes attribuées**

#### m3-8 : PHASE 2 - Repos Post-Garde ✅
- Fonction `calculateReposPostGarde()` : tous repos obligatoires
- Règles :
  - Garde Dimanche → Repos Lundi (matin + AM)
  - Garde Lun-Jeu → Repos lendemain (matin + AM)
  - Garde Vendredi → Repos Samedi (matin + AM)
  - Garde Samedi → Repos Dimanche (matin + AM)
- Repos marqués dans `week.repos[]` et `day.matin/apresMidi.repos`
- 🎉 **PHASE 2 COMPLÈTE : Repos calculés**

#### m3-9 : PHASE 4a - Practices 2 Internes ✅
- Fonction `assignPractices2Internes()` : practices à 2 internes
- Fonctions support :
  - `assignSlotToPractice()` : attribution slot
  - `getAvailableInternsForSlot()` : filtre disponibilité
  - `selectBestInternsForPractice()` : scoring équilibrage
- Respect repos post-garde + empêchements
- Mapping jours français → anglais
- Support format schedule objet (monday.morning/afternoon)
- Stats globales `practicesParInterne`

#### m3-10 : PHASE 4b - Practices 1 Interne ✅
- Fonction `assignPractices1Interne()` : practices à 1 interne
- Réutilise fonctions existantes (scoring, disponibilité)
- 🎉 **PHASE 4 COMPLÈTE : Toutes practices attribuées**

#### m3-11 : PHASE 3 - Demi-journée OFF ✅
- Fonction `assignOFFs()` : 1 OFF par interne (BONUS)
- Fonction `isSlotAvailableForOFF()` : vérif disponibilité
- Sélection aléatoire parmi slots dispo (Lun-Ven)
- Si aucun slot → warning mais pas d'erreur
- OFF marqué dans `week.offs[]` et `day.matin/apresMidi.off`
- 🎉 **PHASE 3 COMPLÈTE : OFFs attribués**

### 🎉 GÉNÉRATION COMPLÈTE !

**Les 4 phases principales sont terminées :**
1. ✅ **PHASE 1** : Attribution 7 gardes/semaine (Dim + Lun-Ven + Sam)
2. ✅ **PHASE 2** : Calcul repos post-garde obligatoires
3. ✅ **PHASE 4** : Attribution toutes practices (1 et 2 internes)
4. ✅ **PHASE 3** : Attribution OFFs (1 demi-journée/interne)

**Total : ~50-60 affectations par semaine générées automatiquement !**

### ✅ Finalisation & Tests (m3-15 à m3-18) - COMPLÉTÉ

#### m3-15 : Sauvegarder dans le Store ✅
- ✅ Sauvegarder données générées dans planning
- ✅ Structure : gardes, repos, affectations, offs
- ✅ Persister dans store Pinia avec `updatePlanning()`

#### m3-16 : Changer Statut ✅
- ✅ Changer status 'config' → 'generated'
- ✅ Mettre à jour lastModified

#### m3-17 : Affichage Basique ✅
- ✅ Fonction `getJourContent()` pour affichage dynamique
- ✅ Afficher gardes (🌙), practices (🏥), repos (💤), OFFs (🏖️)
- ✅ Afficher empêchements (🚫 Indisponible)
- ✅ Détection et affichage "⚠️ Manque M/AM" pour slots vides
- ✅ Affichage doublons "(doublon manque effectif)"
- ✅ Navigation entre semaines (dropdown)
- ✅ Modal scrollable pour résultats génération

#### m3-18 : Tests & Corrections ✅
- ✅ Tests avec empêchements (respectés pour gardes + practices + OFFs)
- ✅ Tests doublons (distribution équitable)
- ✅ **FIX CRITIQUE** : Repos post-garde dimanche cross-semaine
- ✅ **FIX MAJEUR** : Équilibrage doublons par période (pas journée)
- ✅ **FIX MAJEUR** : OFFs priorisés pour internes avec doublons (compensation)
- ✅ **FIX MAJEUR** : Tri 3 niveaux doublons (nb semaine > nb période > pas garde)
- ✅ **FIX** : Affichage "Manque" même avec garde (garde = soir uniquement)
- ✅ Tests avec différentes configurations internes/practices

### Fonctionnalités Reportées à v1.1+

**Voir [V2-ROADMAP.md](V2-ROADMAP.md) pour :**
- m3-12 : Détection conflits avancée
- m3-13 : Option ajout internes si sous-staffé
- m3-14 : Calcul score d'équilibre (0-100)

**Fichiers créés/modifiés :**
- `utils/generation.js` (700+ lignes)
- `pages/planning/[id]/index.vue` (modal résultats)
- `types/planning.ts`
- `utils/planning-helpers.ts`

**Résultat :** 🎉 Génération automatique complète fonctionnelle !

---

## 📅 PHASE 5 : MODULE 4 - VISUALISATION (À VENIR)

### Affichage Basique (v1.0 MVP) ⏳

**m3-17 : Tableau Hebdomadaire Simple**
- Remplir tableau avec données générées
- Afficher : gardes, practices, repos, OFFs
- Navigation entre semaines (flèches)
- Code couleur basique :
  - 🟢 Travail (practice)
  - 🟡 Repos post-garde
  - 🔵 OFF
  - 🟠 Garde

**Structure actuelle du tableau :**
```
| Interne       | Lundi | Mardi | Mercredi | ... | Dimanche |
|---------------|-------|-------|----------|-----|----------|
| Alice Martin  |   -   |   -   |    -     | ... |    -     |
| Bob Dupont    |   -   |   -   |    -     | ... |    -     |
```

**Objectif :** Remplir les cellules avec les données générées !

### 2 Vues Avancées (v1.1)

**Reporté à v1.1 - Voir [V2-ROADMAP.md](V2-ROADMAP.md)**

**Vue 1 : Par Interne** (pour les internes)
- Planning personnel complet
- Lignes = Internes, Colonnes = Jours

**Vue 2 : Par Jour/Période** (pour les managers)
- Vérifier couverture practices
- Lignes = Périodes (Matin, AM, Garde)

**Toggle pour switcher entre les 2 vues**

---

## 📦 PHASE 6 : MODULE 7 - STOCKAGE (v1.0)

### LocalStorage Basique ⏳

**À implémenter :**
- Sauvegarde auto après chaque modification
- Backup/Restauration
- Alert si espace faible

**Reporté à v2.0 :**
- Migration Airtable
- Multi-utilisateurs
- Système permissions

---

## 🚀 PROCHAINES ÉTAPES IMMÉDIATES

### Pour terminer v1.0 MVP (25% restant)

1. **m3-15** : Sauvegarder dans le store ✅ PRIORITÉ
2. **m3-16** : Changement statut → 'generated' ✅ PRIORITÉ
3. **m3-17** : Affichage basique dans tableau ✅ PRIORITÉ
4. **m3-18** : Tests basiques
5. **MODULE 7** : LocalStorage basique

**Durée estimée :** 2-3 jours

---

## 📊 Résumé Progression

| Module | Fonctionnalité | Statut | %  |
|--------|----------------|--------|----|
| **Setup** | Documentation + Tech | ✅ Complété | 100% |
| **MODULE 1** | Dashboard | ✅ Complété | 100% |
| **MODULE 2** | Configuration (Wizard + Edit) | ✅ Complété | 100% |
| **MODULE 3** | Génération | 🔄 En cours | 55% |
| - Phase 1-4 | Gardes + Repos + Practices + OFFs | ✅ Complété | - |
| - Sauvegarde | m3-15, m3-16 | ⏳ À faire | - |
| **MODULE 4** | Visualisation basique | ⏳ À faire | 0% |
| **MODULE 7** | LocalStorage | ⏳ À faire | 0% |
| **TOTAL v1.0** | - | 🔄 En cours | **75%** |

---

## 🎯 Évolutions Post-v1.0

### v1.1 (Prochaine)
- MODULE 4 avancé : 2 vues complémentaires
- Score d'équilibre (0-100)
- Ajout internes si sous-staffé
- Détection conflits

### v1.2
- MODULE 5 : Manipulation manuelle
- MODULE 6 : Export PDF/Excel

### v2.0 (Major)
- Intégrations : Google Calendar, Email, WhatsApp
- Airtable + Multi-users
- Système permissions

### v3.0+ (Long terme)
- Application mobile
- Tests complets
- Performance optimizations

**Voir [V2-ROADMAP.md](V2-ROADMAP.md) pour tous les détails.**

---

## 🛠️ Stack Technique Finale

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Nuxt.js | 3.13.0 |
| **Runtime** | Node.js | 18.20.6 |
| **Vue** | Vue 3 | 3.4.0 |
| **State Management** | Pinia | 2.x |
| **Styling** | CSS inline | - |
| **Stockage v1.0** | LocalStorage | - |
| **Stockage v2.0** | Airtable | (futur) |
| **Version Control** | Git + GitHub | - |

---

## 📝 Workflow de Développement

**Pour chaque fonctionnalité :**
1. Lire le fichier MD du module
2. Développer la micro-tâche
3. Tester visuellement dans le navigateur
4. Valider avec l'utilisateur
5. Mettre à jour le MD avec ✅
6. Commit + Push sur GitHub (sur "GO push" explicite)

**Repository :** https://github.com/louisgarnier/internes.git

---

*Ce fichier est maintenu à jour au fur et à mesure du développement.*
*Dernière révision complète : 5 novembre 2025 - 06h30*
