# 📊 Progression du Développement

**Dernière mise à jour :** 5 novembre 2025 - 03h15

---

## ✅ PHASE 1 : SETUP INITIAL (COMPLÉTÉ)

### 1.1 Documentation ✅
- ✅ README.md créé
- ✅ .gitignore configuré
- ✅ LICENSE (MIT) ajoutée
- ✅ 7 modules documentés (MODULE-1 à MODULE-7)
- ✅ Documentation technique (ARCHITECTURE.md, DATABASE.md, ALGORITHMS.md)
- ✅ ROADMAP.md créé
- ✅ QUESTIONS.md et ANSWERS.md complétés

### 1.2 Configuration Git ✅
- ✅ Repository initialisé
- ✅ Premier commit effectué
- ✅ Push sur GitHub réussi (https://github.com/louisgarnier/internes.git)

### 1.3 Setup Technique ✅
- ✅ **Nuxt.js 3** installé (compatible Node v18.20.6)
- ✅ Configuration `nuxt.config.ts` créée
- ✅ Structure de dossiers créée (`pages/`, `components/`, etc.)
- ✅ Page d'accueil fonctionnelle (`pages/index.vue`)
- ✅ Serveur de développement opérationnel
- ✅ `package.json` configuré

**Note :** Tailwind CSS sera ajouté plus tard pour éviter les problèmes de configuration.

---

## 🎯 PHASE 2 : MODULE 1 - DASHBOARD (COMPLÉTÉ ✅)

### État : ✅ Terminé

### Réalisations :
- ✅ Layout principal avec header et footer
- ✅ Dashboard avec liste des plannings
- ✅ État vide (0 plannings) avec message et bouton CTA
- ✅ État avec plannings (liste de cartes)
- ✅ Bouton "➕ Nouveau" dans le header
- ✅ Store Pinia configuré et opérationnel
- ✅ Données de test (3 plannings)
- ✅ Cartes de planning avec :
  - Nom + Badge de statut (✅ Généré / ⏳ Config / ❌ Erreur)
  - Informations : semaines, internes, practices
  - Date de dernière modification
- ✅ Actions fonctionnelles :
  - 👁️ Voir (alerte temporaire)
  - 📋 Dupliquer (fonctionnel)
  - 🗑️ Supprimer (fonctionnel avec confirmation)
- ✅ Tri automatique par date de modification
- ✅ Animations et hover effects

### Fichiers créés/modifiés :
- `stores/plannings.js` - Store Pinia avec gestion des plannings
- `pages/index.vue` - Page dashboard complète
- `nuxt.config.ts` - Configuration Pinia

---

## 🎯 PHASE 3 : MODULE 2 - CONFIGURATION (COMPLÉTÉ ✅)

### État : ✅ COMPLÉTÉ - F2.1 Wizard + F2.2 Modification (100%)

### Réalisations :

#### ✅ Étape 1 : Paramètres Généraux (COMPLÉTÉE)
- Page `/planning/new` créée
- Formulaire avec 3 champs :
  - Nom du planning (input texte, min 3 caractères)
  - Date de début (input date, validation lundi obligatoire)
  - Nombre de semaines (slider 1-10)
- Validation en temps réel
- Message d'erreur si date n'est pas un lundi
- Calcul automatique de la période (date de fin)
- Progress bar dynamique (25% → 50% → ...)
- Navigation entre étapes fonctionnelle

#### ✅ Étape 2 : Gestion des Internes (COMPLÉTÉE)
- **Store global des internes** (`stores/interns.js`) :
  - Sauvegarde permanente de tous les internes (contacts)
  - ID unique pour chaque interne
  - Réutilisables entre plannings
- **Liste des internes** avec compteur
- **Formulaire enrichi** :
  - Prénom et Nom (obligatoires)
  - Email (optionnel) - nouveau !
  - Téléphone (optionnel) - nouveau !
- **Sélection rapide** depuis contacts existants (dropdown)
- **Actions** : Ajouter, Modifier, Supprimer
- **Affichage amélioré** : cartes avec email et téléphone
- **Validation** : minimum 2 internes requis
- **Modal** : formulaire complet avec auto-remplissage
- 2 internes de test pré-remplis

#### ✅ Étape 3 : Gestion des Practices (COMPLÉTÉE)
- **Liste des practices** avec compteur
- **Formulaire complet** :
  - Nom de la practice (obligatoire)
  - Nombre d'internes requis (radio : 1 ou 2)
  - Tableau des jours avec checkboxes (Lun-Sam)
  - Matin et Après-midi sélectionnables
  - Samedi : uniquement matin (après-midi désactivé)
- **Affichage intelligent** :
  - Formatage des jours (ex: "Lun-Ven" au lieu de liste)
  - Nombre d'internes affiché
  - Jours d'activité résumés
- **Actions** : Ajouter, Modifier, Supprimer
- **Validation** : minimum 1 practice requise
- **Modal** avec tableau de sélection des jours
- **Progress bar** à 75%

#### ✅ Étape 4 : Empêchements (COMPLÉTÉE)
- **Liste des empêchements** avec compteur
- **Formulaire complet** :
  - Dropdown pour sélectionner l'interne (depuis étape 2)
  - Date avec validation (min/max dans période planning)
  - Radio buttons période (Matin / Après-midi / Journée complète)
  - Raison optionnelle (texte libre)
- **Affichage des empêchements** :
  - Nom complet de l'interne
  - Date formatée + période
  - Raison si renseignée
- **Actions** : Ajouter, Supprimer (pas de modification)
- **Validation** : Date dans la période du planning
- **Étape optionnelle** : message explicite, peut être vide
- **Progress bar** à 100% ✅
- **Bouton "✓ Terminer et Créer le Planning"** en vert
- **Fonction createPlanning()** :
  - ✅ Sauvegarde complète dans le store plannings
  - Affiche résumé complet du planning
  - Retour au dashboard
  - Planning visible immédiatement avec badge "Config"

### ✅ F2.2 : Modification des Paramètres (COMPLÉTÉE)
**Page d'édition complète** pour modifier un planning existant :

#### Architecture
- ✅ Restructuration routing : `/planning/[id]/index.vue` (visualisation) + `/planning/[id]/edit.vue` (édition)
- ✅ Bouton "✏️ Modifier" ajouté sur le dashboard (grille 2x2)
- ✅ Interface accordéon avec 4 sections repliables/dépliables
- ✅ Getter `getPlanningById()` ajouté au store

#### Section 1 : Paramètres Généraux ✅
- Modification nom, date (validation lundi), nombre de semaines
- Validation en temps réel

#### Section 2 : Gestion des Internes ✅
- Liste avec compteur dynamique
- Modal ajout avec 4 champs (prénom*, nom*, email, téléphone)
- Suppression avec confirmation
- Cohérence avec store global (email + phone)

#### Section 3 : Gestion des Practices ✅
- Liste avec compteur dynamique
- Modal complet : nom, nb internes (1 ou 2), grille horaires Lun-Sam
- Radio buttons stylisés pour nb internes
- Checkboxes matin/après-midi
- Samedi après-midi désactivé
- Validation : nom + au moins un horaire

#### Section 4 : Gestion des Empêchements ✅
- Liste avec compteur dynamique
- Modal complet : dropdown interne, date, période (3 options), raison
- Radio buttons stylisés (Matin 8h-13h / Après-midi 13h-18h / Journée 8h-18h)
- Validation : interne + date obligatoires

#### Sauvegarde et Régénération ✅
- **💾 Sauvegarder** :
  - Validation complète (nom, date lundi, min 1 interne, min 1 practice)
  - Appel `planningsStore.updatePlanning()`
  - Recalcul `internsCount` et `practicesCount`
  - Message confirmation avec résumé
  - Redirection vers visualisation
- **🔄 Régénérer** (si planning généré) :
  - Confirmation utilisateur
  - Sauvegarde + reset status en 'config'
  - Message explicatif
  - Redirection vers visualisation
- ⚠️ Alert orange si planning déjà généré

### 🎉 MODULE 2 COMPLÉTÉ À 100% !
Le module de configuration est terminé et fonctionnel :
- ✅ **F2.1 Wizard** : 4 étapes complètes avec navigation
- ✅ **F2.2 Modification** : Page d'édition complète avec 4 sections
- ✅ Progress bar dynamique
- ✅ Validations à chaque étape
- ✅ Modals pour toutes les sous-entités
- ✅ Messages d'aide et d'erreur
- ✅ Interface moderne et responsive
- ✅ Sauvegarde et régénération fonctionnelles

### 🔧 Intégration Dashboard (COMPLÉTÉE)
- ✅ **Sauvegarde du planning dans le store** :
  - Import du store plannings dans le wizard
  - Fonction `addPlanning()` appelée avec toutes les données
  - Statut 'config' assigné automatiquement
  - Planning ajouté avec ID unique et timestamps
- ✅ **Structure complète sauvegardée** :
  - Nom, semaines, date de début
  - internsCount / practicesCount pour l'affichage
  - internsList : Liste complète des internes (avec IDs, noms, contacts)
  - practicesList : Liste complète des practices (avec config jours/périodes)
  - unavailabilities : Liste des empêchements
- ✅ **Dashboard mis à jour** :
  - Affichage avec internsCount/practicesCount
  - Badge "⏳ Config" jaune pour plannings non générés
  - Planning visible immédiatement après création

### À venir :
- 📝 **F2.2 - Modification des paramètres** (v1.1) :
  - Éditer un planning existant (nom, dates, internes, practices, empêchements)
  - Interface similaire au wizard mais accessible depuis le dashboard
  - Possibilité de régénérer après modification

---

## 🎯 PHASE 4 : MODULE 3 - GÉNÉRATION AUTOMATIQUE (EN COURS ⏳)

### État : 🔄 En cours - PHASE 1 complète (22%)

### Réalisations :

#### ✅ m3-3 : Interface génération (COMPLÉTÉ)
- Radio buttons : Générer toutes semaines / semaine spécifique
- Dropdown pour sélection semaine
- Bouton "🚀 Générer" ou "🔄 Régénérer" (si déjà généré)
- Confirmation avant régénération
- Message de warning si planning déjà généré

#### ✅ m3-4 : PHASE 1a - Structure base semaine (COMPLÉTÉ)
- Fonction `initWeekStructure()` créant structure semaine vide
- 11 slots de travail (Lun-Ven: 2/jour, Sam: 1)
- 7 gardes à attribuer (5 GS + 1 GSam + 1 GDim)
- Tableaux pour repos, OFFs, affectations
- Fonction `generatePlanning()` orchestrant génération

#### ✅ m3-5 : PHASE 1b - Garde Dimanche (COMPLÉTÉ)
- Système de scoring pour sélection internes
- Fonction `selectInterneForGarde()` avec critères multiples
- Fonction `calculateInterneScore()` : équilibre + évite doublons
- Fonction `checkUnavailability()` : respect empêchements
- Attribution garde Dimanche (priorité absolue)
- Mise à jour stats globales

#### ✅ m3-6 : PHASE 1c - 5 Gardes semaine (COMPLÉTÉ)
- Fonction `assignGardesSemaine()` pour 5 gardes Lun-Ven
- Utilise scoring pour équilibrer entre internes
- Évite naturellement doublons mais accepte si nécessaire (contrainte DURE)
- Mise à jour stats globales (total + semaine)

#### ✅ m3-7 : PHASE 1d - Garde Samedi (COMPLÉTÉ)
- Fonction `assignGardeSamedi()` pour garde Sam 13h→Dim 8h
- CONTRAINTE DURE : doit être attribuée même si doublon
- Système de scoring pénalise mais n'empêche pas
- Mise à jour stats globales (total + samedi)
- **🎉 PHASE 1 COMPLÈTE : Toutes les 7 gardes attribuées par semaine**

#### ✅ Alert améliorée
- Affichage complet des 7 gardes par semaine
- Stats triées par nombre de gardes
- Détail par type : (X sem, Y dim, Z sam)
- Liste phases restantes mise à jour

### À faire :

#### ⏳ m3-8 : PHASE 2 - Repos post-garde (NEXT)
- Calculer repos obligatoires après chaque garde
- Garde Lun-Jeu soir → Repos lendemain (matin + après-midi)
- Garde Ven soir → Repos samedi (matin + après-midi)
- Garde Sam → Repos dimanche (matin + après-midi)
- Garde Dim → Repos lundi (matin + après-midi)
- Marquer slots comme "repos" dans structure

#### ⏳ m3-9 : PHASE 4a - Practices à 2 internes
- Attribution practices nécessitant 2 internes
- Priorité absolue : couvrir toutes les practices AVANT les OFFs
- Scoring pour sélection internes disponibles
- Respect empêchements et repos

#### ⏳ m3-10 : PHASE 4b - Practices à 1 interne
- Attribution practices nécessitant 1 interne
- Même logique que practices à 2
- Vérifier couverture complète

#### ⏳ m3-11 : PHASE 3 - Demi-journée OFF
- Attribuer 1 demi-journée OFF par interne (BONUS)
- Uniquement si tous les slots practices sont couverts
- Équilibrer entre internes
- Note : Si pas assez d'internes pour practices, proposer d'en ajouter

#### ⏳ m3-12 à m3-18 : Finalisation
- Détection conflits
- Option ajout internes si sous-staffé
- Calcul score d'équilibre (0-100)
- Sauvegarde dans store
- Changement statut → 'generated'
- Affichage basique planning généré
- Tests

### Fichiers créés/modifiés :
- `utils/generation.js` - Logique génération (PHASE 1a-1d complète)
- `pages/planning/[id]/index.vue` - Interface génération + alert détaillée
- `types/planning.ts` - Interfaces Garde et Affectation
- `utils/planning-helpers.ts` - Fonctions utilitaires dates

---

## 📅 MODULE 4 : VISUALISATION (SPECS MISES À JOUR)

### État : 📝 Spécifications documentées

### Réalisations :
- ✅ **2 vues complémentaires documentées** :
  - **Vue 1 : Par Interne** (pour les internes - voir leur planning personnel)
  - **Vue 2 : Par Jour/Période** (pour les managers - vérifier couverture practices)
- ✅ Toggle pour switcher entre les 2 vues
- ✅ Codes couleur définis (travail, OFF, repos, empêchement, garde)
- ✅ Samedi matin = Astreinte (traitée comme practice)
- ✅ Affichage REPOS, OFF, empêchements

### À développer (après MODULE 3) :
- Implémenter Vue 1 (Par Interne)
- Implémenter Vue 2 (Par Jour/Période)
- Toggle dynamique avec persistance LocalStorage
- Code couleur CSS
- Navigation entre semaines

### Évolutions futures :
- 📝 **v1.1** : Page dédiée de gestion des contacts (CRUD complet)
- 📝 **v2.0** : Intégration Google Calendar (export/import)

### Fichiers créés/modifiés :
- `stores/interns.js` - Store global des internes (nouveau)
- `stores/plannings.js` - Store mis à jour avec structure complète
- `pages/planning/new.vue` - Wizard 4 étapes + sauvegarde
- `pages/index.vue` - Dashboard mis à jour (internsCount/practicesCount)

---

## 📅 Planning Prévisionnel

| Phase | Module | État | Semaine Prévue |
|-------|--------|------|----------------|
| ✅ Phase 1 | Setup & Documentation | **COMPLÉTÉ** | Semaine 1-2 |
| ✅ Phase 2 | MODULE 1 - Dashboard | **COMPLÉTÉ** | Semaine 3 |
| ✅ Phase 3 | MODULE 2 - Configuration | **COMPLÉTÉ** (Wizard 4 étapes) | Semaine 4-5 |
| 📝 Phase 4 | MODULE 3 - Génération | À venir | Semaine 5-6 |
| 📝 Phase 5 | MODULE 4 - Visualisation | À venir | Semaine 7 |
| 📝 Phase 6 | MODULE 5 - Manipulation | À venir | Semaine 8 |
| 📝 Phase 7 | MODULE 6 - Export | À venir | Semaine 8 |
| 📝 Phase 8 | MODULE 7 - Stockage | À venir | Semaine 9 |
| 📝 Phase 9 | Tests & Polish | À venir | Semaine 10 |

---

## 🛠️ Stack Technique Confirmé

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Nuxt.js | 3.13.0 |
| **Runtime** | Node.js | 18.20.6 |
| **Framework Vue** | Vue 3 | 3.4.0 |
| **Router** | Vue Router | 4.3.0 |
| **State Management** | Pinia | 2.x (installé) |
| **Styles** | CSS inline | - |
| **Stockage** | LocalStorage | À implémenter |

---

## 📝 Notes de Développement

### Décisions Prises
1. **Nuxt 3 au lieu de Nuxt 4** : Compatibilité avec Node 18
2. **Pas de Tailwind pour l'instant** : Problèmes de config PostCSS, on le rajoutera après
3. **CSS inline/natif** : Pour avoir une interface fonctionnelle rapidement
4. **Approche itérative** : Valider visuellement chaque étape avant de passer à la suivante

### Problèmes Résolus
- ✅ Erreur `EBADENGINE` (Node version) → Solution : Nuxt 3
- ✅ Erreurs PostCSS avec Tailwind → Solution : CSS natif temporaire
- ✅ Authentification GitHub → Utilisation d'osxkeychain

---

## 🎨 Workflow de Développement

Pour chaque fonctionnalité :
1. ✅ Lire le fichier MD du module
2. ✅ Développer la fonctionnalité
3. ✅ Tester visuellement dans le navigateur
4. ✅ Valider avec l'utilisateur
5. ✅ Mettre à jour le MD avec ✅
6. ✅ Commit + Push sur GitHub

**Note :** L'utilisateur veut être en contrôle et valider chaque étape visuellement.

---

## 🚀 Commandes Utiles

```bash
# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Générer site statique
npm run generate

# Prévisualiser le build
npm run preview
```

**URL de développement :** http://localhost:3001/

---

*Ce fichier sera mis à jour au fur et à mesure du développement.*
