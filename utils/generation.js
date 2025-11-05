// utils/generation.js
// Algorithme de génération automatique du planning

/**
 * Helper: Ajouter des jours à une date
 */
function addDays(dateString, days) {
  const date = new Date(dateString + 'T00:00:00')
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

/**
 * PHASE 1a : Initialiser la structure de base d'une semaine
 * 
 * Crée une structure vide pour une semaine avec :
 * - 11 slots de travail (Lun-Ven : 2 slots/jour, Sam : 1 slot matin)
 * - 7 gardes à attribuer (5 GS + 1 GSam + 1 GDim)
 * - Tableaux vides pour repos, OFF, et affectations
 */
export function initWeekStructure(weekNumber, startDate, interns) {
  // Calculer la date de début de cette semaine (lundi)
  const weekStartDate = addDays(startDate, (weekNumber - 1) * 7)
  
  // Créer les 7 jours de la semaine
  const days = []
  const dayNames = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStartDate, i)
    days.push({
      date,
      dayName: dayNames[i],
      dayIndex: i, // 0=lundi, 1=mardi, ..., 6=dimanche
      slots: createDaySlots(date, i),
      // Références directes pour faciliter l'accès
      matin: {}, // Pour stocker repos/affectations matin
      apresMidi: {} // Pour stocker repos/affectations après-midi
    })
  }
  
  // Structure de la semaine
  return {
    weekNumber,
    startDate: weekStartDate,
    endDate: addDays(weekStartDate, 6), // Dimanche
    days,
    
    // Gardes à attribuer (7 au total)
    gardes: {
      semaine: [], // 5 gardes (lundi-vendredi soir)
      samedi: null, // 1 garde (samedi 13h-dimanche 8h)
      dimanche: null // 1 garde (dimanche 8h-lundi 8h)
    },
    
    // Repos post-garde (calculés après attribution des gardes)
    repos: [], // { interneId, date, periode: 'matin' | 'apres_midi' }
    
    // OFFs (1 demi-journée par interne)
    offs: [], // { interneId, date, periode: 'matin' | 'apres_midi' }
    
    // Affectations aux practices
    affectations: [], // { interneId, practiceId, date, periode }
    
    // Statistiques de la semaine
    stats: {
      gardesAttribuees: 0,
      reposMarques: 0,
      offsAttribues: 0,
      slotsRemplis: 0,
      slotsTotal: 11 // Lun-Ven (10) + Sam (1)
    }
  }
}

/**
 * Créer les slots de travail pour un jour
 */
function createDaySlots(date, dayIndex) {
  const slots = []
  
  // Lundi à Vendredi : 2 slots (matin + après-midi)
  if (dayIndex >= 0 && dayIndex <= 4) {
    slots.push(
      {
        periode: 'matin',
        date,
        horaire: '8h-13h',
        disponible: true,
        assignations: [] // Liste des interneId assignés (vide au départ)
      },
      {
        periode: 'apres_midi',
        date,
        horaire: '13h-18h',
        disponible: true,
        assignations: []
      }
    )
  }
  
  // Samedi : 1 slot (matin uniquement)
  if (dayIndex === 5) {
    slots.push({
      periode: 'matin',
      date,
      horaire: '8h-13h',
      disponible: true,
      assignations: []
    })
  }
  
  // Dimanche : pas de slots de travail
  
  return slots
}

/**
 * PHASE 1b : Attribuer la garde Dimanche (priorité absolue)
 * 
 * La garde Dimanche est la plus difficile (24h : Dimanche 8h → Lundi 8h)
 * On l'attribue en premier pour maximiser les chances d'équilibre
 */
function assignGardeDimanche(week, interns, unavailabilities, globalStats) {
  console.log(`\n🌙 Phase 1b : Attribution garde Dimanche semaine ${week.weekNumber}`)
  
  // Date du dimanche
  const dimancheDate = week.days[6].date
  
  // Trouver le meilleur interne pour cette garde
  const selectedIntern = selectInterneForGarde(
    interns,
    dimancheDate,
    'dimanche',
    unavailabilities,
    globalStats,
    week
  )
  
  if (!selectedIntern) {
    console.error('❌ Impossible de trouver un interne pour la garde Dimanche')
    return false
  }
  
  // Créer l'objet garde
  const garde = {
    id: `garde-dim-${week.weekNumber}`,
    interneId: selectedIntern.id,
    interneName: `${selectedIntern.firstName} ${selectedIntern.lastName}`,
    date: dimancheDate,
    type: 'dimanche',
    horaire: 'Dimanche 8h → Lundi 8h (24h)',
    weekNumber: week.weekNumber
  }
  
  // Assigner la garde
  week.gardes.dimanche = garde
  week.stats.gardesAttribuees++
  
  // Mettre à jour les stats globales
  if (!globalStats.gardesParInterne[selectedIntern.id]) {
    globalStats.gardesParInterne[selectedIntern.id] = { total: 0, semaine: 0, samedi: 0, dimanche: 0 }
  }
  globalStats.gardesParInterne[selectedIntern.id].total++
  globalStats.gardesParInterne[selectedIntern.id].dimanche++
  
  console.log(`✅ Garde Dimanche attribuée à ${garde.interneName}`)
  
  return true
}

