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
            {{ getStepTitle() }}
          </p>
        </div>

        <!-- Progress Bar -->
        <div style="background: #f3f4f6; height: 8px;">
          <div :style="{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            height: '100%',
            width: (currentStep * 25) + '%',
            transition: 'width 0.3s'
          }"></div>
        </div>

        <!-- Form Content -->
        <div style="padding: 40px;">
          
          <!-- ÉTAPE 1 : Paramètres Généraux -->
          <div v-if="currentStep === 1">
            
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

          </div>

          <!-- ÉTAPE 2 : Gestion des Internes -->
          <div v-if="currentStep === 2">
            
            <!-- Header avec bouton Ajouter -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0;">
                  Liste des Internes ({{ formData.interns.length }})
                </h3>
                <p style="font-size: 13px; color: #666; margin: 4px 0 0 0;">
                  Minimum 2 internes requis
                </p>
              </div>
              <button 
                @click="openAddIntern"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                @mouseover="$event.target.style.transform = 'translateY(-2px)'"
                @mouseout="$event.target.style.transform = 'translateY(0)'"
              >
                ➕ Ajouter
              </button>
            </div>

            <!-- Liste des internes -->
            <div v-if="formData.interns.length === 0" style="text-align: center; padding: 60px 20px; background: #f9fafb; border-radius: 10px; border: 2px dashed #d1d5db;">
              <div style="font-size: 48px; margin-bottom: 16px;">👥</div>
              <p style="color: #6b7280; font-size: 15px; margin: 0;">
                Aucun interne ajouté. Cliquez sur "➕ Ajouter" pour commencer.
              </p>
            </div>

            <div v-else style="display: grid; gap: 12px; margin-bottom: 30px;">
              <div 
                v-for="(intern, index) in formData.interns"
                :key="index"
                style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; transition: all 0.2s;"
                @mouseover="$event.currentTarget.style.background = '#f3f4f6'"
                @mouseout="$event.currentTarget.style.background = '#f9fafb'"
              >
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                  <div style="flex: 1;">
                    <div style="font-size: 15px; color: #333; font-weight: 600; margin-bottom: 4px;">
                      {{ index + 1 }}. {{ intern.firstName }} {{ intern.lastName }}
                    </div>
                    <div v-if="intern.email || intern.phone" style="font-size: 13px; color: #666;">
                      <div v-if="intern.email">📧 {{ intern.email }}</div>
                      <div v-if="intern.phone">📱 {{ intern.phone }}</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button 
                      @click="editIntern(index)"
                      style="background: #3b82f6; color: white; font-size: 13px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                      @mouseover="$event.target.style.background = '#2563eb'"
                      @mouseout="$event.target.style.background = '#3b82f6'"
                    >
                      ✏️
                    </button>
                    <button 
                      @click="deleteIntern(index)"
                      style="background: #ef4444; color: white; font-size: 13px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                      @mouseover="$event.target.style.background = '#dc2626'"
                      @mouseout="$event.target.style.background = '#ef4444'"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message d'avertissement si < 2 internes -->
            <div v-if="formData.interns.length < 2" style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 16px; margin-bottom: 30px;">
              <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                ⚠️ Vous devez ajouter au moins 2 internes pour continuer
              </p>
            </div>

          </div>

          <!-- ÉTAPE 3 : Gestion des Practices -->
          <div v-if="currentStep === 3">
            
            <!-- Header avec bouton Ajouter -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0;">
                  Liste des Practices ({{ formData.practices.length }})
                </h3>
                <p style="font-size: 13px; color: #666; margin: 4px 0 0 0;">
                  Minimum 1 practice requise
                </p>
              </div>
              <button 
                @click="openAddPractice"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                @mouseover="$event.target.style.transform = 'translateY(-2px)'"
                @mouseout="$event.target.style.transform = 'translateY(0)'"
              >
                ➕ Ajouter
              </button>
            </div>

            <!-- Liste des practices -->
            <div v-if="formData.practices.length === 0" style="text-align: center; padding: 60px 20px; background: #f9fafb; border-radius: 10px; border: 2px dashed #d1d5db;">
              <div style="font-size: 48px; margin-bottom: 16px;">🏥</div>
              <p style="color: #6b7280; font-size: 15px; margin: 0;">
                Aucune practice ajoutée. Cliquez sur "➕ Ajouter" pour commencer.
              </p>
            </div>

            <div v-else style="display: grid; gap: 12px; margin-bottom: 30px;">
              <div 
                v-for="(practice, index) in formData.practices"
                :key="index"
                style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; transition: all 0.2s;"
                @mouseover="$event.currentTarget.style.background = '#f3f4f6'"
                @mouseout="$event.currentTarget.style.background = '#f9fafb'"
              >
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div style="flex: 1;">
                    <div style="font-size: 15px; color: #333; font-weight: 600; margin-bottom: 4px;">
                      {{ index + 1 }}. {{ practice.name }}
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                      {{ practice.internsRequired }} {{ practice.internsRequired > 1 ? 'internes' : 'interne' }} requis
                    </div>
                    <div style="font-size: 13px; color: #666;">
                      📅 {{ formatPracticeSchedule(practice) }}
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button 
                      @click="editPractice(index)"
                      style="background: #3b82f6; color: white; font-size: 13px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                      @mouseover="$event.target.style.background = '#2563eb'"
                      @mouseout="$event.target.style.background = '#3b82f6'"
                    >
                      ✏️
                    </button>
                    <button 
                      @click="deletePractice(index)"
                      style="background: #ef4444; color: white; font-size: 13px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                      @mouseover="$event.target.style.background = '#dc2626'"
                      @mouseout="$event.target.style.background = '#ef4444'"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message d'avertissement si < 1 practice -->
            <div v-if="formData.practices.length < 1" style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 16px; margin-bottom: 30px;">
              <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                ⚠️ Vous devez ajouter au moins 1 practice pour continuer
              </p>
            </div>

          </div>

          <!-- ÉTAPE 4 : Empêchements -->
          <div v-if="currentStep === 4">
            
            <!-- Header avec bouton Ajouter -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0;">
                  Liste des Empêchements ({{ formData.unavailabilities.length }})
                </h3>
                <p style="font-size: 13px; color: #666; margin: 4px 0 0 0;">
                  Étape optionnelle - Déclarez les indisponibilités
                </p>
              </div>
              <button 
                @click="openAddUnavailability"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                @mouseover="$event.target.style.transform = 'translateY(-2px)'"
                @mouseout="$event.target.style.transform = 'translateY(0)'"
              >
                ➕ Ajouter
              </button>
            </div>

            <!-- Liste des empêchements -->
            <div v-if="formData.unavailabilities.length === 0" style="text-align: center; padding: 60px 20px; background: #f9fafb; border-radius: 10px; border: 2px dashed #d1d5db; margin-bottom: 30px;">
              <div style="font-size: 48px; margin-bottom: 16px;">📅</div>
              <p style="color: #6b7280; font-size: 15px; margin: 0 0 8px 0; font-weight: 500;">
                Aucun empêchement déclaré
              </p>
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                Cette étape est optionnelle. Vous pouvez ajouter des empêchements plus tard.
              </p>
            </div>

            <div v-else style="display: grid; gap: 12px; margin-bottom: 30px;">
              <div 
                v-for="(unavail, index) in formData.unavailabilities"
                :key="index"
                style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; transition: all 0.2s;"
                @mouseover="$event.currentTarget.style.background = '#f3f4f6'"
                @mouseout="$event.currentTarget.style.background = '#f9fafb'"
              >
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div style="flex: 1;">
                    <div style="font-size: 15px; color: #333; font-weight: 600; margin-bottom: 4px;">
                      {{ getInternName(unavail.internId) }}
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 2px;">
                      📅 {{ formatDate(unavail.date) }} - {{ getPeriodLabel(unavail.period) }}
                    </div>
                    <div v-if="unavail.reason" style="font-size: 13px; color: #666; font-style: italic;">
                      💬 {{ unavail.reason }}
                    </div>
                  </div>
                  <button 
                    @click="deleteUnavailability(index)"
                    style="background: #ef4444; color: white; font-size: 13px; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
                    @mouseover="$event.target.style.background = '#dc2626'"
                    @mouseout="$event.target.style.background = '#ef4444'"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 10px; padding: 16px; margin-bottom: 30px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
                ℹ️ Cette étape est optionnelle. Vous pouvez créer le planning maintenant et ajouter des empêchements plus tard si nécessaire.
              </p>
            </div>

          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 12px; margin-top: 40px;">
            <button 
              v-if="currentStep > 1"
              @click="previousStep"
              style="flex: 1; background: #e5e7eb; color: #374151; font-size: 16px; font-weight: 600; padding: 14px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
              @mouseover="$event.target.style.background = '#d1d5db'"
              @mouseout="$event.target.style.background = '#e5e7eb'"
            >
              ← Retour
            </button>
            
            <button 
              v-else
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
                background: isStepValid ? (currentStep === 4 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)') : '#d1d5db',
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
              {{ currentStep === 4 ? '✓ Terminer et Créer le Planning' : 'Suivant → Étape ' + (currentStep + 1) }}
            </button>
          </div>

        </div>

      </div>

    </div>

    <!-- Modal Ajouter Empêchement -->
    <div v-if="showUnavailabilityModal" @click="closeUnavailabilityModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
      <div @click.stop style="background: white; border-radius: 16px; padding: 30px; max-width: 500px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        <h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0 0 8px 0;">
          Ajouter un Empêchement
        </h2>
        <p style="font-size: 13px; color: #666; margin: 0 0 24px 0;">
          Déclarez une indisponibilité pour un interne
        </p>
        
        <!-- Sélection de l'interne -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Interne <span style="color: #ef4444;">*</span>
          </label>
          <select 
            v-model="unavailabilityForm.internId"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box; cursor: pointer; background: white;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          >
            <option value="">-- Sélectionner un interne --</option>
            <option v-for="intern in formData.interns" :key="intern.id" :value="intern.id">
              {{ intern.firstName }} {{ intern.lastName }}
            </option>
          </select>
        </div>

        <!-- Date -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Date <span style="color: #ef4444;">*</span>
          </label>
          <input 
            v-model="unavailabilityForm.date"
            type="date"
            :min="formData.startDate"
            :max="endDate"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
          <p style="font-size: 12px; color: #666; margin: 6px 0 0 0;">
            La date doit être dans la période du planning ({{ formatDate(formData.startDate) }} - {{ formatDate(endDate) }})
          </p>
        </div>

        <!-- Période -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 10px;">
            Période <span style="color: #ef4444;">*</span>
          </label>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="unavailabilityForm.period" 
                value="morning"
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 14px; color: #333;">Matin (8h-13h)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="unavailabilityForm.period" 
                value="afternoon"
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 14px; color: #333;">Après-midi (13h-18h)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="unavailabilityForm.period" 
                value="fullday"
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 14px; color: #333;">Journée complète</span>
            </label>
          </div>
        </div>

        <!-- Raison (optionnelle) -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Raison <span style="font-weight: normal; color: #666; font-size: 12px;">(optionnel)</span>
          </label>
          <input 
            v-model="unavailabilityForm.reason"
            type="text"
            placeholder="Ex: Congé, Formation, RDV médical..."
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Buttons -->
        <div style="display: flex; gap: 10px;">
          <button 
            @click="closeUnavailabilityModal"
            style="flex: 1; background: #e5e7eb; color: #374151; font-size: 15px; font-weight: 600; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
            @mouseover="$event.target.style.background = '#d1d5db'"
            @mouseout="$event.target.style.background = '#e5e7eb'"
          >
            Annuler
          </button>
          <button 
            @click="saveUnavailability"
            :disabled="!unavailabilityForm.internId || !unavailabilityForm.date || !unavailabilityForm.period"
            :style="{
              flex: 1,
              background: (unavailabilityForm.internId && unavailabilityForm.date && unavailabilityForm.period) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: (unavailabilityForm.internId && unavailabilityForm.date && unavailabilityForm.period) ? 'pointer' : 'not-allowed',
              opacity: (unavailabilityForm.internId && unavailabilityForm.date && unavailabilityForm.period) ? 1 : 0.6
            }"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Ajouter/Modifier Practice -->
    <div v-if="showPracticeModal" @click="closePracticeModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
      <div @click.stop style="background: white; border-radius: 16px; padding: 30px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        <h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0 0 8px 0;">
          {{ editingPracticeIndex !== null ? 'Modifier une Practice' : 'Ajouter une Practice' }}
        </h2>
        <p style="font-size: 13px; color: #666; margin: 0 0 24px 0;">
          Définissez les services médicaux et leurs horaires
        </p>
        
        <!-- Nom de la practice -->
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Nom de la Practice <span style="color: #ef4444;">*</span>
          </label>
          <input 
            v-model="practiceForm.name"
            type="text"
            placeholder="Ex: Chirurgie"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Nombre d'internes requis -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 10px;">
            Nombre d'internes requis <span style="color: #ef4444;">*</span>
          </label>
          <div style="display: flex; gap: 20px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="practiceForm.internsRequired" 
                :value="1"
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 14px; color: #333;">1 interne</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="radio" 
                v-model="practiceForm.internsRequired" 
                :value="2"
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 14px; color: #333;">2 internes</span>
            </label>
          </div>
        </div>

        <!-- Jours d'activité -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 10px;">
            Jours d'activité <span style="color: #ef4444;">*</span>
          </label>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="display: grid; grid-template-columns: 1fr 80px 100px; background: #e5e7eb; padding: 10px; font-size: 13px; font-weight: 600; color: #374151;">
              <div>Jour</div>
              <div style="text-align: center;">Matin</div>
              <div style="text-align: center;">Après-midi</div>
            </div>
            <!-- Rows -->
            <div 
              v-for="(day, dayKey) in practiceForm.schedule"
              :key="dayKey"
              style="display: grid; grid-template-columns: 1fr 80px 100px; padding: 12px 10px; border-top: 1px solid #e5e7eb; align-items: center;"
            >
              <div style="font-size: 14px; color: #333; font-weight: 500;">
                {{ getDayLabel(dayKey) }}
              </div>
              <div style="text-align: center;">
                <input 
                  type="checkbox" 
                  v-model="day.morning"
                  style="width: 18px; height: 18px; cursor: pointer;"
                />
              </div>
              <div style="text-align: center;">
                <input 
                  type="checkbox" 
                  v-model="day.afternoon"
                  :disabled="dayKey === 'saturday'"
                  style="width: 18px; height: 18px; cursor: pointer;"
                  :style="{ opacity: dayKey === 'saturday' ? 0.3 : 1 }"
                />
              </div>
            </div>
          </div>
          <p style="font-size: 12px; color: #666; margin: 8px 0 0 0;">
            ℹ️ Samedi : uniquement le matin (astreinte)
          </p>
        </div>

        <!-- Buttons -->
        <div style="display: flex; gap: 10px;">
          <button 
            @click="closePracticeModal"
            style="flex: 1; background: #e5e7eb; color: #374151; font-size: 15px; font-weight: 600; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
            @mouseover="$event.target.style.background = '#d1d5db'"
            @mouseout="$event.target.style.background = '#e5e7eb'"
          >
            Annuler
          </button>
          <button 
            @click="savePractice"
            :disabled="!practiceForm.name || !hasAtLeastOneSlot"
            :style="{
              flex: 1,
              background: (practiceForm.name && hasAtLeastOneSlot) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: (practiceForm.name && hasAtLeastOneSlot) ? 'pointer' : 'not-allowed',
              opacity: (practiceForm.name && hasAtLeastOneSlot) ? 1 : 0.6
            }"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Ajouter/Modifier Interne -->
    <div v-if="showInternModal" @click="closeModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
      <div @click.stop style="background: white; border-radius: 16px; padding: 30px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        <h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0 0 8px 0;">
          {{ editingInternIndex !== null ? 'Modifier un Interne' : 'Ajouter un Interne' }}
        </h2>
        <p style="font-size: 13px; color: #666; margin: 0 0 24px 0;">
          Les informations seront sauvegardées dans vos contacts
        </p>
        
        <!-- Sélection rapide depuis contacts existants -->
        <div v-if="editingInternIndex === null && internsStore.allInterns.length > 0" style="margin-bottom: 20px; padding: 16px; background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 10px;">
          <label style="display: block; font-size: 13px; font-weight: 600; color: #1e40af; margin-bottom: 10px;">
            💡 Ou sélectionner depuis vos contacts :
          </label>
          <select 
            @change="selectExistingIntern($event.target.value)"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #3b82f6; border-radius: 8px; outline: none; box-sizing: border-box; cursor: pointer; background: white;"
          >
            <option value="">-- Choisir un contact --</option>
            <option v-for="intern in internsStore.allInterns" :key="intern.id" :value="intern.id">
              {{ intern.firstName }} {{ intern.lastName }}
            </option>
          </select>
        </div>

        <!-- Prénom -->
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Prénom <span style="color: #ef4444;">*</span>
          </label>
          <input 
            v-model="internForm.firstName"
            type="text"
            placeholder="Ex: Martin"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Nom -->
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Nom <span style="color: #ef4444;">*</span>
          </label>
          <input 
            v-model="internForm.lastName"
            type="text"
            placeholder="Ex: Dupont"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Email -->
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Email <span style="font-weight: normal; color: #666; font-size: 12px;">(optionnel)</span>
          </label>
          <input 
            v-model="internForm.email"
            type="email"
            placeholder="Ex: martin.dupont@hospital.fr"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Téléphone -->
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px;">
            Téléphone <span style="font-weight: normal; color: #666; font-size: 12px;">(optionnel)</span>
          </label>
          <input 
            v-model="internForm.phone"
            type="tel"
            placeholder="Ex: 06 12 34 56 78"
            style="width: 100%; padding: 10px 14px; font-size: 14px; border: 2px solid #e5e7eb; border-radius: 8px; outline: none; box-sizing: border-box;"
            @focus="$event.target.style.borderColor = '#667eea'"
            @blur="$event.target.style.borderColor = '#e5e7eb'"
          />
        </div>

        <!-- Buttons -->
        <div style="display: flex; gap: 10px;">
          <button 
            @click="closeModal"
            style="flex: 1; background: #e5e7eb; color: #374151; font-size: 15px; font-weight: 600; padding: 12px; border: none; border-radius: 8px; cursor: pointer;"
            @mouseover="$event.target.style.background = '#d1d5db'"
            @mouseout="$event.target.style.background = '#e5e7eb'"
          >
            Annuler
          </button>
          <button 
            @click="saveIntern"
            :disabled="!internForm.firstName || !internForm.lastName"
            :style="{
              flex: 1,
              background: (internForm.firstName && internForm.lastName) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#d1d5db',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: (internForm.firstName && internForm.lastName) ? 'pointer' : 'not-allowed',
              opacity: (internForm.firstName && internForm.lastName) ? 1 : 0.6
            }"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInternsStore } from '~/stores/interns'
