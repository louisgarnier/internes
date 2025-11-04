# MODULE 5 - Manipulation

## 📋 Vue d'Ensemble

**Objectif :** Permettre des modifications manuelles du planning (échanges de gardes, modifications d'affectations).

**Priorité :** 🟡 IMPORTANT

**Statut :** 📝 À développer

**Dépendances :** MODULE 4 (Visualisation)

---

## 🎯 Fonctionnalités

### F5.1 - Échange de Gardes

**Cas d'usage :** Un interne ne peut plus faire sa garde et souhaite échanger avec un collègue.

**Interface :**
```
1. Clic sur une garde dans le planning
   → Modal "Échanger cette garde"
   
2. Sélection de l'interne qui prendra la garde
   → Liste des internes DISPONIBLES
   
3. Validation automatique :
   ✅ Interne disponible (pas de garde, pas de repos, pas d'empêchement)
   ❌ Sinon, message d'erreur
   
4. Si OK : Échange effectué + Recalcul des repos
```

**Modal d'Échange :**
```
┌────────────────────────────────────────┐
│  Échanger la Garde                     │
├────────────────────────────────────────┤
│  Garde : Lundi 06/01/2025 (Semaine)   │
│  Actuellement : Dr. Martin Dupont      │
│                                        │
│  Échanger avec :                       │
│  ⦿ Dr. Sophie Bernard  ✅ Disponible  │
│  ⭘ Dr. Lucas Petit     ✅ Disponible  │
│  ⭘ Dr. Emma Leroy      ❌ Repos       │
│  ⭘ Dr. Thomas Robert   ❌ Garde       │
│  ⭘ Dr. Chloé Dubois    ✅ Disponible  │
│  ⭘ Dr. Hugo Thomas     ❌ Empêchement │
│                                        │
│  ⚠️ Les repos post-garde seront       │
│     recalculés automatiquement.        │
│                                        │
│      [Annuler]  [Échanger]            │
└────────────────────────────────────────┘
```

**Après échange :**
```
✅ Garde échangée avec succès !

Lundi 06/01 → Dr. Sophie Bernard
Repos mardi ajouté pour Dr. Sophie
Repos mardi retiré pour Dr. Martin
```

---

### F5.2 - Modification Manuelle

**Cas d'usage :** Déplacer un interne d'une practice à une autre.

**Méthode : Clic + Sélection (v1.0)**
```
1. Clic sur une cellule du planning
2. Liste déroulante des internes disponibles
3. Sélection de l'interne
4. Validation automatique des contraintes
5. Application de la modification
```

**Note :** Le drag & drop est prévu pour v1.1 pour une meilleure UX.

**Validations :**
- Interne disponible (pas de garde, repos, OFF, empêchement)
- Practice pas déjà complète
- Capacité respectée

---

### F5.3 - Régénération Partielle

**Options :**
- Régénérer une semaine complète
- Régénérer un jour spécifique
- Régénérer un slot spécifique

**Conservation :**
- Les gardes existantes sont conservées (sauf si conflit)
- Seules les affectations sont régénérées

**Interface :**
```
┌────────────────────────────────────────┐
│  Régénérer                             │
├────────────────────────────────────────┤
│  ⦿ Semaine complète                   │
│  ⭘ Jour spécifique : [Lundi ▼]       │
│  ⭘ Slot spécifique : [Lundi Matin ▼] │
│                                        │
│  ☑ Conserver les gardes existantes   │
│                                        │
│      [Annuler]  [Régénérer]           │
└────────────────────────────────────────┘
```

---

## ✅ Critères d'Acceptation

```
GIVEN un planning généré
WHEN l'utilisateur échange deux gardes
THEN les gardes sont échangées
AND les repos sont recalculés
AND les affectations sont ajustées si nécessaire
```

---

## 🔗 Liens

- **Précédent :** [MODULE 4 - Visualisation](MODULE-4-visualisation.md)
- **Suivant :** [MODULE 6 - Export/Import](MODULE-6-export-import.md)

---

*Dernière mise à jour : 4 novembre 2025*

