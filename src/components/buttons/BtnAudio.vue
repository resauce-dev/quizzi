<template>
  <QuizCard 
    :compact="true"
    title="Audio & Sounds"
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
    ...mapGetters('settings', ['canPlayAudio']),
    iconInfo() {
      if(this.canPlayAudio) return {icon: 'volume-up', variant: 'success', subtitle: 'Enabled', disabled: true}
      return {icon: 'volume-mute', variant: 'danger', subtitle: 'Disabled', disabled: true}
    }
  },
  methods: {
    async toggle() {
      return await this.$store.commit('settings/toggleCanPlayAudio')
    }
  }
}
</script>