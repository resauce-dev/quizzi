<template>
  <div>
    <navigation hide-home />
    <div class="quizzes">
      <div class="type-toggle">
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'not-started' ? 'success' : 'secondary'" @click="toggleShowStatus('not-started')">Not Started</b-badge>
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'in-progress' ? 'success' : 'secondary'" @click="toggleShowStatus('in-progress')">In Progress</b-badge>
        <b-badge class="type-toggle-button" pill :variant="showQuizzesWithStatus === 'completed' ? 'success' : 'secondary'" @click="toggleShowStatus('completed')">Completed</b-badge>
      </div>
      <div class="text-center">
        <a href="#" class="quizLength" @click="loadQuizzes">
          <b-icon icon="arrow-clockwise" scale="1.5" class="mr-2" variant="primary" aria-hidden="true"></b-icon>
          Check for updates
        </a>
      </div>
      <div v-if="filteredQuizzes.length > 0">
        <QuizCard 
          v-for="quiz in filteredQuizzes" 
          :quiz="quiz" 
          :key="quiz.name"
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
      <p class="mt-5 text-center">
        <small>
          <router-link to="/about">About Quizzi</router-link>
          —
          <router-link to="/privacy">Privacy Policy</router-link>
        </small>
      </p>
    </div>
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
    ...mapGetters(['quizzes']),
    filteredQuizzes() {
      if(!this.quizzes) return []
      if(!this.showQuizzesWithStatus) {
        return this.quizzes
      }
      return this.quizzes.filter(q => this.showQuizzesWithStatus.includes(q.getStatus()))
    }
  },
  methods: {
    async loadQuizzes() {
      return await this.$store.dispatch('fetchQuizzes')
    },
    toggleShowStatus(status) {
      if(this.showQuizzesWithStatus === status) {
        return this.showQuizzesWithStatus = null
      }
      return this.showQuizzesWithStatus = status 
    }
  },
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

</style>