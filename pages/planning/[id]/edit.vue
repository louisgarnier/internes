<template>
  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    
    <!-- Header -->
    <header style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px 0; position: sticky; top: 0; z-index: 100;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #667eea;">
            ✏️ Modifier le Planning
          </h1>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">
            {{ planning?.name || 'Chargement...' }}
          </p>
        </div>
        <button 
          @click="goBack"
          style="background: #64748b; color: white; font-size: 14px; font-weight: 500; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
          @mouseover="$event.target.style.background = '#475569'"
          @mouseout="$event.target.style.background = '#64748b'"
        >
          ← Retour
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main style="max-width: 1000px; margin: 40px auto; padding: 0 20px;">
      
      <!-- Alert si planning généré -->
      <div v-if="planning?.status === 'generated'" style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 20px; margin-bottom: 30px; display: flex; align-items: start; gap: 12px;">
        <span style="font-size: 24px;">⚠️</span>
        <div style="flex: 1;">
          <p style="margin: 0; font-weight: 600; color: #92400e; font-size: 15px;">Planning déjà généré</p>
          <p style="margin: 5px 0 0 0; color: #92400e; font-size: 13px;">
            Les modifications seront prises en compte, mais vous devrez régénérer le planning pour appliquer les changements.
          </p>
        </div>
      </div>

      <!-- Section 1: Paramètres Généraux -->
      <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden;">
        <div 
          @click="toggleSection(1)"
          style="padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-bottom: 1px solid #e2e8f0;"
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">⚙️</span>
            <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
              1. Paramètres Généraux
            </h2>
          </div>
          <span style="font-size: 20px; transition: transform 0.3s;" :style="{ transform: openSections[1] ? 'rotate(180deg)' : 'rotate(0deg)' }">
            ▼
          </span>
        </div>
        
        <div v-show="openSections[1]" style="padding: 30px;">
          <div style="display: grid; gap: 20px;">
            
            <!-- Nom du planning -->
            <div>
              <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
                Nom du planning *
              </label>
              <input 
                v-model="formData.name"
                type="text"
                placeholder="Ex: Planning Novembre 2025"
                style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; transition: all 0.2s;"
                @focus="$event.target.style.borderColor = '#667eea'"
                @blur="$event.target.style.borderColor = '#e2e8f0'"
              >
            </div>

            <!-- Date de début -->
            <div>
              <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
                Date de début (Lundi) *
              </label>
              <input 
                v-model="formData.startDate"
                type="date"
                style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; transition: all 0.2s;"
                @focus="$event.target.style.borderColor = '#667eea'"
                @blur="$event.target.style.borderColor = '#e2e8f0'"
              >
              <p v-if="!isMonday(formData.startDate)" style="margin: 5px 0 0 0; color: #ef4444; font-size: 13px;">
                ⚠️ La date doit être un lundi
              </p>
            </div>

            <!-- Nombre de semaines -->
            <div>
              <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
                Nombre de semaines *
              </label>
              <input 
                v-model.number="formData.weeks"
                type="number"
                min="1"
                max="10"
                style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; transition: all 0.2s;"
                @focus="$event.target.style.borderColor = '#667eea'"
                @blur="$event.target.style.borderColor = '#e2e8f0'"
              >
            </div>

          </div>
        </div>
      </div>

      <!-- Section 2: Internes -->
      <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden;">
        <div 
          @click="toggleSection(2)"
          style="padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-bottom: 1px solid #e2e8f0;"
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">👥</span>
            <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
              2. Internes ({{ formData.internsList.length }})
            </h2>
          </div>
          <span style="font-size: 20px; transition: transform 0.3s;" :style="{ transform: openSections[2] ? 'rotate(180deg)' : 'rotate(0deg)' }">
            ▼
          </span>
        </div>
        
        <div v-show="openSections[2]" style="padding: 30px;">
          
          <!-- Liste des internes -->
          <div v-if="formData.internsList.length > 0" style="margin-bottom: 20px;">
            <div v-for="intern in formData.internsList" :key="intern.id" 
              style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 10px;">
              <span style="font-weight: 500; color: #1e293b;">
                {{ intern.firstName }} {{ intern.lastName }}
              </span>
              <button 
                @click="deleteIntern(intern.id)"
                style="background: #ef4444; color: white; font-size: 12px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                @mouseover="$event.target.style.background = '#dc2626'"
                @mouseout="$event.target.style.background = '#ef4444'"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>

          <div v-else style="padding: 30px; text-align: center; color: #94a3b8; font-size: 14px;">
            Aucun interne ajouté
          </div>

          <!-- Bouton ajouter -->
          <button 
            @click="openAddInternModal"
            style="width: 100%; background: #10b981; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
            @mouseover="$event.target.style.background = '#059669'"
            @mouseout="$event.target.style.background = '#10b981'"
          >
            ➕ Ajouter un interne
          </button>

        </div>
      </div>

      <!-- Section 3: Practices -->
      <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden;">
        <div 
          @click="toggleSection(3)"
          style="padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-bottom: 1px solid #e2e8f0;"
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">🏥</span>
            <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
              3. Practices ({{ formData.practicesList.length }})
            </h2>
          </div>
          <span style="font-size: 20px; transition: transform 0.3s;" :style="{ transform: openSections[3] ? 'rotate(180deg)' : 'rotate(0deg)' }">
            ▼
          </span>
        </div>
        
        <div v-show="openSections[3]" style="padding: 30px;">
          
          <!-- Liste des practices -->
          <div v-if="formData.practicesList.length > 0" style="margin-bottom: 20px;">
            <div v-for="practice in formData.practicesList" :key="practice.id" 
              style="padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <div>
                  <span style="font-weight: 600; color: #1e293b; font-size: 15px;">
                    {{ practice.name }}
                  </span>
                  <span style="margin-left: 10px; background: #667eea; color: white; font-size: 12px; padding: 3px 8px; border-radius: 4px;">
                    {{ practice.requiredInterns }} interne{{ practice.requiredInterns > 1 ? 's' : '' }}
                  </span>
                </div>
                <button 
                  @click="deletePractice(practice.id)"
                  style="background: #ef4444; color: white; font-size: 12px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                  @mouseover="$event.target.style.background = '#dc2626'"
                  @mouseout="$event.target.style.background = '#ef4444'"
                >
                  🗑️
                </button>
              </div>
              <div style="font-size: 13px; color: #64748b;">
                {{ getPracticeScheduleSummary(practice) }}
              </div>
            </div>
          </div>

          <div v-else style="padding: 30px; text-align: center; color: #94a3b8; font-size: 14px;">
            Aucune practice ajoutée
          </div>

          <!-- Bouton ajouter -->
          <button 
            @click="openAddPracticeModal"
            style="width: 100%; background: #10b981; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
            @mouseover="$event.target.style.background = '#059669'"
            @mouseout="$event.target.style.background = '#10b981'"
          >
            ➕ Ajouter une practice
          </button>

        </div>
      </div>

      <!-- Section 4: Empêchements -->
      <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; overflow: hidden;">
        <div 
          @click="toggleSection(4)"
          style="padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-bottom: 1px solid #e2e8f0;"
        >
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">🚫</span>
            <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1e293b;">
              4. Empêchements ({{ formData.unavailabilities.length }})
            </h2>
          </div>
          <span style="font-size: 20px; transition: transform 0.3s;" :style="{ transform: openSections[4] ? 'rotate(180deg)' : 'rotate(0deg)' }">
            ▼
          </span>
        </div>
        
        <div v-show="openSections[4]" style="padding: 30px;">
          
          <!-- Liste des empêchements -->
          <div v-if="formData.unavailabilities.length > 0" style="margin-bottom: 20px;">
            <div v-for="unavail in formData.unavailabilities" :key="unavail.id" 
              style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #fef3c7; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
              <div>
                <span style="font-weight: 600; color: #92400e;">
                  {{ getInternName(unavail.internId) }}
                </span>
                <span style="margin-left: 10px; color: #92400e; font-size: 14px;">
                  • {{ formatDate(unavail.date) }} ({{ getPeriodLabel(unavail.period) }})
                </span>
                <span v-if="unavail.reason" style="margin-left: 10px; color: #92400e; font-size: 13px; font-style: italic;">
                  - {{ unavail.reason }}
                </span>
              </div>
              <button 
                @click="deleteUnavailability(unavail.id)"
                style="background: #ef4444; color: white; font-size: 12px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                @mouseover="$event.target.style.background = '#dc2626'"
                @mouseout="$event.target.style.background = '#ef4444'"
              >
                🗑️
              </button>
            </div>
          </div>

          <div v-else style="padding: 30px; text-align: center; color: #94a3b8; font-size: 14px;">
            Aucun empêchement déclaré
          </div>

          <!-- Bouton ajouter -->
          <button 
            @click="openAddUnavailabilityModal"
            style="width: 100%; background: #10b981; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
            @mouseover="$event.target.style.background = '#059669'"
            @mouseout="$event.target.style.background = '#10b981'"
          >
            ➕ Ajouter un empêchement
          </button>

        </div>
      </div>

      <!-- Bouton Sauvegarder -->
      <div style="margin-top: 40px; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
        <button 
          @click="saveChanges"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 18px; font-weight: 600; padding: 16px 40px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s;"
          @mouseover="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'"
          @mouseout="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'"
        >
          💾 Sauvegarder les modifications
        </button>
        
        <button 
          v-if="planning?.status === 'generated'"
          @click="regeneratePlanning"
          style="margin-left: 15px; background: #f59e0b; color: white; font-size: 16px; font-weight: 600; padding: 16px 32px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); transition: all 0.3s;"
          @mouseover="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)'"
          @mouseout="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)'"
        >
          🔄 Régénérer le planning
        </button>
      </div>

    </main>

    <!-- Modal Ajouter Interne (identique au wizard) -->
    <div v-if="showInternModal" 
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;"
      @click.self="closeInternModal">
      <div style="background: white; border-radius: 12px; padding: 30px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1e293b;">
          ➕ Ajouter un interne
        </h3>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
            Prénom *
          </label>
          <input 
            v-model="internForm.firstName"
            type="text"
            placeholder="Ex: Jean"
            style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;"
          >
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
            Nom *
          </label>
          <input 
            v-model="internForm.lastName"
            type="text"
            placeholder="Ex: Dupont"
            style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;"
          >
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
            Email
          </label>
          <input 
            v-model="internForm.email"
            type="email"
            placeholder="Ex: jean.dupont@email.com"
            style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;"
          >
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 8px; font-size: 14px;">
            Téléphone
          </label>
          <input 
            v-model="internForm.phone"
            type="tel"
            placeholder="Ex: +33 6 12 34 56 78"
            style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px;"
          >
        </div>

        <div style="display: flex; gap: 10px; margin-top: 30px;">
          <button 
            @click="saveIntern"
            style="flex: 1; background: #10b981; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
          >
            ✓ Ajouter
          </button>
          <button 
            @click="closeInternModal"
            style="flex: 1; background: #64748b; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
          >
            ✕ Annuler
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Ajouter Practice (simplifié pour l'instant) -->
    <div v-if="showPracticeModal" 
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;"
      @click.self="closePracticeModal">
      <div style="background: white; border-radius: 12px; padding: 30px; max-width: 500px; width: 90%;">
        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1e293b;">
          ➕ Ajouter une practice
        </h3>
        
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
          Formulaire complet à implémenter (tâche f2-2-5)
        </p>

        <button 
          @click="closePracticeModal"
          style="width: 100%; background: #64748b; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
        >
          ✕ Fermer
        </button>
      </div>
    </div>

    <!-- Modal Ajouter Empêchement (simplifié pour l'instant) -->
    <div v-if="showUnavailabilityModal" 
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;"
      @click.self="closeUnavailabilityModal">
      <div style="background: white; border-radius: 12px; padding: 30px; max-width: 500px; width: 90%;">
        <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #1e293b;">
          ➕ Ajouter un empêchement
        </h3>
        
        <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
          Formulaire complet à implémenter (tâche f2-2-6)
        </p>

        <button 
          @click="closeUnavailabilityModal"
          style="width: 100%; background: #64748b; color: white; font-size: 15px; font-weight: 500; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
        >
          ✕ Fermer
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { usePlanningsStore } from '~/stores/plannings'

const route = useRoute()
const planningsStore = usePlanningsStore()

// ID du planning à modifier
const planningId = route.params.id

// Planning actuel
const planning = computed(() => planningsStore.getPlanningById(planningId))

// Données du formulaire (copie des données du planning)
const formData = ref({
  name: '',
  startDate: '',
  weeks: 1,
  internsList: [],
  practicesList: [],
  unavailabilities: []
})

// Sections ouvertes/fermées (accordéon)
const openSections = ref({
  1: true,
  2: false,
  3: false,
  4: false
})

// Modales
const showInternModal = ref(false)
const showPracticeModal = ref(false)
const showUnavailabilityModal = ref(false)

// Formulaires modales
const internForm = ref({ firstName: '', lastName: '', email: '', phone: '' })

// Charger les données du planning au montage
onMounted(() => {
  if (!planning.value) {
    alert('Planning introuvable !')
    navigateTo('/')
    return
  }

  // Copier les données dans formData
  formData.value = {
    name: planning.value.name,
    startDate: planning.value.startDate,
    weeks: planning.value.weeks,
    internsList: JSON.parse(JSON.stringify(planning.value.internsList || [])),
    practicesList: JSON.parse(JSON.stringify(planning.value.practicesList || [])),
    unavailabilities: JSON.parse(JSON.stringify(planning.value.unavailabilities || []))
  }
})

// Méthodes
const goBack = () => {
  navigateTo(`/planning/${planningId}`)
}

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

const isMonday = (dateString) => {
  if (!dateString) return true
  const date = new Date(dateString + 'T00:00:00')
  return date.getDay() === 1
}

// Internes
const openAddInternModal = () => {
  internForm.value = { firstName: '', lastName: '', email: '', phone: '' }
  showInternModal.value = true
}

const closeInternModal = () => {
  showInternModal.value = false
}

const saveIntern = () => {
  if (!internForm.value.firstName || !internForm.value.lastName) {
    alert('Veuillez remplir tous les champs')
    return
  }

  formData.value.internsList.push({
    id: Date.now().toString(),
    firstName: internForm.value.firstName,
    lastName: internForm.value.lastName,
    email: internForm.value.email,
    phone: internForm.value.phone
  })

  closeInternModal()
}

const deleteIntern = (id) => {
  if (confirm('Supprimer cet interne ?')) {
    formData.value.internsList = formData.value.internsList.filter(i => i.id !== id)
  }
}

// Practices
const openAddPracticeModal = () => {
  showPracticeModal.value = true
}

const closePracticeModal = () => {
  showPracticeModal.value = false
}

const deletePractice = (id) => {
  if (confirm('Supprimer cette practice ?')) {
    formData.value.practicesList = formData.value.practicesList.filter(p => p.id !== id)
  }
}

const getPracticeScheduleSummary = (practice) => {
  if (!practice.schedule) return 'Aucun horaire défini'
  
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const activeDays = []
  
  days.forEach((day, index) => {
    const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][index]
    const periods = []
    if (practice.schedule[dayKey]?.morning) periods.push('matin')
    if (practice.schedule[dayKey]?.afternoon) periods.push('après-midi')
    if (periods.length > 0) {
      activeDays.push(`${day} (${periods.join(', ')})`)
    }
  })
  
  return activeDays.length > 0 ? activeDays.join(' • ') : 'Aucun horaire défini'
}

// Empêchements
const openAddUnavailabilityModal = () => {
  showUnavailabilityModal.value = true
}

const closeUnavailabilityModal = () => {
  showUnavailabilityModal.value = false
}

const deleteUnavailability = (id) => {
  if (confirm('Supprimer cet empêchement ?')) {
    formData.value.unavailabilities = formData.value.unavailabilities.filter(u => u.id !== id)
  }
}

const getInternName = (internId) => {
  const intern = formData.value.internsList.find(i => i.id === internId)
  return intern ? `${intern.firstName} ${intern.lastName}` : 'Inconnu'
}

const getPeriodLabel = (period) => {
  const labels = {
    'morning': 'Matin',
    'afternoon': 'Après-midi',
    'fullday': 'Journée complète'
  }
  return labels[period] || period
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

// Sauvegarde (à implémenter dans f2-2-7)
const saveChanges = () => {
  alert('✅ Sauvegarde à implémenter dans f2-2-7\n\nDonnées actuelles :\n' + 
    `- Nom: ${formData.value.name}\n` +
    `- Date début: ${formData.value.startDate}\n` +
    `- Semaines: ${formData.value.weeks}\n` +
    `- Internes: ${formData.value.internsList.length}\n` +
    `- Practices: ${formData.value.practicesList.length}\n` +
    `- Empêchements: ${formData.value.unavailabilities.length}`)
}

// Régénération (à implémenter dans f2-2-8)
const regeneratePlanning = () => {
  alert('🔄 Régénération à implémenter dans f2-2-8')
}
</script>

