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
                  <!-- Lundi -->
                  <td 
                    :style="getJourContent(interne.id, 'lundi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'lundi', semaine.numero - 1).html"
                  ></td>
                  <!-- Mardi -->
                  <td 
                    :style="getJourContent(interne.id, 'mardi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'mardi', semaine.numero - 1).html"
                  ></td>
                  <!-- Mercredi -->
                  <td 
                    :style="getJourContent(interne.id, 'mercredi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'mercredi', semaine.numero - 1).html"
                  ></td>
                  <!-- Jeudi -->
                  <td 
                    :style="getJourContent(interne.id, 'jeudi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'jeudi', semaine.numero - 1).html"
                  ></td>
                  <!-- Vendredi -->
                  <td 
                    :style="getJourContent(interne.id, 'vendredi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'vendredi', semaine.numero - 1).html"
                  ></td>
                  <!-- Samedi -->
                  <td 
                    :style="getJourContent(interne.id, 'samedi', semaine.numero - 1).style + ' border-right: 1px solid #e5e7eb;'"
                    v-html="getJourContent(interne.id, 'samedi', semaine.numero - 1).html"
                  ></td>
                  <!-- Dimanche -->
                  <td 
                    :style="getJourContent(interne.id, 'dimanche', semaine.numero - 1).style"
                    v-html="getJourContent(interne.id, 'dimanche', semaine.numero - 1).html"
                  ></td>
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

    <!-- Modal Résultats Génération -->
    <div v-if="showResultModal" @click="showResultModal = false" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
      <div @click.stop style="background: white; border-radius: 12px; padding: 30px; max-width: 800px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 24px; color: #2c3e50;">📊 Résultats de la génération</h2>
          <button @click="showResultModal = false" style="background: #e74c3c; color: white; border: none; border-radius: 50%; width: 32px; height: 32px; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ×
          </button>
        </div>
        
        <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; color: #2c3e50; margin: 0;">{{ generationResult }}</pre>
        
        <div style="margin-top: 20px; text-align: right;">
          <button @click="showResultModal = false" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
            Fermer
          </button>
        </div>
      </div>
    </div>

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

// Modal résultats
const showResultModal = ref(false)
const generationResult = ref('')

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

