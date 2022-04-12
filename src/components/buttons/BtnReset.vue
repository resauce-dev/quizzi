<template>
  <QuizCard 
    :compact="true"
    title="Reset All Progress"
    icon="x-octagon-fill"
    variant="danger"
    subtitle="All gameplay progress will be lost"
    @click="reset"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QuizCard },
  computed: {
    ...mapGetters('settings', ['canPlayAudio']),
  },
  methods: {
    async reset() {
      if(!confirm('Are you sure you would like to reset, all progress will be lost!')) return
      await this.$store.commit('questions/clearInteractions')
      return this.$router.push('quizzes') 
    }
  }
}
</script>