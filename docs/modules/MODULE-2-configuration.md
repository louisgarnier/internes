# MODULE 2 - Configuration

## 📋 Vue d'Ensemble

**Objectif :** Wizard de configuration en 4 étapes pour créer et paramétrer un planning complet.

**Priorité :** 🔴 CRITIQUE (Fondation de l'application)

**Statut :** ⏳ EN COURS (Étapes 1-2-3/4 complétées - 75%)

**Dépendances :** MODULE 1 (Gestion des plannings)

**Dernière mise à jour :** 4 novembre 2025

---

## ✅ État d'Implémentation

### Étape 1 : Paramètres Généraux ✅ COMPLÉTÉE
- ✅ Page `/planning/new` créée
- ✅ Interface wizard avec header et progress bar (25%)
- ✅ Formulaire avec 3 champs :
  - ✅ Nom du planning (validation min 3 caractères)
  - ✅ Date de début avec validation **lundi obligatoire**
  - ✅ Nombre de semaines (slider interactif 1-10)
- ✅ Calcul automatique de la date de fin
- ✅ Affichage de la période complète
- ✅ Validation en temps réel
- ✅ Messages d'erreur contextuels
- ✅ Confirmation du jour (label "Lundi" en vert)
- ✅ Bouton "Annuler" avec confirmation
- ✅ Bouton "Suivant" avec état désactivé si formulaire invalide
- ✅ Navigation depuis le dashboard

### Étape 2 : Gestion des Internes ✅ COMPLÉTÉE
- ✅ Store global des internes (`stores/interns.js`)
  - Sauvegarde permanente de tous les internes (contacts)
  - ID unique pour chaque interne
  - Actions : add, update, delete, search
  - Réutilisables entre différents plannings
- ✅ Interface Étape 2 du wizard :
  - Liste des internes avec compteur
  - Bouton "➕ Ajouter" en haut à droite
  - État vide avec message encourageant
  - Cartes internes avec affichage enrichi :
    - Numéro + Prénom + Nom
    - Email et téléphone (si renseignés)
    - Icônes 📧 et 📱
  - Actions par interne : Modifier ✏️ et Supprimer 🗑️
  - Message d'avertissement si < 2 internes
- ✅ Modal Ajouter/Modifier Interne :
  - Formulaire enrichi avec 4 champs :
    - Prénom* et Nom* (obligatoires)
    - Email et Téléphone (optionnels)
  - **Sélection rapide** depuis contacts existants (dropdown bleu)
  - Auto-remplissage au choix d'un contact
  - Validation : prénom et nom obligatoires
  - Sauvegarde dans le store global automatique
- ✅ 2 internes de test pré-remplis (Martin Dupont, Sophie Bernard)
- ✅ Validation : minimum 2 internes requis pour passer à l'étape 3
- ✅ Progress bar à 50%

### Étape 3 : Gestion des Practices ✅ COMPLÉTÉE
- ✅ Interface Étape 3 du wizard :
  - Liste des practices avec compteur
  - Bouton "➕ Ajouter" en haut à droite
  - État vide avec icône 🏥
  - Cartes practices avec infos détaillées :
    - Numéro + Nom de la practice
    - Nombre d'internes requis (1 ou 2)
    - Jours d'activité (format simplifié)
  - Actions par practice : Modifier ✏️ et Supprimer 🗑️
  - Message d'avertissement si < 1 practice
- ✅ Modal Ajouter/Modifier Practice :
  - Formulaire avec 3 sections :
    - Nom de la practice* (obligatoire)
    - Nombre d'internes requis* (radio buttons : 1 ou 2)
    - Tableau des jours d'activité* :
      - 6 jours (Lundi à Samedi)
      - Colonnes : Jour | Matin | Après-midi
      - Checkboxes pour sélectionner les périodes
      - Samedi après-midi désactivé (astreinte matin uniquement)
  - Validation : nom + au moins 1 slot sélectionné
  - Info contextuelle : "Samedi : uniquement le matin (astreinte)"
- ✅ Formatage intelligent des jours :
  - "Lun-Ven" si tous les jours de semaine actifs
  - Liste courte sinon (ex: "Lun, Mer, Ven")
  - Ajout de "Sam" si samedi actif
- ✅ Validation : minimum 1 practice requise pour passer à l'étape 4
- ✅ Progress bar à 75%
- ✅ Deep copy pour éviter les références partagées
- ✅ Navigation Retour/Suivant fonctionnelle

### Étapes à Venir
- ⏳ Étape 4 : Empêchements (dates + périodes) - DERNIÈRE ÉTAPE
- ⏳ Sauvegarde finale du planning complet dans le store
- ⏳ Création et affichage du planning

### Fonctionnalités Additionnelles à Prévoir

#### 📝 v1.1 : Page de Gestion des Contacts
- Liste complète de tous les internes/contacts
- CRUD complet (Create, Read, Update, Delete)
- Recherche et filtres
- Import/Export (CSV)
- Accessible depuis le dashboard ou menu principal
- Permettra de gérer les contacts en dehors de la création de planning

#### 📝 v2.0 : Intégration Google Calendar
**Exigence importante** : Le calendrier doit être structuré de manière à faciliter l'intégration future avec Google Calendar

**Fonctionnalités prévues** :
- **Export vers Google Calendar** :
  - Export d'un planning complet vers Google Calendar
  - Création automatique d'événements pour :
    - Gardes (avec type : semaine, samedi, dimanche)
    - Assignations aux practices (avec lieu/service)
    - Repos post-garde
    - Demi-journées OFF
  - Couleurs différentes par type d'événement
  - Descriptions enrichies (interne, practice, horaires)

- **Import depuis Google Calendar** :
  - Synchronisation des empêchements depuis Google Calendar
  - Détection automatique des indisponibilités
  - Mise à jour bidirectionnelle

- **Synchronisation continue** :
  - Notifications de changements
  - Mise à jour automatique des événements modifiés
  - Gestion des conflits

**Structure de données requise** :
- Format de dates compatible ISO 8601
- Identifiants uniques pour chaque événement
- Métadonnées structurées (type, practice, interne)
- Champs optionnels pour ID Google Calendar

**À prévoir dans le développement** :
- Structure des objets Planning/Shift compatible avec Google Calendar API
- Champs `googleCalendarId` dans les models
- Format de dates standardisé
- API REST pour synchronisation

### Fichiers Créés
- `stores/interns.js` - Store Pinia global pour les internes
- `pages/planning/new.vue` - Wizard étapes 1-2-3 avec navigation complète

---

## 🎯 Fonctionnalités

### F2.1 - Wizard de Création (4 Étapes)

Le wizard guide l'utilisateur à travers 4 étapes séquentielles pour configurer complètement un planning.

#### Navigation du Wizard
```
[ 1 📝 Paramètres ] → [ 2 👥 Internes ] → [ 3 🏥 Practices ] → [ 4 🚫 Empêchements ]

État actif: ◉
État validé: ✓
État futur: ○
```

**Comportements :**
- Sauvegarde automatique à chaque étape
- Possibilité de revenir en arrière sans perdre les données
- Validation à chaque étape avant de passer à la suivante
- Bouton "Sauvegarder et continuer plus tard" disponible à tout moment

---

## 📊 Détails des Étapes

### ÉTAPE 1 : Paramètres Généraux

**Champs à remplir :**

1. **Nom du Planning** (obligatoire)
   - Type : Texte
   - Longueur : 3-100 caractères
   - Exemple : "Planning Janvier 2025", "Équipe A - Février"
   - Validation : Pas de caractères spéciaux (@#$%)

2. **Date de Début** (obligatoire)
   - Type : Date
   - Contrainte : **DOIT être un LUNDI**
   - Aide visuelle : Calendrier avec seuls les lundis sélectionnables
   - Message si mauvais jour : "⚠️ La date de début doit être un lundi"

3. **Nombre de Semaines** (obligatoire)
   - Type : Nombre
   - Plage : 1 à 10
   - Slider avec affichage de la date de fin calculée
   - Calcul automatique : `Date fin = Date début + (N × 7 jours) - 1`

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Étape 1 sur 4 : Paramètres Généraux           │
├────────────────────────────────────────────────┤
│                                                │
│  Nom du Planning *                             │
│  ┌──────────────────────────────────────────┐ │
│  │ Planning Janvier 2025                    │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  Date de Début * (doit être un lundi)         │
│  ┌──────────────────────────────────────────┐ │
│  │ 📅 06/01/2025 (Lundi)                    │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  Nombre de Semaines * (1-10)                  │
│  ├───○────────┤ 3 semaines                    │
│                                                │
│  ℹ️ Période : Du 06/01/2025 au 26/01/2025     │
│                                                │
│                    [Annuler]  [Suivant →]     │
└────────────────────────────────────────────────┘
```

**Validation :**
- Nom : Non vide, longueur correcte
- Date : Lundi valide
- Nombre semaines : Entre 1 et 10

---

### ÉTAPE 2 : Gestion des Internes

**Objectif :** Ajouter tous les internes qui travailleront sur ce planning.

**Actions possibles :**
- ➕ Ajouter un interne
- ✏️ Modifier un interne
- 🗑️ Supprimer un interne

**Nombre d'internes :**
- Minimum : 2
- Maximum : 20
- Recommandé : 7-10

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Étape 2 sur 4 : Internes (7)      [➕ Ajouter]│
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 1. Dr. Martin Dupont         [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 2. Dr. Sophie Bernard        [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 3. Dr. Lucas Petit           [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 4. Dr. Emma Leroy            [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 5. Dr. Thomas Robert         [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 6. Dr. Chloé Dubois          [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 7. Dr. Hugo Thomas           [✏️] [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ℹ️ Minimum 2 internes requis                 │
│                                                │
│               [← Retour]  [Suivant →]         │
└────────────────────────────────────────────────┘
```

**Modal Ajouter/Modifier Interne :**
```
┌────────────────────────────────────┐
│  Ajouter un Interne                │
├────────────────────────────────────┤
│                                    │
│  Prénom *                          │
│  ┌──────────────────────────────┐ │
│  │ Martin                       │ │
│  └──────────────────────────────┘ │
│                                    │
│  Nom *                             │
│  ┌──────────────────────────────┐ │
│  │ Dupont                       │ │
│  └──────────────────────────────┘ │
│                                    │
│        [Annuler]  [Enregistrer]   │
└────────────────────────────────────┘
```

**Validation :**
- Au moins 2 internes ajoutés avant de passer à l'étape suivante
- Prénom et nom non vides
- Pas de doublons (même prénom + nom)

---

### ÉTAPE 3 : Gestion des Practices

**Objectif :** Définir les services médicaux et leurs besoins en internes.

**Actions possibles :**
- ➕ Ajouter une practice
- ✏️ Modifier une practice
- 🗑️ Supprimer une practice

**Nombre de practices :**
- Minimum : 1
- Maximum : 20
- Typique : 8

**Pour chaque practice :**
- Nom de la practice
- Nombre d'internes requis (1 ou 2)
- **Jours et périodes** où cette practice est active

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Étape 3 sur 4 : Practices (8)     [➕ Ajouter]│
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ 🔵 Chirurgie                             │ │
│  │ 2 internes • Lun-Ven (matin + AM)       │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 🟢 Médecine Interne                      │ │
│  │ 2 internes • Lun-Ven (matin + AM)       │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 🟡 Urgences                              │ │
│  │ 2 internes • Lun-Ven (matin + AM), Sam  │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 🔴 Pédiatrie                             │ │
│  │ 2 internes • Lun-Ven (matin uniquement)  │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ 🟣 Cardiologie                           │ │
│  │ 1 interne • Lun, Mer, Ven (matin + AM)   │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ...                                           │
│                                                │
│               [← Retour]  [Suivant →]         │
└────────────────────────────────────────────────┘
```

**Modal Ajouter/Modifier Practice :**
```
┌──────────────────────────────────────────────┐
│  Ajouter une Practice                         │
├──────────────────────────────────────────────┤
│                                              │
│  Nom de la Practice *                        │
│  ┌────────────────────────────────────────┐ │
│  │ Chirurgie                              │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Nombre d'internes requis *                  │
│  ⦿ 1 interne    ⭘ 2 internes                │
│                                              │
│  Jours d'activité * (sélectionner ci-dessous)│
│  ┌────────────────────────────────────────┐ │
│  │  Jour     │ Matin │ Après-midi │ Actif │ │
│  ├──────────────────────────────────────────┤ │
│  │  Lundi    │  ☑   │     ☑     │   ☑   │ │
│  │  Mardi    │  ☑   │     ☑     │   ☑   │ │
│  │  Mercredi │  ☑   │     ☑     │   ☑   │ │
│  │  Jeudi    │  ☑   │     ☑     │   ☑   │ │
│  │  Vendredi │  ☑   │     ☑     │   ☑   │ │
│  │  Samedi   │  ☐   │     ☐     │   ☐   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│        [Annuler]  [Enregistrer]             │
└──────────────────────────────────────────────┘
```

**Validation :**
- Au moins 1 practice ajoutée
- Nom non vide
- Au moins 1 slot coché (jour + période)
- Nombre d'internes : 1 ou 2

---

### ÉTAPE 4 : Empêchements

**Objectif :** Déclarer les indisponibilités des internes (congés, formations, etc.).

**Actions possibles :**
- ➕ Ajouter un empêchement
- 🗑️ Supprimer un empêchement

**Cette étape est optionnelle** (peut être vide)

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Étape 4 sur 4 : Empêchements (5)  [➕ Ajouter]│
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Martin Dupont                        │ │
│  │ Lundi 13/01/2025 - Après-midi           │ │
│  │ Raison: Formation                  [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Sophie Bernard                       │ │
│  │ Mardi 14/01/2025 - Journée complète     │ │
│  │ Raison: Congé                      [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Lucas Petit                          │ │
│  │ Vendredi 17/01/2025 - Matin             │ │
│  │ Raison: RDV médical                [🗑️] │ │
│  └──────────────────────────────────────────┘ │
│  ...                                           │
│                                                │
│  ℹ️ Étape optionnelle - Vous pouvez ajouter   │
│     des empêchements plus tard                 │
│                                                │
│               [← Retour]  [Terminer ✓]        │
└────────────────────────────────────────────────┘
```

**Modal Ajouter Empêchement :**
```
┌────────────────────────────────────┐
│  Ajouter un Empêchement            │
├────────────────────────────────────┤
│                                    │
│  Interne *                         │
│  ┌──────────────────────────────┐ │
│  │ Dr. Martin Dupont        ▼  │ │
│  └──────────────────────────────┘ │
│                                    │
│  Date *                            │
│  ┌──────────────────────────────┐ │
│  │ 📅 13/01/2025                │ │
│  └──────────────────────────────┘ │
│                                    │
│  Période *                         │
│  ⦿ Matin (8h-13h)                 │
│  ⭘ Après-midi (13h-18h)           │
│  ⭘ Journée complète               │
│                                    │
│  Raison (optionnel)                │
│  ┌──────────────────────────────┐ │
│  │ Formation                    │ │
│  └──────────────────────────────┘ │
│                                    │
│     [Annuler]  [Ajouter]          │
└────────────────────────────────────┘
```

**Validation :**
- Date dans la période du planning (entre date début et date fin)
- Interne sélectionné existe
- Pas de doublon (même interne + même date + même période)

---

## 🔄 F2.2 - Modification des Paramètres

**Après la création initiale**, l'utilisateur peut modifier tous les paramètres via une interface similaire.

**Accès :** Bouton `⚙️ Config` depuis le dashboard

**Différences avec le wizard :**
- Pas de navigation linéaire
- Interface avec onglets ou accordéons
- Modifications sauvegardées immédiatement
- Possibilité de régénérer le planning si modifications impactantes

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Configuration : Planning Janvier 2025         │
│  [ Paramètres ] [ Internes ] [ Practices ] [...│
├────────────────────────────────────────────────┤
│  (Même contenu que les étapes du wizard)      │
└────────────────────────────────────────────────┘
```

---

## 🗄️ Modèle de Données

### Interne
```javascript
{
  id: "uuid",
  prenom: "Martin",
  nom: "Dupont",
  nomComplet: "Dr. Martin Dupont" // Calculé
}
```

### Practice
```javascript
{
  id: "uuid",
  nom: "Chirurgie",
  nombreInternesRequis: 2, // 1 ou 2
  couleur: "#3498db", // Pour affichage
  slots: [
    { jour: "lundi", periode: "matin", actif: true },
    { jour: "lundi", periode: "apres_midi", actif: true },
    { jour: "mardi", periode: "matin", actif: true },
    // ...
  ]
}
```

### Empêchement
```javascript
{
  id: "uuid",
  interneId: "uuid",
  date: "2025-01-13",
  periode: "apres_midi", // "matin" | "apres_midi" | "journee"
  raison: "Formation" // Optionnel
}
```

---

## ✅ Critères d'Acceptation

### Étape 1
```
GIVEN l'utilisateur démarre le wizard
WHEN il remplit nom, date (lundi), et nombre de semaines
AND il clique sur "Suivant"
THEN il passe à l'étape 2
AND les données sont sauvegardées
```

### Étape 2
```
GIVEN l'utilisateur est à l'étape 2
WHEN il ajoute au moins 2 internes
AND il clique sur "Suivant"
THEN il passe à l'étape 3
```

### Étape 3
```
GIVEN l'utilisateur est à l'étape 3
WHEN il ajoute au moins 1 practice avec slots
AND il clique sur "Suivant"
THEN il passe à l'étape 4
```

### Étape 4
```
GIVEN l'utilisateur est à l'étape 4
WHEN il clique sur "Terminer" (avec ou sans empêchements)
THEN le planning est créé
AND il est redirigé vers la vue du planning ou dashboard
```

---

## 🔗 Liens

- **Précédent :** [MODULE 1 - Gestion des plannings](MODULE-1-gestion-plannings.md)
- **Suivant :** [MODULE 3 - Génération automatique](MODULE-3-generation.md)

---

*Dernière mise à jour : 4 novembre 2025*