/**
 * PHASE 1c : Attribuer les 5 gardes de semaine (Lundi-Vendredi)
 * 
 * Gardes de semaine : 18h → 8h lendemain (moins difficiles que samedi/dimanche)
 */
function assignGardesSemaine(week, interns, unavailabilities, globalStats) {
  console.log(`\n🌙 Phase 1c : Attribution 5 gardes de semaine ${week.weekNumber}`)
  
  const joursSemaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
  
  for (let i = 0; i < 5; i++) {
    const jourName = joursSemaine[i]
    const jourDate = week.days[i].date // Index 0-4 = Lun-Ven
    
    console.log(`\n  📅 Attribution garde ${jourName}`)
    
    // Trouver le meilleur interne pour cette garde
    const selectedIntern = selectInterneForGarde(
      interns,
      jourDate,
      'semaine',
      unavailabilities,
      globalStats,
      week
    )
    
    if (!selectedIntern) {
      console.error(`❌ Impossible de trouver un interne pour la garde ${jourName}`)
      return false
    }
    
    // Créer l'objet garde
    const garde = {
      id: `garde-sem-${week.weekNumber}-${i}`,
      interneId: selectedIntern.id,
      interneName: `${selectedIntern.firstName} ${selectedIntern.lastName}`,
      date: jourDate,
      type: 'semaine',
      jour: jourName,
      horaire: `${jourName.charAt(0).toUpperCase() + jourName.slice(1)} 18h → Lendemain 8h`,
      weekNumber: week.weekNumber
    }
    
    // Assigner la garde
    week.gardes.semaine.push(garde)
    week.stats.gardesAttribuees++
    
    // Mettre à jour les stats globales
    if (!globalStats.gardesParInterne[selectedIntern.id]) {
      globalStats.gardesParInterne[selectedIntern.id] = { total: 0, semaine: 0, samedi: 0, dimanche: 0 }
    }
    globalStats.gardesParInterne[selectedIntern.id].total++
    globalStats.gardesParInterne[selectedIntern.id].semaine++
    
    console.log(`  ✅ Garde ${jourName} attribuée à ${garde.interneName}`)
  }
  
  console.log(`\n✅ 5 gardes de semaine attribuées (${week.stats.gardesAttribuees}/7 total)`)
  
  return true
}

/**
 * PHASE 1d : Attribuer la garde Samedi (la moins désirable)
 * 
 * Garde Samedi : Samedi 13h → Dimanche 8h (la plus pénible)
 * CONTRAINTE DURE : Cette garde DOIT être attribuée, même si un interne a déjà une garde dans la semaine
 */
function assignGardeSamedi(week, interns, unavailabilities, globalStats) {
  console.log(`\n🌙 Phase 1d : Attribution garde Samedi ${week.weekNumber}`)
  
  const samediDate = week.days[5].date // Index 5 = Samedi
  
  console.log(`  📅 Attribution garde Samedi (${samediDate})`)
  
  // Trouver le meilleur interne pour cette garde
  // Note : Le système de scoring va naturellement éviter les doublons de gardes,
  // mais si nécessaire, il attribuera quand même (contrainte DURE)
  const selectedIntern = selectInterneForGarde(
    interns,
    samediDate,
    'samedi',
    unavailabilities,
    globalStats,
    week
  )
  
  if (!selectedIntern) {
    console.error(`❌ Impossible de trouver un interne pour la garde Samedi`)
    return false
  }
  
  // Créer l'objet garde
  const garde = {
    id: `garde-sam-${week.weekNumber}`,
    interneId: selectedIntern.id,
    interneName: `${selectedIntern.firstName} ${selectedIntern.lastName}`,
    date: samediDate,
    type: 'samedi',
    jour: 'samedi',
    horaire: 'Samedi 13h → Dimanche 8h',
    weekNumber: week.weekNumber
  }
  
  // Assigner la garde
  week.gardes.samedi = garde
  week.stats.gardesAttribuees++
  
  // Mettre à jour les stats globales
  if (!globalStats.gardesParInterne[selectedIntern.id]) {
    globalStats.gardesParInterne[selectedIntern.id] = { total: 0, semaine: 0, samedi: 0, dimanche: 0 }
  }
  globalStats.gardesParInterne[selectedIntern.id].total++
  globalStats.gardesParInterne[selectedIntern.id].samedi++
  
  console.log(`  ✅ Garde Samedi attribuée à ${garde.interneName}`)
  console.log(`  🎯 Total gardes cette semaine : ${week.stats.gardesAttribuees}/7`)
  
  return true
}

