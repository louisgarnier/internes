# ❓ Questions à Clarifier

Ces questions doivent être répondues avant de commencer le développement.

---

## 🏥 Practices Médicales

### Question 1 : Quelles sont les 8 practices exactes ? il peut y avoir n practice differents, n etant environ 8, ou 7 ou 10...

**Besoin :** Liste complète avec le nombre d'internes requis pour chacune.

**Format attendu :** oui ca sera ce format. il faut pouvoir modifier le nom de practice et selectionner 1 ou 2 internes necessaires
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

### Question 2 : Compensation pour la Garde Samedi ? non pas de compensation. On peut peut etre mettre le montnat en € qu'est payée la garde

**Contexte :** Vous avez dit que la garde samedi est "désavantageuse" car :
- Travail samedi après-midi (13h-18h)
- + Garde samedi nuit (18h-8h dimanche)
- + Perte du dimanche entier (repos)

**Question :** Faut-il une compensation particulière ? non, juste le prix "garde samedi"

**Options :**
- [ ] **A) Pas de compensation** - Juste équilibrer sur 10 semaines
- [ ] **B) OFF vendredi PM prioritaire** - Interne avec garde samedi a priorité pour avoir vendredi après-midi OFF, pas forcement aussi car les gens aiment pas avoir leur samedi booké, cest le wkd...
- [ ] **C) 2 demi-journées OFF** au lieu d'1 cette semaine-là
- [ ] **D) Autre :** _______________

**Votre choix :** _____

---

## 📊 Historique et Équilibre

### Question 3 : Historique sur 10 semaines

**Contexte :** Vous voulez un équilibre des gardes sur 10 semaines.

**Question :** Comment ça fonctionne ?l'utilisateur quand il creer un planning, decide sur combien de semaine il veut generr un planning, 1 semaine a 10 semaine peut etre pas mal. il faut que l'algo sadpate pour bien alterner les practices en fonction dunombre d'internes. 

**Options :**
- [ ] **A) UN planning de 10 semaines** - L'équilibre est calculé SUR ces 10 semaines du même planning
- [ ] **B) PLUSIEURS plannings successifs** - Chaque planning est de 1-4 semaines, mais on garde l'historique pour équilibrer les suivants (ex: Planning Janvier 3 sem + Planning Février 4 sem + Planning Mars 3 sem = 10 semaines total)

**Votre choix :** _____

**Si B :** Comment charger l'historique des plannings précédents ? pas besoin de changer l'historique, seulement les smeaines a vernir. mais en thoerie il y  ajuste les changements de garde a echanger nom contre cnom/ jour contre jour. et les noms des internes sur une matinee ou apres midi si il y a un empechement.


---

## 🎨 Choix Techniques

### Question 4 : Préférence de Framework ?

**Pour le frontend :**
nuxt js
---

### Question 5 : Préférence d'UI Library ?

**Pour l'interface :**

- [ ] **Tailwind CSS** (recommandé - utility-first, très flexible)
- [ ] **Bootstrap** (composants prêts, développement rapide)
- [ ] **Material-UI** (design system complet, look Google)
- [ ] **Autre :** _______________

**Votre choix :** je te laisses choisir

---

## 📱 Fonctionnalités Optionnelles

### Question 6 : Drag & Drop ?

**Contexte :** Pour modifier le planning manuellement.

**Question :** Faut-il implémenter le drag & drop (glisser-déposer) pour déplacer les internes ?

- [ ] **Oui** - Important pour l'UX
- [ ] **Non** - Juste des boutons, c'est suffisant
- [ ] **Plus tard** - v1.1 ou v2.0

**Votre choix :****Plus tard** - v1.1 ou v2.0

---

### Question 7 : Fonction "Annuler" ?

**Contexte :** Garder un historique des modifications et permettre Ctrl+Z.

**Question :** Faut-il cette fonctionnalité dans la v1.0 ?

- [ ] **Oui** - Important
- [ ] **Non** - Nice-to-have pour v1.1
- [ ] **Peut-être** - Si le temps le permet

**Votre choix :**- Nice-to-have pour v1.1

---

## 👥 Utilisateurs

### Question 8 : Qui utilise l'application ? le pm qui creer le planning, apres il exporte le planning a des utilisateurs


**Contexte :** Pour adapter l'UX.

**Questions :**
1. Une seule personne (vous) ou toute l'équipe ?
   - Une personne
   

2. Sur combien d'appareils ?
faut une webapp, un ordi ou deux, donc faisons une bdd local, mais on bougera sur airtable au p^re  apres

3. Niveau technique des utilisateurs ?
   - [ ] Non-technique (besoin d'interface très simple) - on va tester chaque fonctionnalité une par une donc ca permettre de faire le plus simple possible



## 📝 Informations Internes

### Question 9 : Données supplémentaires sur les internes ?

**Contexte :** Actuellement juste Prénom + Nom, plus jours empechement (date)

**Question :** Faut-il ajouter d'autres informations ?
- [ ] Email (pour notifications futures)
- [ ] Téléphone



## 🎯 Priorités

### Question 10 : Quelle fonctionnalité est LA PLUS importante ?

**Si vous deviez n'en avoir qu'une seule parfaitement implémentée :**

- [ ] Génération automatique (l'algorithme)
- [x] Visualisation claire du planning
- [ ] Échange de gardes facile
- [ ] Export PDF imprimable
- [ ] Statistiques d'équilibre
- [ ] Autre : _______________



## ✅ Prochaine Étape

Une fois ces questions répondues :
1. **Créer un fichier `ANSWERS.md`** avec vos réponses => jai repondu a toutes les qeustions dans ce fichier


---

*Créé le 4 novembre 2025*

