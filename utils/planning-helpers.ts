/**
 * Helpers pour la génération de planning
 * Fonctions utilitaires basées sur les types définis dans types/planning.ts
 */

import type { Garde, Affectation, TypeGarde, Periode, JourSemaine } from '~/types/planning'

/**
 * Génère un UUID simple pour les tests
 * TODO: Utiliser une vraie bibliothèque UUID en production
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Crée une garde
 */
export function creerGarde(
  interneId: string,
  date: string,
  typeGarde: TypeGarde,
  semaineNumero: number
): Garde {
  return {
    id: generateId(),
    interneId,
    date,
    typeGarde,
    semaineNumero
  }
}

/**
 * Crée une affectation
 */
export function creerAffectation(
  interneId: string,
  date: string,
  periode: Periode,
  type: 'travail' | 'repos' | 'off',
  semaineNumero: number,
  practiceId: string | null = null
): Affectation {
  return {
    id: generateId(),
    interneId,
    practiceId,
    date,
    periode,
    type,
    semaineNumero
  }
}

/**
 * Convertit une date ISO en jour de la semaine
 */
export function getJourSemaine(dateISO: string): JourSemaine {
  const date = new Date(dateISO)
  const jour = date.getDay() // 0 = dimanche, 1 = lundi, ...
  
  const jours: JourSemaine[] = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  return jours[jour]
}

/**
 * Ajoute N jours à une date ISO
 */
export function ajouterJours(dateISO: string, jours: number): string {
  const date = new Date(dateISO)
  date.setDate(date.getDate() + jours)
  return date.toISOString().split('T')[0]
}

/**
 * Calcule la date de fin d'une semaine (samedi) à partir du lundi
 */
export function calculerDateFin(dateLundi: string): string {
  return ajouterJours(dateLundi, 5) // +5 jours = samedi
}

/**
 * Génère toutes les dates d'une semaine (lundi à samedi)
 */
export function genererDatesSemaine(dateLundi: string): string[] {
  const dates: string[] = []
  for (let i = 0; i < 6; i++) { // Lundi à Samedi
    dates.push(ajouterJours(dateLundi, i))
  }
  return dates
}

/**
 * Calcule le lendemain d'une date pour les repos post-garde
 */
export function calculerLendemain(dateISO: string): string {
  return ajouterJours(dateISO, 1)
}

/**
 * Vérifie si une date est un lundi
 */
export function estLundi(dateISO: string): boolean {
  return getJourSemaine(dateISO) === 'lundi'
}

/**
 * Formate une date ISO en format français
 */
export function formaterDateFR(dateISO: string): string {
  const date = new Date(dateISO)
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

/**
 * Obtient le nom complet du type de garde
 */
export function getNomTypeGarde(typeGarde: TypeGarde): string {
  const noms = {
    'semaine': 'Garde Semaine',
    'samedi': 'Garde Samedi',
    'dimanche': 'Garde Dimanche'
  }
  return noms[typeGarde]
}

/**
 * Obtient le nom de la période
 */
export function getNomPeriode(periode: Periode): string {
  const noms = {
    'matin': 'Matin (8h-13h)',
    'apres_midi': 'Après-midi (13h-18h)',
    'astreinte': 'Astreinte (8h-13h)'
  }
  return noms[periode]
}

