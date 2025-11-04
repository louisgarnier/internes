<template>
  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
    
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- Header -->
      <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h1 style="font-size: 36px; color: #333; margin: 0; font-weight: bold;">
          🏥 Gestionnaire de Planning Internes
        </h1>
        <p style="font-size: 18px; color: #666; margin-top: 10px;">
          Application de gestion de planning automatique
        </p>
      </div>

      <!-- Status Card -->
      <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
          <h2 style="font-size: 28px; color: #10b981; margin: 0 0 10px 0; font-weight: bold;">
            Application Fonctionnelle !
          </h2>
          <p style="font-size: 16px; color: #666;">
            Nuxt.js 3 est correctement installé et configuré
          </p>
        </div>

        <!-- Progress -->
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="font-size: 18px; color: #333; margin: 0 0 15px 0; font-weight: 600;">
            📊 Progression :
          </h3>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px; line-height: 2;">
            <li>✅ Nuxt 3 installé</li>
            <li>✅ Configuration de base</li>
            <li>✅ Page d'accueil fonctionnelle</li>
            <li>⏳ Styles CSS à ajouter</li>
            <li>⏳ MODULE 1 : Dashboard</li>
          </ul>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin-top: 30px;">
          <button 
            @click="handleClick"
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 18px; font-weight: 600; padding: 15px 40px; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;"
            @mouseover="$event.target.style.transform = 'scale(1.05)'"
            @mouseout="$event.target.style.transform = 'scale(1)'"
          >
            🚀 Valider et Passer à la Suite
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; color: white; font-size: 14px; opacity: 0.9;">
        <p>Propulsé par Nuxt.js 3 + Vue 3</p>
      </div>
    </div>

  </div>
</template>

<script setup>
const handleClick = () => {
  alert('🎉 Page validée !\n\nProchaine étape : Ajouter les styles et développer le MODULE 1')
}
</script>
