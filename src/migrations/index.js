import Interaction from '@/quizzes/Interaction'
import v1_answer_mapping from './v1_answer_mapping'

export default {
  methods: {
    async migrate_v1() {
      const v1Answers = JSON.parse(localStorage.getItem('completedSymbols'));
      if(!v1Answers) return;
  
      const validQuizIds = Object.keys(v1_answer_mapping)
  
      // Migrate old answers to new structure
      let interactions = {}
      v1Answers.forEach(answeredId => {
        if(!validQuizIds.includes(answeredId)) return // Invalid Key
        const category = v1_answer_mapping[answeredId]
        if(!interactions[category]) interactions[category] = {}
        interactions[category][answeredId] = new Interaction({"isCorrect":true})
      })
  
      // Fetch the data and assets for any quizzes started
      const quizIdsAttempted = Object.keys(interactions)
      quizIdsAttempted.forEach(async qid => {
        await this.$store.dispatch('quiz/fetchQuiz', qid)
        await this.$store.dispatch('quiz/fetchQuizAssets', qid)
      })
  
      // Update store with migrated V1 answers
      await this.$store.commit('questions/setAllInteractions', interactions)
  
      // Remove V1
      return localStorage.removeItem('completedSymbols')
    }
  },
  async mounted() {
    await this.migrate_v1()
  }
}