import { usePlanningsStore } from '~/stores/plannings'

const router = useRouter()
const internsStore = useInternsStore()

// Current step
const currentStep = ref(1)

// Form data
const formData = ref({
  // Étape 1
  name: '',
  startDate: '',
  weeks: 3,
  // Étape 2
  interns: [],
  // Étape 3
  practices: [],
  // Étape 4
  unavailabilities: []
})

// Errors
const errors = ref({
  name: '',
  startDate: ''
})

// Modal interne
const showInternModal = ref(false)
const internForm = ref({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})
const editingInternIndex = ref(null)

// Modal practice
const showPracticeModal = ref(false)
const practiceForm = ref({
  name: '',
  internsRequired: 2,
  schedule: {
    monday: { morning: false, afternoon: false },
    tuesday: { morning: false, afternoon: false },
    wednesday: { morning: false, afternoon: false },
    thursday: { morning: false, afternoon: false },
    friday: { morning: false, afternoon: false },
    saturday: { morning: false, afternoon: false }
  }
})
const editingPracticeIndex = ref(null)

// Modal unavailability
const showUnavailabilityModal = ref(false)
const unavailabilityForm = ref({
  internId: '',
  date: '',
  period: 'morning',
  reason: ''
})

// Get step title
const getStepTitle = () => {
  const titles = {
    1: 'Étape 1 sur 4 : Paramètres Généraux',
    2: 'Étape 2 sur 4 : Gestion des Internes',
    3: 'Étape 3 sur 4 : Gestion des Practices',
    4: 'Étape 4 sur 4 : Empêchements'
  }
  return titles[currentStep.value]
}

