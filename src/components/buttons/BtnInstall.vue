<template>
  <QuizCard 
    :disabled="!canInstall"
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
    ...mapGetters('settings', ['canInstall'])
  },
  methods: {
    async install() {
      if(!this.canInstall) return
      // Show the install prompt
      this.canInstall.prompt()
      // Wait for the user to respond to the prompt
      const { outcome } = await this.canInstall.userChoice
      // Optionally, send analytics event with outcome of user choice
      this.$gtag.event(`application_install_${outcome}`)
      // We've used the prompt, and can't use it again, throw it away
      this.$store.commit('settings/canInstallPrompt', null)
    }
  },
  created() {
    window.addEventListener(
      'appinstalled', 
      this.$gtag.event('application_installed'), 
      { once: true }
    )
  }
}
</script>