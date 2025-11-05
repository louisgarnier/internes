/**
 * Types pour le MODULE 3 - Génération Automatique
 * Référence : docs/modules/MODULE-3-generation.md (lignes 410-434)
 */

/**
 * Garde : Représente une garde de nuit assignée à un interne
 */
export interface Garde {
  id: string              // UUID unique
  interneId: string       // Référence à l'interne (ID)
  date: string            // Date de la garde (format ISO : "2025-01-06")
  typeGarde: 'semaine' | 'samedi' | 'dimanche'  // Type de garde
  semaineNumero: number   // Numéro de semaine (1 à 10)
}

/**
 * Affectation : Représente une assignation d'un interne pour un slot
 * Peut être : travail (practice), repos post-garde, ou OFF
 */
export interface Affectation {
  id: string                           // UUID unique
  interneId: string                    // Référence à l'interne (ID)
  practiceId: string | null            // Référence à la practice (null si repos ou OFF)
  date: string                         // Date (format ISO : "2025-01-06")
  periode: 'matin' | 'apres_midi' | 'astreinte'  // Période de la journée
  type: 'travail' | 'repos' | 'off'   // Type d'affectation
  semaineNumero: number                // Numéro de semaine (1 à 10)
}

/**
 * Helper Types pour la génération
 */

// Jours de la semaine
export type JourSemaine = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche'

// Périodes
export type Periode = 'matin' | 'apres_midi' | 'astreinte'

// Types de garde
export type TypeGarde = 'semaine' | 'samedi' | 'dimanche'

// Types d'affectation
export type TypeAffectation = 'travail' | 'repos' | 'off'

/**
 * Semaine Générée : Structure complète d'une semaine de planning
 */
export interface SemaineGeneree {
  numero: number                    // Numéro de la semaine (1 à 10)
  dateDebut: string                 // Date du lundi (format ISO)
  dateFin: string                   // Date du samedi (format ISO)
  gardes: Garde[]                   // Les 7 gardes de la semaine
  affectations: Affectation[]       // Toutes les affectations (travail, repos, OFF)
  conflits: Conflit[]               // Liste des conflits détectés
  scoreEquilibre: number            // Score d'équilibre (0-100)
}

/**
 * Conflit : Représente un problème détecté lors de la génération
 */
export interface Conflit {
  id: string                        // UUID unique
  type: 'garde' | 'off' | 'practice'  // Type de conflit
  severite: 'erreur' | 'avertissement'  // Gravité
  message: string                   // Description du conflit
  date?: string                     // Date concernée (optionnel)
  periode?: Periode                 // Période concernée (optionnel)
  interneId?: string                // Interne concerné (optionnel)
  practiceId?: string               // Practice concernée (optionnel)
  suggestions?: string[]            // Suggestions de résolution
}

/**
 * Planning Généré : Structure complète d'un planning sur plusieurs semaines
 */
export interface PlanningGenere {
  planningId: string                // ID du planning
  dateGeneration: string            // Date/heure de génération (ISO)
  semaines: SemaineGeneree[]        // Liste des semaines générées
  scoreGlobal: number               // Score d'équilibre global (0-100)
  statsGardes: StatsGardes          // Statistiques des gardes
  statsPractices: StatsPractices    // Statistiques des practices
}

/**
 * Statistiques Gardes
 */
export interface StatsGardes {
  parInterne: {
    [interneId: string]: {
      total: number
      semaine: number
      samedi: number
      dimanche: number
    }
  }
  moyennes: {
    total: number
    semaine: number
    samedi: number
    dimanche: number
  }
  ecartType: {
    total: number
    semaine: number
    samedi: number
    dimanche: number
  }
}

/**
 * Statistiques Practices
 */
export interface StatsPractices {
  parInterne: {
    [interneId: string]: {
      [practiceId: string]: number  // Nombre de demi-journées
    }
  }
  moyennes: {
    [practiceId: string]: number
  }
}

