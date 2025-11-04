import { defineStore } from 'pinia'

export const usePlanningsStore = defineStore('plannings', {
  state: () => ({
    plannings: [
      // Données de test
      {
        id: '1',
        name: 'Planning Janvier 2025',
        status: 'generated', // 'generated', 'config', 'error'
        weeks: 3,
        interns: 7,
        practices: 8,
        lastModified: new Date('2025-01-15'),
        createdAt: new Date('2025-01-10')
      },
      {
        id: '2',
        name: 'Planning Février 2025',
        status: 'config',
        weeks: 2,
        interns: 7,
        practices: 8,
        lastModified: new Date('2025-01-14'),
        createdAt: new Date('2025-01-08')
      },
      {
        id: '3',
        name: 'Planning Décembre 2024',
        status: 'generated',
        weeks: 4,
        interns: 6,
        practices: 8,
        lastModified: new Date('2024-12-20'),
        createdAt: new Date('2024-12-01')
      }
    ]
  }),

  getters: {
    // Tri par date de modification (plus récent en premier)
    sortedPlannings: (state) => {
      return [...state.plannings].sort((a, b) => 
        b.lastModified - a.lastModified
      )
    },

    // Nombre total de plannings
    totalPlannings: (state) => state.plannings.length
  },

  actions: {
    // Ajouter un nouveau planning
    addPlanning(planning) {
      this.plannings.push({
        ...planning,
        id: Date.now().toString(),
        createdAt: new Date(),
        lastModified: new Date()
      })
    },

    // Supprimer un planning
    deletePlanning(id) {
      const index = this.plannings.findIndex(p => p.id === id)
      if (index !== -1) {
        this.plannings.splice(index, 1)
      }
    },

    // Dupliquer un planning
    duplicatePlanning(id) {
      const planning = this.plannings.find(p => p.id === id)
      if (planning) {
        this.addPlanning({
          ...planning,
          name: `${planning.name} (copie)`,
          status: 'config'
        })
      }
    },

    // Mettre à jour un planning
    updatePlanning(id, updates) {
      const planning = this.plannings.find(p => p.id === id)
      if (planning) {
        Object.assign(planning, updates, { lastModified: new Date() })
      }
    }
  }
})

