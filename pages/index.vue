<template>
  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    
    <!-- Header -->
    <header style="background: rgba(255, 255, 255, 0.95); box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div style="max-width: 1200px; margin: 0 auto; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;">
        <h1 style="font-size: 24px; font-weight: bold; color: #333; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          📋 Gestionnaire de Planning Internes
        </h1>
        
        <!-- Bouton Nouveau (affiché seulement si des plannings existent) -->
        <button 
          v-if="store.totalPlannings > 0"
          @click="createNewPlanning"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; font-weight: 600; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); transition: all 0.2s;"
          @mouseover="$event.target.style.transform = 'translateY(-2px)'"
          @mouseout="$event.target.style.transform = 'translateY(0)'"
        >
          ➕ Nouveau
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main style="max-width: 1200px; margin: 0 auto; padding: 40px;">
      
      <!-- État Initial : 0 plannings -->
      <div v-if="store.totalPlannings === 0" style="background: white; border-radius: 16px; padding: 80px 40px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        
        <div style="font-size: 80px; margin-bottom: 20px;">🏥</div>
        
        <h2 style="font-size: 28px; color: #333; margin: 0 0 15px 0; font-weight: 600;">
          Aucun planning créé
        </h2>
        
        <p style="font-size: 16px; color: #666; margin: 0 0 40px 0; line-height: 1.6;">
          Commencez par créer votre premier planning pour gérer<br>
          les gardes et les practices de votre équipe d'internes.
        </p>
        
        <button 
          @click="createNewPlanning"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 18px; font-weight: 600; padding: 16px 40px; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4); transition: all 0.3s;"
          @mouseover="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.5)'"
          @mouseout="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)'"
        >
          ➕ Créer votre premier planning
        </button>
        
        <div style="margin-top: 50px; padding: 20px; background: #f8f9fa; border-radius: 10px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto;">
          <h3 style="font-size: 16px; color: #333; margin: 0 0 12px 0; font-weight: 600;">
            ℹ️ Un planning permet de :
          </h3>
          <ul style="font-size: 14px; color: #555; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Gérer les gardes (semaine, samedi, dimanche)</li>
            <li>Assigner les internes aux practices</li>
            <li>Respecter les empêchements et repos</li>
            <li>Générer automatiquement 1 à 10 semaines</li>
          </ul>
        </div>
      </div>

      <!-- Liste des Plannings -->
      <div v-else style="display: grid; gap: 20px;">
        
        <!-- Carte Planning -->
        <div 
          v-for="planning in store.sortedPlannings" 
          :key="planning.id"
          style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: all 0.3s;"
          @mouseover="$event.currentTarget.style.transform = 'translateY(-4px)'; $event.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'"
          @mouseout="$event.currentTarget.style.transform = 'translateY(0)'; $event.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'"
        >
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
            <!-- Nom + Badge -->
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <h3 style="font-size: 20px; font-weight: 600; color: #333; margin: 0;">
                  {{ planning.name }}
                </h3>
                <!-- Badge Statut -->
                <span :style="getBadgeStyle(planning.status)">
                  {{ getStatusLabel(planning.status) }}
                </span>
              </div>
              
              <!-- Infos -->
              <div style="font-size: 14px; color: #666; display: flex; gap: 16px; flex-wrap: wrap;">
                <span>{{ planning.weeks }} {{ planning.weeks > 1 ? 'semaines' : 'semaine' }}</span>
                <span>•</span>
                <span>{{ planning.internsCount }} internes</span>
                <span>•</span>
                <span>{{ planning.practicesCount }} practices</span>
              </div>
              
              <!-- Date -->
              <div style="font-size: 13px; color: #999; margin-top: 8px;">
                Dernière modif: {{ formatDate(planning.lastModified) }}
              </div>
            </div>
          </div>
          
          <!-- Boutons d'action -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <button 
              @click="viewPlanning(planning.id)"
              style="background: #3b82f6; color: white; font-size: 14px; font-weight: 500; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#2563eb'"
              @mouseout="$event.target.style.background = '#3b82f6'"
            >
              👁️ Voir
            </button>
            
            <button 
              @click="editPlanning(planning.id)"
              style="background: #f97316; color: white; font-size: 14px; font-weight: 500; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#ea580c'"
              @mouseout="$event.target.style.background = '#f97316'"
            >
              ✏️ Modifier
            </button>
            
            <button 
              @click="duplicatePlanning(planning.id)"
              style="background: #10b981; color: white; font-size: 14px; font-weight: 500; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#059669'"
              @mouseout="$event.target.style.background = '#10b981'"
            >
              📋 Dupliquer
            </button>
            
            <button 
              @click="deletePlanning(planning.id)"
              style="background: #ef4444; color: white; font-size: 14px; font-weight: 500; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#dc2626'"
              @mouseout="$event.target.style.background = '#ef4444'"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer style="text-align: center; padding: 30px; color: white; opacity: 0.8; font-size: 14px;">
      <p style="margin: 0;">
        Module 1 : Dashboard {{ store.totalPlannings > 0 ? '(Liste)' : '(Vide)' }} ✅
      </p>
    </footer>

  </div>
</template>

<script setup>
import { usePlanningsStore } from '~/stores/plannings'

const store = usePlanningsStore()

// Formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Style du badge selon le statut
const getBadgeStyle = (status) => {
  const baseStyle = 'padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;'
  
  if (status === 'generated') {
    return baseStyle + ' background: #d1fae5; color: #065f46;'
  } else if (status === 'config') {
    return baseStyle + ' background: #fef3c7; color: #92400e;'
  } else {
    return baseStyle + ' background: #fee2e2; color: #991b1b;'
  }
}

// Label du statut
const getStatusLabel = (status) => {
  if (status === 'generated') return '✅ Généré'
  if (status === 'config') return '⏳ Config'
  return '❌ Erreur'
}

// Actions
const createNewPlanning = () => {
  // Rediriger vers le wizard
  navigateTo('/planning/new')
}

const viewPlanning = (id) => {
  navigateTo(`/planning/${id}`)
}

const editPlanning = (id) => {
  navigateTo(`/planning/${id}/edit`)
}

const duplicatePlanning = (id) => {
  if (confirm('Voulez-vous dupliquer ce planning ?')) {
    store.duplicatePlanning(id)
  }
}

const deletePlanning = (id) => {
  if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer ce planning ?\n\nCette action est irréversible.')) {
    store.deletePlanning(id)
  }
}
</script>
