# MODULE 7 - Stockage

## 📋 Vue d'Ensemble

**Objectif :** Gérer le stockage local des données (LocalStorage), sauvegarde automatique et backup.

**Priorité :** 🔴 CRITIQUE

**Statut :** 📝 À développer

**Dépendances :** Tous les modules

---

## 🎯 Fonctionnalités

### F7.1 - Sauvegarde Automatique

**Mécanisme :** Utilisation du `LocalStorage` du navigateur.

**Avantages :**
- ✅ Pas de serveur requis
- ✅ Fonctionne hors ligne
- ✅ Gratuit
- ✅ Rapide

**Limites :**
- ❌ ~5-10 MB max
- ❌ Pas de synchronisation multi-devices
- ❌ Données perdues si cache effacé

**Stratégie de stockage :**
```javascript
// Clé pour la liste des plannings
localStorage.setItem("plannings_list", JSON.stringify([...]))

// Clé pour chaque planning complet
localStorage.setItem("planning_abc123", JSON.stringify({...}))
```

**Déclencheurs de sauvegarde :**
- Après chaque modification (internes, practices, etc.)
- Après génération du planning
- Après échange de garde
- Toutes les 30 secondes (debounced)

---

### F7.2 - Backup et Restauration

**Backup Complet :**
```
Bouton : [💾 Sauvegarder tous les plannings]
  ↓
Export de TOUS les plannings en un fichier JSON
  ↓
Téléchargement : plannings_backup_2025-11-04.json
```

**Restauration :**
```
Bouton : [📥 Restaurer depuis un backup]
  ↓
Sélection du fichier JSON
  ↓
Aperçu des plannings contenus
  ↓
Confirmation
  ↓
Import de tous les plannings
```

**Alerte espace :**
```
⚠️ Attention : Espace de stockage faible !

Utilisé : 4.2 MB / 5 MB

Conseil : Supprimez d'anciens plannings ou
exportez-les en JSON pour libérer de l'espace.

[Voir les plannings]  [Exporter backup]
```

---

### F7.3 - Historique des Modifications (Optionnel)

**Objectif :** Permettre d'annuler les dernières actions.

**Mécanisme :**
- Conservation des 20 dernières actions
- Snapshot de l'état avant chaque modification

**Fonction "Annuler" :**
```
Ctrl+Z (ou Cmd+Z sur Mac)
  ↓
Revenir à l'état précédent
```

**Interface :**
```
┌────────────────────────────────────────┐
│  Historique                            │
├────────────────────────────────────────┤
│  15:32 - Garde échangée (Lun)          │
│  15:28 - Planning généré (Sem 2)       │
│  15:20 - Interne ajouté (Dr. Hugo)     │
│  15:15 - Planning créé                 │
└────────────────────────────────────────┘
```

---

## 🗄️ Structure du LocalStorage

### Liste des Plannings
```javascript
"plannings_list": [
  {
    id: "abc123",
    nom: "Planning Janvier 2025",
    dateDebut: "2025-01-06",
    nombreSemaines: 3,
    statut: "genere",
    nbInternes: 7,
    nbPractices: 8,
    derniereModification: "2025-11-04T15:30:00Z"
  },
  // ... autres plannings
]
```

### Données Complètes d'un Planning
```javascript
"planning_abc123": {
  // Métadonnées
  id: "abc123",
  nom: "Planning Janvier 2025",
  // ... autres champs
  
  // Données
  internes: [...],
  practices: [...],
  empechements: [...],
  gardes: [...],
  affectations: [...]
}
```

---

## 🔄 Optimisations

### Compression
- Stocker les données en JSON minifié
- Utiliser des clés courtes (`i` au lieu de `interne_id`)

### Lazy Loading
- Charger seulement la liste des plannings au démarrage
- Charger les données complètes à la demande

### Nettoyage
- Supprimer automatiquement les brouillons de > 30 jours
- Proposer de supprimer les anciens plannings

---

## ✅ Critères d'Acceptation

```
GIVEN l'utilisateur crée un planning
WHEN il ferme et rouvre le navigateur
THEN le planning est toujours là
AND toutes les données sont conservées
```

---

## 🔗 Liens

- **Précédent :** [MODULE 6 - Export/Import](MODULE-6-export-import.md)
- **Documentation technique :** [Architecture](../technical/ARCHITECTURE.md)

---

*Dernière mise à jour : 4 novembre 2025*

