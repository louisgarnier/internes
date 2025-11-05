# 🚀 ROADMAP v2.0+ - Fonctionnalités Avancées

**Dernière mise à jour :** 5 novembre 2025 - 06h15

---

## 📋 Vue d'Ensemble

Ce document liste toutes les fonctionnalités avancées et améliorations qui seront développées **après la v1.0**.

**v1.0 se concentre sur l'essentiel :**
- ✅ Génération automatique complète (gardes, repos, practices, OFFs)
- ✅ Visualisation basique du planning
- ✅ Configuration complète (wizard + édition)
- ✅ Sauvegarde locale (LocalStorage)

**v2.0+ ajoutera les optimisations et intégrations avancées.**

---

## 🎯 MODULE 3 - Génération Avancée (v1.1)

### m3-12 : Détection de Conflits Avancée

**Objectif :** Détecter et signaler tous les conflits potentiels dans le planning généré.

**Fonctionnalités :**
- ✅ Détection gardes non attribuées (normalement impossible avec contraintes DURES)
- ✅ Détection practices sous-staffées (moins d'internes que requis)
- ✅ Détection internes surchargés (trop de gardes comparé à la moyenne)
- ✅ Détection déséquilibres importants (écart-type trop élevé)
- ✅ Rapport détaillé des conflits avec suggestions de résolution

**Interface :**
```
⚠️ Conflits détectés :
  • Practice "Cardiologie" sous-staffée : 1/2 internes le lundi matin
  • Interne "Alice Martin" surchargé : 3 gardes (moyenne : 1.4)
  
💡 Suggestions :
  • Ajouter 1 interne supplémentaire
  • Régénérer en augmentant la pénalité pour Alice Martin
```

**Priorité :** 🟡 Moyenne (amélioration UX)

---

### m3-13 : Option "Ajouter des Internes"

**Objectif :** Proposer automatiquement d'ajouter des internes si le planning ne peut pas être généré correctement.

**Fonctionnalités :**
- ✅ Calcul du nombre minimum d'internes requis
- ✅ Comparaison avec le nombre actuel
- ✅ Suggestion d'ajout si sous-staffé
- ✅ Bouton "➕ Ajouter X internes recommandés"
- ✅ Modal explicatif avec détails du calcul

**Calcul minimum d'internes :**
```javascript
// Formule simplifiée
minInternes = Math.ceil(
  (totalSlotsPractices + 7 gardes + 14 repos) / (11 slots disponibles)
)

// Exemple : 2 practices à 2 internes, Lun-Ven matin+AM, Sam matin
// = (2 practices × 2 internes × 11 slots) + 7 + 14 = 65 slots nécessaires
// / 11 slots disponibles par interne = 6 internes minimum
```

**Interface :**
```
❌ Planning impossible à générer !

🔍 Analyse :
- Slots à couvrir : 65
- Slots disponibles : 55 (5 internes × 11 slots)
- Déficit : 10 slots

💡 Solution recommandée :
Ajouter 1 interne supplémentaire

[➕ Ajouter 1 interne]  [⚙️ Modifier configuration]
```

**Priorité :** 🔴 Haute (fonctionnalité bloquante utile)

---

### m3-14 : Calcul du Score d'Équilibre (0-100)

**Objectif :** Évaluer la qualité du planning généré avec un score global et des sous-scores détaillés.

**Composantes du score :**

#### 1. Équilibre des gardes (30 points)
- Écart-type du nombre de gardes par interne
- Pénalité si écart > 1 garde

#### 2. Équilibre par type de garde (20 points)
- Distribution des gardes Semaine / Samedi / Dimanche
- Pénalité si un interne a 2+ gardes difficiles (Sam/Dim)

#### 3. Équilibre des practices (25 points)
- Répartition équitable des practices entre internes
- Chaque interne devrait voir toutes les practices

#### 4. Équilibre des demi-journées travaillées (15 points)
- Total de demi-journées de travail par interne
- Objectif : ~11 par semaine (si 1 OFF + 2 repos)

#### 5. Distribution temporelle (10 points)
- Éviter concentration de gardes difficiles sur mêmes périodes
- Éviter même interne avec plusieurs gardes rapprochées

**Formule globale :**
```javascript
scoreGlobal = (
  scoreGardes * 0.30 +
  scoreTypesGardes * 0.20 +
  scorePractices * 0.25 +
  scoreDemiJournees * 0.15 +
  scoreTemporel * 0.10
)
```

**Affichage :**
```
📊 Score d'Équilibre : 87/100 ✅

Détails :
  🟢 Équilibre gardes : 28/30 (écart-type : 0.8)
  🟢 Types de gardes : 18/20 (bien réparti)
  🟡 Practices : 20/25 (Alice: 3 practices, Bob: 2)
  🟢 Demi-journées : 14/15 (10-12 par interne)
  🟢 Temporel : 9/10 (pas de concentration)

💡 Pour améliorer :
  • Régénérer pour équilibrer practices entre Alice et Bob
```

**Priorité :** 🟡 Moyenne (amélioration UX, validation qualité)

---

## 📅 MODULE 4 - Visualisation Avancée (v1.1)

### 2 Vues Complémentaires

**Déjà spécifié dans MODULE-4-visualisation.md**

#### Vue 1 : Par Interne (pour les internes)
- Voir son planning personnel complet
- Lignes = Internes, Colonnes = Jours
- Afficher : practices, gardes, repos, OFFs, empêchements

#### Vue 2 : Par Jour/Période (pour les managers)
- Vérifier couverture des practices
- Lignes = Périodes (Matin, Après-midi, Garde)
- Afficher : practices avec liste internes assignés

**Toggle pour switcher entre les 2 vues**

**Priorité :** 🔴 Haute (expérience utilisateur essentielle)

---

## 🔄 MODULE 5 - Manipulation (v1.2)

### Échange de Gardes
- Sélectionner une garde
- Proposer internes disponibles pour l'échanger
- Recalcul automatique des repos post-garde
- Validation contraintes

### Modification Manuelle (Drag & Drop)
- Déplacer un interne d'une practice à une autre
- Validation disponibilité en temps réel
- Rollback si conflit

### Régénération Partielle
- Régénérer une semaine spécifique
- Régénérer un jour spécifique
- Régénérer un slot spécifique
- Conservation des gardes existantes

**Priorité :** 🟡 Moyenne (confort d'utilisation)

---

## 📤 MODULE 6 - Export / Import (v1.3)

### Export PDF
- Planning complet format imprimable
- Page de garde avec infos
- Une page par semaine
- Page statistiques

### Export Excel
- Fichier .xlsx avec plusieurs feuilles
- Vue hebdomadaire, gardes, stats

### Export JSON
- Sauvegarde complète
- Format structuré pour backup

### Import JSON/CSV
- Restaurer planning
- Importer listes (internes, practices)

**Priorité :** 🟡 Moyenne (fonctionnalité pratique)

---

## 🔗 MODULE 6+ - Intégrations (v2.0+)

### F6.6 : Envoi Email Automatique 📧

**Objectif :** Envoyer automatiquement le planning PDF aux internes chaque semaine.

**Fonctionnalités :**
- ✅ Configuration SMTP ou service email (SendGrid, Mailgun)
- ✅ Template email personnalisable
- ✅ Envoi automatique chaque lundi matin
- ✅ Planning personnel en pièce jointe (PDF)
- ✅ Récapitulatif de la semaine dans le corps du mail
- ✅ Historique des envois

**Priorité :** 🔴 Haute (automatisation importante)

---

### F6.7 : Intégration Google Calendar / Outlook 📅

**Objectif :** Synchroniser automatiquement le planning avec les calendriers des internes.

**Fonctionnalités :**
- ✅ Export iCal (.ics) pour import manuel
- ✅ Connexion OAuth Google Calendar / Outlook
- ✅ Création automatique des événements :
  - Gardes (avec rappel 2h avant)
  - Practices (avec lieu et description)
  - Repos post-garde (événement bloqué)
  - OFFs (événement bloqué)
- ✅ Code couleur par type d'événement
- ✅ Synchronisation bidirectionnelle (import unavailabilities)
- ✅ Mise à jour automatique si planning modifié

**Structure événement Google Calendar :**
```javascript
{
  summary: "🌙 Garde Semaine",
  description: "Garde de 18h à 8h le lendemain\nAstreinte téléphonique",
  start: { dateTime: "2025-01-06T18:00:00+01:00" },
  end: { dateTime: "2025-01-07T08:00:00+01:00" },
  colorId: "9", // Orange pour gardes
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'popup', minutes: 120 },
      { method: 'email', minutes: 1440 } // 24h avant
    ]
  }
}
```

**Priorité :** 🔴 Haute (intégration très demandée)

---

### F6.8 : Notifications WhatsApp / Messagerie 💬

**Objectif :** Notifier les internes via WhatsApp/Telegram/SMS pour les événements importants.

**Fonctionnalités :**
- ✅ Création groupe WhatsApp/Telegram pour l'équipe
- ✅ Notification automatique :
  - Nouveau planning publié
  - Échange de garde accepté/refusé
  - Modification de planning
  - Rappel garde J-1
- ✅ Commandes bot :
  - `/monplanning` - Voir son planning de la semaine
  - `/garde` - Voir qui est de garde aujourd'hui
  - `/echange [date]` - Proposer un échange
- ✅ Support WhatsApp Business API, Telegram Bot, SMS (Twilio)

**Priorité :** 🟡 Moyenne (nice-to-have, dépend infrastructure)

---

## 🗄️ MODULE 7 - Stockage Cloud (v2.0+)

### Migration Airtable
- Remplacer LocalStorage par Airtable
- API pour CRUD complet
- Synchronisation multi-utilisateurs
- Historique des modifications

### Système de Permissions
- Admin : toutes permissions
- Chef de service : création/modification plannings
- Interne : visualisation + demande échange

**Priorité :** 🔴 Haute (scalabilité)

---

## 🧪 MODULE 8 - Tests & Qualité (v1.4)

### Tests Unitaires
- Tests algorithme génération
- Tests scoring
- Tests contraintes DURES/SOUPLES

### Tests d'Intégration
- Scénarios complets de bout en bout
- Tests avec différentes configurations

### Tests de Performance
- Génération planning 10 semaines < 5 secondes
- Support jusqu'à 20 internes, 20 practices

**Priorité :** 🟢 Basse (qualité long terme)

---

## 📱 MODULE 9 - Application Mobile (v3.0+)

### Application Native
- React Native ou Flutter
- Notifications push
- Mode offline
- Scan QR code pour échange rapide

**Priorité :** 🟢 Basse (évolution future)

---

## 📊 Priorisation Globale

### v1.0 (Actuel - MVP)
- ✅ Génération automatique complète
- ✅ Visualisation basique
- ✅ Configuration complète
- ⏳ Sauvegarde locale

### v1.1 (Prochaine)
- 🔴 **m3-13** : Ajout internes si sous-staffé
- 🔴 **MODULE 4** : 2 vues complémentaires
- 🟡 **m3-14** : Score d'équilibre

### v1.2 (Après v1.1)
- 🟡 **MODULE 5** : Manipulation manuelle
- 🟡 **m3-12** : Détection conflits
- 🟡 **MODULE 6** : Export PDF/Excel

### v2.0 (Major)
- 🔴 **F6.7** : Google Calendar / Outlook
- 🔴 **F6.6** : Email automatique
- 🔴 **MODULE 7** : Airtable + Multi-users
- 🟡 **F6.8** : WhatsApp / Messagerie

### v2.1+ (Long terme)
- 🟢 Tests complets
- 🟢 Performance optimizations
- 🟢 Application mobile

---

## 🎯 Prochaines Étapes Immédiates

Pour terminer **v1.0 MVP** :
1. **m3-15** : Sauvegarde dans le store ✅ PRIORITÉ
2. **m3-16** : Changement statut → 'generated' ✅ PRIORITÉ
3. **m3-17** : Affichage basique dans tableau ✅ PRIORITÉ
4. **m3-18** : Tests basiques

Ensuite, planifier **v1.1** avec les fonctionnalités ci-dessus.

---

*Ce document est maintenu à jour au fur et à mesure de l'évolution du projet.*

