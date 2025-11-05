# 📊 Progression du Développement

**Dernière mise à jour :** 5 novembre 2025 - 15h00

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

## 🎯 PHASE 4 : MODULE 3 - GÉNÉRATION AUTOMATIQUE (COMPLÉTÉ ✅)

### État : ✅ Complété - Toutes phases + tests finalisés (80%)

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

#### ✅ m3-8 : PHASE 2 - Repos post-garde (COMPLÉTÉ)
- Fonction `calculateReposPostGarde()` pour tous repos obligatoires
- Garde Dimanche → Repos Lundi (matin + après-midi)
- Garde Lun-Jeu soir → Repos lendemain (matin + après-midi)
- Garde Vendredi soir → Repos Samedi (matin + après-midi)
- Garde Samedi → Repos Dimanche (matin + après-midi)
- Repos ajoutés à `week.repos[]` et marqués dans `week.days[X].matin/apresMidi.repos`
- Comptabilisés dans `week.stats.reposCalcules`
- Ajout propriétés `matin: {}` et `apresMidi: {}` dans structure jours
- **🎉 PHASE 2 COMPLÈTE : Tous les repos post-garde calculés**

#### ✅ m3-9 : PHASE 4a - Practices à 2 internes (COMPLÉTÉ)
- Fonction `assignPractices2Internes()` pour practices nécessitant 2 internes
- Fonction `assignSlotToPractice()` : attribution slot spécifique
- Fonction `getAvailableInternsForSlot()` : filtre internes disponibles
- Fonction `selectBestInternsForPractice()` : scoring équilibrage
- Fonction `checkUnavailability()` améliorée : vérifie empêchements par période
- Respect repos post-garde et empêchements
- Scoring : équilibrage global + par practice + charge gardes
- Mapping jours français → anglais pour format schedule
- Support format schedule objet (monday.morning/afternoon)
- Affectations créées avec détails complets et stats globales
- **Priorité absolue : couvrir practices AVANT OFFs**

#### ✅ m3-10 : PHASE 4b - Practices à 1 interne (COMPLÉTÉ)
- Fonction `assignPractices1Interne()` pour practices nécessitant 1 interne
- Réutilise toutes les fonctions existantes (scoring, disponibilité)
- Même logique que m3-9 mais avec `nbRequired = 1`
- **🎉 PHASE 4 COMPLÈTE : Toutes les practices attribuées**

#### ✅ m3-11 : PHASE 3 - Demi-journée OFF (COMPLÉTÉ)
- Fonction `assignOFFs()` : attribuer 1 OFF par interne (bonus)
- Fonction `isSlotAvailableForOFF()` : vérifier disponibilité slot
  - Pas de repos, pas d'affectation practice, pas de garde le même jour
- Pour chaque interne, chercher slots disponibles (Lun-Ven, matin ou AM)
- Sélection aléatoire parmi slots disponibles
- Si aucun slot disponible → warning mais pas d'erreur (BONUS)
- OFF marqué dans `week.offs[]` et `day.matin/apresMidi.off`
- **🎉 PHASE 3 COMPLÈTE : OFFs attribués (bonus)**

#### ✅ Modal résultats amélioré
- Remplacement `alert()` par modal custom scrollable
- Affichage complet des 7 gardes par semaine
- Section repos post-garde calculés (par interne)
- Section affectations practices (total + détail par practice)
- Section OFFs attribués (nouvelle !)
- Stats d'équilibre triées par nombre de gardes
- Détail par type : (X sem, Y dim, Z sam)
- Modal avec scroll (max 90vh), boutons fermer
- Message succès : "Génération complète : Gardes + Repos + Practices + OFFs"

### 🎉 GÉNÉRATION COMPLÈTE !

**Les 4 phases principales sont terminées :**
- ✅ PHASE 1 : Attribution des 7 gardes par semaine
- ✅ PHASE 2 : Calcul des repos post-garde obligatoires
- ✅ PHASE 4 : Attribution de toutes les practices (1 et 2 internes)
- ✅ PHASE 3 : Attribution des OFFs (1 demi-journée par interne)

**Total : ~50-60 affectations par semaine générées automatiquement !**

### ✅ Finalisation & Affichage :

#### ✅ m3-15 : Sauvegarder dans le store (COMPLÉTÉ)
- ✅ Sauvegarder toutes les données générées dans le planning
- ✅ Structure : gardes, repos, affectations, offs
- ✅ Persister dans le store Pinia avec `updatePlanning()`
- ✅ Propriété `generatedData: { weeks, globalStats }` ajoutée

