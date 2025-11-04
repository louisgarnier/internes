# ❓ Questions à Clarifier

Ces questions doivent être répondues avant de commencer le développement.

---

## 🏥 Practices Médicales

### Question 1 : Quelles sont les 8 practices exactes ?

**Besoin :** Liste complète avec le nombre d'internes requis pour chacune.

**Format attendu :**
```
1. [Nom Practice] - [1 ou 2] interne(s) requis
2. [Nom Practice] - [1 ou 2] interne(s) requis
...
8. [Nom Practice] - [1 ou 2] interne(s) requis
```

**Exemple :**
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

**Votre réponse :**
```
1. _________________ - ___ interne(s)
2. _________________ - ___ interne(s)
3. _________________ - ___ interne(s)
4. _________________ - ___ interne(s)
5. _________________ - ___ interne(s)
6. _________________ - ___ interne(s)
7. _________________ - ___ interne(s)
8. _________________ - ___ interne(s)
```

---

## 🌙 Gardes

### Question 2 : Compensation pour la Garde Samedi ?

**Contexte :** Vous avez dit que la garde samedi est "désavantageuse" car :
- Travail samedi après-midi (13h-18h)
- + Garde samedi nuit (18h-8h dimanche)
- + Perte du dimanche entier (repos)

**Question :** Faut-il une compensation particulière ?

**Options :**
- [ ] **A) Pas de compensation** - Juste équilibrer sur 10 semaines
- [ ] **B) OFF vendredi PM prioritaire** - Interne avec garde samedi a priorité pour avoir vendredi après-midi OFF
- [ ] **C) 2 demi-journées OFF** au lieu d'1 cette semaine-là
- [ ] **D) Autre :** _______________

**Votre choix :** _____

---

## 📊 Historique et Équilibre

### Question 3 : Historique sur 10 semaines

**Contexte :** Vous voulez un équilibre des gardes sur 10 semaines.

**Question :** Comment ça fonctionne ?

**Options :**
- [ ] **A) UN planning de 10 semaines** - L'équilibre est calculé SUR ces 10 semaines du même planning
- [ ] **B) PLUSIEURS plannings successifs** - Chaque planning est de 1-4 semaines, mais on garde l'historique pour équilibrer les suivants (ex: Planning Janvier 3 sem + Planning Février 4 sem + Planning Mars 3 sem = 10 semaines total)

**Votre choix :** _____

**Si B :** Comment charger l'historique des plannings précédents ?
- [ ] Manuel (sélectionner les plannings à inclure dans le calcul)
- [ ] Automatique (prendre les X dernières semaines)

---

## 🎨 Choix Techniques

### Question 4 : Préférence de Framework ?

**Pour le frontend :**

- [ ] **React** (recommandé - moderne, populaire, gros écosystème)
- [ ] **Vue.js** (plus simple, courbe d'apprentissage douce)
- [ ] **Vanilla JavaScript** (pas de framework, plus léger)
- [ ] **Autre :** _______________

**Votre choix :** _____

---

### Question 5 : Préférence d'UI Library ?

**Pour l'interface :**

- [ ] **Tailwind CSS** (recommandé - utility-first, très flexible)
- [ ] **Bootstrap** (composants prêts, développement rapide)
- [ ] **Material-UI** (design system complet, look Google)
- [ ] **Autre :** _______________

**Votre choix :** _____

---

## 📱 Fonctionnalités Optionnelles

### Question 6 : Drag & Drop ?

**Contexte :** Pour modifier le planning manuellement.

**Question :** Faut-il implémenter le drag & drop (glisser-déposer) pour déplacer les internes ?

- [ ] **Oui** - Important pour l'UX
- [ ] **Non** - Juste des boutons, c'est suffisant
- [ ] **Plus tard** - v1.1 ou v2.0

**Votre choix :** _____

---

### Question 7 : Fonction "Annuler" ?

**Contexte :** Garder un historique des modifications et permettre Ctrl+Z.

**Question :** Faut-il cette fonctionnalité dans la v1.0 ?

- [ ] **Oui** - Important
- [ ] **Non** - Nice-to-have pour v1.1
- [ ] **Peut-être** - Si le temps le permet

**Votre choix :** _____

---

## 👥 Utilisateurs

### Question 8 : Qui utilise l'application ?

**Contexte :** Pour adapter l'UX.

**Questions :**
1. Une seule personne (vous) ou toute l'équipe ?
   - [ ] Une personne
   - [ ] Toute l'équipe

2. Sur combien d'appareils ?
   - [ ] 1 ordinateur uniquement
   - [ ] Plusieurs ordinateurs (besoin de sync)
   - [ ] Mobile également (responsive)

3. Niveau technique des utilisateurs ?
   - [ ] Technique (médecins internes à l'aise avec l'informatique)
   - [ ] Mixte
   - [ ] Non-technique (besoin d'interface très simple)

**Vos réponses :**
1. _____
2. _____
3. _____

---

## 📝 Informations Internes

### Question 9 : Données supplémentaires sur les internes ?

**Contexte :** Actuellement juste Prénom + Nom.

**Question :** Faut-il ajouter d'autres informations ?

**Options possibles :**
- [ ] Email (pour notifications futures)
- [ ] Téléphone
- [ ] Spécialité
- [ ] Numéro de matricule
- [ ] Aucune autre info nécessaire

**Votre choix :** _____

---

## 🎯 Priorités

### Question 10 : Quelle fonctionnalité est LA PLUS importante ?

**Si vous deviez n'en avoir qu'une seule parfaitement implémentée :**

- [ ] Génération automatique (l'algorithme)
- [ ] Visualisation claire du planning
- [ ] Échange de gardes facile
- [ ] Export PDF imprimable
- [ ] Statistiques d'équilibre
- [ ] Autre : _______________

**Votre choix :** _____

---

## ✅ Prochaine Étape

Une fois ces questions répondues :
1. **Créer un fichier `ANSWERS.md`** avec vos réponses
2. **Me les partager** pour validation
3. **Commencer le développement !** 🚀

---

*Créé le 4 novembre 2025*

