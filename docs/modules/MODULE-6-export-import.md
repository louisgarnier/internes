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

## 🔗 Liens

- **Précédent :** [MODULE 5 - Manipulation](MODULE-5-manipulation.md)
- **Suivant :** [MODULE 7 - Stockage](MODULE-7-stockage.md)

---

*Dernière mise à jour : 4 novembre 2025*

