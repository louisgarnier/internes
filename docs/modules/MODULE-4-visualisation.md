# MODULE 4 - Visualisation

## 📋 Vue d'Ensemble

**Objectif :** Afficher le planning généré sous différentes vues (hebdomadaire, calendrier, par interne, statistiques).

**Priorité :** 🔴 CRITIQUE

**Statut :** 🔄 EN COURS (0% → implémentation toggle + Vue 2)

**Dépendances :** MODULE 3 (Planning généré) ✅

---

## 📋 PLAN D'IMPLÉMENTATION - Module 4

### Phase 1 : Toggle & Structure (m4-1)
- ✅ **m4-1.1** : Ajouter `ref` pour `viewMode` ('byIntern' / 'byPeriod')
- ✅ **m4-1.2** : Créer composant toggle (2 boutons avec état actif)
- ✅ **m4-1.3** : Styling toggle (boutons, hover, état actif)
- ✅ **m4-1.4** : Affichage conditionnel (v-if sur viewMode)
- ✅ **m4-1.5** : Persistance LocalStorage (sauvegarder préférence)
- ✅ **m4-1.6** : Test : Toggle fonctionne visuellement

### Phase 2 : Vue "Par Jour/Période" - Structure (m4-2)
- ⏳ **m4-2.1** : Créer structure HTML tableau (3 lignes: Matin, AM, Garde)
- ⏳ **m4-2.2** : Header colonnes jours (Lun-Dim avec dates)
- ⏳ **m4-2.3** : Labels lignes (🌅 MATIN, 🌆 APRÈS-MIDI, 🌙 GARDE)
- ⏳ **m4-2.4** : Cellules vides avec bordures
- ⏳ **m4-2.5** : Navigation semaines (réutiliser existant)
- ⏳ **m4-2.6** : Test : Structure tableau visible

### Phase 3 : Vue "Par Jour/Période" - Logique Matin (m4-3)
- ⏳ **m4-3.1** : Fonction `getPracticesByDayPeriod(weekIndex, dayIndex, 'matin')`
- ⏳ **m4-3.2** : Grouper affectations par practice
- ⏳ **m4-3.3** : Pour chaque practice : afficher nom + liste internes
- ⏳ **m4-3.4** : Styling : nom practice en gras, internes en liste à puces
- ⏳ **m4-3.5** : Test : Affichage practices matin fonctionne

### Phase 4 : Vue "Par Jour/Période" - Logique Après-midi (m4-4)
- ⏳ **m4-4.1** : Réutiliser `getPracticesByDayPeriod` pour 'apres_midi'
- ⏳ **m4-4.2** : Affichage similaire à matin
- ⏳ **m4-4.3** : Gérer samedi AM (vide, pas de travail)
- ⏳ **m4-4.4** : Test : Affichage practices après-midi fonctionne

### Phase 5 : Vue "Par Jour/Période" - Gardes (m4-5)
- ⏳ **m4-5.1** : Fonction `getGardeByDay(weekIndex, dayIndex)`
- ⏳ **m4-5.2** : Afficher nom interne de garde (simple texte)
- ⏳ **m4-5.3** : Styling : fond orange, texte blanc
- ⏳ **m4-5.4** : Test : Affichage gardes fonctionne

### Phase 6 : Samedi matin Astreinte (m4-6)
- ⏳ **m4-6.1** : Détecter samedi matin (dayIndex === 5, periode === 'matin')
- ⏳ **m4-6.2** : Afficher "Astreinte:" au lieu du nom practice
- ⏳ **m4-6.3** : Liste internes assignés à l'astreinte
- ⏳ **m4-6.4** : Test : Astreinte samedi affichée correctement

### Phase 7 : Styling & Finitions (m4-7)
- ⏳ **m4-7.1** : Cellules adaptatives en hauteur (min-height, auto)
- ⏳ **m4-7.2** : Alignement texte (practices centré/gauche)
- ⏳ **m4-7.3** : Espacement liste internes (padding, margin)
- ⏳ **m4-7.4** : Responsive (largeur colonnes adaptative)
- ⏳ **m4-7.5** : Test : Tableau lisible et esthétique

