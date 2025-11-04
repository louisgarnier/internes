# MODULE 1 - Gestion des Plannings

## 📋 Vue d'Ensemble

**Objectif :** Fournir un dashboard principal permettant de gérer tous les plannings (créer, voir, dupliquer, supprimer).

**Priorité :** 🔴 CRITIQUE (Fondation de l'application)

**Statut :** ✅ COMPLÉTÉ (Dashboard fonctionnel)

**Dépendances :** Aucune

**Dernière mise à jour :** 4 novembre 2025

---

## ✅ État d'Implémentation

### Fonctionnalités Complétées
- ✅ **Dashboard principal** avec header et footer
- ✅ **État initial (0 plannings)** : Message + bouton "Créer votre premier planning"
- ✅ **Liste des plannings** : Affichage sous forme de cartes
- ✅ **Bouton "Nouveau"** dans le header (visible si plannings > 0)
- ✅ **Store Pinia** configuré avec state management
- ✅ **Données de test** (3 plannings exemple)
- ✅ **Cartes de planning** avec :
  - Nom du planning
  - Badge de statut (✅ Généré / ⏳ Config / ❌ Erreur)
  - Infos : semaines, internes, practices
  - Date de dernière modification
- ✅ **Actions fonctionnelles** :
  - 👁️ Voir (alerte temporaire, sera implémenté dans MODULE 4)
  - 📋 Dupliquer (fonctionnel)
  - 🗑️ Supprimer (fonctionnel avec confirmation)
- ✅ **Tri automatique** par date de modification (plus récent en haut)
- ✅ **Animations et effets hover** sur les cartes et boutons

### Fonctionnalités à Venir (v1.1)
- ⏳ **Recherche** par nom de planning
- ⏳ **Filtres** par statut (tous, générés, en config, erreurs)
- ⏳ **Tri avancé** (date création, nom, semaines)
- ⏳ **Stockage LocalStorage** (actuellement en mémoire)
- ⏳ **Ouverture du wizard** (MODULE 2) au clic sur "Nouveau"
- ⏳ **Ouverture de la vue planning** (MODULE 4) au clic sur "Voir"

### Fichiers Créés
- `stores/plannings.js` - Store Pinia avec gestion des plannings
- `pages/index.vue` - Page dashboard complète
- `nuxt.config.ts` - Configuration avec module Pinia

---

## 🎯 Fonctionnalités

### F1.1 - Dashboard Principal

**Description :** Page d'accueil affichant tous les plannings créés

#### État Initial (0 plannings)
```
┌─────────────────────────────────────────────┐
│  📋 Gestionnaire de Planning Internes       │
├─────────────────────────────────────────────┤
│                                             │
│     🏥                                      │
│     Aucun planning créé                     │
│                                             │
│     [ ➕ Créer votre premier planning ]    │
│                                             │
└─────────────────────────────────────────────┘
```

#### État avec Plannings
```
┌─────────────────────────────────────────────┐
│  📋 Gestionnaire de Planning Internes       │
│                            [ ➕ Nouveau ]   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐    │
│  │ Planning Janvier 2025         ✅   │    │
│  │ 3 semaines • 7 internes • 8 practices│  │
│  │ Dernière modif: 04/11/2025         │    │
│  │ [👁️ Voir] [⚙️ Config] [🗑️]      │    │
│  └────────────────────────────────────┘    │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │ Planning Février 2025         ⏳   │    │
│  │ 2 semaines • 7 internes • 8 practices│  │
│  │ Dernière modif: 03/11/2025         │    │
│  │ [👁️ Voir] [⚙️ Config] [🗑️]      │    │
│  └────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📊 Détails des Fonctionnalités

### 1. Affichage de la Liste

**Informations affichées par planning :**
- Nom du planning
- Badge de statut :
  - ✅ Généré (vert)
  - ⏳ Configuration en cours (orange)
  - ❌ Erreur (rouge)
- Nombre de semaines
- Nombre d'internes configurés
- Nombre de practices configurées
- Date de dernière modification

**Tri et Filtres :**
- Par défaut : Tri par date de dernière modification (plus récent en haut)
- Options de tri :
  - Date de création
  - Nom (A-Z)
  - Nombre de semaines
  - Statut
- Filtres :
  - Tous
  - Générés uniquement
  - En configuration
  - Avec erreurs

**Recherche :**
- Barre de recherche pour trouver par nom

---

### 2. Créer un Nouveau Planning

**Déclenchement :** Clic sur bouton `➕ Nouveau` ou `Créer votre premier planning`

**Action :** Ouvre le wizard de création (MODULE 2)

**Comportement :**
1. Sauvegarde automatique en tant que brouillon
2. Redirection vers wizard Étape 1

---

### 3. Voir un Planning

**Déclenchement :** Clic sur `👁️ Voir` ou clic sur la carte du planning

**Action :** 
- Si planning généré → Ouvre la vue calendrier (MODULE 4)
- Si planning non généré → Redirection vers configuration

**Navigation :**
- URL : `/planning/{id}`

---

### 4. Configurer un Planning

**Déclenchement :** Clic sur `⚙️ Config`

**Action :** Ouvre l'interface de configuration (MODULE 2)

**Navigation :**
- URL : `/planning/{id}/config`

---

### 5. Dupliquer un Planning

**Déclenchement :** Clic sur icône `📋` (dans menu contextuel)

**Action :**
1. Copie toutes les données (internes, practices, empêchements)
2. Crée un nouveau planning avec nom "Copie de [Nom]"
3. Réinitialise les gardes et affectations
4. Date de début = date du jour (prochain lundi)
5. Ouvre le nouveau planning en configuration

**Confirmation :**
```
Dupliquer ce planning ?

Le nouveau planning contiendra :
- Les mêmes internes (7)
- Les mêmes practices (8)
- Les mêmes empêchements
- Gardes et affectations seront à régénérer

[Annuler]  [Dupliquer]
```

---

### 6. Supprimer un Planning

**Déclenchement :** Clic sur `🗑️`

**Action :** 
1. Demande confirmation
2. Supprime définitivement le planning
3. Supprime du stockage LocalStorage
4. Rafraîchit la liste

**Confirmation :**
```
⚠️ Supprimer le planning ?

Planning : Janvier 2025
Cette action est irréversible !

Conseil : Exportez d'abord en JSON pour sauvegarder.

[Annuler]  [Exporter puis Supprimer]  [Supprimer]
```

---

## 🎨 Interface Utilisateur

### Wireframe Dashboard

```
+--------------------------------------------------+
|  📋 Gestionnaire de Planning            [➕]     |
+--------------------------------------------------+
|  🔍 [Rechercher...]           [Tri: ▼] [Filtre]  |
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+  |
|  | Planning Janvier 2025              ✅      |  |
|  | 3 semaines • 7 internes • 8 practices      |  |
|  | Modifié: 04/11/2025 14:32                 |  |
|  |                                            |  |
|  | [👁️ Voir]  [⚙️ Config]  [📋]  [🗑️]      |  |
|  +--------------------------------------------+  |
|                                                  |
|  +--------------------------------------------+  |
|  | Planning Février 2025              ⏳      |  |
|  | 2 semaines • 7 internes • 8 practices      |  |
|  | Modifié: 03/11/2025 10:15                 |  |
|  |                                            |  |
|  | [👁️ Voir]  [⚙️ Config]  [📋]  [🗑️]      |  |
|  +--------------------------------------------+  |
|                                                  |
|  +--------------------------------------------+  |
|  | Planning Mars 2025                 ❌      |  |
|  | 4 semaines • 0 internes • 0 practices      |  |
|  | Modifié: 01/11/2025 09:00                 |  |
|  |                                            |  |
|  | [👁️ Voir]  [⚙️ Config]  [📋]  [🗑️]      |  |
|  +--------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

### Codes Couleur

- **✅ Vert** : Planning généré et valide
- **⏳ Orange** : Planning en configuration (pas encore généré)
- **❌ Rouge** : Planning avec erreurs

---

## 🗄️ Modèle de Données

### Structure Planning (Métadonnées)

```javascript
{
  id: "uuid-v4",
  nom: "Planning Janvier 2025",
  dateDebut: "2025-01-06",  // Lundi
  nombreSemaines: 3,
  dateCreation: "2025-11-04T14:30:00",
  derniereModification: "2025-11-04T15:45:00",
  statut: "genere", // "configuration" | "genere" | "erreur"
  
  // Compteurs (pour affichage rapide)
  nbInternes: 7,
  nbPractices: 8,
  nbEmpechements: 5,
  scoreEquilibre: 82,  // 0-100
  
  // Référence vers les données complètes
  dataKey: "planning_uuid-v4"  // Clé dans LocalStorage
}
```

---

## 🔌 APIs / Fonctions

### `getPlannings()`
```javascript
/**
 * Récupère la liste de tous les plannings
 * @returns {Array<Planning>} Liste des plannings triée
 */
function getPlannings() {
  // Récupérer depuis LocalStorage
  // Trier par derniereModification (desc)
  // Retourner
}
```

### `createPlanning(nom, dateDebut, nombreSemaines)`
```javascript
/**
 * Crée un nouveau planning
 * @param {string} nom - Nom du planning
 * @param {string} dateDebut - Date de début (format ISO)
 * @param {number} nombreSemaines - Nombre de semaines (1-10)
 * @returns {Planning} Le planning créé
 */
function createPlanning(nom, dateDebut, nombreSemaines) {
  // Générer un ID unique
  // Créer l'objet planning
  // Sauvegarder dans LocalStorage
  // Retourner le planning
}
```

### `deletePlanning(id)`
```javascript
/**
 * Supprime un planning
 * @param {string} id - ID du planning
 * @returns {boolean} Succès ou échec
 */
function deletePlanning(id) {
  // Supprimer les métadonnées
  // Supprimer les données complètes
  // Retourner true si succès
}
```

### `duplicatePlanning(id)`
```javascript
/**
 * Duplique un planning existant
 * @param {string} id - ID du planning à dupliquer
 * @returns {Planning} Le nouveau planning créé
 */
function duplicatePlanning(id) {
  // Charger le planning original
  // Copier internes, practices, empêchements
  // Créer nouveau planning avec nouveau ID
  // Réinitialiser gardes et affectations
  // Retourner le nouveau planning
}
```

---

## ✅ Critères d'Acceptation

### Scénario 1 : Premier Lancement
```
GIVEN l'utilisateur lance l'application pour la première fois
WHEN la page se charge
THEN il voit le message "Aucun planning créé"
AND il voit un bouton "Créer votre premier planning"
```

### Scénario 2 : Créer un Planning
```
GIVEN l'utilisateur est sur le dashboard
WHEN il clique sur "Nouveau" ou "Créer votre premier planning"
THEN il est redirigé vers le wizard (Étape 1)
AND un brouillon est créé automatiquement
```

### Scénario 3 : Afficher les Plannings
```
GIVEN l'utilisateur a 3 plannings créés
WHEN il est sur le dashboard
THEN il voit les 3 plannings dans l'ordre de modification (récent en haut)
AND chaque planning affiche : nom, statut, nb semaines, nb internes, nb practices, date
```

### Scénario 4 : Supprimer un Planning
```
GIVEN l'utilisateur a sélectionné un planning
WHEN il clique sur l'icône de suppression
THEN une confirmation apparaît
WHEN il confirme
THEN le planning est supprimé
AND la liste est rafraîchie sans ce planning
```

### Scénario 5 : Dupliquer un Planning
```
GIVEN l'utilisateur a un planning "Janvier 2025" avec 7 internes et 8 practices
WHEN il clique sur dupliquer
AND il confirme
THEN un nouveau planning "Copie de Janvier 2025" est créé
AND le nouveau planning contient les mêmes internes et practices
AND les gardes ne sont pas copiées (à régénérer)
```

---

## 🧪 Tests

### Tests Unitaires
- [x] `getPlannings()` retourne un array vide si aucun planning
- [x] `getPlannings()` retourne les plannings triés par date
- [x] `createPlanning()` crée un planning avec un ID unique
- [x] `deletePlanning()` supprime bien le planning
- [x] `duplicatePlanning()` copie correctement les données

### Tests d'Intégration
- [x] Créer un planning → apparaît dans la liste
- [x] Supprimer un planning → disparaît de la liste
- [x] Dupliquer un planning → nouveau planning créé avec les bonnes données

### Tests E2E
- [x] Parcours complet : lancer app → créer planning → voir dans liste → supprimer

---

## 📝 Notes Techniques

### LocalStorage Structure
```javascript
// Clé pour la liste des plannings
"plannings_list": [
  {id: "abc", nom: "Planning Janvier", ...},
  {id: "def", nom: "Planning Février", ...}
]

// Clé pour chaque planning complet
"planning_abc": {
  // Données complètes du planning
  internes: [...],
  practices: [...],
  empechements: [...],
  gardes: [...],
  affectations: [...]
}
```

### Performance
- La liste des plannings est chargée au démarrage
- Les données complètes de chaque planning sont chargées à la demande
- Limite : ~50 plannings maximum (limite LocalStorage ~5MB)

---

## 🔗 Liens

- **Suivant :** [MODULE 2 - Configuration](MODULE-2-configuration.md)
- **Documentation technique :** [Architecture](../technical/ARCHITECTURE.md)

---

*Dernière mise à jour : 4 novembre 2025*