/**
 * PHASE 2 : Calculer les repos post-garde obligatoires
 * 
 * Règles :
 * - Garde Lun-Jeu soir → Repos lendemain (matin + après-midi)
 * - Garde Ven soir → Repos samedi (matin + après-midi)
 * - Garde Sam 13h-Dim 8h → Repos dimanche (matin + après-midi)
 * - Garde Dim 8h-Lun 8h → Repos lundi (matin + après-midi) de la SEMAINE SUIVANTE
 */
function calculateReposPostGarde(week) {
  console.log(`\n💤 Phase 2 : Calcul repos post-garde semaine ${week.weekNumber}`)
  
  let reposCount = 0
  
  // Garde Dimanche → Repos Lundi (matin + après-midi)
  if (week.gardes.dimanche) {
    const garde = week.gardes.dimanche
    const lundiDate = week.days[0].date // Index 0 = Lundi
    
    const reposMatin = {
      id: `repos-${week.weekNumber}-lun-matin`,
      interneId: garde.interneId,
      interneName: garde.interneName,
      date: lundiDate,
      periode: 'matin',
      reason: 'Repos post-garde Dimanche'
    }
    
    const reposApresMidi = {
      id: `repos-${week.weekNumber}-lun-aprem`,
      interneId: garde.interneId,
      interneName: garde.interneName,
      date: lundiDate,
      periode: 'apres_midi',
      reason: 'Repos post-garde Dimanche'
    }
    
    week.repos.push(reposMatin, reposApresMidi)
    week.days[0].matin.repos = reposMatin
    week.days[0].apresMidi.repos = reposApresMidi
    reposCount += 2
    
    console.log(`  💤 Repos Lundi (matin + AM) pour ${garde.interneName} (garde Dim)`)
  }
  
  // Gardes de semaine (Lun-Jeu) → Repos lendemain
  if (week.gardes.semaine && week.gardes.semaine.length > 0) {
    week.gardes.semaine.forEach(garde => {
      // Trouver l'index du jour de la garde
      const gardeDayIndex = week.days.findIndex(day => day.date === garde.date)
      
      if (gardeDayIndex >= 0 && gardeDayIndex < 4) { // Lun-Jeu (indices 0-3)
        const reposDayIndex = gardeDayIndex + 1 // Lendemain
        const reposDate = week.days[reposDayIndex].date
        const reposDayName = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'][reposDayIndex]
        
        const reposMatin = {
          id: `repos-${week.weekNumber}-${garde.jour}-matin`,
          interneId: garde.interneId,
          interneName: garde.interneName,
          date: reposDate,
          periode: 'matin',
          reason: `Repos post-garde ${garde.jour}`
        }
        
        const reposApresMidi = {
          id: `repos-${week.weekNumber}-${garde.jour}-aprem`,
          interneId: garde.interneId,
          interneName: garde.interneName,
          date: reposDate,
          periode: 'apres_midi',
          reason: `Repos post-garde ${garde.jour}`
        }
        
        week.repos.push(reposMatin, reposApresMidi)
        week.days[reposDayIndex].matin.repos = reposMatin
        week.days[reposDayIndex].apresMidi.repos = reposApresMidi
        reposCount += 2
        
        console.log(`  💤 Repos ${reposDayName} (matin + AM) pour ${garde.interneName} (garde ${garde.jour})`)
      }
      
      // Garde Vendredi → Repos Samedi
      if (gardeDayIndex === 4) { // Vendredi (index 4)
        const samediDate = week.days[5].date
        
        const reposMatin = {
          id: `repos-${week.weekNumber}-ven-matin`,
          interneId: garde.interneId,
          interneName: garde.interneName,
          date: samediDate,
          periode: 'matin',
          reason: 'Repos post-garde Vendredi'
        }
        
        const reposApresMidi = {
          id: `repos-${week.weekNumber}-ven-aprem`,
          interneId: garde.interneId,
          interneName: garde.interneName,
          date: samediDate,
          periode: 'apres_midi',
          reason: 'Repos post-garde Vendredi'
        }
        
        week.repos.push(reposMatin, reposApresMidi)
        week.days[5].matin.repos = reposMatin
        week.days[5].apresMidi.repos = reposApresMidi
        reposCount += 2
        
        console.log(`  💤 Repos Samedi (matin + AM) pour ${garde.interneName} (garde vendredi)`)
      }
    })
  }
  
  // Garde Samedi → Repos Dimanche
  if (week.gardes.samedi) {
    const garde = week.gardes.samedi
    const dimancheDate = week.days[6].date // Index 6 = Dimanche
    
    const reposMatin = {
      id: `repos-${week.weekNumber}-sam-matin`,
      interneId: garde.interneId,
      interneName: garde.interneName,
      date: dimancheDate,
      periode: 'matin',
      reason: 'Repos post-garde Samedi'
    }
    
    const reposApresMidi = {
      id: `repos-${week.weekNumber}-sam-aprem`,
      interneId: garde.interneId,
      interneName: garde.interneName,
      date: dimancheDate,
      periode: 'apres_midi',
      reason: 'Repos post-garde Samedi'
    }
    
    week.repos.push(reposMatin, reposApresMidi)
    week.days[6].matin.repos = reposMatin
    week.days[6].apresMidi.repos = reposApresMidi
    reposCount += 2
    
    console.log(`  💤 Repos Dimanche (matin + AM) pour ${garde.interneName} (garde samedi)`)
  }
  
  console.log(`  ✅ ${reposCount} demi-journées de repos calculées`)
  week.stats.reposCalcules = reposCount
}

