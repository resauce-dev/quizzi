<template>
  <QuizCard 
    :compact="true"
    title="Notifications"
    :icon="iconInfo.icon"
    :variant="iconInfo.variant"
    :subtitle="iconInfo.subtitle"
    :disabled="iconInfo.disabled"
    @click="requestPermission"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'

export default {
  components: { QuizCard },
  data() {
    return {
      notifyPermission: Notification.permission
    }
  },
  computed: {
    iconInfo() {
      if (!('Notification' in window) || !navigator.serviceWorker) return {icon: 'bell-fill', variant: 'danger', subtitle: 'Your browser doesn\'t support Notifications', disabled: true}
      if(this.notifyPermission === 'default') return {icon: 'bell-fill', variant: 'info', subtitle: 'Click to Enable Notifications', disabled: false}
      if(this.notifyPermission === 'granted') return {icon: 'bell-fill', variant: 'success', subtitle: 'You\'ve allowed Notifications', disabled: true}
      if(this.notifyPermission === 'denied') return {icon: 'bell-fill', variant: 'danger', subtitle: 'You\'ve disallowed Notifications', disabled: true}
      return {icon: 'bell-slash-fill', variant: 'danger', subtitle: 'Something went wrong', disabled: true}
    }
  },
  methods: {
    async requestPermission() {
      this.notifyPermission = await Notification.requestPermission()
      console.info(`🎫 User ${this.notifyPermission} access to notifications`)
    }
  }
}
</script>

<style>

</style>