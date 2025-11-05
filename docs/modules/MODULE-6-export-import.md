# MODULE 6 - Export / Import

## 📋 Vue d'Ensemble

**Objectif :** Exporter le planning dans différents formats (PDF, Excel, JSON) et importer des données.

**Priorité :** 🟡 IMPORTANT

**Statut :** 📝 À développer

**Dépendances :** MODULE 4 (Visualisation)

---

## 🎯 Fonctionnalités

### F6.1 - Export PDF

**Format :** Document imprimable avec plusieurs pages.

**Contenu :**
1. **Page de garde**
   - Nom du planning
   - Période (dates)
   - Nombre d'internes et practices
   - Date de génération
   - Score d'équilibre

2. **Une page par semaine**
   - Tableau hebdomadaire
   - Liste des gardes
   - Légende

3. **Page statistiques** (optionnel)
   - Tableaux d'équilibre
   - Graphiques

**Options :**
```
☑ Inclure les statistiques
☑ Inclure les empêchements
⦿ Orientation : Portrait / Paysage
```

---

### F6.2 - Export Excel

**Format :** Fichier `.xlsx` avec plusieurs feuilles.

**Feuilles Excel :**
1. **Vue Hebdomadaire** : Toutes les semaines
2. **Gardes** : Liste complète des gardes
3. **Statistiques Gardes** : Tableau récapitulatif
4. **Statistiques Practices** : DJ par interne
5. **Empêchements** : Liste des empêchements

**Avantage :** Modification possible dans Excel.

---

### F6.3 - Export JSON

**Format :** Sauvegarde complète en JSON.

**Usage :** 
- Backup
- Transfert vers un autre navigateur
- Partage avec collègues

**Structure :**
```json
{
  "version": "1.0",
  "dateExport": "2025-11-04T15:30:00Z",
  "planning": {
    "id": "uuid",
    "nom": "Planning Janvier 2025",
    "dateDebut": "2025-01-06",
    "nombreSemaines": 3,
    "internes": [...],
    "practices": [...],
    "empechements": [...],
    "gardes": [...],
    "affectations": [...]
  }
}
```

---

### F6.4 - Import JSON

**Usage :** Restaurer un planning depuis un fichier JSON.

**Process :**
1. Sélection du fichier `.json`
2. Validation du format
3. Aperçu avant import
4. Confirmation
5. Import dans l'application

**Gestion des conflits :**
- Si ID existe déjà → Proposer de renommer
- Validation des données (dates, références)

---

### F6.5 - Import CSV

**Usage :** Importer une liste d'internes ou practices depuis Excel.

**Format CSV Internes :**
```csv
prenom,nom
Martin,Dupont
Sophie,Bernard
Lucas,Petit
```

**Format CSV Practices :**
```csv
nom,nombre_internes
Chirurgie,2
Médecine Interne,2
Urgences,2
```

**Process :**
1. Upload fichier CSV
2. Aperçu des données
3. Validation
4. Import

---

## 🚀 Fonctionnalités Avancées (v2.0+)

### F6.6 - Envoi Email Automatique 📧

**Objectif :** Envoyer automatiquement le planning hebdomadaire par email à tous les internes.

**Priorité :** 🟡 IMPORTANT (v2.0)

**Fonctionnalités :**
- **Email automatique** chaque semaine (dimanche soir ou lundi matin)
- **PDF attaché** : Planning de la semaine en pièce jointe
- **Destinataires** : Tous les internes du planning (emails des contacts)
- **Contenu email** :
  - Résumé de la semaine (gardes, practices)
  - Lien vers le planning complet en ligne
  - Rappel des gardes de chacun
- **Options configurables** :
  - Jour et heure d'envoi
  - Désactiver pour certains internes
  - Template personnalisable

**Interface :**
```
┌─────────────────────────────────────────┐
│  Paramètres Email                       │
├─────────────────────────────────────────┤
│  ☑ Activer envoi automatique            │
│                                          │
│  Envoi : Dimanche [▼] à 20:00 [▼]      │
│                                          │
│  Destinataires : 7 internes             │
│  [Prévisualiser Email]                   │
│                                          │
│  [Enregistrer]                           │
└─────────────────────────────────────────┘
```

**Prérequis technique :**
- Service email (SendGrid, Mailgun, ou SMTP)
- Templates d'emails HTML
- Gestion des erreurs d'envoi

---

### F6.7 - Intégration Google Calendar / Outlook 📅

**Objectif :** Synchroniser le planning avec Google Calendar et Outlook Calendar via les emails des internes.

**Priorité :** 🔴 CRITIQUE (v2.0)

**Fonctionnalités :**

#### Export vers Calendar
- **Format iCal standard** (.ics) compatible Google Calendar et Outlook
- **Création automatique d'événements** pour chaque interne :
  - **Gardes** : Avec type (semaine/samedi/dimanche), horaires précis, lieu
  - **Assignations aux practices** : Nom du service, horaires (8h-13h / 13h-18h)
  - **Repos post-garde** : Journée complète marquée comme "Repos"
  - **Demi-journées OFF** : Marquées comme "OFF"
- **Couleurs par type** :
  - Rouge : Gardes
  - Bleu : Practices
  - Vert : Repos
  - Jaune : OFF
