<template>
  <div>
    <navigation />
    <div class="px-5 my-3">
      <h1>Achievements</h1>
      <h2>Your Achievements...</h2>

      <QuizCard 
        v-for="goal in list" 
        :key="goal.title"
        :title="goal.title"
        :subtitle="goal.desc"
        :icon="getValue(goal.getter)>=goal.threshold?'award-fill':null"
        :badge-text="getValue(goal.getter)<goal.threshold?`${getValue(goal.getter)} / ${goal.threshold}`:null"
        :variant="getValue(goal.getter)>=goal.threshold?'success':'secondary'"
        :progress-data="{value:getValue(goal.getter),max:goal.threshold}"
      />

    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import { mapGetters } from 'vuex'
import QuizCard from '../components/QuizCard.vue'

export default {
  name: 'settings',
  components: { Navigation, QuizCard },
  computed: {
    ...mapGetters('achievements', ['list'])
  },
  methods: {
    getValue(getter) {
      return this.$store.getters[`achievements/${getter}`]
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--primary);
  margin-bottom: 0.2rem;
  font-size: 24px;
  font-weight: bold;
}
h2 {
  color: var(--secondary);
  margin-bottom: 2rem;
  font-size: 14px;
  font-weight: bold;
}
.footer-links {
  padding: 25px 0;
  background: linear-gradient(135deg, var(--color-cultured), #ffffffa1);
  box-shadow: 6px 6px 13px rgba(196, 196, 196, 0.2), -6px -6px 13px rgba(255, 255, 255, 0.6);
  text-align: center;
}
</style>