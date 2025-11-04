<template>
  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px;">
    
    <div style="max-width: 700px; margin: 0 auto;">
      
      <!-- Wizard Card -->
      <div style="background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="font-size: 28px; font-weight: bold; color: white; margin: 0 0 10px 0;">
            Nouveau Planning
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">
            Étape 1 sur 4 : Paramètres Généraux
          </p>
        </div>

        <!-- Progress Bar -->
        <div style="background: #f3f4f6; height: 8px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; width: 25%; transition: width 0.3s;"></div>
        </div>

        <!-- Form Content -->
        <div style="padding: 40px;">
          
          <!-- Nom du Planning -->
          <div style="margin-bottom: 30px;">
            <label style="display: block; font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">
              Nom du Planning <span style="color: #ef4444;">*</span>
            </label>
            <input 
              v-model="formData.name"
              type="text"
              placeholder="Ex: Planning Janvier 2025"
              style="width: 100%; padding: 12px 16px; font-size: 15px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; transition: border-color 0.2s; box-sizing: border-box;"
              @focus="$event.target.style.borderColor = '#667eea'"
              @blur="$event.target.style.borderColor = '#e5e7eb'"
            />
            <p v-if="errors.name" style="color: #ef4444; font-size: 13px; margin: 6px 0 0 0;">
              {{ errors.name }}
            </p>
          </div>

          <!-- Date de Début -->
          <div style="margin-bottom: 30px;">
            <label style="display: block; font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">
              Date de Début <span style="color: #ef4444;">*</span>
              <span style="font-weight: normal; color: #666; font-size: 13px;">(doit être un lundi)</span>
            </label>
            <input 
              v-model="formData.startDate"
              type="date"
              style="width: 100%; padding: 12px 16px; font-size: 15px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; transition: border-color 0.2s; box-sizing: border-box;"
              @focus="$event.target.style.borderColor = '#667eea'"
              @blur="$event.target.style.borderColor = '#e5e7eb'"
              @change="validateDate"
            />
            <p v-if="errors.startDate" style="color: #ef4444; font-size: 13px; margin: 6px 0 0 0;">
              ⚠️ {{ errors.startDate }}
            </p>
            <p v-else-if="formData.startDate && !errors.startDate" style="color: #10b981; font-size: 13px; margin: 6px 0 0 0;">
              ✓ {{ getDateLabel(formData.startDate) }}
            </p>
          </div>

          <!-- Nombre de Semaines -->
          <div style="margin-bottom: 30px;">
            <label style="display: block; font-size: 15px; font-weight: 600; color: #333; margin-bottom: 12px;">
              Nombre de Semaines <span style="color: #ef4444;">*</span>
              <span style="font-weight: normal; color: #666; font-size: 13px;">(1-10)</span>
            </label>
            
            <div style="display: flex; align-items: center; gap: 20px;">
              <input 
                v-model.number="formData.weeks"
                type="range"
                min="1"
                max="10"
                step="1"
                style="flex: 1; height: 6px; border-radius: 3px; outline: none; -webkit-appearance: none; appearance: none; background: #e5e7eb;"
              />
              <div style="min-width: 100px; text-align: center; padding: 8px 16px; background: #667eea; color: white; border-radius: 8px; font-weight: 600; font-size: 16px;">
                {{ formData.weeks }} {{ formData.weeks > 1 ? 'semaines' : 'semaine' }}
              </div>
            </div>
          </div>

          <!-- Info Période -->
          <div v-if="formData.startDate && !errors.startDate" style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 10px; padding: 16px; margin-bottom: 30px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
              ℹ️ Période : Du {{ formatDate(formData.startDate) }} au {{ formatDate(endDate) }}
            </p>
          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 12px; margin-top: 40px;">
            <button 
              @click="cancel"
              style="flex: 1; background: #e5e7eb; color: #374151; font-size: 16px; font-weight: 600; padding: 14px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#d1d5db'"
              @mouseout="$event.target.style.background = '#e5e7eb'"
            >
              Annuler
            </button>
            
            <button 
              @click="nextStep"
              :disabled="!isStepValid"
              :style="{
                flex: 2,
                background: isStepValid ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                padding: '14px',
                border: 'none',
                borderRadius: '8px',
                cursor: isStepValid ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: isStepValid ? 1 : 0.6
              }"
              @mouseover="handleButtonHover"
              @mouseout="handleButtonLeave"
            >
              Suivant → Étape 2
            </button>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const formData = ref({
  name: '',
  startDate: '',
  weeks: 3
})

// Errors
const errors = ref({
  name: '',
  startDate: ''
})

// Valider la date (doit être un lundi)
const validateDate = () => {
  errors.value.startDate = ''
  
  if (!formData.value.startDate) {
    return
  }
  
  const date = new Date(formData.value.startDate + 'T00:00:00')
  const dayOfWeek = date.getDay()
  
  // 1 = Lundi
  if (dayOfWeek !== 1) {
    errors.value.startDate = 'La date de début doit être un lundi'
  }
}

// Label du jour
const getDateLabel = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00')
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  return days[date.getDay()]
}

// Formater la date en français
const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Calculer la date de fin
const endDate = computed(() => {
  if (!formData.value.startDate) return ''
  
  const start = new Date(formData.value.startDate + 'T00:00:00')
  const end = new Date(start)
  end.setDate(end.getDate() + (formData.value.weeks * 7) - 1)
  
  return end.toISOString().split('T')[0]
})

// Validation de l'étape
const isStepValid = computed(() => {
  return formData.value.name.length >= 3 && 
         formData.value.startDate && 
         !errors.value.startDate &&
         formData.value.weeks >= 1 && 
         formData.value.weeks <= 10
})

// Actions
const cancel = () => {
  if (confirm('Êtes-vous sûr de vouloir annuler ? Les données saisies seront perdues.')) {
    router.push('/')
  }
}

const handleButtonHover = (e) => {
  if (isStepValid.value) {
    e.target.style.transform = 'translateY(-2px)'
  }
}

const handleButtonLeave = (e) => {
  if (isStepValid.value) {
    e.target.style.transform = 'translateY(0)'
  }
}

const nextStep = () => {
  // Valider le nom
  if (formData.value.name.length < 3) {
    errors.value.name = 'Le nom doit contenir au moins 3 caractères'
    return
  }
  
  // Valider la date
  validateDate()
  if (errors.value.startDate) {
    return
  }
  
  if (isStepValid.value) {
    // Pour l'instant, juste une alerte
    // Plus tard, on passera à l'étape 2
    alert(`✅ Étape 1 validée !\n\nNom: ${formData.value.name}\nDate: ${formatDate(formData.value.startDate)}\nSemaines: ${formData.value.weeks}\n\nProchaine étape : Ajouter les internes (à développer)`)
  }
}
</script>

<style>
/* Style pour le slider (webkit) */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

/* Style pour le slider (Firefox) */
input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}
</style>

