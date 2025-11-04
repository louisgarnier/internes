# ✅ Réponses aux Questions - Configuration du Projet

Date : 4 novembre 2025

---

## 🏥 Practices Médicales

**Nombre de practices :** Variable (~7-10 practices)
- Format flexible, modifiable par l'utilisateur
- Chaque practice : Nom + Nombre d'internes requis (1 ou 2)

**Exemple type :**
```
1. Chirurgie - 2 internes
2. Médecine Interne - 2 internes
3. Urgences - 2 internes
4. Pédiatrie - 2 internes
5. Cardiologie - 1 interne
6. Neurologie - 1 interne
7. Psychiatrie - 1 interne
8. Radiologie - 1 interne
```

---

## 🌙 Gardes

**Compensation Garde Samedi :** Aucune compensation spéciale
- Afficher le montant payé (€) pour chaque type de garde
- Pas de demi-journée OFF supplémentaire
- Équilibrage sur la durée du planning

**Types de gardes avec prix :**
- Garde Semaine (Lun-Ven) : XX €
- Garde Samedi : XX € (plus élevé)
- Garde Dimanche : XX € (le plus élevé)

---

## 📊 Historique et Équilibre

**Type de planning :** UN planning de 1 à 10 semaines
- L'utilisateur choisit la durée (1-10 semaines)
- L'équilibre est calculé SUR ce planning uniquement
- Pas d'historique entre plusieurs plannings
- L'algorithme s'adapte automatiquement au nombre de semaines et d'internes

**Modifications possibles :**
- Échange de gardes (nom contre nom, jour contre jour)
- Modification manuelle d'une affectation si empêchement

---

## 🎨 Stack Technique

### Frontend
- **Framework :** Nuxt.js (Vue.js avec SSR)
- **UI Library :** Tailwind CSS (utility-first, flexible)
- **Bundler :** Vite (inclus dans Nuxt 3)

### Backend
- **v1.0 :** Base de données locale (LocalStorage ou SQLite)
- **v2.0+ :** Migration vers Airtable

### Justification du choix :
- **Nuxt.js** : Moderne, performant, excellent DX
- **Tailwind CSS** : Flexibilité maximale pour le design
- **BDD locale** : Simplicité pour v1.0, pas de serveur requis

---

## 📱 Fonctionnalités

### Priorité 1 (v1.0)
✅ **Visualisation claire du planning** (LA priorité)
✅ Génération automatique
✅ Configuration (internes, practices, empêchements)
✅ Échange de gardes
✅ Export PDF

### v1.1 (Plus tard)
⏳ Drag & Drop pour modifications
⏳ Fonction "Annuler" (Ctrl+Z)
⏳ Export Excel avancé

### v2.0 (Futur)
🔮 Migration vers Airtable
🔮 Multi-utilisateurs
🔮 Notifications

---

## 👥 Utilisateurs

**Type d'utilisateur :** PM (Planning Manager) seul
- Crée le planning
- Configure internes et practices
- Exporte le planning pour l'équipe

**Appareils :** 1-2 ordinateurs
- Application web responsive
- Pas besoin de mobile (pour l'instant)

**Niveau technique :** Non-technique
- Interface très simple
- Test de chaque fonctionnalité une par une

---

## 📝 Données Internes

**Informations minimales :**
- Prénom
- Nom
- Empêchements (date + période)

**Pas nécessaire pour v1.0 :**
- Email
- Téléphone
- Spécialité
- Matricule

---

## 🎯 Décisions Techniques Finales

### Architecture
```
Nuxt.js 3 (App Router)
├── pages/           # Routes de l'application
├── components/      # Composants Vue
├── composables/     # Logique métier réutilisable
├── stores/          # Pinia (state management)
├── utils/           # Utilitaires
└── assets/          # CSS/Images
```

### Base de Données Locale
```javascript
// Structure LocalStorage (ou SQLite)
{
  plannings: [...],
  planning_<id>: {
    internes: [...],
    practices: [...],
    empechements: [...],
    gardes: [...],
    affectations: [...]
  }
}
```

---

## 📅 Plan d'Action

### Semaine 1 (Setup)
1. Initialiser projet Nuxt.js
2. Installer Tailwind CSS
3. Setup structure dossiers
4. Configuration de base

### Semaine 2-3 (Dashboard)
5. Page d'accueil
6. Liste des plannings
7. CRUD plannings basique

### Semaine 4-5 (Configuration)
8. Wizard 4 étapes
9. Gestion internes/practices
10. Système d'empêchements

### Semaine 6 (Algorithme)
11. Génération automatique
12. Tests intensifs

### Semaine 7 (Visualisation - PRIORITÉ)
13. Vue hebdomadaire
14. Vue calendrier
15. Navigation semaines

### Semaine 8 (Finalisation)
16. Échange de gardes
17. Export PDF
18. Polish UI/UX

---

*Document créé le 4 novembre 2025*