// Valider la date (doit être un lundi)
const validateDate = () => {
  errors.value.startDate = ''
  
  if (!formData.value.startDate) {
    return
  }
  
  const date = new Date(formData.value.startDate + 'T00:00:00')
  const dayOfWeek = date.getDay()
  
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

// Vérifier si au moins un slot est sélectionné
const hasAtLeastOneSlot = computed(() => {
  return Object.values(practiceForm.value.schedule).some(day => day.morning || day.afternoon)
})

// Validation de l'étape courante
const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return formData.value.name.length >= 3 && 
           formData.value.startDate && 
           !errors.value.startDate &&
           formData.value.weeks >= 1 && 
           formData.value.weeks <= 10
  } else if (currentStep.value === 2) {
    return formData.value.interns.length >= 2
  } else if (currentStep.value === 3) {
    return formData.value.practices.length >= 1
  } else if (currentStep.value === 4) {
    return true // Étape optionnelle, toujours valide
  }
  return true
})

// Actions Modal Interne
const openAddIntern = () => {
  internForm.value = { id: null, firstName: '', lastName: '', email: '', phone: '' }
  editingInternIndex.value = null
  showInternModal.value = true
}

const selectExistingIntern = (internId) => {
  if (!internId) return
  
  const intern = internsStore.getInternById(internId)
  if (intern) {
    // Remplir le formulaire avec les données du contact
    internForm.value = { ...intern }
  }
}