### Phase 8 : Tests & Validation (m4-8)
- ⏳ **m4-8.1** : Test toggle : switch entre les 2 vues
- ⏳ **m4-8.2** : Test navigation semaines : fonctionne pour les 2 vues
- ⏳ **m4-8.3** : Test données : toutes practices + gardes affichées
- ⏳ **m4-8.4** : Test edge cases : semaine vide, 1 seul interne, etc.
- ⏳ **m4-8.5** : Validation utilisateur : lisibilité OK

---

## 🎯 Fonctionnalités

### F4.1 - Vue Hebdomadaire (Tableau)

**Vue par défaut** : Tableau avec **2 modes de visualisation** complémentaires.

**🔄 Toggle entre 2 vues :**
```
┌──────────────────────────────────────────────────────────┐
│  Planning Janvier 2025 - Semaine 1                       │
│  [← Sem Préc]  06/01 - 12/01/2025  [Sem Suiv →]         │
│                                                           │
│  [ 👤 Vue par Interne ]  [ 📅 Vue par Jour/Période ]    │ ← Toggle
└──────────────────────────────────────────────────────────┘
```

---

#### 📋 **VUE 1 : PAR INTERNE** (pour les internes)

**Objectif :** Chaque interne voit **son planning personnel** complet.

**Structure :**
- Colonnes : Jours de la semaine (Lun-Dim)
- Lignes : Internes
- Cellules : Tâches de l'interne ce jour (practices, garde, repos, OFF)

**Interface :**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  👤 Vue par Interne                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Interne      │ Lun 06/01  │ Mar 07/01  │ Mer 08/01  │ Jeu │ Ven │ Sam │ Dim │
│───────────────┼────────────┼────────────┼────────────┼─────┼─────┼─────┼─────┤
│ Alice Martin  │ M: Cardio  │ REPOS      │ M: Urgences│ ... │ ... │ ... │ ... │
│               │ A: Cardio  │ REPOS      │ A: OFF     │     │     │     │     │
│               │ 🌙 GARDE   │            │            │     │     │     │     │
│───────────────┼────────────┼────────────┼────────────┼─────┼─────┼─────┼─────┤
│ Bob Dupont    │ M: Urgences│ M: Urgences│ M: Cardio  │ ... │ ... │ 🌙  │ REPOS│
│               │ A: Urgences│ A: OFF     │ A: Cardio  │     │     │GARDE│ REPOS│
│───────────────┼────────────┼────────────┼────────────┼─────┼─────┼─────┼─────┤
│ Charlie B.    │ M: Cardio  │ M: Cardio  │ M: OFF     │ ... │ ... │ ... │ ... │
│               │ A: OFF     │ A: Urgences│ A: Urgences│     │     │     │     │
│───────────────┼────────────┼────────────┼────────────┼─────┼─────┼─────┼─────┤
│ ... (7 internes au total)                                                     │
└───────────────────────────────────────────────────────────────────────────────┘

