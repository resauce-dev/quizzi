<template>
  <QuizCard 
    :compact="true"
    title="Device Vibration"
    :icon="iconInfo.icon"
    :variant="iconInfo.variant"
    :subtitle="iconInfo.subtitle"
    @click="toggle"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('settings', ['canVibrate']),
    iconInfo() {
      if(this.canVibrate) return {icon: 'phone-vibrate', variant: 'success', subtitle: 'Enabled', disabled: true}
      return {icon: 'phone-vibrate', variant: 'danger', subtitle: 'Disabled', disabled: true}
    }
  },
  methods: {
    async toggle() {
      return await this.$store.commit('settings/toggleCanVibrate')
    }
  }
}
</script>

<style>

</style>