const editIntern = (index) => {
  internForm.value = { ...formData.value.interns[index] }
  editingInternIndex.value = index
  showInternModal.value = true
}

const deleteIntern = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet interne ?')) {
    formData.value.interns.splice(index, 1)
  }
}

const saveIntern = () => {
  if (!internForm.value.firstName || !internForm.value.lastName) return
  
  let internToAdd = { ...internForm.value }
  
  // Si c'est un nouvel interne (pas d'ID), l'ajouter au store global
  if (!internForm.value.id) {
    const newIntern = internsStore.addIntern({
      firstName: internForm.value.firstName,
      lastName: internForm.value.lastName,
      email: internForm.value.email,
      phone: internForm.value.phone
    })
    internToAdd = newIntern
  } else {
    // Mettre à jour les infos dans le store si modifiées
    internsStore.updateIntern(internForm.value.id, {
      firstName: internForm.value.firstName,
      lastName: internForm.value.lastName,
      email: internForm.value.email,
      phone: internForm.value.phone
    })
  }
  
  if (editingInternIndex.value !== null) {
    // Modifier dans le planning
    formData.value.interns[editingInternIndex.value] = internToAdd
  } else {
    // Ajouter au planning
    formData.value.interns.push(internToAdd)
  }
  
  closeModal()
}