/**
 * PHASE 4a : Attribuer practices nécessitant 2 internes
 * 
 * PRIORITÉ ABSOLUE : Couvrir toutes les practices avant les OFFs
 */
function assignPractices2Internes(week, practicesList, internsList, unavailabilities, globalStats) {
  console.log(`\n🏥 Phase 4a : Attribution practices à 2 internes - Semaine ${week.weekNumber}`)
  
  // Filtrer les practices nécessitant 2 internes
  const practices2 = practicesList.filter(p => p.requiredInterns === 2)
  
  if (practices2.length === 0) {
    console.log('  ℹ️ Aucune practice à 2 internes configurée')
    return true
  }
  
  console.log(`  📋 ${practices2.length} practice(s) à 2 internes trouvée(s)`)
  
  let affectationsCount = 0
  
  // Pour chaque practice
  for (const practice of practices2) {
    console.log(`\n  🔹 Practice: ${practice.name}`)
    
    // Pour chaque jour de la semaine (Lun-Sam)
    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
      const day = week.days[dayIndex]
      const dayName = day.dayName
      
      // Vérifier si la practice est active ce jour
      const schedule = practice.schedule || {}
      
      // Mapper le nom du jour français vers anglais
      const dayMapping = {
        'lundi': 'monday',
        'mardi': 'tuesday',
        'mercredi': 'wednesday',
        'jeudi': 'thursday',
        'vendredi': 'friday',
        'samedi': 'saturday'
      }
      const dayKey = dayMapping[dayName]
      
      // Matin
      const matinActive = schedule[dayKey]?.morning === true
      if (matinActive) {
        const success = assignSlotToPractice(week, day, 'matin', practice, 2, internsList, unavailabilities, globalStats)
        if (success) affectationsCount += 2
        else {
          console.error(`  ❌ Impossible d'affecter 2 internes à ${practice.name} - ${dayName} matin`)
          return false
        }
      }
      
      // Après-midi (sauf samedi)
      if (dayIndex < 5) { // Lun-Ven seulement
        const apresMidiActive = schedule[dayKey]?.afternoon === true
        if (apresMidiActive) {
          const success = assignSlotToPractice(week, day, 'apres_midi', practice, 2, internsList, unavailabilities, globalStats)
          if (success) affectationsCount += 2
          else {
            console.error(`  ❌ Impossible d'affecter 2 internes à ${practice.name} - ${dayName} après-midi`)
            return false
          }
        }
      }
    }
  }
  
  console.log(`  ✅ ${affectationsCount} affectations créées pour practices à 2 internes`)
  week.stats.affectationsCreees = (week.stats.affectationsCreees || 0) + affectationsCount
  
  return true
}

/**
 * PHASE 4b : Attribuer practices nécessitant 1 interne
 */