Légende :
M: Matin (8h-13h) | A: Après-midi (13h-18h) | A: Astreinte (samedi matin)
🌙 GARDE : Garde du soir (18h-8h lendemain)
REPOS : Repos post-garde obligatoire
OFF : Demi-journée de repos hebdomadaire
```

**Affichage par cellule :**
1. **Matin / Après-midi** :
   - Si **practice** : "M: Cardio" ou "A: Urgences"
   - Si **REPOS** : "REPOS" (texte jaune, cellule grisée)
   - Si **OFF** : "OFF" (texte bleu)
   - Si **Empêchement** : "❌ Indisponible" (texte rouge)

2. **Garde** :
   - Si **garde** : "🌙 GARDE" (texte orange sur fond sombre)
   - Sinon : cellule vide

3. **Samedi / Dimanche** :
   - Samedi matin : "A: Astreinte" (si assigné)
   - Samedi après-midi : vide (pas de travail)
   - Dimanche : vide ou "REPOS" si garde samedi/dimanche

**Cas d'affichage complet d'une cellule :**
```
┌────────────────┐
│ Lundi 06/01    │ ← Cellule pour Alice Martin
├────────────────┤
│ M: Cardio      │ ← Matin : Assignée à practice Cardio
│ A: Cardio      │ ← Après-midi : Assignée à practice Cardio
│ 🌙 GARDE       │ ← Soir : Garde de semaine
└────────────────┘
```

---

#### 🏥 **VUE 2 : PAR JOUR/PÉRIODE** (pour les managers)

**Objectif :** Vérifier la **couverture complète des practices** et des gardes.

**Structure :**
- Colonnes : Jours de la semaine (Lun-Dim)
- Lignes : **Périodes** (Matin, Après-midi, Garde)
- Cellules : **Practices** → Liste des internes assignés

**Interface :**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  📅 Vue par Jour/Période                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│             │ Lun 06/01       │ Mar 07/01       │ Mer 08/01       │ ... │ Dim │
│─────────────┼─────────────────┼─────────────────┼─────────────────┼─────┼─────┤
│ 🌅 MATIN    │ Cardio:         │ Cardio:         │ Cardio:         │ ... │  -  │
│             │  • Alice M.     │  • Alice M.     │  • Bob D.       │     │     │
│             │  • Charlie B.   │  • Charlie B.   │  • David L.     │     │     │
│             │                 │                 │                 │     │     │
│             │ Urgences:       │ Urgences:       │ Urgences:       │     │     │
│             │  • Bob D.       │  • David L.     │  • Eve R.       │     │     │
│             │  • David L.     │  • Eve R.       │  • Frank P.     │     │     │
│─────────────┼─────────────────┼─────────────────┼─────────────────┼─────┼─────┤
│ 🌆 APRÈS-   │ Cardio:         │ Cardio:         │ Cardio:         │ ... │  -  │
│    MIDI     │  • Alice M.     │  • George T.    │  • Bob D.       │     │     │
│             │  • George T.    │  • Hugo S.      │  • David L.     │     │     │
│             │                 │                 │                 │     │     │
│             │ Urgences:       │ Urgences:       │ Urgences:       │     │     │
│             │  • Bob D.       │  • Charlie B.   │  • Frank P.     │     │     │
│             │  • Eve R.       │  • David L.     │  • Hugo S.      │     │     │
│─────────────┼─────────────────┼─────────────────┼─────────────────┼─────┼─────┤
│ 🌙 GARDE    │ Alice M.        │ Bob D.          │ Charlie B.      │ ... │ Eve R.│
└──────────────────────────────────────────────────────────────────────────────┘

Notes :
- Samedi matin : "Astreinte:" au lieu de practice normale
- Samedi après-midi : vide (pas de travail)
- Dimanche : vide (pas de travail normal)
- Cellules adaptatives en hauteur selon le nombre de practices actives
```

**Affichage par cellule Matin/Après-midi :**
```
┌─────────────────┐
│ Cardio:         │ ← Nom de la practice
│  • Alice M.     │ ← Interne 1 assigné
│  • Charlie B.   │ ← Interne 2 assigné
│                 │
│ Urgences:       │ ← Autre practice active
│  • Bob D.       │
│  • David L.     │
└─────────────────┘
```

**Affichage cellule Garde :**
```
┌─────────────────┐
│ Alice M.        │ ← Simplement le nom de l'interne de garde
└─────────────────┘
```

**Samedi matin (astreinte) :**
```
┌─────────────────┐
│ Astreinte:      │ ← Traité comme une practice spéciale
│  • Frank P.     │ ← Interne assigné
└─────────────────┘
```

---

#### 🎨 **Code Couleur (commun aux 2 vues)**

- 🟢 **Travail normal** : Assignations practices (fond blanc)
- 🔵 **Demi-journée OFF** : Repos hebdomadaire (fond bleu clair)
- 🟡 **Repos post-garde** : Repos obligatoire après garde (fond jaune clair)
- 🔴 **Empêchement** : Indisponibilité déclarée (fond rouge clair)
- 🟠 **Garde** : Garde du soir (fond orange foncé, texte blanc)

---

#### 🔧 **Implémentation Technique**

**Persistance de la vue sélectionnée :**
```javascript
// LocalStorage pour mémoriser la préférence
localStorage.setItem('viewMode', 'byIntern') // ou 'byPeriod'
```

