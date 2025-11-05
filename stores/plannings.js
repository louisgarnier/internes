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
        internsCount: 7,
        practicesCount: 2,
        startDate: '2025-01-06',
        internsList: [
          { id: '1', firstName: 'Marie', lastName: 'Dupont', email: 'marie.dupont@email.com', phone: '+33 6 12 34 56 78' },
          { id: '2', firstName: 'Thomas', lastName: 'Martin', email: 'thomas.martin@email.com', phone: '+33 6 23 45 67 89' },
          { id: '3', firstName: 'Sophie', lastName: 'Bernard', email: 'sophie.bernard@email.com', phone: '+33 6 34 56 78 90' },
          { id: '4', firstName: 'Lucas', lastName: 'Petit', email: 'lucas.petit@email.com', phone: '+33 6 45 67 89 01' },
          { id: '5', firstName: 'Emma', lastName: 'Robert', email: 'emma.robert@email.com', phone: '+33 6 56 78 90 12' },
          { id: '6', firstName: 'Hugo', lastName: 'Richard', email: 'hugo.richard@email.com', phone: '+33 6 67 89 01 23' },
          { id: '7', firstName: 'Léa', lastName: 'Durand', email: 'lea.durand@email.com', phone: '+33 6 78 90 12 34' }
        ],
        practicesList: [
          { 
            id: '1', 
            name: 'Cardiologie', 
            requiredInterns: 2,
            schedule: {
              monday: { morning: true, afternoon: true },
              tuesday: { morning: true, afternoon: true },
              wednesday: { morning: true, afternoon: true },
              thursday: { morning: true, afternoon: true },
              friday: { morning: true, afternoon: true },
              saturday: { morning: true, afternoon: false }
            }
          },
          { 
            id: '2', 
            name: 'Urgences', 
            requiredInterns: 1,
            schedule: {
              monday: { morning: true, afternoon: true },
              tuesday: { morning: true, afternoon: true },
              wednesday: { morning: true, afternoon: true },
              thursday: { morning: true, afternoon: true },
              friday: { morning: true, afternoon: true },
              saturday: { morning: false, afternoon: false }
            }
          }
        ],
        unavailabilities: [
          { id: '1', internId: '1', date: '2025-01-15', period: 'morning', reason: 'Formation' },
          { id: '2', internId: '3', date: '2025-01-20', period: 'fullday', reason: 'Congé' }
        ],
        lastModified: new Date('2025-01-15'),
        createdAt: new Date('2025-01-10')
      },
      {
        id: '2',
        name: 'Planning Février 2025',
        status: 'config',
        weeks: 2,
        internsCount: 0,
        practicesCount: 0,
        startDate: '2025-02-03',
        internsList: [],
        practicesList: [],
        unavailabilities: [],
        lastModified: new Date('2025-01-14'),
        createdAt: new Date('2025-01-08')
      },
      {
        id: '3',
        name: 'Planning Décembre 2024',
        status: 'generated',
        weeks: 4,
        internsCount: 0,
        practicesCount: 0,
        startDate: '2024-12-02',
        internsList: [],
        practicesList: [],
        unavailabilities: [],
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
    totalPlannings: (state) => state.plannings.length,

    // Récupérer un planning par son ID
    getPlanningById: (state) => (id) => {
      return state.plannings.find(p => p.id === id)
    }
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