function assignPractices1Interne(week, practicesList, internsList, unavailabilities, globalStats) {
  console.log(`\n🏥 Phase 4b : Attribution practices à 1 interne - Semaine ${week.weekNumber}`)
  
  // Filtrer les practices nécessitant 1 interne
  const practices1 = practicesList.filter(p => p.requiredInterns === 1)
  
  if (practices1.length === 0) {
    console.log('  ℹ️ Aucune practice à 1 interne configurée')
    return true
  }
  
  console.log(`  📋 ${practices1.length} practice(s) à 1 interne trouvée(s)`)
  
  let affectationsCount = 0
  
  // Pour chaque practice
  for (const practice of practices1) {
    console.log(`\n  🔹 Practice: ${practice.name}`)
    
    // Pour chaque jour de la semaine (Lun-Sam)
    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
      const day = week.days[dayIndex]
      const dayName = day.dayName
      
      // Vérifier si la practice est active ce jour
      const schedule = practice.schedule || {}
      
      // Mapper le nom du jour français vers anglais
      const dayMapping = {
        'lundi': 'monday',
        'mardi': 'tuesday',
        'mercredi': 'wednesday',
        'jeudi': 'thursday',
        'vendredi': 'friday',
        'samedi': 'saturday'
      }
      const dayKey = dayMapping[dayName]
      
      // Matin
      const matinActive = schedule[dayKey]?.morning === true
      if (matinActive) {
        const success = assignSlotToPractice(week, day, 'matin', practice, 1, internsList, unavailabilities, globalStats)
        if (success) affectationsCount += 1
        else {
          console.error(`  ❌ Impossible d'affecter 1 interne à ${practice.name} - ${dayName} matin`)
          return false
        }
      }
      
      // Après-midi (sauf samedi)
      if (dayIndex < 5) { // Lun-Ven seulement
        const apresMidiActive = schedule[dayKey]?.afternoon === true
        if (apresMidiActive) {
          const success = assignSlotToPractice(week, day, 'apres_midi', practice, 1, internsList, unavailabilities, globalStats)
          if (success) affectationsCount += 1
          else {
            console.error(`  ❌ Impossible d'affecter 1 interne à ${practice.name} - ${dayName} après-midi`)
            return false
          }
        }
      }
    }
  }
  
  console.log(`  ✅ ${affectationsCount} affectations créées pour practices à 1 interne`)
  week.stats.affectationsCreees = (week.stats.affectationsCreees || 0) + affectationsCount
  
  return true
}

/**
 * PHASE 3 : Attribuer 1 demi-journée OFF par interne (BONUS)
 * 
 * Si un interne n'a pas de slot disponible, tant pis (pas d'erreur)
 */
function assignOFFs(week, internsList, globalStats) {
  console.log(`\n💤 Phase 3 : Attribution OFFs - Semaine ${week.weekNumber}`)
  
  let offsCount = 0
  
  // Pour chaque interne
  for (const intern of internsList) {
    // Trouver les slots disponibles pour cet interne
    const availableSlots = []
    
    for (let dayIndex = 0; dayIndex < 5; dayIndex++) { // Lun-Ven uniquement
      const day = week.days[dayIndex]
      
      // Vérifier matin
      const matinDispo = isSlotAvailableForOFF(intern.id, day, 'matin', week)
      if (matinDispo) {
        availableSlots.push({ day, periode: 'matin' })
      }
      
      // Vérifier après-midi
      const apresMidiDispo = isSlotAvailableForOFF(intern.id, day, 'apres_midi', week)
      if (apresMidiDispo) {
        availableSlots.push({ day, periode: 'apres_midi' })
      }
    }
    
    if (availableSlots.length === 0) {
      console.log(`  ⚠️ ${intern.firstName} ${intern.lastName} : Aucun slot disponible pour OFF`)
      continue
    }
    
    // Sélectionner un slot aléatoire (ou le premier pour simplifier)
    const selectedSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)]
    
    // Créer l'OFF
    const off = {
      id: `off-${week.weekNumber}-${intern.id}`,
      interneId: intern.id,
      interneName: `${intern.firstName} ${intern.lastName}`,
      date: selectedSlot.day.date,
      periode: selectedSlot.periode,
      weekNumber: week.weekNumber
    }
    
    week.offs.push(off)
    
    // Marquer dans la structure du jour
    if (selectedSlot.periode === 'matin') {
      selectedSlot.day.matin.off = off
    } else {
      selectedSlot.day.apresMidi.off = off
    }
    
    offsCount++
    
    const periodeLabel = selectedSlot.periode === 'matin' ? 'matin' : 'après-midi'
    console.log(`  ✅ ${intern.firstName} ${intern.lastName} : OFF ${selectedSlot.day.dayName} ${periodeLabel}`)
  }
  
  console.log(`  ✅ ${offsCount} OFFs attribués sur ${internsList.length} internes`)
  week.stats.offsAttribues = offsCount
}

/**
 * Vérifier si un slot est disponible pour un OFF
 */
