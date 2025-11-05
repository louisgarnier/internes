<template>
  <div style="min-height: 100vh; background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%); padding: 40px;">
    
    <!-- Header -->
    <header style="background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-radius: 12px; margin-bottom: 30px;">
      <div style="max-width: 1200px; margin: 0 auto; padding: 20px 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <div>
            <h1 style="font-size: 28px; font-weight: bold; color: #2d3748; margin: 0 0 8px 0;">
              📋 {{ planning?.name || 'Planning' }}
            </h1>
            <p v-if="planning" style="font-size: 15px; color: #666; margin: 0;">
              {{ planning.weeks }} semaine{{ planning.weeks > 1 ? 's' : '' }} • 
              {{ planning.internsCount }} internes • 
              {{ planning.practicesCount }} practices
            </p>
          </div>
          <button 
            @click="navigateTo('/')"
            style="background: #e5e7eb; color: #374151; font-size: 15px; font-weight: 600; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
            @mouseover="$event.target.style.background = '#d1d5db'"
            @mouseout="$event.target.style.background = '#e5e7eb'"
          >
            ← Retour
          </button>
        </div>
        
        <!-- Badge statut -->
        <div v-if="planning">
          <span :style="getStatusBadgeStyle(planning.status)">
            {{ getStatusLabel(planning.status) }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main style="max-width: 1200px; margin: 0 auto;">
      
      <!-- Planning introuvable -->
      <div v-if="!planning" style="text-align: center; padding: 80px 40px; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <div style="font-size: 60px; margin-bottom: 20px;">❌</div>
        <h2 style="font-size: 24px; font-weight: bold; color: #2d3748; margin-bottom: 15px;">
          Planning introuvable
        </h2>
        <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
          Le planning demandé n'existe pas ou a été supprimé.
        </p>
        <button 
          @click="navigateTo('/')"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; font-weight: 600; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer;"
        >
          Retour au dashboard
        </button>
      </div>

      <!-- Planning trouvé -->
      <div v-else>
        
        <!-- Interface Génération -->
        <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h2 style="font-size: 20px; font-weight: 600; color: #333; margin: 0 0 15px 0;">
            🚀 Génération du Planning
          </h2>
          <p style="font-size: 14px; color: #666; margin: 0 0 25px 0;">
            Génère automatiquement les gardes, repos, et assignations aux practices.
          </p>
          
          <!-- Options de génération -->
          <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="optionGeneration" 
                value="toutes"
                style="width: 20px; height: 20px; cursor: pointer;"
              />
              <span style="font-size: 15px; color: #333; font-weight: 500;">
                Générer toutes les semaines (1 à {{ planning.weeks }})
              </span>
            </label>
            
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="optionGeneration" 
                value="specifique"
                style="width: 20px; height: 20px; cursor: pointer;"
              />
              <span style="font-size: 15px; color: #333; font-weight: 500;">
                Générer une semaine spécifique :
              </span>
            </label>
            
            <div v-if="optionGeneration === 'specifique'" style="margin-left: 32px; margin-top: 10px;">
              <select 
                v-model="semaineSelectionnee"
                style="padding: 8px 12px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 6px; outline: none; cursor: pointer; background: white;"
                @focus="$event.target.style.borderColor = '#667eea'"
                @blur="$event.target.style.borderColor = '#e5e7eb'"
              >
                <option v-for="semaine in semaines" :key="semaine.numero" :value="semaine.numero">
                  Semaine {{ semaine.numero }} ({{ formatDate(semaine.dateDebut) }} - {{ formatDate(semaine.dateFin) }})
                </option>
              </select>
            </div>
          </div>
          
          <!-- Bouton Générer -->
          <button 
            @click="genererPlanning"
            :style="{
              background: planning.status === 'generated' ? '#f97316' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              padding: '14px 30px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }"
            @mouseover="handleGenerateHover"
            @mouseout="handleGenerateLeave"
          >
            {{ planning.status === 'generated' ? '🔄 Régénérer' : '🚀 Générer' }}
          </button>
          <p v-if="planning.status === 'generated'" style="margin: 10px 0 0 0; color: #f97316; font-size: 13px; font-style: italic;">
            ⚠️ La régénération écrasera le planning existant
          </p>
        </div>

        <!-- Tableau hebdomadaire -->
        <div 
          v-for="semaine in semaines" 
          :key="semaine.numero"
          style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"
        >
          <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0 0 20px 0;">
            📅 Semaine {{ semaine.numero }} : Du {{ formatDate(semaine.dateDebut) }} au {{ formatDate(semaine.dateFin) }}
          </h3>

          <!-- Tableau -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; border: 2px solid #e5e7eb; border-radius: 8px;">
              <!-- Header -->
              <thead>
                <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                  <th style="padding: 12px; text-align: left; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Interne
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Lundi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Mardi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Mercredi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Jeudi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Vendredi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; border-right: 1px solid rgba(255,255,255,0.2);">
                    Samedi
                  </th>
                  <th style="padding: 12px; text-align: center; font-weight: 600;">
                    Dimanche
                  </th>
                </tr>
              </thead>
              <!-- Body -->
              <tbody>
                <tr 
                  v-for="(interne, index) in planning.internsList" 
                  :key="interne.id"
                  :style="{ background: index % 2 === 0 ? '#f9fafb' : 'white' }"
                >
                  <td style="padding: 16px; font-weight: 600; color: #333; border-right: 1px solid #e5e7eb;">
                    {{ interne.firstName }} {{ interne.lastName }}
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; border-right: 1px solid #e5e7eb; color: #999; font-size: 13px;">
                    -
                  </td>
                  <td style="padding: 16px; text-align: center; color: #999; font-size: 13px;">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Message si planning non généré -->
          <div v-if="planning.status !== 'generated'" style="text-align: center; margin-top: 20px; padding: 20px; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 10px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
              ℹ️ Cliquez sur "Générer le Planning" ci-dessus pour remplir automatiquement ce tableau
            </p>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanningsStore } from '~/stores/plannings'
