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
              saturday: { morning: false, afternoon: false }
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
        name: 'Planning Test Complet 2025',
        status: 'config',
        weeks: 4,
        internsCount: 8,
        practicesCount: 7,
        startDate: '2025-03-03', // Lundi 3 mars 2025
        internsList: [
          { id: 'int1', firstName: 'Alice', lastName: 'Moreau', email: 'alice.moreau@email.com', phone: '+33 6 11 11 11 11' },
          { id: 'int2', firstName: 'Baptiste', lastName: 'Lefebvre', email: 'baptiste.lefebvre@email.com', phone: '+33 6 22 22 22 22' },
          { id: 'int3', firstName: 'Clara', lastName: 'Rousseau', email: 'clara.rousseau@email.com', phone: '+33 6 33 33 33 33' },
          { id: 'int4', firstName: 'David', lastName: 'Simon', email: 'david.simon@email.com', phone: '+33 6 44 44 44 44' },
          { id: 'int5', firstName: 'Élise', lastName: 'Laurent', email: 'elise.laurent@email.com', phone: '+33 6 55 55 55 55' },
          { id: 'int6', firstName: 'Félix', lastName: 'Michel', email: 'felix.michel@email.com', phone: '+33 6 66 66 66 66' },
          { id: 'int7', firstName: 'Gabrielle', lastName: 'Garcia', email: 'gabrielle.garcia@email.com', phone: '+33 6 77 77 77 77' },
          { id: 'int8', firstName: 'Hugo', lastName: 'Fontaine', email: 'hugo.fontaine@email.com', phone: '+33 6 88 88 88 88' }
        ],
        practicesList: [
          { 
            id: 'p1', 
            name: 'Médecine Générale', 
            requiredInterns: 2,
            schedule: {
              // Lun-Ven uniquement (Samedi matin = Astreinte automatique)
              monday: { morning: true, afternoon: true },
              tuesday: { morning: true, afternoon: true },
              wednesday: { morning: true, afternoon: true },
              thursday: { morning: true, afternoon: true },
              friday: { morning: true, afternoon: true },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p2', 
            name: 'Chirurgie', 
            requiredInterns: 1,
            schedule: {
              // Lun-Ven matin uniquement
              monday: { morning: true, afternoon: false },
              tuesday: { morning: true, afternoon: false },
              wednesday: { morning: true, afternoon: false },
              thursday: { morning: true, afternoon: false },
              friday: { morning: true, afternoon: false },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p3', 
            name: 'Pédiatrie', 
            requiredInterns: 2,
            schedule: {
              // Lun-Ven après-midi uniquement
              monday: { morning: false, afternoon: true },
              tuesday: { morning: false, afternoon: true },
              wednesday: { morning: false, afternoon: true },
              thursday: { morning: false, afternoon: true },
              friday: { morning: false, afternoon: true },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p4', 
            name: 'Radiologie', 
            requiredInterns: 1,
            schedule: {
              // Lun, Mer, Ven (matin + après-midi)
              monday: { morning: true, afternoon: true },
              tuesday: { morning: false, afternoon: false },
              wednesday: { morning: true, afternoon: true },
              thursday: { morning: false, afternoon: false },
              friday: { morning: true, afternoon: true },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p5', 
            name: 'Laboratoire', 
            requiredInterns: 1,
            schedule: {
              // Mar, Jeu uniquement (Samedi matin = Astreinte automatique)
              monday: { morning: false, afternoon: false },
              tuesday: { morning: true, afternoon: false },
              wednesday: { morning: false, afternoon: false },
              thursday: { morning: true, afternoon: false },
              friday: { morning: false, afternoon: false },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p6', 
            name: 'Urgences', 
            requiredInterns: 2,
            schedule: {
              // Lun-Ven sauf mercredi (Samedi matin = Astreinte automatique)
              monday: { morning: true, afternoon: true },
              tuesday: { morning: true, afternoon: true },
              wednesday: { morning: false, afternoon: false },
              thursday: { morning: true, afternoon: true },
              friday: { morning: true, afternoon: true },
              saturday: { morning: false, afternoon: false }
            }
          },
          { 
            id: 'p7', 
            name: 'Consultation Externe', 
            requiredInterns: 1,
            schedule: {
              // Mar, Mer, Jeu après-midi uniquement
              monday: { morning: false, afternoon: false },
              tuesday: { morning: false, afternoon: true },
              wednesday: { morning: false, afternoon: true },
              thursday: { morning: false, afternoon: true },
              friday: { morning: false, afternoon: false },
              saturday: { morning: false, afternoon: false }
            }
          }
        ],
        unavailabilities: [
          { id: 'u1', internId: 'int2', date: '2025-03-10', period: 'morning', reason: 'RDV médical' },
          { id: 'u2', internId: 'int5', date: '2025-03-17', period: 'fullday', reason: 'Formation obligatoire' },
          { id: 'u3', internId: 'int7', date: '2025-03-24', period: 'afternoon', reason: 'Démarche administrative' }
        ],
        lastModified: new Date('2025-02-01'),
        createdAt: new Date('2025-02-01')
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
        Object.assign(planning, updates, { lastModified: updates.lastModified || new Date() })
        console.log('✅ Planning mis à jour dans le store:', planning.id, 'Status:', planning.status)
      }
    }
  }
})