function isSlotAvailableForOFF(interneId, day, periode, week) {
  // 1. Vérifier si l'interne a un repos ce slot
  if (periode === 'matin' && day.matin.repos && day.matin.repos.interneId === interneId) {
    return false
  }
  if (periode === 'apres_midi' && day.apresMidi.repos && day.apresMidi.repos.interneId === interneId) {
    return false
  }
  
  // 2. Vérifier si l'interne a déjà un OFF ce slot
  if (periode === 'matin' && day.matin.off && day.matin.off.interneId === interneId) {
    return false
  }
  if (periode === 'apres_midi' && day.apresMidi.off && day.apresMidi.off.interneId === interneId) {
    return false
  }
  
  // 3. Vérifier si l'interne a une affectation practice ce slot
  const hasAffectation = week.affectations.some(aff => 
    aff.interneId === interneId && 
    aff.date === day.date && 
    aff.periode === periode
  )
  if (hasAffectation) {
    return false
  }
  
  // 4. Vérifier si l'interne a une garde le soir (on évite OFF le même jour)
  const hasGardeToday = 
    (week.gardes.dimanche && week.gardes.dimanche.interneId === interneId && week.gardes.dimanche.date === day.date) ||
    (week.gardes.samedi && week.gardes.samedi.interneId === interneId && week.gardes.samedi.date === day.date) ||
    (week.gardes.semaine && week.gardes.semaine.some(g => g.interneId === interneId && g.date === day.date))
  
  if (hasGardeToday) {
    return false
  }
  
  return true
}

/**
 * Assigner un slot spécifique à une practice
 */
function assignSlotToPractice(week, day, periode, practice, nbRequired, internsList, unavailabilities, globalStats) {
  // Trouver les internes disponibles pour ce slot
  const available = getAvailableInternsForSlot(week, day, periode, internsList, unavailabilities)
  
  if (available.length < nbRequired) {
    console.error(`    ❌ Seulement ${available.length} internes disponibles (besoin: ${nbRequired})`)
    return false
  }
  
  // Sélectionner les meilleurs internes (équilibrage)
  const selected = selectBestInternsForPractice(available, practice, globalStats, nbRequired)
  
  if (selected.length !== nbRequired) {
    console.error(`    ❌ Impossible de sélectionner ${nbRequired} internes`)
    return false
  }
  
  // Créer les affectations
  for (const intern of selected) {
    const affectation = {
      id: `affectation-${week.weekNumber}-${day.date}-${periode}-${intern.id}`,
      interneId: intern.id,
      interneName: `${intern.firstName} ${intern.lastName}`,
      practiceId: practice.id,
      practiceName: practice.name,
      date: day.date,
      periode,
      type: 'travail',
      weekNumber: week.weekNumber
    }
    
    week.affectations.push(affectation)
    
    // Mettre à jour les stats globales
    if (!globalStats.practicesParInterne) {
      globalStats.practicesParInterne = {}
    }
    if (!globalStats.practicesParInterne[intern.id]) {
      globalStats.practicesParInterne[intern.id] = {}
    }
    if (!globalStats.practicesParInterne[intern.id][practice.id]) {
      globalStats.practicesParInterne[intern.id][practice.id] = 0
    }
    globalStats.practicesParInterne[intern.id][practice.id]++
  }
  
  console.log(`    ✅ ${day.dayName} ${periode} : ${selected.map(i => `${i.firstName} ${i.lastName}`).join(', ')}`)
  
  return true
}

/**
 * Obtenir la liste des internes disponibles pour un slot
 */
function getAvailableInternsForSlot(week, day, periode, internsList, unavailabilities) {
  return internsList.filter(intern => {
    // Vérifier repos post-garde
    if (periode === 'matin' && day.matin.repos && day.matin.repos.interneId === intern.id) {
      return false
    }
    if (periode === 'apres_midi' && day.apresMidi.repos && day.apresMidi.repos.interneId === intern.id) {
      return false
    }
    
    // Vérifier empêchements
    const isUnavailable = checkUnavailability(intern.id, day.date, unavailabilities, periode)
    if (isUnavailable) {
      return false
    }
    
    // Vérifier si l'interne a une garde ce jour (éviter de surcharger)
    // Pour l'instant on permet, mais on pourrait pénaliser dans le scoring
    
    return true
  })
}

/**
 * Sélectionner les meilleurs internes pour une practice (équilibrage)
 */