const closeModal = () => {
  showInternModal.value = false
  internForm.value = { id: null, firstName: '', lastName: '', email: '', phone: '' }
  editingInternIndex.value = null
}

// Actions Modal Practice
const openAddPractice = () => {
  practiceForm.value = {
    name: '',
    internsRequired: 2,
    schedule: {
      monday: { morning: false, afternoon: false },
      tuesday: { morning: false, afternoon: false },
      wednesday: { morning: false, afternoon: false },
      thursday: { morning: false, afternoon: false },
      friday: { morning: false, afternoon: false },
      saturday: { morning: false, afternoon: false }
    }
  }
  editingPracticeIndex.value = null
  showPracticeModal.value = true
}

const editPractice = (index) => {
  practiceForm.value = JSON.parse(JSON.stringify(formData.value.practices[index]))
  editingPracticeIndex.value = index
  showPracticeModal.value = true
}

const deletePractice = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette practice ?')) {
    formData.value.practices.splice(index, 1)
  }
}

const savePractice = () => {
  if (!practiceForm.value.name || !hasAtLeastOneSlot.value) return
  
  if (editingPracticeIndex.value !== null) {
    // Modifier
    formData.value.practices[editingPracticeIndex.value] = JSON.parse(JSON.stringify(practiceForm.value))
  } else {
    // Ajouter
    formData.value.practices.push(JSON.parse(JSON.stringify(practiceForm.value)))
  }
  
  closePracticeModal()
}

