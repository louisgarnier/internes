# Structure de Données

## 📊 Modèles de Données

### Planning
```javascript
{
  id: String (UUID),
  nom: String,
  dateDebut: Date (ISO 8601),
  nombreSemaines: Number (1-10),
  dateCreation: DateTime,
  derniereModification: DateTime,
  statut: Enum["configuration", "genere", "erreur"],
  
  // Compteurs pour affichage rapide
  nbInternes: Number,
  nbPractices: Number,
  nbEmpechements: Number,
  scoreEquilibre: Number (0-100)
}
```

### Interne
```javascript
{
  id: String (UUID),
  prenom: String,
  nom: String,
  nomComplet: String (calculé: "Dr. Prénom Nom")
}
```

### Practice
```javascript
{
  id: String (UUID),
  nom: String,
  nombreInternesRequis: Number (1 ou 2),
  couleur: String (hex: "#3498db"),
  slots: [
    {
      jour: Enum["lundi", "mardi", ..., "samedi"],
      periode: Enum["matin", "apres_midi"],
      actif: Boolean
    }
  ]
}
```

### Empêchement
```javascript
{
  id: String (UUID),
  interneId: String (UUID),
  date: Date,
  periode: Enum["matin", "apres_midi", "journee"],
  raison: String (optionnel)
}
```

### Garde
```javascript
{
  id: String (UUID),
  interneId: String (UUID),
  date: Date,
  typeGarde: Enum["semaine", "samedi", "dimanche"],
  semaineNumero: Number (1-10)
}
```

### Affectation
```javascript
{
  id: String (UUID),
  interneId: String (UUID),
  practiceId: String (UUID, null si repos/OFF),
  date: Date,
  periode: Enum["matin", "apres_midi", "astreinte"],
  type: Enum["travail", "repos", "off"],
  semaineNumero: Number (1-10)
}
```

---

## 🔗 Relations

```
Planning (1) ──── (N) Interne
Planning (1) ──── (N) Practice
Planning (1) ──── (N) Empêchement
Planning (1) ──── (N) Garde
Planning (1) ──── (N) Affectation

Interne (1) ──── (N) Empêchement
Interne (1) ──── (N) Garde
Interne (1) ──── (N) Affectation

Practice (1) ──── (N) Affectation
```

---

*Dernière mise à jour : 4 novembre 2025*

