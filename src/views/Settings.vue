<template>
  <div>
    <navigation />
    <div class="wrapper">
      <h1>Settings</h1>
      <h2>Your Preferences...</h2>

      <btn-install />
      <btn-notification />
      <btn-vibrate />
      <btn-audio />
      <btn-reset />

    </div>
    <p class="footer-links mt-5 mb-4">
      <small>
        <router-link to="/about">About Quizzi</router-link>
        —
        <router-link to="/privacy">Privacy Policy</router-link>
      </small>
    </p>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import BtnInstall from '@/components/buttons/BtnInstall.vue'
import BtnNotification from '@/components/buttons/BtnNotification.vue'
import BtnVibrate from '@/components/buttons/BtnVibrate.vue'
import BtnAudio from '@/components/buttons/BtnAudio.vue'
import BtnReset from '@/components/buttons/BtnReset.vue'

export default {
  name: 'settings',
  components: { 
    Navigation, 
    BtnInstall, BtnNotification, BtnVibrate, BtnAudio, BtnReset 
  }
}
</script>

<style scoped>
h1 {
  color: var(--primary);
  margin-bottom: 0.2rem;
  font-size: 24px;
  font-weight: bold;
}
h2 {
  color: var(--secondary);
  margin-bottom: 2rem;
  font-size: 14px;
  font-weight: bold;
}
.wrapper {
  padding: 25px;
}
.footer-links {
  padding: 25px 0;
  background: linear-gradient(135deg, var(--color-cultured), #ffffffa1);
  box-shadow: 6px 6px 13px rgba(196, 196, 196, 0.2), -6px -6px 13px rgba(255, 255, 255, 0.6);
  text-align: center;
}
</style>