import { generatePlanning } from '~/utils/generation'

const route = useRoute()
const planningsStore = usePlanningsStore()

// Récupérer le planning depuis le store
const planningId = route.params.id
const planning = computed(() => {
  return planningsStore.plannings.find(p => p.id === planningId)
})

// Options de génération
const optionGeneration = ref('toutes')
const semaineSelectionnee = ref(1)

// Générer les semaines
const semaines = computed(() => {
  if (!planning.value) return []
  
  const result = []
  const startDate = new Date(planning.value.startDate)
  
  for (let i = 0; i < planning.value.weeks; i++) {
    const dateDebut = new Date(startDate)
    dateDebut.setDate(dateDebut.getDate() + (i * 7))
    
    const dateFin = new Date(dateDebut)
    dateFin.setDate(dateFin.getDate() + 5) // Samedi
    
    result.push({
      numero: i + 1,
      dateDebut: dateDebut.toISOString().split('T')[0],
      dateFin: dateFin.toISOString().split('T')[0]
    })
  }
  
  return result
})

// Helpers
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

const getStatusLabel = (status) => {
  const labels = {
    'config': '⏳ Configuration',
    'generated': '✅ Généré',
    'error': '❌ Erreur'
  }
  return labels[status] || status
}

const getStatusBadgeStyle = (status) => {
  const styles = {
    'config': 'background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block;',
    'generated': 'background: #d1fae5; color: #065f46; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block;',
    'error': 'background: #fee2e2; color: #991b1b; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block;'
  }
  return styles[status] || styles.config
}

