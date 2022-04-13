<template>
  <div>
    <navigation show-settings hide-back/>
    <div class="quizzes">
      <div class="type-toggle">
        <b-badge href="#" class="type-toggle-button" pill :variant="getVariant('not-started')" @click="toggleShowStatus('not-started')">Not Started</b-badge>
        <b-badge href="#" class="type-toggle-button" pill :variant="getVariant('in-progress')" @click="toggleShowStatus('in-progress')">In Progress</b-badge>
        <b-badge href="#" class="type-toggle-button" pill :variant="getVariant('completed')" @click="toggleShowStatus('completed')">Completed</b-badge>
      </div>
      <div v-if="filteredQuizzes.length > 0">
        <transition-group tag="div" name="slide-in" :style="{ '--total': filteredQuizzes.length }">
          <QuizCard 
            :style="{'--i': i}"
            v-for="(quiz, i) in filteredQuizzes" 
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
        </transition-group>
      </div>
      <div v-else class="py-5 text-center w-75 m-auto text-muted">
        <div v-if="quizzes.length < 1">
          <p>
            Sorry! We don't appear to have any Quizzes available right now. 
            <br><br>
            Please check back later...
          </p>
        </div>
        <!-- <div v-else-if="showQuizzesWithStatus === 'not-started'">
          <p>Congratulations, you've completed all our quizzes at this time! </p>
          <p>More coming soon... </p>
        </div> -->
        <div v-else>
          <p>You don't currently have any quizzes {{ showQuizzesWithStatus }}...</p>
          <p><b-button variant="neo" class="mt-5" size="lg" @click="toggleShowStatus('not-started')">show all quizzes</b-button></p>
        </div>
      </div>  

      <hr>

      <QuizCard 
        title="My Achievements"
        subtitle="See what you've achieved!"
        icon="controller"
        variant="success"
        :compact="true"
        :link="{to:`/achievements`, alt:'My Achievements'}"
      />

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
  data: () => ({
    showQuizzesWithStatus: null
  }),
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
    getVariant(key) {
      return this.showQuizzesWithStatus === key ? 'success' : 'secondary'
    },
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
  },
  created() {
    this.$store.dispatch('quiz/fetchQuizzes')
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


// Transition
.slide-in {
  &-move {
    transition: opacity .5s linear, transform .5s ease-in-out;
  }
  &-leave-active {
    transition: opacity .4s linear, transform .4s cubic-bezier(.5,0,.7,.4); //cubic-bezier(.7,0,.7,1); 
    // transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
  }
  &-enter-active { 
    transition: opacity .5s linear, transform .5s cubic-bezier(.2,.5,.1,1);
    transition-delay: calc( 0.1s * var(--i) );
  }
  &-enter, 
  &-leave-to {
    opacity: 0;
  }
  &-enter { transform: translateX(-500px); }
  &-leave-to { transform: translateX(500px); }
}


</style>