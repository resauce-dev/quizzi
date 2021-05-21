<template>
  <QuizCard 
    :compact="true"
    title="Notifications"
    :icon="iconInfo.icon"
    :variant="iconInfo.variant"
    :subtitle="iconInfo.subtitle"
    :disabled="iconInfo.disabled"
    @click="requestNotifyPermission"
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
      if (!('Notification' in window) || !navigator.serviceWorker) return {icon: 'bell-fill', variant: 'danger', subtitle: 'Your browser doesn\'t support Notifications', disabled: true}
      if(this.isNotifyStatus('default')) return {icon: 'bell-fill', variant: 'info', subtitle: 'Click to Enable Notifications', disabled: false}
      if(this.isNotifyStatus('granted')) return {icon: 'bell-fill', variant: 'success', subtitle: 'You\'ve allowed Notifications', disabled: true}
      if(this.isNotifyStatus('denied')) return {icon: 'bell-fill', variant: 'danger', subtitle: 'You\'ve disallowed Notifications', disabled: true}
      return {icon: 'bell-slash-fill', variant: 'danger', subtitle: 'Something went wrong', disabled: true}
    }
  },
  methods: {
    async requestNotifyPermission() {
      return await this.$store.dispatch('settings/requestNotifyPermission')
    }
  }
}
</script>

<style>

</style>