const closePracticeModal = () => {
  showPracticeModal.value = false
  practiceForm.value = {
    name: '',
    internsRequired: 2,
    schedule: {
      monday: { morning: false, afternoon: false },
      tuesday: { morning: false, afternoon: false },
      wednesday: { morning: false, afternoon: false },
      thursday: { morning: false, afternoon: false },
      friday: { morning: false, afternoon: false },
      saturday: { morning: false, afternoon: false }
    }
  }
  editingPracticeIndex.value = null
}

// Helper functions for practices
const getDayLabel = (dayKey) => {
  const labels = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi'
  }
  return labels[dayKey] || dayKey
}

const formatPracticeSchedule = (practice) => {
  const days = []
  const schedule = practice.schedule
  
  // Vérifier quels jours sont actifs
  const activeDays = {
    monday: schedule.monday.morning || schedule.monday.afternoon,
    tuesday: schedule.tuesday.morning || schedule.tuesday.afternoon,
    wednesday: schedule.wednesday.morning || schedule.wednesday.afternoon,
    thursday: schedule.thursday.morning || schedule.thursday.afternoon,
    friday: schedule.friday.morning || schedule.friday.afternoon,
    saturday: schedule.saturday.morning || schedule.saturday.afternoon
  }
  
  // Simplifier l'affichage
  const allWeekdays = activeDays.monday && activeDays.tuesday && activeDays.wednesday && activeDays.thursday && activeDays.friday
  
  if (allWeekdays) {
    days.push('Lun-Ven')
  } else {
    if (activeDays.monday) days.push('Lun')
    if (activeDays.tuesday) days.push('Mar')
    if (activeDays.wednesday) days.push('Mer')
    if (activeDays.thursday) days.push('Jeu')
    if (activeDays.friday) days.push('Ven')
  }
  
  if (activeDays.saturday) days.push('Sam')
  
  return days.join(', ')
}

