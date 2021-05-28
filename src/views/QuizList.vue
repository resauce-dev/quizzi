<template>
  <div>
    <navigation hide-home />
    <div class="quizzes">
      <div class="type-toggle">
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'not-started' ? 'success' : 'secondary'" @click="toggleShowStatus('not-started')">Not Started</b-badge>
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'in-progress' ? 'success' : 'secondary'" @click="toggleShowStatus('in-progress')">In Progress</b-badge>
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'completed' ? 'success' : 'secondary'" @click="toggleShowStatus('completed')">Completed</b-badge>
      </div>
      <div v-if="filteredQuizzes.length > 0">
        <QuizCard 
          v-for="quiz in filteredQuizzes" 
          :key="quiz.name"
          :disabled="!isOnline && $store.getters['quiz/getQuestionCount'](quiz.id) < 1"
          :title="quiz.name"
          :subtitle="getQuizSubTitle(quiz)"
          :icon="getQuizIcon(quiz)"
          :variant="getQuizVariant(quiz)"
          :badge-text="$store.getters['quiz/getQuestionCount'](quiz.id) > 0 && !$store.getters['quiz/isQuizState'](quiz.id, 'completed') ? `${$store.getters['questions/countCorrectAnswers'](quiz.id)} / ${$store.getters['quiz/getQuestionCount'](quiz.id)}` : null"
          :progress-data="$store.getters['quiz/getQuestionCount'](quiz.id) > 0 ? {value:$store.getters['questions/countCorrectAnswers'](quiz.id),max:$store.getters['quiz/getQuestionCount'](quiz.id)} : null"
          :link="{to:`/quizzes/${quiz.id}`, alt:`Play ${quiz.name}`}"
        />
      </div>
      <div v-else class="py-5 text-center w-75 m-auto text-muted">
        <div v-if="quizzes.length < 1">
          <p>Sorry! We don't appear to have any Quizzes available right now</p>
        </div>
        <div v-else-if="showQuizzesWithStatus === 'not-started'">
          <p>Congratulations, you've completed all our quizzes at this time! </p>
          <p>More coming soon... </p>
        </div>
        <div v-else>
          <p>Ooops! You don't currently have any quizzes {{ showQuizzesWithStatus }}...</p>
          <p><b-button variant="neo" class="mt-5" @click="toggleShowStatus('not-started')">Start a quiz</b-button></p>
        </div>
      </div>   
    </div>
    <p class="footer-links mt-5 mb-4">
      <small>
        <router-link to="/about">About Quizzi</router-link>
        —
        <router-link to="/privacy">Privacy Policy</router-link>
      </small>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'
import QuizCard from '@/components/QuizCard.vue'

export default {
  name: 'Quiz-List',
  components: { Navigation, QuizCard },
  data() {
    return {
      showQuizzesWithStatus: null
    }
  },
  computed: {
    ...mapGetters('app', ['isOnline']),
    ...mapGetters('quiz', {quizzes: 'getQuizList'}),
    ...mapGetters('quiz', ['getQuiz','isCached']),
    filteredQuizzes() {
      if(!this.quizzes) return []
      if(!this.showQuizzesWithStatus) {
        return this.quizzes
      }
      return this.quizzes.filter(quiz => this.showQuizzesWithStatus.includes(
        this.$store.getters['quiz/getQuizState'](quiz.id)
      ))
    }
  },
  methods: {
    getQuizSubTitle(quiz) {
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started') && !this.isCached(quiz.id)) return 'Tap to download'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started')) return 'Start this quiz'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'in-progress')) return 'In progress...'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'completed')) return 'You\'ve completed this quiz!'
      return 'Missing Title'
    },
    getQuizIcon(quiz) {
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started') && !this.isCached(quiz.id) && !this.isOnline) return 'wifi-off'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started') && !this.isCached(quiz.id)) return 'cloud-download'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started')) return null
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'in-progress')) return null
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'completed')) return 'check2-circle'
      return null
    },
    getQuizVariant(quiz) {
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started') && !this.isCached(quiz.id) && !this.isOnline) return 'secondary'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started') && !this.isCached(quiz.id)) return 'primary'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'not-started')) return 'primary'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'in-progress')) return 'warning'
      if(this.$store.getters['quiz/isQuizState'](quiz.id, 'completed')) return 'success'
      return null
    },
    toggleShowStatus(status) {
      return this.showQuizzesWithStatus = 
        this.showQuizzesWithStatus === status 
        ? null 
        : status
    },
    install() {
      alert('Installing App')
    }
  }
}
</script>

<style lang="scss" scoped>
.quizzes {
  padding: 25px;
}
.type-toggle {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 40px;
}
.type-toggle-button {
  cursor: pointer;
}
.badge-success {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.link {
  cursor: pointer;
  color: var(--blue);
}
.footer-links {
  padding: 25px 0;
  background: linear-gradient(135deg, var(--color-cultured), #ffffffa1);
  box-shadow: 6px 6px 13px rgba(196, 196, 196, 0.2), -6px -6px 13px rgba(255, 255, 255, 0.6);
  text-align: center;
}
</style>