#### ✅ m3-16 : Changer statut planning (COMPLÉTÉ)
- ✅ Changer status de 'config' → 'generated'
- ✅ Mettre à jour lastModified avec `new Date()`
- ✅ Confirmation visuelle dans dashboard (badge ✅ Généré)

#### ✅ m3-17 : Affichage basique planning (COMPLÉTÉ)
- ✅ Fonction `getJourContent()` pour affichage dynamique cellules
- ✅ Afficher gardes (🌙 Garde, fond bleu foncé)
- ✅ Afficher repos (💤 REPOS, fond gris)
- ✅ Afficher practices (🏥 Nom (M/AM), pas de fond)
- ✅ Afficher OFFs (🏖️ OFF, fond bleu clair)
- ✅ Afficher empêchements (🚫 Indisponible, fond rouge clair)
- ✅ Détection et affichage "⚠️ Manque M/AM" pour slots vides (fond jaune)
- ✅ Affichage doublons "(doublon manque effectif)" avec fond jaune
- ✅ Navigation entre semaines avec dropdown fonctionnel
- ✅ Mapping jours array → noms (lundi=0, ..., dimanche=6)

#### ✅ m3-18 : Tests & Corrections Majeures (COMPLÉTÉ)
- ✅ Tests avec 0 empêchement : OK
- ✅ Tests avec empêchements : Respectés pour gardes + practices + OFFs
- ✅ Tests avec doublons : Distribution équitable implémentée
- ✅ **FIX CRITIQUE** : Repos post-garde dimanche cross-semaine
  - Second passage après génération toutes semaines
  - Repos placé sur lundi de la semaine SUIVANTE
  - `calculateReposPostGarde()` skip dimanche, géré dans `generatePlanning()`
- ✅ **FIX MAJEUR** : Équilibrage doublons par période (pas journée entière)
  - Compte practices CETTE PÉRIODE uniquement (matin OU après-midi)
  - Évite qu'un interne avec 1 practice matin + 0 AM soit choisi avant 0 matin + 1 AM
- ✅ **FIX MAJEUR** : OFFs priorisés pour internes avec doublons (compensation)
  - Calcul nb doublons par interne
  - Tri : 1) Plus de doublons = priorité OFF, 2) Plus de slots vides = priorité OFF
  - Logs : 'X doublon(s), Y slot(s) vide(s)'
- ✅ **FIX MAJEUR** : Tri 3 niveaux sélection doublons
  - Priorité 1 : Moins de doublons CETTE SEMAINE (équilibrage global)
  - Priorité 2 : Moins de practices CETTE PÉRIODE (équilibrage local)
  - Priorité 3 : Pas de garde CE JOUR (éviter surcharge)
  - Logs détaillés : 'X doublon(s) semaine, Y practice(s) période, garde/pas garde'
- ✅ **FIX** : Affichage "Manque" même avec garde
  - Garde = soir uniquement, donc matin + après-midi doivent être couverts
  - Suppression condition `hasGardeToday` qui bloquait vérification

### 🎯 Améliorations reportées à v1.1+ :

#### 📋 m3-12 à m3-14 : Fonctionnalités avancées (Voir V2-ROADMAP.md)
- Détection conflits détaillés (gardes doubles, practices sous-staffées)
- Option "Ajouter internes" si manque d'effectif
- Calcul score d'équilibre 0-100 avec détails par catégorie
- Amélioration scoring équilibrage gardes weekend (CS2)

### Fichiers créés/modifiés :
- `utils/generation.js` - Logique génération (PHASE 1, 2, 3, 4 complètes)
  - Gardes (7/7), Repos post-garde, Practices (2 + 1 internes), OFFs
  - Système de scoring intelligent pour équilibrage
  - Gestion empêchements et disponibilités
  - ~50-60 affectations par semaine générées automatiquement
- `pages/planning/[id]/index.vue` - Interface génération + modal résultats détaillé
  - Modal scrollable avec affichage complet
  - Sections : gardes, repos, affectations practices, OFFs, stats
- `types/planning.ts` - Interfaces Garde et Affectation
- `utils/planning-helpers.ts` - Fonctions utilitaires dates

---

## 🎯 PHASE 5 : MODULE 4 - VISUALISATION (EN COURS 🚧)

### État : 🚧 En cours - Vue "Par Jour/Période" (60%)

