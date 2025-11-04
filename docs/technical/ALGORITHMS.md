# Algorithmes de Génération

## 🧮 Vue d'Ensemble

L'algorithme de génération se déroule en **4 phases séquentielles** pour créer un planning complet.

---

## Phase 1 : Attribution des Gardes

### Pseudo-code
```
POUR chaque semaine du planning:
  gardes_a_attribuer = [
    {jour: lundi, type: "semaine"},
    {jour: mardi, type: "semaine"},
    {jour: mercredi, type: "semaine"},
    {jour: jeudi, type: "semaine"},
    {jour: vendredi, type: "semaine"},
    {jour: samedi, type: "samedi"},
    {jour: dimanche, type: "dimanche"}
  ]
  
  // Trier par priorité (dimanche > semaine > samedi)
  gardes_triees = TRIER(gardes_a_attribuer, par_difficulte)
  
  POUR chaque garde dans gardes_triees:
    internes_disponibles = FILTRER_INTERNES_DISPONIBLES(garde)
    
    SI internes_disponibles.length == 0:
      AJOUTER_ERREUR("Impossible d'assigner garde " + garde.jour)
      CONTINUER
    FIN SI
    
    scores = []
    POUR chaque interne dans internes_disponibles:
      score = CALCULER_SCORE_GARDE(interne, garde)
      scores.AJOUTER({interne, score})
    FIN POUR
    
    meilleur = TRIER(scores, par_score_desc)[0]
    ASSIGNER_GARDE(meilleur.interne, garde)
    MARQUER_REPOS_POST_GARDE(meilleur.interne, garde)
  FIN POUR
FIN POUR
```

### Calcul du Score
```
FONCTION CALCULER_SCORE_GARDE(interne, garde):
  score = 0
  
  // Déficit gardes totales (poids 3)
  moyenne_gardes = TOTAL_GARDES / NB_INTERNES
  deficit_total = moyenne_gardes - interne.gardes_total
  score += deficit_total * 3
  
  // Déficit par type (poids 2)
  moyenne_type = GARDES_TYPE / NB_INTERNES
  deficit_type = moyenne_type - interne.gardes_type[garde.type]
  score += deficit_type * 2
  
  // Bonus dimanche
  SI garde.type == "dimanche":
    score += 1
  FIN SI
  
  // Pénalité samedi récent
  SI garde.type == "samedi" ET interne.derniere_garde_samedi < 3_semaines:
    score -= 5
  FIN SI
  
  RETOURNER score
FIN FONCTION
```

---

## Phase 2 : Repos Post-Garde

### Pseudo-code
```
POUR chaque garde assignée:
  lendemain = garde.jour + 1_jour
  
  SI garde.type == "semaine":
    MARQUER_INDISPONIBLE(garde.interne, lendemain, "matin")
    MARQUER_INDISPONIBLE(garde.interne, lendemain, "apres_midi")
  
  SINON SI garde.type == "samedi":
    // Dimanche (pas de travail normal)
    // Rien à faire
  
  SINON SI garde.type == "dimanche":
    // Repos lundi complet
    MARQUER_INDISPONIBLE(garde.interne, lendemain, "matin")
    MARQUER_INDISPONIBLE(garde.interne, lendemain, "apres_midi")
  FIN SI
FIN POUR
```

---

## Phase 3 : Attribution OFF

### Pseudo-code
```
priorite_slots = [
  {jour: "vendredi", periode: "apres_midi"},
  {jour: "vendredi", periode: "matin"},
  {jour: "jeudi", periode: "apres_midi"},
  // ... autres slots
]

POUR chaque interne:
  off_assigne = faux
  
  POUR chaque slot dans priorite_slots:
    SI EST_DISPONIBLE(interne, slot):
      ASSIGNER_OFF(interne, slot)
      off_assigne = vrai
      BREAK
    FIN SI
  FIN POUR
  
  SI NOT off_assigne:
    AJOUTER_ERREUR("Impossible d'assigner OFF pour " + interne.nom)
  FIN SI
FIN POUR
```

---

## Phase 4 : Attribution Practices

### Pseudo-code
```
// Trier practices: 2 internes d'abord
practices_triees = TRIER(practices, par_nb_internes_desc)

POUR chaque semaine:
  POUR chaque jour (lundi à samedi):
    POUR chaque periode (matin, apres_midi ou astreinte):
      
      POUR chaque practice dans practices_triees:
        SI NOT practice.actif(jour, periode):
          CONTINUER
        FIN SI
        
        internes_disponibles = FILTRER_INTERNES_DISPONIBLES(jour, periode)
        
        scores = []
        POUR chaque interne dans internes_disponibles:
          score = CALCULER_SCORE_PRACTICE(interne, practice)
          scores.AJOUTER({interne, score})
        FIN POUR
        
        meilleurs = PRENDRE_N_MEILLEURS(scores, practice.nb_requis)
        
        SI meilleurs.length < practice.nb_requis:
          AJOUTER_ALERTE("Practice sous-staffée: " + practice.nom)
        FIN SI
        
        POUR chaque interne dans meilleurs:
          ASSIGNER_PRACTICE(interne, practice, jour, periode)
        FIN POUR
      FIN POUR
      
    FIN POUR
  FIN POUR
FIN POUR
```

### Calcul du Score Practice
```
FONCTION CALCULER_SCORE_PRACTICE(interne, practice):
  score = 0
  
  // Déficit dans cette practice (poids 3)
  moyenne_practice = TOTAL_DJ_PRACTICE / NB_INTERNES
  deficit_practice = moyenne_practice - interne.dj_practice[practice.id]
  score += deficit_practice * 3
  
  // Déficit global DJ (poids 1)
  moyenne_dj = TOTAL_DJ / NB_INTERNES
  deficit_global = moyenne_dj - interne.dj_total
  score += deficit_global * 1
  
  RETOURNER score
FIN FONCTION
```

---

## Complexité

- **Temps** : O(S × N × P) où S=semaines, N=internes, P=practices
- **Pour 10 semaines, 7 internes, 8 practices** : ~560 opérations principales
- **Temps d'exécution estimé** : < 1 seconde

---

*Dernière mise à jour : 4 novembre 2025*

