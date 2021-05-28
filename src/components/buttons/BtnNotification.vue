<template>
  <QuizCard 
    :compact="true"
    title="Notifications"
    :icon="iconInfo.icon"
    :variant="iconInfo.variant"
    :subtitle="iconInfo.subtitle"
    :disabled="iconInfo.disabled"
    @click="determineStatus"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('settings', ['isNotifyStatus']),
    iconInfo() {
      if (!('Notification' in window)) return {icon: 'bell-fill', variant: 'danger', subtitle: 'Unsupported', disabled: true}
      if(this.isNotifyStatus('default')) return {icon: 'bell', variant: 'info', subtitle: 'Click to Enable Notifications', disabled: false}
      if(this.isNotifyStatus('granted')) return {icon: 'bell', variant: 'success', subtitle: 'Enabled', disabled: false}
      if(this.isNotifyStatus('disabled')) return {icon: 'bell', variant: 'danger', subtitle: 'Disabled', disabled: false}
      if(this.isNotifyStatus('denied')) return {icon: 'bell', variant: 'danger', subtitle: 'You\'ve disallowed Notifications', disabled: true}
      return {icon: 'bell-fill', variant: 'danger', subtitle: 'Something went wrong', disabled: true}
    }
  },
  methods: {
    determineStatus() {
      if(this.isNotifyStatus('default')) {
        this.$store.dispatch('settings/requestNotifyPermission')
      } else {
        this.$store.commit('settings/toggleNotifyStatus')
      }
    }
  }
}
</script>

<style>

</style>