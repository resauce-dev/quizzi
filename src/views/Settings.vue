<template>
  <div>
    <navigation />
    <div class="px-5 my-3">
      <h1>Settings</h1>
      <h2>Your Preferences...</h2>

      <btn-install />
      <btn-notification />
      <btn-vibrate />
      <btn-audio />

    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import BtnInstall from '@/components/buttons/BtnInstall.vue'
import BtnNotification from '@/components/buttons/BtnNotification.vue'
import BtnVibrate from '../components/buttons/BtnVibrate.vue'
import BtnAudio from '../components/buttons/BtnAudio.vue'

export default {
  name: 'settings',
  components: { Navigation, BtnInstall, BtnNotification, BtnVibrate, BtnAudio }
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
p {
  font-size: 12px;
}
</style>