// Actions Modal Unavailability
const openAddUnavailability = () => {
  unavailabilityForm.value = {
    internId: '',
    date: '',
    period: 'morning',
    reason: ''
  }
  showUnavailabilityModal.value = true
}

const deleteUnavailability = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet empêchement ?')) {
    formData.value.unavailabilities.splice(index, 1)
  }
}

const saveUnavailability = () => {
  if (!unavailabilityForm.value.internId || !unavailabilityForm.value.date || !unavailabilityForm.value.period) return
  
  // Ajouter l'empêchement
  formData.value.unavailabilities.push({
    internId: unavailabilityForm.value.internId,
    date: unavailabilityForm.value.date,
    period: unavailabilityForm.value.period,
    reason: unavailabilityForm.value.reason
  })
  
  closeUnavailabilityModal()
}

const closeUnavailabilityModal = () => {
  showUnavailabilityModal.value = false
  unavailabilityForm.value = {
    internId: '',
    date: '',
    period: 'morning',
    reason: ''
  }
}

// Helper functions for unavailabilities
const getInternName = (internId) => {
  const intern = formData.value.interns.find(i => i.id === internId)
  return intern ? `${intern.firstName} ${intern.lastName}` : 'Inconnu'
}

const getPeriodLabel = (period) => {
  const labels = {
    morning: 'Matin',
    afternoon: 'Après-midi',
    fullday: 'Journée complète'
  }
  return labels[period] || period
}

// Navigation
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

const cancel = () => {
  if (confirm('Êtes-vous sûr de vouloir annuler ? Les données saisies seront perdues.')) {
    router.push('/')
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const nextStep = () => {
  // Valider l'étape 1
  if (currentStep.value === 1) {
    if (formData.value.name.length < 3) {
      errors.value.name = 'Le nom doit contenir au moins 3 caractères'
      return
    }
    
    validateDate()
    if (errors.value.startDate) {
      return
    }
  }
  
  if (isStepValid.value) {
    if (currentStep.value < 4) {
      currentStep.value++
    } else {
      // Créer le planning
      createPlanning()
    }
  }
}

const createPlanning = () => {
  // Sauvegarder le planning dans le store
  const planningsStore = usePlanningsStore()
  
  // ✅ FIX: Mapper internsRequired → requiredInterns + ajouter id unique
  const practicesListMapped = formData.value.practices.map((practice, index) => ({
    id: `practice-${Date.now()}-${index}`,
    name: practice.name,
    requiredInterns: practice.internsRequired, // ← FIX: Renommer le champ
    schedule: practice.schedule
  }))
  
  planningsStore.addPlanning({
    name: formData.value.name,
    status: 'config', // Pas encore généré
    weeks: formData.value.weeks,
    internsCount: formData.value.interns.length,
    practicesCount: formData.value.practices.length,
    startDate: formData.value.startDate,
    internsList: formData.value.interns,
    practicesList: practicesListMapped, // ← Utiliser la version mappée
    unavailabilities: formData.value.unavailabilities
  })
  
  // Afficher un résumé du planning créé
  const summary = `
✅ Planning créé avec succès !

📋 Récapitulatif :
• Nom : ${formData.value.name}
• Période : ${formatDate(formData.value.startDate)} - ${formatDate(endDate.value)}
• Durée : ${formData.value.weeks} ${formData.value.weeks > 1 ? 'semaines' : 'semaine'}
• Internes : ${formData.value.interns.length}
• Practices : ${formData.value.practices.length}
• Empêchements : ${formData.value.unavailabilities.length}

🎯 Prochaine étape : Génération automatique (MODULE 3)

Le planning a été ajouté au dashboard.
  `
  
  alert(summary)
  
  // Retourner au dashboard
  router.push('/')
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
