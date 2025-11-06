# MODULE 3 - Génération Automatique

## 📋 Vue d'Ensemble

**Objectif :** Générer automatiquement un planning complet à partir des gardes pré-assignées, en respectant toutes les contraintes (repos, empêchements, équilibre practices/OFFs).

**Priorité :** 🔴 CRITIQUE (Cœur de l'application)

**Statut :** 🟡 EN COURS DE REFONTE (60% - Changement majeur : Gardes pré-assignées)

**Dépendances :** MODULE 2 (Configuration complète + Gardes pré-assignées - Étape 5)

**Complexité :** ⭐⭐⭐⭐ ÉLEVÉE

**🔄 CHANGEMENT MAJEUR v1.0 :**
- **Avant** : Les gardes étaient attribuées automatiquement par l'algorithme (scoring)
- **Maintenant** : Les gardes sont **pré-assignées manuellement** via l'Étape 5 du wizard (source: systèmes hospitaliers externes)
- **Impact** : PHASE 1 simplifiée = Appliquer les gardes pré-définies + Validations/Warnings

---

## ✅ État d'Implémentation des Contraintes

### Contraintes DURES (Obligatoires)

| Contrainte | Statut | Notes |
|------------|--------|-------|
| **CD1** - Capacité des practices (exactement N internes requis) | ✅ IMPLÉMENTÉ | Attribution à 1 ou 2 internes selon config |
| **CD2a** - Repos post-garde Lun-Jeu (lendemain matin+AM) | ✅ IMPLÉMENTÉ | Fonctionne correctement |
| **CD2b** - Repos post-garde Vendredi (samedi matin+AM) | ✅ IMPLÉMENTÉ | Fonctionne correctement |
| **CD2c** - Repos post-garde Samedi (dimanche matin+AM) | ✅ IMPLÉMENTÉ | Fonctionne correctement |
| **CD2d** - Repos post-garde Dimanche (lundi matin+AM) | ✅ IMPLÉMENTÉ | Repos placé sur lundi de la semaine suivante (cross-semaine) |
| **CD2e** - Pas de garde Lundi si garde Dimanche | ⚠️ WARNING | Vérifié dans Étape 5 wizard (non bloquant) |
| **CD3** - Unicité des gardes (1 interne = max 1 garde/jour) | ⚠️ WARNING | Vérifié dans Étape 5 wizard (non bloquant) |
| **CD4** - Respect des empêchements (indisponibilités) | ✅ IMPLÉMENTÉ | Vérifié pour practices + OFFs (warning pour gardes) |
| **CD5** - Demi-journée OFF (1 par interne/semaine) | ⚠️ PARTIEL | Attribué si slots disponibles (bonus) |
| **CD6** - Couverture complète (7 gardes/semaine) | ❌ NON REQUIS | Les gardes sont saisies manuellement, peut être incomplet |

### Contraintes SOUPLES (Objectifs d'équilibre)

| Contrainte | Statut | Notes |
|------------|--------|-------|
| **CS1** - Équilibre global des gardes (~7×S/N par interne) | ⚠️ PARTIEL | Scoring basique, pas de vérification finale |
| **CS2** - Équilibre par type de garde (GS/GSam/GDim) | ⚠️ PARTIEL | Scoring favorise dimanche en premier, mais déséquilibre possible (ex: Hugo 3 weekends, Léa 1) |
| **CS3** - Équilibre des practices (même temps dans chaque practice) | ⚠️ PARTIEL | Scoring basique, pas optimisé |
| **CS4** - Équilibre des demi-journées travaillées (~11×S/N) | ❌ NON IMPLÉMENTÉ | Pas de vérification |
| **CS5** - Distribution temporelle (éviter concentration gardes) | ❌ NON IMPLÉMENTÉ | Pas de vérification |
| **CS6** - Équilibre OFF + Manque | ✅ IMPLÉMENTÉ | OFFs priorisés pour ceux avec doublons |
| **CS7** - Équilibre des doublons (surcharge équitable) | ✅ IMPLÉMENTÉ | Scoring tri par nb doublons semaine |

### Fonctionnalités Avancées (v1.1+)

| Fonctionnalité | Statut | Module |
|----------------|--------|--------|
| Détection conflits détaillés | ❌ PLANIFIÉ | m3-12 |
| Option "Ajouter internes" si sous-effectif | ❌ PLANIFIÉ | m3-13 |
| Calcul score d'équilibre 0-100 | ❌ PLANIFIÉ | m3-14 |
| Vue "Par Jour/Période" | ❌ PLANIFIÉ | m4 |
| Export PDF/Excel | ❌ PLANIFIÉ | m6 |

---

## 🎯 Fonctionnalités

### F3.1 - Options de Génération

L'utilisateur peut générer le planning de plusieurs façons :

#### Option 1 : Génération Complète
- Génère **toutes les semaines** d'un seul coup
- Recommandé pour un nouveau planning
- Bouton : `🚀 Générer le Planning Complet`

#### Option 2 : Génération Partielle
- Génère **une semaine spécifique**
- Utile pour compléter un planning existant
- Sélecteur : Semaine 1, 2, 3, etc.
- Bouton : `Générer la Semaine X`

#### Option 3 : Régénération
- **Régénère** une semaine déjà générée
- Utile pour corriger ou réoptimiser
- Avertissement : "Cela écrasera la semaine existante"
- Bouton : `🔄 Régénérer la Semaine X`

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Planning Janvier 2025                         │
│  3 semaines • 7 internes • 8 practices         │
├────────────────────────────────────────────────┤
│                                                │
│  Génération du Planning                        │
│                                                │
│  ⦿ Générer toutes les semaines (1-3)          │
│  ⭘ Générer une semaine spécifique : [▼ 1]    │
│                                                │
│  [🚀 Générer]                                  │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🧮 F3.2 - Algorithme de Génération

### Vue d'Ensemble

L'algorithme se déroule en **4 phases** :

```
PHASE 1: Attribution des 7 gardes de la semaine
   ↓
PHASE 2: Calcul automatique des repos post-garde
   ↓
PHASE 3: Attribution de 1 demi-journée OFF par interne
   ↓
PHASE 4: Attribution aux practices pour tous les slots
   ↓
VALIDATION: Vérification des contraintes
```

---

### PHASE 1 : Application des Gardes Pré-assignées 🌙 (REFONTE v1.0)

**🔄 CHANGEMENT MAJEUR :** Les gardes ne sont plus attribuées automatiquement par l'algorithme. Elles sont **pré-saisies manuellement** dans l'Étape 5 du wizard (source: systèmes hospitaliers externes).

**Objectif :** Appliquer les gardes pré-définies dans la structure de la semaine + Détecter/afficher les warnings + Préparer le calcul des repos.

**Les 7 gardes (pré-assignées) :**
1. Garde Lundi soir (GS) → 18h-8h (14h)
2. Garde Mardi soir (GS) → 18h-8h (14h)
3. Garde Mercredi soir (GS) → 18h-8h (14h)
4. Garde Jeudi soir (GS) → 18h-8h (14h)
5. Garde Vendredi soir (GS) → 18h-8h (14h)
6. Garde Samedi (GSam) → 13h-8h dimanche (19h)
7. Garde Dimanche (GDim) → 8h-8h lundi (24h)

**Source des gardes :**
- Saisies manuellement dans l'**Étape 5** du wizard
- Format : `{ interneId, date, type, reposDate }`
- Type déduit automatiquement du jour de la semaine
- Total requis : `nb_semaines × 7` gardes

**Processus PHASE 1 :**
```
1. Récupérer les gardes pré-assignées depuis planning.preAssignedGardes
   
2. Pour chaque semaine à générer :
   
   a) Filtrer les gardes de cette semaine (date dans [startDate, endDate])
   
   b) Pour chaque garde :
      - Identifier le type (lundi-vendredi/samedi/dimanche)
      - Récupérer l'interne assigné
      - Placer la garde dans la structure week.gardes
   
   c) (Optionnel) Vérifier le nombre de gardes présentes
      → Si < 7 : Logger info "Semaine X : X/7 gardes assignées" (NON BLOQUANT)
   
   d) (Optionnel) Détecter et logger les warnings :
      • ⚠️ 2 gardes même jour
      • ⚠️ Gardes consécutives
      • ⚠️ Garde sur indisponibilité
      
   e) Préparer les dates de repos (calculées à PHASE 2)
```

**Important :**
- ✅ Les gardes sont **FIXES** (pas de scoring, pas d'optimisation)
- ✅ Les repos seront calculés automatiquement en PHASE 2 (inchangé)
- ⚠️ Les warnings sont **informatifs** (non bloquants, affichés dans Étape 5)
- ❌ Pas de modification des gardes dans la génération

**Validation (informative uniquement) :**
```javascript
// Logger le nombre de gardes présentes (NON BLOQUANT)
function logGardesForWeek(weekStartDate, preAssignedGardes) {
  const gardesThisWeek = preAssignedGardes.filter(g => 
    g.date >= weekStartDate && g.date <= addDays(weekStartDate, 6)
  )
  
  console.log(`📊 Semaine ${weekStartDate} : ${gardesThisWeek.length}/7 gardes assignées`)
  
  // Logger les types de gardes présentes
  const types = gardesThisWeek.map(g => g.type)
  const semaineCount = types.filter(t => t === 'semaine').length
  const hasSamedi = types.includes('samedi')
  const hasDimanche = types.includes('dimanche')
  
  console.log(`  - Gardes semaine : ${semaineCount}/5`)
  console.log(`  - Garde samedi : ${hasSamedi ? '✅' : '❌'}`)
  console.log(`  - Garde dimanche : ${hasDimanche ? '✅' : '❌'}`)
  
  if (gardesThisWeek.length < 7) {
    console.log(`  ⚠️ Semaine incomplète : ${7 - gardesThisWeek.length} garde(s) manquante(s)`)
  }
  
  return gardesThisWeek
}
```

**Exemple de structure après PHASE 1 :**
```javascript
week.gardes = {
  semaine: [
    { interneId: 'intern-1', date: '2025-01-06', type: 'semaine', jourName: 'lundi' },
    { interneId: 'intern-2', date: '2025-01-07', type: 'semaine', jourName: 'mardi' },
    { interneId: 'intern-3', date: '2025-01-08', type: 'semaine', jourName: 'mercredi' },
    { interneId: 'intern-4', date: '2025-01-09', type: 'semaine', jourName: 'jeudi' },
    { interneId: 'intern-5', date: '2025-01-10', type: 'semaine', jourName: 'vendredi' }
  ],
  samedi: { interneId: 'intern-6', date: '2025-01-11', type: 'samedi' },
  dimanche: { interneId: 'intern-7', date: '2025-01-05', type: 'dimanche' },
  astreinteSamedi: null // Calculé séparément (existant)
}
```

**Différence avec l'ancien système :**
| Aspect | Ancien (scoring) | Nouveau (pré-assigné) |
|--------|------------------|----------------------|
| Source | Algorithme automatique | Saisie manuelle (Étape 5) |
| Optimisation | Scoring + équilibrage | Aucune (gardes fixes) |
| Flexibilité | Automatique | Contrôle utilisateur total |
| Warnings | Bloquants | Informatifs uniquement |
| Modification | Régénération = nouvelles gardes | Gardes conservées |

---

### ⚠️ Warnings et Validations (PHASE 1 - Gardes)

**3 types de warnings détectés lors de la saisie (Étape 5) et de la génération :**

#### Warning 1 : Deux gardes le même jour
```javascript
function detectDuplicateGardes(preAssignedGardes) {
  const gardesByDate = {}
  const warnings = []
  
  preAssignedGardes.forEach(garde => {
    if (!gardesByDate[garde.date]) {
      gardesByDate[garde.date] = []
    }
    gardesByDate[garde.date].push(garde)
  })
  
  Object.entries(gardesByDate).forEach(([date, gardes]) => {
    if (gardes.length > 1) {
      warnings.push({
        type: 'duplicate_garde',
        date,
        internes: gardes.map(g => g.interneId),
        message: `⚠️ 2 gardes assignées le ${date}`
      })
    }
  })
  
  return warnings
}
```

#### Warning 2 : Gardes consécutives
```javascript
function detectConsecutiveGardes(interneId, preAssignedGardes) {
  const interneGardes = preAssignedGardes
    .filter(g => g.interneId === interneId)
    .map(g => g.date)
    .sort()
  
  const warnings = []
  
  for (let i = 0; i < interneGardes.length - 1; i++) {
    const date1 = new Date(interneGardes[i])
    const date2 = new Date(interneGardes[i + 1])
    const diffDays = (date2 - date1) / (1000 * 60 * 60 * 24)
    
    if (diffDays === 1) {
      warnings.push({
        type: 'consecutive_gardes',
        interneId,
        dates: [interneGardes[i], interneGardes[i + 1]],
        message: `⚠️ Gardes consécutives : ${interneGardes[i]} et ${interneGardes[i + 1]}`
      })
    }
  }
  
  return warnings
}
```

#### Warning 3 : Garde sur indisponibilité
```javascript
function detectGardeOnUnavailability(preAssignedGardes, unavailabilities) {
  const warnings = []
  
  preAssignedGardes.forEach(garde => {
    const conflict = unavailabilities.find(unavail => 
      unavail.internId === garde.interneId &&
      unavail.date === garde.date &&
      (unavail.period === 'fullday' || unavail.period === 'afternoon')
    )
    
    if (conflict) {
      warnings.push({
        type: 'garde_on_unavailability',
        interneId: garde.interneId,
        date: garde.date,
        message: `⚠️ Garde assignée sur une indisponibilité (${conflict.reason || 'Non spécifié'})`
      })
    }
  })
  
  return warnings
}
```

**Affichage des warnings :**
- **Dans l'Étape 5 du wizard** : Affichés en temps réel lors de l'ajout/modification d'une garde
- **Dans la génération** : Loggés dans la console (informatifs, non bloquants)
- **Format** : Badge orange avec icône ⚠️ à côté de la garde concernée

**Important :**
- ⚠️ Ces warnings sont **NON BLOQUANTS** (flexibilité pour cas exceptionnels)
- ℹ️ Ils sont affichés pour **informer l'utilisateur** des situations potentiellement problématiques
- ✅ L'utilisateur peut choisir de les ignorer (ex: urgence, remplacement de dernière minute)

---

### PHASE 2 : Repos Post-Garde Automatiques 💤

**Règles strictes :**

| Garde | Repos le lendemain |
|-------|-------------------|
| Lundi soir | **Mardi** (matin + après-midi) |
| Mardi soir | **Mercredi** (matin + après-midi) |
| Mercredi soir | **Jeudi** (matin + après-midi) |
| Jeudi soir | **Vendredi** (matin + après-midi) |
| Vendredi soir | **Samedi** (matin + après-midi) - PAS D'ASTREINTE |
| Samedi | **Dimanche** (pas de travail de toute façon) |
| Dimanche | **Lundi** (matin + après-midi) |

**Action :**
```
Pour chaque garde assignée :
  1. Identifier le lendemain
  2. Marquer l'interne comme INDISPONIBLE pour :
     - Matin du lendemain
     - Après-midi du lendemain
  3. Créer des "affectations repos" dans le planning
```

**Particularité Garde Vendredi :**
```
⚠️ IMPORTANT : Garde vendredi soir → Repos samedi COMPLET
   → L'interne ne fait PAS l'astreinte samedi matin
   → C'est un vrai repos compensatoire
```

---

### PHASE 4 : Attribution aux Practices 🏥

**⚠️ IMPORTANT :** Cette phase se fait AVANT l'attribution des OFF.

**Logique :** 
- ✅ **Priorité absolue = Couvrir tous les postes de travail**
- ✅ Les OFF sont un bonus attribué APRÈS si des slots sont disponibles
- ✅ Si pas assez d'internes pour couvrir → Proposer d'ajouter des internes

**Objectif :** Remplir tous les slots de travail avec les internes disponibles.

**Slots à remplir :**
- Lundi : Matin + Après-midi
- Mardi : Matin + Après-midi
- Mercredi : Matin + Après-midi
- Jeudi : Matin + Après-midi
- Vendredi : Matin + Après-midi
- Samedi : Astreinte (matin uniquement)
- **Total : 11 slots par semaine**

**Ordre de traitement :**
1. **Practices à 2 internes** (plus contraignantes)
2. **Practices à 1 interne**

**Pour chaque slot + practice :**
```
1. Filtrer les internes DISPONIBLES
   - Pas en repos
   - Pas d'empêchement
   - Pas déjà assigné à une autre practice ce slot
   - Practice active ce jour/période
   
2. Calculer un SCORE pour chaque interne disponible
   
3. Choisir les N meilleurs internes (N = nombre requis)
   
4. Assigner
```

**Système de Score :**
```javascript
score = 0

// Facteur 1 : Déficit dans cette practice (poids 3)
deficitPractice = moyennePractice - djInternePractice
score += deficitPractice × 3

// Facteur 2 : Déficit global de demi-journées (poids 1)
deficitGlobal = moyenneDJ - djInterne
score += deficitGlobal × 1

// Aléatoire
score += random(-0.05, 0.05)

// L'interne avec le score le PLUS ÉLEVÉ est choisi
```

**Gestion des practices sous-staffées :**
```
SI practice manque d'internes (ex: 1/2 assigné)
ALORS
  - Enregistrer comme "alerte"
  - Proposer à l'utilisateur d'ajouter des internes
  - Ou ajuster le nombre requis pour cette practice
FIN SI
```

---

### 🚨 CAS SPÉCIAL : Astreinte Samedi Matin ✅ IMPLÉMENTÉ

**Nature :** L'astreinte samedi matin (8h-13h) est générée **automatiquement** (comme les gardes), **PAS via les practices**.

**Caractéristiques :**
- **Horaires :** Samedi 8h → 13h (5 heures)
- **Effectif requis :** **1 interne obligatoire** (titulaire)
- **Backup :** Non implémenté dans v1.0 (voir MODULE 5 pour v1.1+)
- **Génération :** Phase 1e (après gardes samedi, avant repos)
- **Stockage :** `week.gardes.astreinteSamedi`

**Contraintes spécifiques :**

| Règle | Description | Statut |
|-------|-------------|--------|
| **AS1** - 1 interne titulaire | Obligatoire, généré automatiquement | ✅ IMPLÉMENTÉ |
| **AS2** - Incompatibilité garde samedi | L'interne de garde samedi (13h→Dim 8h) **NE PEUT PAS** être titulaire astreinte | ✅ IMPLÉMENTÉ |
| **AS3** - Compatibilité garde vendredi | L'interne de garde vendredi (18h→Sam 8h) **PEUT** enchaîner avec astreinte (Sam 8h-13h) | ✅ IMPLÉMENTÉ |
| **AS4** - Scoring intermédiaire | Difficulté > matin normal, mais < garde | ✅ IMPLÉMENTÉ |

**Scoring de l'astreinte :**
```
Difficulté relative :
  Garde dimanche (24h)        : 100 points
  Garde samedi (19h)          : 80 points
  Astreinte samedi (5h)       : 40 points  ← Moins contraignant qu'une garde
  Garde semaine (14h)         : 30 points
  Demi-journée normale        : 10 points
```

**Attribution :**
- Utilise le même système de scoring que les practices
- Filtre supplémentaire : exclure l'interne de garde samedi
- Favorise l'équilibrage entre internes sur plusieurs semaines

**Affichage :**
- Vue "Par Interne" : `Astreinte (M)` dans la colonne Samedi
- Vue "Par Jour/Période" : `Astreinte: [Nom Interne]` dans cellule Samedi Matin

---

### PHASE 3 : Attribution Demi-Journées OFF 🏖️

**⚠️ IMPORTANT :** Cette phase se fait APRÈS l'attribution aux practices.

**Règle :** Chaque interne DEVRAIT avoir 1 demi-journée OFF par semaine (si possible).

**Priorité des slots OFF :**
1. **Vendredi après-midi** (préféré)
2. Vendredi matin
3. Jeudi après-midi
4. Mercredi après-midi
5. ... autres jours

**Algorithme :**
```
Pour chaque interne :
  1. Parcourir les slots par ordre de priorité
  2. Vérifier disponibilité :
     - Pas de repos post-garde
     - Pas de garde le soir même
     - Pas d'empêchement
     - Pas déjà assigné à une practice (slots restants uniquement)
  3. Assigner le premier slot disponible
  4. Si aucun slot disponible → OK, interne travaille toute la semaine
     (Les OFF sont un bonus, pas une obligation stricte si pas de slots)
```

**Note importante :**
- Les OFF sont souhaitables mais pas obligatoires si aucun slot disponible
- Priorité = Couverture des practices
- Dans les statistiques, montrer le nombre de semaines sans OFF par interne

**Cas particulier Garde Samedi :**
```
Si interne a garde samedi :
  → Afficher le montant de la garde (€)
  → Pas de compensation automatique en demi-journées OFF
  → Équilibrage sur la durée totale du planning
```

**Affichage des Prix de Garde :**
- Garde Semaine : XX € (à configurer)
- Garde Samedi : XX € (montant plus élevé)
- Garde Dimanche : XX € (montant le plus élevé)

---

## ⚠️ F3.3 - Gestion des Conflits

### Types de Conflits

#### 1. Conflit Garde
```
PROBLÈME : Aucun interne disponible pour une garde

CAUSE POSSIBLE :
- Trop d'empêchements
- Pas assez d'internes

SOLUTION :
- Afficher message : "Impossible d'assigner garde [jour]"
- Lister les raisons (empêchements, repos, etc.)
- Suggérer : réduire empêchements ou ajouter internes
```

#### 2. Conflit OFF
```
PROBLÈME : Impossible de donner OFF à un interne

CAUSE POSSIBLE :
- Interne a trop d'empêchements
- Interne a garde + repos tous les jours

SOLUTION :
- Afficher avertissement
- Proposer de relâcher cette contrainte pour cet interne
```

#### 3. Conflit Practice
```
PROBLÈME : Practice sous-staffée (pas assez d'internes)

CAUSE POSSIBLE :
- Trop de repos ce jour
- Trop d'empêchements
- Pas assez d'internes total

SOLUTION :
- Afficher alerte : "Practice [nom] sous-staffée [jour] [période]"
- Montrer : [X/N internes] (ex: 1/2)
- Proposer : ajuster nombre requis ou ajouter internes
```

### Interface Résultat
```
┌────────────────────────────────────────────────┐
│  Génération Terminée                           │
├────────────────────────────────────────────────┤
│                                                │
│  ✅ Gardes : 7/7 assignées                     │
│  ✅ Demi-journées OFF : 7/7 assignées          │
│  ⚠️ Practices : 2 alertes                      │
│                                                │
│  Détail des alertes :                          │
│  ┌──────────────────────────────────────────┐ │
│  │ ⚠️ Chirurgie - Mardi matin              │ │
│  │    1/2 internes assignés                 │ │
│  │    Cause : Dr. Martin en repos,          │ │
│  │            Dr. Sophie empêchement        │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ ⚠️ Urgences - Vendredi après-midi       │ │
│  │    0/2 internes assignés                 │ │
│  │    Cause : Tous en OFF ou empêchement    │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  [Voir le Planning] [Ajuster et Régénérer]   │
└────────────────────────────────────────────────┘
```

---

## 📊 F3.4 - Score d'Équilibre

**Objectif :** Évaluer la qualité du planning généré (0-100).

**Composantes du score :**

### 1. Équilibre des Gardes (30 points)
```
Écart-type des gardes totales entre internes

écartType < 0.5  → 30 points (excellent)
écartType < 1.0  → 20 points (bon)
écartType < 2.0  → 10 points (moyen)
écartType >= 2.0 → 0 points (mauvais)
```

### 2. Équilibre par Type de Garde (25 points)
```
Écart-type des gardes semaine (10 pts)
Écart-type des gardes samedi (10 pts)
Écart-type des gardes dimanche (5 pts)
```

### 3. Équilibre des Practices (25 points)
```
Pour chaque practice :
  Écart-type des DJ par interne
  
Moyenne des écarts-types
```

### 4. Respect des Contraintes (20 points)
```
- 0 conflit garde : 10 points
- 0 conflit OFF : 5 points
- 0 conflit practice : 5 points
```

**Affichage :**
```
┌────────────────────────────────────┐
│  Score d'Équilibre : 82/100  🟢   │
├────────────────────────────────────┤
│  Gardes totales     : 28/30  ✅   │
│  Types de gardes    : 22/25  ✅   │
│  Practices          : 20/25  ✅   │
│  Contraintes        : 12/20  ⚠️   │
└────────────────────────────────────┘

🟢 Excellent (>80)
🟡 Bon (60-80)
🟠 Moyen (40-60)
🔴 Faible (<40)
```

---

## 🗄️ Modèle de Données

### Garde
```javascript
{
  id: "uuid",
  interneId: "uuid",
  date: "2025-01-06", // Lundi
  typeGarde: "semaine", // "semaine" | "samedi" | "dimanche"
  semaineNumero: 1 // 1 à 10
}
```

### Affectation
```javascript
{
  id: "uuid",
  interneId: "uuid",
  practiceId: "uuid", // null si repos ou OFF
  date: "2025-01-06",
  periode: "matin", // "matin" | "apres_midi" | "astreinte"
  type: "travail", // "travail" | "repos" | "off"
  semaineNumero: 1
}
```

---

## ✅ Critères d'Acceptation

### Scénario 1 : Génération Simple
```
GIVEN un planning avec 7 internes, 8 practices, 0 empêchement
WHEN je génère 1 semaine
THEN les 7 gardes sont assignées
AND chaque interne a 1 OFF
AND toutes les practices sont couvertes
AND le score d'équilibre > 75
```

### Scénario 2 : Avec Empêchements
```
GIVEN un planning avec 5 empêchements déclarés
WHEN je génère 1 semaine
THEN aucun interne n'est assigné pendant son empêchement
AND le reste du planning est généré correctement
```

### Scénario 3 : Conflit Détecté
```
GIVEN un planning avec trop d'empêchements (impossible à résoudre)
WHEN je génère
THEN un message d'erreur explicite s'affiche
AND les conflits sont listés
AND des solutions sont proposées
```

---

## 🔗 Liens

- **Précédent :** [MODULE 2 - Configuration](MODULE-2-configuration.md)
- **Suivant :** [MODULE 4 - Visualisation](MODULE-4-visualisation.md)
- **Technique :** [Algorithmes détaillés](../technical/ALGORITHMS.md)

---

*Dernière mise à jour : 6 novembre 2025 - REFONTE PHASE 1 (Gardes pré-assignées)*

