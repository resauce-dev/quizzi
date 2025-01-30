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
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('settings', ['canVibrate']),
    iconInfo() {
      if(this.canVibrate) return {icon: faCheck, variant: 'success', subtitle: 'Enabled', disabled: true}
      return {icon: faXmark, variant: 'danger', subtitle: 'Disabled', disabled: true}
    }
  },
  methods: {
    async toggle() {
      return await this.$store.commit('settings/toggleCanVibrate')
    }
  }
}
</script>