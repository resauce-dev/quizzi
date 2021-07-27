<template>
  <QuizCard 
    :compact="true"
    title="Notifications"
    :icon="cardInfo.icon"
    :variant="cardInfo.variant"
    :subtitle="cardInfo.subtitle"
    :disabled="cardInfo.disabled"
    @click="$store.dispatch('settings/toggleNotify')"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { mapGetters } from 'vuex'

const cardVariants = {
  // Notifications are neither enabled or disabled
  default: {icon: 'bell', variant: 'danger', subtitle: 'Disabled', disabled: false},
  // Notifications are disabled
  disabled: {icon: 'bell', variant: 'danger', subtitle: 'Disabled', disabled: false},
  // Notifications are enabled
  granted: {icon: 'bell', variant: 'success', subtitle: 'Enabled', disabled: false},
  // User blocked browser notifications.
  denied: {icon: 'bell', variant: 'danger', subtitle: 'Blocked', disabled: true},
  // No browser support for notifications 
  unsupported: {icon: 'bell', variant: 'danger', subtitle: 'Unsupported', disabled: true},
}

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('settings', ['isNotifyStatus','getNotifyStatus']),
    cardInfo() { 
      return cardVariants[this.getNotifyStatus] 
        ? cardVariants[this.getNotifyStatus] 
        : cardVariants.unsupported
    }
  }
}
</script>