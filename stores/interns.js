import { defineStore } from 'pinia'

export const useInternsStore = defineStore('interns', {
  state: () => ({
    // Liste globale des internes (contacts)
    allInterns: [
      // Quelques internes de test
      {
        id: '1',
        firstName: 'Martin',
        lastName: 'Dupont',
        email: 'martin.dupont@hospital.fr',
        phone: '06 12 34 56 78'
      },
      {
        id: '2',
        firstName: 'Sophie',
        lastName: 'Bernard',
        email: 'sophie.bernard@hospital.fr',
        phone: '06 23 45 67 89'
      }
    ]
  }),

  getters: {
    // Obtenir un interne par ID
    getInternById: (state) => (id) => {
      return state.allInterns.find(intern => intern.id === id)
    },

    // Rechercher des internes
    searchInterns: (state) => (query) => {
      if (!query) return state.allInterns
      
      const lowerQuery = query.toLowerCase()
      return state.allInterns.filter(intern => 
        intern.firstName.toLowerCase().includes(lowerQuery) ||
        intern.lastName.toLowerCase().includes(lowerQuery) ||
        intern.email?.toLowerCase().includes(lowerQuery)
      )
    }
  },

  actions: {
    // Ajouter un nouvel interne
    addIntern(intern) {
      const newIntern = {
        ...intern,
        id: Date.now().toString() // ID unique basé sur timestamp
      }
      this.allInterns.push(newIntern)
      return newIntern
    },

    // Mettre à jour un interne existant
    updateIntern(id, updates) {
      const index = this.allInterns.findIndex(i => i.id === id)
      if (index !== -1) {
        this.allInterns[index] = { ...this.allInterns[index], ...updates }
      }
    },

    // Supprimer un interne (attention : vérifier qu'il n'est pas utilisé)
    deleteIntern(id) {
      const index = this.allInterns.findIndex(i => i.id === id)
      if (index !== -1) {
        this.allInterns.splice(index, 1)
      }
    },

    // Vérifier si un interne existe déjà (même nom/prénom)
    internExists(firstName, lastName, excludeId = null) {
      return this.allInterns.some(intern => 
        intern.firstName.toLowerCase() === firstName.toLowerCase() &&
        intern.lastName.toLowerCase() === lastName.toLowerCase() &&
        intern.id !== excludeId
      )
    }
  }
})