function selectBestInternsForPractice(availableInterns, practice, globalStats, nbRequired) {
  // Calculer un score pour chaque interne
  const internsWithScore = availableInterns.map(intern => {
    let score = 100
    
    // Facteur 1 : Équilibrage global des practices
    const practicesStats = globalStats.practicesParInterne?.[intern.id] || {}
    const totalPractices = Object.values(practicesStats).reduce((sum, count) => sum + count, 0)
    score -= totalPractices * 5 // Pénalité pour ceux qui ont déjà beaucoup de practices
    
    // Facteur 2 : Équilibrage par practice spécifique
    const countThisPractice = practicesStats[practice.id] || 0
    score -= countThisPractice * 10 // Pénalité plus forte pour cette practice spécifique
    
    // Facteur 3 : Équilibrage par nombre de gardes (éviter de surcharger)
    const gardesStats = globalStats.gardesParInterne?.[intern.id] || { total: 0 }
    score -= gardesStats.total * 3
    
    return { intern, score }
  })
  
  // Trier par score décroissant et prendre les N meilleurs
  internsWithScore.sort((a, b) => b.score - a.score)
  
  return internsWithScore.slice(0, nbRequired).map(item => item.intern)
}

/**
 * Vérifier si un interne est empêché à une date/période
 */
function checkUnavailability(interneId, date, unavailabilities, periode = null) {
  if (!unavailabilities || unavailabilities.length === 0) return false
  
  return unavailabilities.some(unavail => {
    if (unavail.internId !== interneId) return false
    if (unavail.date !== date) return false
    
    // Si période spécifiée, vérifier la correspondance
    if (periode) {
      if (unavail.period === 'fullday') return true
      if (unavail.period === 'matin' && periode === 'matin') return true
      if (unavail.period === 'apres_midi' && periode === 'apres_midi') return true
      return false
    }
    
    return true
  })
}

/**
 * Sélectionner le meilleur interne pour une garde
 * 
 * Critères de scoring :
 * 1. Disponibilité (pas d'empêchement)
 * 2. Équilibre (qui a eu le moins de gardes ?)
 * 3. Type de garde (équilibrer les types : semaine, samedi, dimanche)
 */
function selectInterneForGarde(interns, date, gardeType, unavailabilities, globalStats, week) {
  const candidates = []
  
  for (const intern of interns) {
    // Vérifier la disponibilité (empêchements)
    const isUnavailable = checkUnavailability(intern.id, date, unavailabilities)
    if (isUnavailable) {
      console.log(`  ⏭️ ${intern.firstName} ${intern.lastName} : indisponible`)
      continue
    }
    
    // Calculer le score
    const score = calculateInterneScore(intern, gardeType, globalStats, week)
    
    candidates.push({
      intern,
      score
    })
  }
  
  if (candidates.length === 0) {
    return null
  }
  
  // Trier par score décroissant (meilleur score en premier)
  candidates.sort((a, b) => b.score - a.score)
  
  console.log(`  📊 ${candidates.length} candidats disponibles`)
  candidates.slice(0, 3).forEach((c, i) => {
    console.log(`    ${i + 1}. ${c.intern.firstName} ${c.intern.lastName} (score: ${c.score.toFixed(2)})`)
  })
  
  return candidates[0].intern
}

/**
 * Calculer le score d'un interne pour une garde
 * 
 * Score plus élevé = meilleur candidat
 */
function calculateInterneScore(intern, gardeType, globalStats, week) {
  let score = 100 // Score de base
  
  // Facteur 1 : Équilibre du nombre total de gardes
  const interneStats = globalStats.gardesParInterne[intern.id] || { total: 0, semaine: 0, samedi: 0, dimanche: 0 }
  const totalGardes = interneStats.total
  
  // Favoriser ceux qui ont eu moins de gardes
  score -= totalGardes * 10
  
  // Facteur 2 : Équilibre par type de garde
  if (gardeType === 'dimanche') {
    score -= interneStats.dimanche * 15 // Pénalité si déjà eu garde dimanche
  } else if (gardeType === 'samedi') {
    score -= interneStats.samedi * 15
  } else {
    score -= interneStats.semaine * 5
  }
  
  // Facteur 3 : Éviter les gardes dans la même semaine
  const hasGardeThisWeek = week.gardes.semaine.some(g => g.interneId === intern.id) ||
    (week.gardes.samedi && week.gardes.samedi.interneId === intern.id) ||
    (week.gardes.dimanche && week.gardes.dimanche.interneId === intern.id)
  
  if (hasGardeThisWeek) {
    score -= 20 // Pénalité si déjà une garde cette semaine
  }
  
  return score
}

/**
 * Générer un planning complet pour une ou plusieurs semaines
 */
