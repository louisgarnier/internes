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
      slots: createDaySlots(date, i)
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
 * Vérifier si un interne est indisponible à une date donnée
 */
function checkUnavailability(interneId, date, unavailabilities) {
  if (!unavailabilities || unavailabilities.length === 0) return false
  
  return unavailabilities.some(unavail => {
    return unavail.interneId === interneId && unavail.date === date
  })
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
  
  // TODO: Les phases suivantes seront implémentées dans les prochaines tâches
  // - Phase 1c : Attribution gardes semaine (Lun-Ven)
  // - Phase 1d : Attribution garde Samedi
  // - Phase 2 : Calcul repos post-garde
  // - Phase 4 : Attribution practices
  // - Phase 3 : Attribution OFFs
  
  return {
    success: true,
    weeks: weeksStructure,
    globalStats,
    message: `✅ Phase 1a-1b : Structures créées + Gardes Dimanche attribuées pour ${weeksStructure.length} semaine(s)`
  }
}

