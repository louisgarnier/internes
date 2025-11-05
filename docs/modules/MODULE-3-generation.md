# MODULE 3 - Génération Automatique

## 📋 Vue d'Ensemble

**Objectif :** Générer automatiquement un planning complet en respectant toutes les contraintes (gardes, repos, empêchements, équilibre).

**Priorité :** 🔴 CRITIQUE (Cœur de l'application)

**Statut :** 🟡 EN DÉVELOPPEMENT (70% complété)

**Dépendances :** MODULE 2 (Configuration complète)

**Complexité :** ⭐⭐⭐⭐⭐ TRÈS ÉLEVÉE

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
| **CD2e** - Pas de garde Lundi si garde Dimanche | ✅ IMPLÉMENTÉ | Garde Dimanche finit Lundi 8h → Impossible garde Lundi 18h |
| **CD3** - Unicité des gardes (1 interne = max 1 garde/jour) | ✅ IMPLÉMENTÉ | Vérifié dans le scoring |
| **CD4** - Respect des empêchements (indisponibilités) | ✅ IMPLÉMENTÉ | Vérifié pour gardes + practices + OFFs |
| **CD5** - Demi-journée OFF (1 par interne/semaine) | ⚠️ PARTIEL | Attribué si slots disponibles (bonus) |
| **CD6** - Couverture complète (7 gardes/semaine) | ✅ IMPLÉMENTÉ | 7/7 gardes toujours attribuées |

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

### PHASE 1 : Attribution des Gardes 🌙

**Objectif :** Assigner les 7 gardes de la semaine de manière optimale.

**Les 7 gardes à attribuer :**
1. Garde Lundi soir (GS)
2. Garde Mardi soir (GS)
3. Garde Mercredi soir (GS)
4. Garde Jeudi soir (GS)
5. Garde Vendredi soir (GS)
6. Garde Samedi (GSam) → 13h-8h dimanche
7. Garde Dimanche (GDim) → 24h

**Ordre de priorité :**
1. **Garde Dimanche** (la plus difficile, 24h)
2. **Gardes Semaine** (Lundi-Vendredi)
3. **Garde Samedi** (la moins désirable)

**Pour chaque garde :**
```
1. Filtrer les internes DISPONIBLES
   - Pas de garde déjà assignée ce jour
   - Pas de repos post-garde ce jour
   - Pas d'empêchement
   
2. Calculer un SCORE pour chaque interne disponible
   
3. Choisir l'interne avec le MEILLEUR score
   
4. Assigner la garde
   
5. Marquer les repos post-garde automatiques
```

**Système de Score :**
```javascript
score = 0

// Facteur 1 : Déficit de gardes totales (poids 3)
deficitTotal = moyenneGardes - gardesInterne
score += deficitTotal × 3

// Facteur 2 : Déficit par type de garde (poids 2)
if (typeGarde === "dimanche") {
  deficitDimanche = moyenneDimanche - gardesdimanCheInterne
  score += deficitDimanche × 2
  score += 1 // Bonus pour garde dimanche
}

if (typeGarde === "samedi") {
  deficitSamedi = moyenneSamedi - gardesSamediInterne
  score += deficitSamedi × 2
  
  // Pénalité si garde samedi récente (< 3 semaines)
  if (aFaitSamediRecemment) {
    score -= 5
  }
}

// Facteur 3 : Aléatoire (pour éviter patterns)
score += random(-0.1, 0.1)

// L'interne avec le score le PLUS ÉLEVÉ est choisi
```

**Exemple :**
```
Garde Dimanche :
- Dr. Martin : -2 gardes → score = (-2 × 3) + (-1 × 2) + 1 = -7
- Dr. Sophie : -1 garde  → score = (-1 × 3) + (0 × 2) + 1 = -2  ← CHOISI
- Dr. Lucas  : +1 garde  → score = (1 × 3) + (1 × 2) + 1 = 6
```

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

*Dernière mise à jour : 4 novembre 2025*