// Action Générer
const genererPlanning = () => {
  console.log('🚀 Génération demandée')
  
  // Si planning déjà généré, demander confirmation
  if (planning.value?.status === 'generated') {
    const confirmation = confirm('⚠️ Ce planning est déjà généré.\n\nLa régénération écrasera toutes les données existantes (gardes, repos, practices, OFFs).\n\nVoulez-vous continuer ?')
    if (!confirmation) {
      console.log('❌ Régénération annulée par l\'utilisateur')
      return
    }
    console.log('✅ Régénération confirmée')
  }
  
  // Déterminer quelles semaines générer
  const weekNumbers = optionGeneration.value === 'toutes' 
    ? null // null = toutes les semaines
    : [semaineSelectionnee.value] // Array avec une seule semaine
  
  try {
    // Appeler la fonction de génération
    const result = generatePlanning(planning.value, weekNumbers)
    
    console.log('✅ Génération terminée:', result)
    
    // Afficher le résultat
    let message = '✅ ' + result.message + '\n\n'
    message += `📊 Détails du planning :\n`
    message += `- Planning : ${planning.value.name}\n`
    message += `- Période : ${formatDate(planning.value.startDate)} → ${result.weeks.length} semaine(s)\n`
    message += `- Internes : ${planning.value.internsList.length}\n`
    message += `- Practices : ${planning.value.practicesList.length}\n`
    message += `- Empêchements : ${planning.value.unavailabilities?.length || 0}\n`
    message += `- Slots totaux : ${result.weeks.reduce((sum, w) => sum + w.stats.slotsTotal, 0)}\n\n`
    
    message += '📋 Semaines générées :\n'
    result.weeks.forEach(week => {
      message += `  • Semaine ${week.weekNumber} (${formatDate(week.startDate)} - ${formatDate(week.endDate)})\n`
      message += `    - ${week.stats.slotsTotal} slots de travail\n`
      message += `    - ${week.stats.gardesAttribuees}/7 gardes attribuées\n`
      
      // Afficher les gardes attribuées
      if (week.gardes.dimanche) {
        message += `    - 🌙 Garde Dimanche : ${week.gardes.dimanche.interneName}\n`
      }
    })
    
    // Stats globales si disponibles
    if (result.globalStats) {
      message += `\n📊 Statistiques d'équilibre :\n`
      const gardesStats = result.globalStats.gardesParInterne
      Object.keys(gardesStats).forEach(interneId => {
        const intern = planning.value.internsList.find(i => i.id === interneId)
        if (intern) {
          const stats = gardesStats[interneId]
          message += `  • ${intern.firstName} ${intern.lastName} : ${stats.total} garde(s)`
          if (stats.dimanche > 0) message += ` (dont ${stats.dimanche} dimanche)`
          message += `\n`
        }
      })
    }
    
    message += '\n⏳ Prochaines phases (en développement) :\n'
    message += '  1. Attribution 5 gardes semaine (Lun-Ven)\n'
    message += '  2. Attribution garde Samedi\n'
    message += '  3. Calcul des repos post-garde\n'
    message += '  4. Attribution aux practices (priorité)\n'
    message += '  5. Attribution des OFF (bonus)\n'
    message += '  6. Détection des conflits\n'
    message += '  7. Calcul du score d\'équilibre'
    
    alert(message)
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error)
    alert('❌ Erreur lors de la génération du planning.\n\nDétails : ' + error.message)
  }
}

const handleGenerateHover = (e) => {
  e.target.style.transform = 'translateY(-2px)'
  if (planning.value?.status === 'generated') {
    e.target.style.boxShadow = '0 8px 20px rgba(249, 115, 22, 0.3)'
  } else {
    e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)'
  }
}

const handleGenerateLeave = (e) => {
  e.target.style.transform = 'translateY(0)'
  e.target.style.boxShadow = 'none'
}
</script>

<style scoped>
table {
  overflow: hidden;
}

table th:first-child,
table td:first-child {
  position: sticky;
  left: 0;
  background: inherit;
  z-index: 1;
}

table thead th:first-child {
  z-index: 2;
}
</style>