**Switch dynamique :**
```vue
<template>
  <div class="view-toggle">
    <button 
      :class="{ active: viewMode === 'byIntern' }"
      @click="viewMode = 'byIntern'"
    >
      👤 Vue par Interne
    </button>
    <button 
      :class="{ active: viewMode === 'byPeriod' }"
      @click="viewMode = 'byPeriod'"
    >
      📅 Vue par Jour/Période
    </button>
  </div>

  <TableByIntern v-if="viewMode === 'byIntern'" :planning="planning" />
  <TableByPeriod v-else :planning="planning" />
</template>
```

---

### F4.2 - Vue Calendrier

**Vue mensuelle** avec affichage visuel par jour.

**Interface :**
```
┌───────────────────────────────────────┐
│    Janvier 2025       [◀ Nov ▶]      │
├───────────────────────────────────────┤
│  Lu   Ma   Me   Je   Ve   Sa   Di    │
│                      1    2    3      │
│   6    7    8    9   10   11   12     │ ← Semaine 1
│  13   14   15   16   17   18   19     │ ← Semaine 2
│  20   21   22   23   24   25   26     │ ← Semaine 3
│  27   28   29   30   31               │
└───────────────────────────────────────┘

Clic sur jour → Détail du jour
```

---

### F4.3 - Vue par Interne

**Calendrier individuel** pour un interne sélectionné.

**Sélecteur :**
```
Interne : [Dr. Martin Dupont ▼]
```

**Affichage :**
```
┌──────────────────────────────────────┐
│  Planning de Dr. Martin Dupont       │
│  Semaine 1 : 06/01 - 12/01/2025      │
├──────────────────────────────────────┤
│  Lundi 06/01                         │
│    Matin     : Chirurgie             │
│    AM        : Médecine Interne      │
│    🌙 Garde  : Garde semaine         │
│──────────────────────────────────────┤
│  Mardi 07/01                         │
│    Matin     : 💤 Repos post-garde   │
│    AM        : 💤 Repos post-garde   │
│──────────────────────────────────────┤
│  ... (reste de la semaine)           │
└──────────────────────────────────────┘

Statistiques :
- Gardes : 1 (GS:1, GSam:0, GDim:0)
- DJ travaillées : 8
- DJ repos : 2
- DJ OFF : 1
```

---

### F4.4 - Statistiques d'Équilibre

**Tableaux et graphiques** comparatifs.

**Tableau des Gardes :**
```
┌────────────────────────────────────────────────┐
│  Répartition des Gardes                        │
├────────────────────────────────────────────────┤
│  Interne        │ Total │ GS │ GSam │ GDim     │
│─────────────────┼───────┼────┼──────┼─────────│
│  Dr. Martin     │   3   │  2 │  0   │  1       │
│  Dr. Sophie     │   3   │  2 │  1   │  0       │
│  Dr. Lucas      │   2   │  2 │  0   │  0       │
│  Dr. Emma       │   3   │  2 │  0   │  1       │
│  Dr. Thomas     │   3   │  3 │  0   │  0       │
│  Dr. Chloé      │   2   │  1 │  1   │  0       │
│  Dr. Hugo       │   2   │  1 │  0   │  1       │
│─────────────────┼───────┼────┼──────┼─────────│
│  TOTAL          │  18   │ 13 │  2   │  3       │
│─────────────────┼───────┼────┼──────┼─────────│
│  Objectif/pers. │  2.6  │    │      │          │
│  Écart-type     │  0.49 │    │      │          │
└────────────────────────────────────────────────┘
```

**Graphique en Barres :**
```
Gardes par Interne

Martin  ████████████ 3
Sophie  ████████████ 3
Lucas   ████████ 2
Emma    ████████████ 3
Thomas  ████████████ 3
Chloé   ████████ 2
Hugo    ████████ 2

     0    1    2    3    4
```

---

## ✅ Critères d'Acceptation

```
GIVEN un planning généré
WHEN l'utilisateur accède à la vue hebdomadaire
THEN il voit toutes les practices et internes assignés
AND il peut naviguer entre les semaines
AND les gardes sont affichées clairement
```

---

## 🔗 Liens

- **Précédent :** [MODULE 3 - Génération](MODULE-3-generation.md)
- **Suivant :** [MODULE 5 - Manipulation](MODULE-5-manipulation.md)

---

*Dernière mise à jour : 5 novembre 2025 - 03h15*

