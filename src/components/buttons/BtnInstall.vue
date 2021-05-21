<template>
  <QuizCard 
    :disabled="!installPrompt"
    :compact="true"
    title="Install App"
    subtitle="Save your progress"
    icon="app-indicator"
    variant="info"
    @click="install"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('app', ['installPrompt'])
  },
  methods: {
    async install() {
      // Show the install prompt
      this.installPrompt.prompt()
      // Wait for the user to respond to the prompt
      const { outcome } = await this.installPrompt.userChoice
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`)
      // We've used the prompt, and can't use it again, throw it away
      this.$store.commit('app/setInstallPrompt', null)
    }
  },
  created() {
    window.addEventListener('appinstalled', (evt) => {
      console.log('App Installed: BtnInstall', evt);
    });
  }
}
</script>