- **Rappels automatiques** :
  - Garde : 24h avant + 2h avant
  - Practice : 1h avant

#### Synchronisation bidirectionnelle (v2.1+)
- **Import des empêchements** depuis Google Calendar
- Détection automatique des indisponibilités
- Mise à jour en temps réel

#### Envoi aux internes
- **Email avec fichier .ics** attaché
- **Lien Google Calendar** : "Ajouter à mon calendrier"
- **Lien Outlook** : "Ajouter à Outlook"
- **Instructions** pour importer

**Interface :**
```
┌─────────────────────────────────────────┐
│  Export vers Calendar                   │
├─────────────────────────────────────────┤
│  Planning : Janvier 2025                │
│                                          │
│  ☑ Google Calendar                      │
│  ☑ Outlook Calendar                     │
│  ☑ Format iCal universel                │
│                                          │
│  Options :                               │
│  ☑ Inclure rappels                      │
│  ☑ Couleurs par type                    │
│  ☑ Envoyer par email                    │
│                                          │
│  [Générer Calendriers] [Envoyer]        │
└─────────────────────────────────────────┘
```

**Prérequis technique :**
- Bibliothèque iCal (ics.js)
- Google Calendar API (optionnel)
- Microsoft Graph API pour Outlook (optionnel)
- Format de dates ISO 8601
- Champs metadata structurés

**Structure des événements :**
```javascript
{
  id: "unique-event-id",
  summary: "Garde Dimanche - Dr. Martin Dupont",
  description: "Garde de 24h - Dimanche 8h à Lundi 8h",
  location: "Hôpital XYZ",
  startDate: "2025-01-12T08:00:00",
  endDate: "2025-01-13T08:00:00",
  status: "CONFIRMED",
  organizer: {
    email: "planning@hospital.fr",
    name: "Planning Internes"
  },
  attendees: [
    {
      email: "martin.dupont@hospital.fr",
      name: "Dr. Martin Dupont"
    }
  ],
  reminders: [
    { minutes: 1440 }, // 24h avant
    { minutes: 120 }   // 2h avant
  ],
  color: "red",
  customFields: {
    type: "garde",
    typeGarde: "dimanche",
    planningId: "uuid"
  }
}
```

---

### F6.8 - Notifications WhatsApp / Messagerie 💬

**Objectif :** Créer un canal de communication pour les notifications et échanges de gardes.

**Priorité :** 🟡 IMPORTANT (v2.0+)

**Fonctionnalités :**

#### Création du groupe
- **Groupe de discussion** pour le planning
- **Ajout automatique** des internes (via numéro de téléphone)
- Support **WhatsApp**, **Telegram**, ou **SMS** (fallback)

#### Notifications automatiques
- **Nouveau planning généré** :
  ```
  📋 Planning Janvier 2025 généré !
  Consulte tes gardes : [Lien]
  ```
- **Échange de garde validé** :
  ```
  ✅ Échange validé :
  Dr. Martin → Dr. Sophie
  Garde Lundi 13/01
  ```
- **Modification du planning** :
  ```
  ⚠️ Planning modifié
  Vérifie tes assignations : [Lien]
  ```
- **Rappel de garde** (24h avant) :
  ```
  🌙 Rappel : Tu es de garde demain
  Dimanche 12/01 - 8h à 8h
  ```

#### Échanges de gardes
- **Proposition d'échange** dans le groupe :
  ```
  Dr. Martin : "Je cherche à échanger ma garde du 13/01"
  ```
- **Validation** par les intéressés
- **Notification** à tout le groupe quand validé

**Interface :**
```
┌─────────────────────────────────────────┐
│  Notifications & Messagerie             │
├─────────────────────────────────────────┤
│  Plateforme : [▼ WhatsApp]             │
│                                          │
│  ☑ Activer notifications automatiques   │
│                                          │
│  Types de notifications :                │
│  ☑ Nouveau planning généré              │
│  ☑ Échanges de gardes                   │
│  ☑ Modifications du planning            │
│  ☑ Rappels de garde (24h avant)         │
│                                          │
│  Groupe WhatsApp :                       │
│  [Créer le groupe]                       │
│  ou                                      │
│  Lien d'invitation : [________]          │
│                                          │
│  [Enregistrer]                           │
└─────────────────────────────────────────┘
```

**Prérequis technique :**
- **WhatsApp Business API** (payant, officiel)
  - ou **Twilio API for WhatsApp**
  - ou **WhatsApp Web unofficial** (limité)
- **Alternative Telegram** : Plus facile à intégrer (gratuit)
- **Fallback SMS** : Si pas de messagerie
- Numéros de téléphone des internes (contacts)

**Architecture :**
```
Application → API Messaging → WhatsApp/Telegram
                            → SMS (fallback)
```

**Alternatives :**
1. **Telegram Bot** : Plus simple, API gratuite
2. **Discord/Slack** : Pour équipes tech
3. **SMS uniquement** : Universel mais coûteux
4. **Email notifications** : Moins immédiat

---

## 🔗 Liens

- **Précédent :** [MODULE 5 - Manipulation](MODULE-5-manipulation.md)
- **Suivant :** [MODULE 7 - Stockage](MODULE-7-stockage.md)

---

*Dernière mise à jour : 4 novembre 2025*