### Réalisations :

#### ✅ Phase 1 : Toggle & Structure (COMPLÉTÉ - m4-1)
- ✅ `ref` viewMode ('byIntern' / 'byPeriod') avec état réactif
- ✅ Composant toggle (2 boutons : 👤 Vue par Interne / 📅 Vue par Jour/Période)
- ✅ Styling dynamique (bouton actif : fond violet, inactif : fond blanc)
- ✅ Affichage conditionnel (v-if sur tableau existant, v-else pour nouvelle vue)
- ✅ Persistance LocalStorage ('planning_viewMode')
- ✅ Transitions smooth (0.2s)

#### ✅ Phase 2 : Structure tableau "Par Jour/Période" (COMPLÉTÉ - m4-2)
- ✅ Structure HTML tableau (3 lignes : MATIN, APRÈS-MIDI, GARDE)
- ✅ Headers colonnes (Lun-Dim avec dates formatées)
- ✅ Labels lignes (🌅 MATIN, 🌆 APRÈS-MIDI, 🌙 GARDE)
- ✅ Cellules avec bordures et styling
- ✅ Navigation entre semaines (réutilisée de Vue 1)

#### ✅ Phase 3 : Logique MATIN (COMPLÉTÉ - m4-3)
- ✅ Fonction `getPracticesByDayPeriod(weekIndex, dayIndex, 'matin')`
- ✅ Groupement affectations par practice
- ✅ Affichage : nom practice en gras + liste internes à puces
- ✅ Styling : practices en bleu (#2563eb), internes en gris
- ✅ Gestion cellules vides ("-")

#### ✅ Phase 4 : Logique APRÈS-MIDI (COMPLÉTÉ - m4-4)
- ✅ Réutilisation `getPracticesByDayPeriod` pour 'apres_midi'
- ✅ Affichage Lun-Ven uniquement (Sam-Dim = "-")
- ✅ Styling identique à MATIN

#### ✅ Phase 5 : Logique GARDES (COMPLÉTÉ - m4-5)
- ✅ Fonction `getGardeByDay(weekIndex, dayIndex)`
- ✅ Affichage nom interne de garde (Lun-Dim)
- ✅ Styling : fond orange (#f97316), texte blanc, gras
- ✅ Gestion tous types gardes (Dimanche, Samedi, Semaine)

### À développer (en cours) :
- ⏳ Phase 6 : Samedi matin Astreinte (m4-6)
- ⏳ Phase 7 : Affichage REPOS (m4-7)
- ⏳ Phase 8 : Affichage OFF (m4-8)
- ⏳ Phase 9 : Affichage Indisponibilités (m4-9)
- ⏳ Phase 10 : Tests finaux & polish

### Évolutions futures :
- 📝 **v1.1** : Page dédiée de gestion des contacts (CRUD complet)
- 📝 **v2.0** : Intégration Google Calendar (export/import)

### Fichiers créés/modifiés :
- `pages/planning/[id]/index.vue` - Vue principale avec toggle et 2 vues
  - Fonctions : `getPracticesByDayPeriod()`, `getGardeByDay()`
  - Toggle avec état LocalStorage
  - Vue "Par Interne" (existante, complète)
  - Vue "Par Jour/Période" (en cours, 60%)
- `docs/modules/MODULE-4-visualisation.md` - Spécifications détaillées (mis à jour)

---

## 📅 Planning Prévisionnel

| Phase | Module | État | Progression |
|-------|--------|------|-------------|
| ✅ Phase 1 | Setup & Documentation | **COMPLÉTÉ** | 100% |
| ✅ Phase 2 | MODULE 1 - Dashboard | **COMPLÉTÉ** | 100% |
| ✅ Phase 3 | MODULE 2 - Configuration | **COMPLÉTÉ** (Wizard 4 étapes) | 100% |
| ✅ Phase 4 | MODULE 3 - Génération | **COMPLÉTÉ** (Toutes phases + tests) | 80% |
| 🚧 Phase 5 | MODULE 4 - Visualisation | **EN COURS** (Vue Par Jour/Période) | 60% |
| 📝 Phase 6 | MODULE 5 - Manipulation | À venir | 0% |
| 📝 Phase 7 | MODULE 6 - Export | À venir | 0% |
| 📝 Phase 8 | MODULE 7 - Stockage | À venir | 0% |
| 📝 Phase 9 | Tests & Polish | À venir | 0% |

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