// ✅ m3-17 : Affichage du contenu d'une cellule du tableau
const getJourContent = (interneId, dayKey, weekIndex) => {
  // Si pas de données générées, retourner vide
  if (!planning.value?.generatedData?.weeks) {
    return { html: '-', style: 'color: #999; font-size: 13px;' }
  }
  
  const week = planning.value.generatedData.weeks[weekIndex]
  if (!week || !week.days) {
    return { html: '-', style: 'color: #999; font-size: 13px;' }
  }
  
  // ✅ Mapper les clés texte vers les index de l'array
  const dayMapping = {
    'lundi': 0,
    'mardi': 1,
    'mercredi': 2,
    'jeudi': 3,
    'vendredi': 4,
    'samedi': 5,
    'dimanche': 6
  }
  
  const dayIndex = dayMapping[dayKey]
  const day = week.days[dayIndex]
  
  if (!day) {
    return { html: '-', style: 'color: #999; font-size: 13px;' }
  }
  
  const content = []
  let bgColor = ''
  
  // 0️⃣ Vérifier EMPÊCHEMENTS (priorité absolue - doit être affiché en premier)
  const unavailabilities = planning.value.unavailabilities || []
  const unavailForThisDay = unavailabilities.filter(unavail => {
    if (unavail.internId !== interneId) return false
    if (unavail.date !== day.date) return false
    return true
  })
  
  if (unavailForThisDay.length > 0) {
    // Normaliser les périodes pour l'affichage
    const unavailPeriod = unavailForThisDay[0].period === 'morning' ? 'matin' :
                         (unavailForThisDay[0].period === 'afternoon' ? 'apres_midi' :
                         unavailForThisDay[0].period)
    
    if (unavailPeriod === 'fullday') {
      content.push('🚫 Indisponible (journée)')
      bgColor = '#fee2e2' // Rouge clair
    } else if (unavailPeriod === 'matin') {
      content.push('🚫 Indisponible (M)')
    } else if (unavailPeriod === 'apres_midi') {
      content.push('🚫 Indisponible (AM)')
    } else {
      content.push('🚫 Indisponible')
      bgColor = '#fee2e2'
    }
  }
  
  // 1️⃣ Vérifier GARDE (depuis week.gardes)
  const gardes = []
  if (week.gardes?.dimanche?.interneId === interneId && dayKey === 'dimanche') {
    gardes.push('🌙 Garde Dim')
    bgColor = '#1e3a8a'
  }
  if (week.gardes?.samedi?.interneId === interneId && dayKey === 'samedi') {
    gardes.push('🌙 Garde Sam')
    bgColor = '#1e3a8a'
  }
  week.gardes?.semaine?.forEach(garde => {
    if (garde.interneId === interneId && garde.date === day.date) {
      gardes.push('🌙 Garde')
      bgColor = '#1e3a8a'
    }
  })
  
  // 2️⃣ Vérifier REPOS (depuis day.matin.repos et day.apresMidi.repos)
  const reposMatin = day.matin?.repos?.interneId === interneId
  const reposApresMidi = day.apresMidi?.repos?.interneId === interneId
  
  if (reposMatin && reposApresMidi) {
    content.push('💤 REPOS')
    bgColor = '#e5e7eb'
  } else if (reposMatin) {
    content.push('💤 REPOS (M)')
  } else if (reposApresMidi) {
    content.push('💤 REPOS (AM)')
  }
  
  // 3️⃣ Vérifier PRACTICES (depuis week.affectations[])
  const practicesMatin = week.affectations?.filter(aff => 
    aff.interneId === interneId && aff.date === day.date && aff.periode === 'matin'
  ) || []
  
  const practicesAM = week.affectations?.filter(aff => 
    aff.interneId === interneId && aff.date === day.date && aff.periode === 'apres_midi'
  ) || []
  
  practicesMatin.forEach(aff => {
    const doublonText = aff.isDoublonManqueEffectif ? ' (doublon manque effectif)' : ''
    content.push(`🏥 ${aff.practiceName} (M)${doublonText}`)
    if (aff.isDoublonManqueEffectif) {
      bgColor = '#fef3c7' // Fond jaune pour signaler doublon
    }
  })
  
  practicesAM.forEach(aff => {
    const doublonText = aff.isDoublonManqueEffectif ? ' (doublon manque effectif)' : ''
    content.push(`🏥 ${aff.practiceName} (AM)${doublonText}`)
    if (aff.isDoublonManqueEffectif) {
      bgColor = '#fef3c7' // Fond jaune pour signaler doublon
    }
  })
  
  // 4️⃣ Vérifier OFF (depuis day.matin.off et day.apresMidi.off)
  if (day.matin?.off?.interneId === interneId) {
    content.push('🏖️ OFF (M)')
    if (!bgColor) bgColor = '#dbeafe'
  }
  if (day.apresMidi?.off?.interneId === interneId) {
    content.push('🏖️ OFF (AM)')
    if (!bgColor) bgColor = '#dbeafe'
  }
  
  // 5️⃣ Ajouter les gardes à la fin
  content.push(...gardes)
  
  // ✅ VÉRIFICATION : Détecter les demi-journées manquantes (Lun-Ven uniquement)
  const dayIndexNum = dayMapping[dayKey] // 0=lundi, 1=mardi, ..., 4=vendredi, 5=samedi, 6=dimanche
  const isWeekday = dayIndexNum < 5 // 0-4 = lundi-vendredi
  
  if (isWeekday) {
    // ✅ CORRECTION : Toujours vérifier les demi-journées, MÊME si l'interne a une garde
    // La garde c'est le SOIR, donc il doit quand même avoir quelque chose pour M et AM
    
    // Vérifier indisponibilités (journée complète = OK, on ne peut rien faire)
    const unavailFullday = unavailForThisDay.some(u => u.period === 'fullday')
    
    if (!unavailFullday) {
      // Vérifier matin : practice, OFF, repos, ou indisponibilité
      const hasMatin = practicesMatin.length > 0 || 
                      day.matin?.off?.interneId === interneId || 
                      reposMatin || 
                      unavailForThisDay.some(u => u.period === 'morning')
      
      // Vérifier après-midi : practice, OFF, repos, ou indisponibilité
      const hasAM = practicesAM.length > 0 || 
                   day.apresMidi?.off?.interneId === interneId || 
                   reposApresMidi || 
                   unavailForThisDay.some(u => u.period === 'afternoon')
      
      // Si manque matin ET pas d'indisponibilité matin
      if (!hasMatin && !unavailForThisDay.some(u => u.period === 'morning')) {
        content.push('⚠️ Manque M')
        if (!bgColor) bgColor = '#fef3c7' // Jaune pour warning
      }
      
      // Si manque après-midi ET pas d'indisponibilité après-midi
      if (!hasAM && !unavailForThisDay.some(u => u.period === 'afternoon')) {
        content.push('⚠️ Manque AM')
        if (!bgColor) bgColor = '#fef3c7' // Jaune pour warning
      }
    }
  }
  
  // Si aucun contenu, retourner tiret
  if (content.length === 0) {
    return { html: '-', style: 'color: #999; font-size: 13px; padding: 12px; text-align: center;' }
  }
  
  // Assembler le HTML avec sauts de ligne
  const html = content.join('<br>')
  const textColor = bgColor === '#1e3a8a' ? 'white' : (bgColor === '#e5e7eb' ? '#4b5563' : '#2c3e50')
  const style = `background: ${bgColor || 'transparent'}; color: ${textColor}; font-size: 11px; padding: 8px; text-align: center; line-height: 1.5;`
  
  return { html, style }
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
        message += `    - 🌙 Dimanche : ${week.gardes.dimanche.interneName}\n`
      }
      
      // Gardes de semaine
      if (week.gardes.semaine && week.gardes.semaine.length > 0) {
        week.gardes.semaine.forEach(garde => {
          message += `    - 🌙 ${garde.jour.charAt(0).toUpperCase() + garde.jour.slice(1)} : ${garde.interneName}\n`
        })
      }
      
      // Garde Samedi
      if (week.gardes.samedi) {
        message += `    - 🌙 Samedi : ${week.gardes.samedi.interneName}\n`
      }
      
      // Repos post-garde calculés
      if (week.repos && week.repos.length > 0) {
        const reposParInterne = {}
        week.repos.forEach(repos => {
          if (!reposParInterne[repos.interneName]) {
            reposParInterne[repos.interneName] = 0
          }
          reposParInterne[repos.interneName]++
        })
        
        message += `    - 💤 Repos post-garde calculés :\n`
        Object.keys(reposParInterne).forEach(interneName => {
          message += `       • ${interneName} : ${reposParInterne[interneName]} demi-journées\n`
        })
      }
      
      // Affectations practices créées
      if (week.affectations && week.affectations.length > 0) {
        message += `    - 🏥 Affectations practices : ${week.affectations.length} créées\n`
        
        // Grouper par practice
        const affectationsParPractice = {}
        week.affectations.forEach(aff => {
          if (!affectationsParPractice[aff.practiceName]) {
            affectationsParPractice[aff.practiceName] = 0
          }
          affectationsParPractice[aff.practiceName]++
        })
        
        Object.keys(affectationsParPractice).forEach(practiceName => {
          message += `       • ${practiceName} : ${affectationsParPractice[practiceName]} affectations\n`
        })
      }
      
      // OFFs attribués
      if (week.offs && week.offs.length > 0) {
        message += `    - 💤 OFFs attribués : ${week.offs.length} demi-journées\n`
      }
    })
    
    // Stats globales si disponibles
    if (result.globalStats) {
      message += `\n📊 Statistiques d'équilibre :\n`
      const gardesStats = result.globalStats.gardesParInterne
      
      // Trier les internes par nombre de gardes (pour voir l'équilibre)
      const sortedInterns = Object.keys(gardesStats)
        .map(interneId => ({
          intern: planning.value.internsList.find(i => i.id === interneId),
          stats: gardesStats[interneId]
        }))
        .filter(item => item.intern)
        .sort((a, b) => b.stats.total - a.stats.total)
      
      sortedInterns.forEach(item => {
        const { intern, stats } = item
        message += `  • ${intern.firstName} ${intern.lastName} : ${stats.total} garde(s)`
        
        const details = []
        if (stats.semaine > 0) details.push(`${stats.semaine} sem`)
        if (stats.dimanche > 0) details.push(`${stats.dimanche} dim`)
        if (stats.samedi > 0) details.push(`${stats.samedi} sam`)
        
        if (details.length > 0) {
          message += ` (${details.join(', ')})`
        }
        message += `\n`
      })
    }
    
    message += '\n✅ Planning sauvegardé avec succès !\n'
    message += 'Statut : 📊 Généré\n\n'
    message += '⏳ Fonctionnalités avancées (v1.1+) :\n'
    message += '  • Détection des conflits\n'
    message += '  • Calcul du score d\'équilibre (0-100)\n'
    message += '  • 2 vues de visualisation (Par Interne / Par Jour)'
    
    // ✅ PHASE FINALE : Sauvegarder les données générées dans le store (m3-15 + m3-16)
    console.log('💾 Sauvegarde des données générées dans le store...')
    
    planningsStore.updatePlanning(planning.value.id, {
      generatedData: {
        weeks: result.weeks,
        globalStats: result.globalStats
      },
      status: 'generated',
      lastModified: new Date()
    })
    
    console.log('✅ Planning sauvegardé avec statut "generated"')
    
    // Afficher le modal avec les résultats
    generationResult.value = message
    showResultModal.value = true
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error)
    generationResult.value = `❌ Erreur lors de la génération du planning.\n\nDétails : ${error.message}\n\nStack : ${error.stack}`
    showResultModal.value = true
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