export function generatePlanning(planning, weekNumbers = null) {
  console.log('🚀 Début de la génération du planning:', planning.name)
  
  // Déterminer quelles semaines générer
  const weeksToGenerate = weekNumbers || Array.from({ length: planning.weeks }, (_, i) => i + 1)
  
  console.log('📅 Semaines à générer:', weeksToGenerate)
  
  // Initialiser les statistiques globales (pour équilibrage entre semaines)
  const globalStats = {
    gardesParInterne: {} // { interneId: { total, semaine, samedi, dimanche } }
  }
  
  // PHASE 1a : Initialiser les structures de toutes les semaines
  const weeksStructure = []
  
  for (const weekNum of weeksToGenerate) {
    console.log(`\n📋 Initialisation semaine ${weekNum}`)
    const weekStructure = initWeekStructure(weekNum, planning.startDate, planning.internsList)
    weeksStructure.push(weekStructure)
    
    console.log('✅ Structure initialisée:', {
      semaine: weekStructure.weekNumber,
      debut: weekStructure.startDate,
      fin: weekStructure.endDate,
      jours: weekStructure.days.length,
      slotsTotal: weekStructure.stats.slotsTotal
    })
  }
  
  console.log('\n✅ Phase 1a terminée : Structures de base créées')
  
  // PHASE 1b : Attribuer les gardes Dimanche (priorité absolue)
  for (const week of weeksStructure) {
    const success = assignGardeDimanche(week, planning.internsList, planning.unavailabilities, globalStats)
    if (!success) {
      return {
        success: false,
        error: `Impossible d'attribuer la garde Dimanche pour la semaine ${week.weekNumber}`,
        weeks: weeksStructure
      }
    }
  }
  
  console.log('\n✅ Phase 1b terminée : Gardes Dimanche attribuées')
  
  // PHASE 1c : Attribuer les 5 gardes de semaine (Lun-Ven)
  for (const week of weeksStructure) {
    const success = assignGardesSemaine(week, planning.internsList, planning.unavailabilities, globalStats)
    if (!success) {
      return {
        success: false,
        error: `Impossible d'attribuer toutes les gardes de semaine pour la semaine ${week.weekNumber}`,
        weeks: weeksStructure
      }
    }
  }
  
  console.log('\n✅ Phase 1c terminée : Gardes de semaine attribuées')
  
  // PHASE 1d : Attribuer la garde Samedi (la moins désirable)
  for (const week of weeksStructure) {
    const success = assignGardeSamedi(week, planning.internsList, planning.unavailabilities, globalStats)
    if (!success) {
      return {
        success: false,
        error: `Impossible d'attribuer la garde Samedi pour la semaine ${week.weekNumber}`,
        weeks: weeksStructure
      }
    }
  }
  
  console.log('\n✅ Phase 1d terminée : Gardes Samedi attribuées')
  console.log('\n🎉 PHASE 1 COMPLÈTE : Toutes les 7 gardes attribuées par semaine !')
  
  // PHASE 2 : Calculer les repos post-garde obligatoires
  for (const week of weeksStructure) {
    calculateReposPostGarde(week)
  }
  
  console.log('\n✅ Phase 2 terminée : Repos post-garde calculés')
  
  // PHASE 4a : Attribuer practices à 2 internes (priorité absolue)
  for (const week of weeksStructure) {
    const success = assignPractices2Internes(week, planning.practicesList, planning.internsList, planning.unavailabilities, globalStats)
    if (!success) {
      return {
        success: false,
        error: `Impossible d'attribuer toutes les practices à 2 internes pour la semaine ${week.weekNumber}`,
        weeks: weeksStructure
      }
    }
  }
  
  console.log('\n✅ Phase 4a terminée : Practices à 2 internes attribuées')
  
  // PHASE 4b : Attribuer practices à 1 interne
  for (const week of weeksStructure) {
    const success = assignPractices1Interne(week, planning.practicesList, planning.internsList, planning.unavailabilities, globalStats)
    if (!success) {
      return {
        success: false,
        error: `Impossible d'attribuer toutes les practices à 1 interne pour la semaine ${week.weekNumber}`,
        weeks: weeksStructure
      }
    }
  }
  
  console.log('\n✅ Phase 4b terminée : Practices à 1 interne attribuées')
  console.log('\n🎉 PHASE 4 COMPLÈTE : Toutes les practices attribuées !')
  
  // PHASE 3 : Attribuer 1 demi-journée OFF par interne (BONUS)
  for (const week of weeksStructure) {
    assignOFFs(week, planning.internsList, globalStats)
  }
  
  console.log('\n✅ Phase 3 terminée : OFFs attribués (bonus)')
  console.log('\n🎉 GÉNÉRATION COMPLÈTE : Gardes + Repos + Practices + OFFs !')
  
  return {
    success: true,
    weeks: weeksStructure,
    globalStats,
    message: `✅ Génération complète : Gardes + Repos + Practices + OFFs pour ${weeksStructure.length} semaine(s)`
  }
}

