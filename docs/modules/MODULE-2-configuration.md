# MODULE 2 - Configuration

## 📋 Vue d'Ensemble

**Objectif :** Wizard de configuration en 5 étapes pour créer et paramétrer un planning complet.

**Priorité :** 🔴 CRITIQUE (Fondation de l'application)

**Statut :** 🚧 EN COURS (Étapes 1-4 ✅ | Étape 5 ⏳ - 80%)

**Dépendances :** MODULE 1 (Gestion des plannings)

**Dernière mise à jour :** 6 novembre 2025

**Changement majeur v1.0 :** Ajout ÉTAPE 5 - Gardes pré-assignées manuellement (source: systèmes hospitaliers)

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

### Étape 4 : Empêchements ✅ COMPLÉTÉE
- ✅ Interface Étape 4 du wizard :
  - Liste des empêchements avec compteur
  - Bouton "➕ Ajouter" en haut à droite
  - État vide avec icône 📅 et message explicite
  - Cartes empêchements avec infos détaillées :
    - Nom complet de l'interne
    - Date formatée + période (Matin/Après-midi/Journée complète)
    - Raison si renseignée (avec icône 💬)
  - Action : Supprimer 🗑️ (pas de modification)
  - Message info bleu : étape optionnelle
- ✅ Modal Ajouter Empêchement :
  - Dropdown interne* (depuis liste de l'étape 2)
  - Date* avec min/max (période du planning)
  - Aide contextuelle affichant la période valide
  - Radio buttons période* :
    - Matin (8h-13h)
    - Après-midi (13h-18h)
    - Journée complète
  - Raison optionnelle (texte libre)
  - Validation : interne + date + période obligatoires
- ✅ Helper functions :
  - `getInternName(internId)` : Récupère le nom complet
  - `getPeriodLabel(period)` : Traduit la période en français
- ✅ Validation : Date dans la période du planning
- ✅ Étape optionnelle : toujours valide même si vide
- ✅ Progress bar à 100%
- ✅ Bouton "✓ Terminer et Créer le Planning" (vert)
- ✅ Fonction `createPlanning()` :
  - ✅ Sauvegarde complète dans le store plannings
  - Structure sauvegardée : name, status, weeks, internsCount, practicesCount, startDate, internsList, practicesList, unavailabilities
  - Statut 'config' assigné automatiquement
  - Affiche alert avec résumé complet
  - Retour au dashboard
  - Planning visible immédiatement avec badge "⏳ Config"

### Étape 5 : Gardes Pré-assignées ⏳ EN COURS
- ⏳ Interface Étape 5 du wizard :
  - Tableau de saisie des gardes
  - Bouton "➕ Ajouter une garde" en haut à droite
  - État vide avec icône 🌙 et message explicatif
  - Liste des gardes avec infos détaillées :
    - Nom complet de l'interne
    - Date formatée + Type déduit (Semaine/Samedi/Dimanche)
    - Repos auto le lendemain (indicateur)
  - Action : Modifier ✏️ et Supprimer 🗑️
  - **Warnings visuels** (non bloquants) :
    - ⚠️ 2 gardes même jour
    - ⚠️ Gardes consécutives
    - ⚠️ Garde sur indisponibilité
- ⏳ Modal Ajouter/Modifier Garde :
  - Dropdown interne* (depuis liste de l'étape 2)
  - Date* avec date picker
  - Type de garde déduit automatiquement du jour :
    - Lundi-Vendredi → Garde Semaine (18h-8h) 🌙
    - Samedi → Garde Samedi (13h-8h dimanche) 🌙🌙
    - Dimanche → Garde Dimanche (8h-8h lundi) 🌙🌙🌙
  - Validation en temps réel (warnings)
  - Confirmation : "L'interne sera automatiquement en repos le lendemain"
- ⏳ Validation :
  - Les gardes sont **optionnelles** (peuvent être incomplètes)
  - Idéal : (nb_semaines × 7) gardes
  - Ex: 4 semaines → 28 gardes recommandées (mais non obligatoires)
  - Compteur en temps réel : "21/28 gardes assignées (75%)"
  - Bouton "Terminer" toujours activé (même si incomplet)
- ⏳ Étape **optionnelle pour les modifications** :
  - Si planning existant modifié, les gardes peuvent être ajoutées/modifiées plus tard
  - Message : "Vous pourrez ajouter les gardes via l'édition du planning"
- ⏳ Progress bar à 100% (5/5 étapes)
- ⏳ Bouton "✓ Terminer et Créer le Planning" (vert)
- ⏳ Fonction `createPlanning()` mise à jour :
  - Ajout `preAssignedGardes` dans la structure
  - Format: `{ interneId, date, type, reposDate }`

## 🎉 MODULE 2 - État Global

### Wizard Complet - 5 Étapes
État d'avancement du wizard de configuration :
- ✅ **Étape 1** : Paramètres généraux (nom, date, semaines)
- ✅ **Étape 2** : Gestion des internes (CRUD + contacts globaux)
- ✅ **Étape 3** : Gestion des practices (CRUD + jours/périodes)
- ✅ **Étape 4** : Empêchements (optionnel, CRUD simplifié)
- ⏳ **Étape 5** : Gardes pré-assignées (CRUD, source externe, warnings)

### Fonctionnalités Globales
- ✅ Navigation fluide entre les étapes (Retour/Suivant)
- ✅ Progress bar dynamique (25% → 50% → 75% → 100%)
- ✅ Validation à chaque étape avec messages d'erreur
- ✅ Modals pour toutes les sous-entités
- ✅ Messages d'aide contextuels
- ✅ Interface moderne avec gradients et animations
- ✅ Résumé final avant création du planning

## 🔗 Intégration Dashboard

### Sauvegarde du Planning ✅ COMPLÉTÉ
- ✅ **Import du store plannings** dans le wizard
- ✅ **Fonction `usePlanningsStore().addPlanning()`** appelée avec :
  - `name` : Nom du planning
  - `status: 'config'` : Statut initial (pas encore généré)
  - `weeks` : Nombre de semaines
  - `internsCount` : Nombre d'internes (pour affichage)
  - `practicesCount` : Nombre de practices (pour affichage)
  - `startDate` : Date de début (format ISO)
  - `internsList` : Array complet des internes avec IDs, noms, emails, téléphones
  - `practicesList` : Array complet des practices avec config jours/périodes
  - `unavailabilities` : Array des empêchements avec internId, date, période, raison
- ✅ **ID unique et timestamps** ajoutés automatiquement par le store
- ✅ **Dashboard mis à jour** :
  - Affichage avec `internsCount` et `practicesCount`
  - Badge "⏳ Config" jaune pour plannings non générés
  - Planning visible immédiatement après création

### Prochaines Étapes - MODULE 3
- ⏳ Implémenter l'algorithme de génération automatique
- ⏳ Créer la vue hebdomadaire du planning généré
- ⏳ Gérer le changement de statut 'config' → 'generated'

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

### Fichiers Créés/Modifiés
- `stores/interns.js` - Store Pinia global pour les internes (nouveau)
- `stores/plannings.js` - Store mis à jour avec structure de données complète
- `pages/planning/new.vue` - Wizard 4 étapes complet + sauvegarde (1264 lignes)
- `pages/index.vue` - Dashboard mis à jour pour internsCount/practicesCount

---

## 🎯 Fonctionnalités

### F2.1 - Wizard de Création (5 Étapes)

Le wizard guide l'utilisateur à travers 5 étapes séquentielles pour configurer complètement un planning.

#### Navigation du Wizard
```
[ 1 📝 Paramètres ] → [ 2 👥 Internes ] → [ 3 🏥 Practices ] → [ 4 🚫 Empêchements ] → [ 5 🌙 Gardes ]

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

### ÉTAPE 5 : Gardes Pré-assignées ⏳

**Objectif :** Saisir manuellement toutes les gardes pour l'ensemble de la période (source: systèmes hospitaliers externes).

**Contexte Important :**
Les gardes sont générées par des systèmes communs à tous les hôpitaux (externes à cette application). Cette étape permet de les importer manuellement. Une fonctionnalité d'import fichier est prévue pour la v2.0.

**Actions possibles :**
- ➕ Ajouter une garde
- ✏️ Modifier une garde
- 🗑️ Supprimer une garde

**Nombre de gardes :**
- Total recommandé : **`nb_semaines × 7`** (idéal si toutes les gardes disponibles)
- Exemple : 4 semaines → 28 gardes recommandées (mais **non obligatoires**)
- Compteur en temps réel affiché : "21/28 gardes assignées (75%)"
- ℹ️ Les gardes peuvent être **partielles** (ex: 21/28 si certains jours non couverts)

**Types de garde (déduits automatiquement du jour) :**
| Jour | Type | Horaires | Difficulté | Icône |
|------|------|----------|------------|-------|
| Lundi-Vendredi | Garde Semaine | 18h → 8h (14h) | ⭐ Normale | 🌙 |
| Samedi | Garde Samedi | 13h → 8h dim (19h) | ⭐⭐⭐ Difficile | 🌙🌙 |
| Dimanche | Garde Dimanche | 8h → 8h lun (24h) | ⭐⭐ Élevée | 🌙🌙🌙 |

**Repos automatique :**
- Garde → **Repos obligatoire le lendemain** (matin + après-midi)
- Le repos est calculé et affiché automatiquement
- Exemple : Garde Lundi 13/01 → Repos Mardi 14/01 (M + AM)

**Interface :**
```
┌────────────────────────────────────────────────┐
│  Étape 5 sur 5 : Gardes (21/28) [➕ Ajouter]  │
├────────────────────────────────────────────────┤
│                                                │
│  📊 Progression : 21/28 gardes assignées (75%) │
│  ℹ️ 7 gardes manquantes (non bloquant)         │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Martin Dupont                        │ │
│  │ 🌙 Garde Semaine - Lundi 06/01/2025     │ │
│  │ → Repos : Mardi 07/01 (M + AM)          │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Sophie Bernard                       │ │
│  │ 🌙 Garde Semaine - Mardi 07/01/2025     │ │
│  │ → Repos : Mercredi 08/01 (M + AM)       │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Dr. Lucas Petit                          │ │
│  │ 🌙🌙 Garde Samedi - Samedi 11/01/2025   │ │
│  │ → Repos : Dimanche 12/01 (M + AM)       │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ ⚠️ Dr. Emma Leroy                        │ │
│  │ 🌙🌙🌙 Garde Dimanche - Dim 12/01/2025  │ │
│  │ → Repos : Lundi 13/01 (M + AM)          │ │
│  │ ⚠️ Conflit : Garde sur indisponibilité   │ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ ⚠️ Dr. Thomas Robert                     │ │
│  │ 🌙 Garde Semaine - Lundi 13/01/2025     │ │
│  │ → Repos : Mardi 14/01 (M + AM)          │ │
│  │ ⚠️ Gardes consécutives (2 jours de suite)│ │
│  │                          [✏️] [🗑️]     │ │
│  └──────────────────────────────────────────┘ │
│  ...                                           │
│                                                │
│  ℹ️ Les gardes sont issues de systèmes externes│
│     Import automatique prévu en v2.0           │
│                                                │
│               [← Retour]  [Terminer ✓]        │
└────────────────────────────────────────────────┘
```

**Modal Ajouter/Modifier Garde :**
```
┌────────────────────────────────────┐
│  Ajouter une Garde                 │
├────────────────────────────────────┤
│                                    │
│  Interne *                         │
│  ┌──────────────────────────────┐ │
│  │ Dr. Martin Dupont        ▼  │ │
│  └──────────────────────────────┘ │
│                                    │
│  Date *                            │
│  ┌──────────────────────────────┐ │
│  │ 📅 13/01/2025 (Lundi)        │ │
│  └──────────────────────────────┘ │
│                                    │
│  ℹ️ Type détecté : Garde Semaine   │
│     Horaires : 18h → 8h (14h)      │
│     Difficulté : ⭐ Normale         │
│                                    │
│  ✅ Repos automatique :             │
│     Mardi 14/01/2025 (M + AM)      │
│                                    │
│  ⚠️ WARNINGS DÉTECTÉS :             │
│  • Garde déjà assignée ce jour à   │
│    Dr. Sophie Bernard              │
│  • Interne a une garde consécutive │
│    (Dimanche 12/01)                │
│                                    │
│  ℹ️ Ces warnings ne bloquent pas   │
│     la création (flexibilité)      │
│                                    │
│     [Annuler]  [Ajouter quand même]│
└────────────────────────────────────┘
```

**Warnings (non bloquants) :**
1. ⚠️ **2 gardes même jour** : Détection si une autre garde existe déjà ce jour
2. ⚠️ **Gardes consécutives** : Détection si l'interne a une garde la veille ou le lendemain
3. ⚠️ **Garde sur indisponibilité** : Détection si l'interne est marqué indisponible (Étape 4)

**Détails d'implémentation :**

**Calcul automatique du type de garde :**
```javascript
function getGardeType(date) {
  const dayOfWeek = new Date(date).getDay()
  if (dayOfWeek === 0) return { type: 'dimanche', label: 'Garde Dimanche', icon: '🌙🌙🌙', hours: '8h-8h', difficulty: 2 }
  if (dayOfWeek === 6) return { type: 'samedi', label: 'Garde Samedi', icon: '🌙🌙', hours: '13h-8h', difficulty: 3 }
  return { type: 'semaine', label: 'Garde Semaine', icon: '🌙', hours: '18h-8h', difficulty: 1 }
}
```

**Calcul automatique du repos :**
```javascript
function calculateReposDate(gardeDate) {
  const nextDay = addDays(gardeDate, 1)
  return {
    date: nextDay,
    periode: 'fullday', // Matin + Après-midi
    label: `${formatDate(nextDay)} (M + AM)`
  }
}
```

**Validation :**
- Date dans la période du planning (entre date début et date fin)
- Interne sélectionné existe
- Les gardes sont **optionnelles** (peuvent être incomplètes)
- Bouton "Terminer" **toujours actif** même si gardes partielles
- Message info si gardes manquantes : "ℹ️ X gardes manquantes sur Y (non bloquant)"
- Warnings affichés mais ne bloquent pas

**Modèle de données :**
```javascript
{
  id: "uuid",
  interneId: "uuid",
  date: "2025-01-13",
  type: "semaine", // "semaine" | "samedi" | "dimanche"
  reposDate: "2025-01-14", // Calculé automatiquement
  createdAt: "2025-11-06T10:30:00"
}
```

---

## 🔄 F2.2 - Modification des Paramètres

**Statut :** ✅ COMPLÉTÉ (100%)

**Après la création initiale**, l'utilisateur peut modifier tous les paramètres du planning via une page dédiée d'édition.

### Accès
- **Depuis le dashboard** : Bouton `✏️ Modifier` sur chaque carte de planning
- **Route** : `/planning/[id]/edit`

### Architecture
- ✅ Restructuration routing : `pages/planning/[id]/index.vue` (visualisation) + `pages/planning/[id]/edit.vue` (édition)
- ✅ Interface avec **4 sections accordéon** (repliables/dépliables)
- ✅ Modifications sauvegardées sur demande (bouton "💾 Sauvegarder")
- ✅ Option de régénération si planning déjà généré

### Section 1 : Paramètres Généraux ✅
- ✅ Modification du **nom** du planning
- ✅ Modification de la **date de début** (validation lundi)
- ✅ Modification du **nombre de semaines** (1-10)
- ✅ Validation en temps réel

### Section 2 : Gestion des Internes ✅
- ✅ Liste des internes avec compteur en temps réel
- ✅ Affichage de chaque interne (prénom, nom)
- ✅ **Bouton ➕ Ajouter** : Modal avec 4 champs (prénom*, nom*, email, téléphone)
- ✅ **Bouton 🗑️ Supprimer** : Suppression avec confirmation
- ✅ Cohérence avec le store global des internes (email + téléphone)

### Section 3 : Gestion des Practices ✅
- ✅ Liste des practices avec compteur en temps réel
- ✅ Affichage détaillé : nom, nb internes requis, horaires
- ✅ **Bouton ➕ Ajouter** : Modal complet avec :
  - Nom de la practice*
  - Nombre d'internes requis (1 ou 2) - radio buttons stylisés
  - Grille horaires Lundi-Samedi (checkboxes matin/après-midi)
  - Samedi après-midi désactivé
- ✅ **Bouton 🗑️ Supprimer** : Suppression avec confirmation
- ✅ Validation : nom obligatoire + au moins un horaire

### Section 4 : Gestion des Empêchements ✅
- ✅ Liste des empêchements avec compteur en temps réel
- ✅ Affichage : interne, date, période, raison
- ✅ **Bouton ➕ Ajouter** : Modal complet avec :
  - Dropdown sélection interne*
  - Date picker*
  - Période (radio buttons : Matin 8h-13h / Après-midi 13h-18h / Journée 8h-18h)
  - Champ raison (optionnel)
- ✅ **Bouton 🗑️ Supprimer** : Suppression avec confirmation
- ✅ Validation : interne et date obligatoires

### Section 5 : Gestion des Gardes ⏳ EN COURS
- ⏳ Liste des gardes avec compteur en temps réel
- ⏳ Indicateur de progression : "45/63 gardes (71%)"
- ⏳ Affichage détaillé par garde :
  - Nom complet interne
  - Date formatée + Type (icône 🌙/🌙🌙/🌙🌙🌙)
  - Repos automatique affiché
  - Warnings visuels si conflits
- ⏳ **Bouton ➕ Ajouter** : Modal complet (identique Étape 5) avec :
  - Dropdown sélection interne*
  - Date picker*
  - Type auto-détecté + horaires affichés
  - Repos auto-calculé affiché
  - Warnings en temps réel (non bloquants)
- ⏳ **Bouton ✏️ Modifier** : Modal pré-rempli
- ⏳ **Bouton 🗑️ Supprimer** : Suppression avec confirmation
- ⏳ Validation : interne et date obligatoires
- ⏳ **Important** : Modification d'une garde → Régénération requise pour recalculer practices/OFFs

### Sauvegarde et Actions ✅
- ✅ **Bouton 💾 Sauvegarder** :
  - Validation complète (nom, date lundi, min 1 interne, min 1 practice)
  - Appel `planningsStore.updatePlanning()`
  - Recalcul automatique `internsCount` et `practicesCount`
  - Message de confirmation avec résumé
  - Redirection vers page de visualisation

- ✅ **Bouton 🔄 Régénérer** (si `status === 'generated'`) :
  - Confirmation utilisateur
  - Sauvegarde des modifications
  - Reset du status en `'config'`
  - Message explicatif
  - Redirection vers page de visualisation

### Alert si Planning Généré
- ✅ Bandeau orange en haut de page si `status === 'generated'`
- ✅ Message : "Les modifications seront prises en compte, mais vous devrez régénérer le planning"

### Fichiers Créés/Modifiés (F2.2)
- ✅ `pages/planning/[id]/edit.vue` - Page d'édition complète (1022 lignes)
- ✅ `pages/planning/[id]/index.vue` - Page de visualisation (déplacée)
- ✅ `pages/index.vue` - Ajout bouton "✏️ Modifier" (grille 2x2)
- ✅ `stores/plannings.js` - Ajout getter `getPlanningById()`

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

### Garde (Pré-assignée)
```javascript
{
  id: "uuid",
  interneId: "uuid",
  date: "2025-01-13",
  type: "semaine", // "semaine" | "samedi" | "dimanche" (auto-détecté)
  reposDate: "2025-01-14", // Calculé auto (lendemain)
  createdAt: "2025-11-06T10:30:00"
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
WHEN il ajoute des empêchements (optionnel)
AND il clique sur "Suivant"
THEN il passe à l'étape 5
```

### Étape 5
```
GIVEN l'utilisateur est à l'étape 5
AND nb_semaines = 4 (donc 28 gardes recommandées)
WHEN il ajoute toutes les gardes (28/28)
AND il clique sur "Terminer"
THEN le planning est créé avec preAssignedGardes
AND il est redirigé vers le dashboard
AND le planning apparaît avec statut "⏳ Config"

GIVEN l'utilisateur est à l'étape 5
WHEN il a ajouté seulement 21/28 gardes
THEN le bouton "Terminer" est TOUJOURS actif
AND un message "ℹ️ 7 gardes manquantes (non bloquant)" est affiché
AND le planning peut être créé avec 21 gardes seulement

GIVEN l'utilisateur est à l'étape 5
WHEN il n'a ajouté AUCUNE garde (0/28)
THEN le bouton "Terminer" est TOUJOURS actif
AND le planning peut être créé sans aucune garde
AND un message "ℹ️ Aucune garde assignée" est affiché

GIVEN l'utilisateur ajoute une garde
WHEN la date a déjà une garde assignée
THEN un warning "⚠️ 2 gardes même jour" s'affiche
BUT la garde peut quand même être créée (non bloquant)
```

---

## 🔗 Liens

- **Précédent :** [MODULE 1 - Gestion des plannings](MODULE-1-gestion-plannings.md)
- **Suivant :** [MODULE 3 - Génération automatique](MODULE-3-generation.md)

---

*Dernière mise à jour : 6 novembre 2025*

