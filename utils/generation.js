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
 * Générer un planning complet pour une ou plusieurs semaines
 */
export function generatePlanning(planning, weekNumbers = null) {
  console.log('🚀 Début de la génération du planning:', planning.name)
  
  // Déterminer quelles semaines générer
  const weeksToGenerate = weekNumbers || Array.from({ length: planning.weeks }, (_, i) => i + 1)
  
  console.log('📅 Semaines à générer:', weeksToGenerate)
  
  // Initialiser les structures de toutes les semaines
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
  
  // TODO: Les phases suivantes seront implémentées dans les prochaines tâches
  // - Phase 1b : Attribution garde Dimanche
  // - Phase 1c : Attribution gardes semaine (Lun-Ven)
  // - Phase 1d : Attribution garde Samedi
  // - Phase 2 : Calcul repos post-garde
  // - Phase 4 : Attribution practices
  // - Phase 3 : Attribution OFFs
  
  return {
    success: true,
    weeks: weeksStructure,
    message: `✅ Phase 1a : Structures de ${weeksStructure.length} semaine(s) créées`
  }
}

