<template>
  <main class="main">
    <navigation />
    <div class="quiz" v-if="quiz">
      <div class="header neo-shadow">
        <h2 class="header-title">{{quiz.name}}</h2>
        <p class="header-body">
          <template v-if="$store.getters['quiz/isQuizState'](quiz.id, 'not-started')">This quiz hasn't been started yet</template>
          <template v-else-if="$store.getters['quiz/isQuizState'](quiz.id, 'completed')">Congratulations, you've completed this quiz!</template>
          <template v-else-if="$store.getters['quiz/isQuizState'](quiz.id, 'in-progress')">In progress...</template>
        </p>
      </div>
      <div class="mt-4 d-flex justify-content-center" v-if="incorrectLetterPresses > 0 && quizIsComplete">
        <p class="incorrect-letters">
          {{incorrectLetterPresses}} Letter{{incorrectLetterPresses===1?'':'s'}} undone
        </p>
      </div>
      <div class="grid grid-cols-5 gap-4 mt-3" v-if="quiz.questions">
        <router-link
          v-for="(question, index) in quiz.questions" 
          :key="`question_${index}`" 
          :to="`/quizzes/${quiz.id}/${index + 1}`"
          :alt="`Attempt question ${index + 1}`"
          v-slot="{ href, route, navigate }">
          <q-button 
            class="grow py-3 w-full question-button" 
            :class="$store.getters['questions/isQuestionCorrect'](quiz.id, question.id) ? 'text-success' : ''" 
            variant="neo" 
            :href="href" 
            @click="navigate">
            Q{{ index + 1 }}
          </q-button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import QButton from '@/components/QButton.vue'

export default {
  name: 'Quiz',
  components: { Navigation, QButton },
  data() {
    return {
      quiz: this.$store.getters['quiz/getQuiz'](this.$route.params.quiz)
    }
  },
  watch: {
    quiz (newQuizData) { this.quiz = newQuizData }
  },
  computed: {
    incorrectLetterPresses() {
      const total = this.$store.getters['questions/lettersPressed'](this.quiz.id)
      const pressed = this.$store.getters['questions/lettersTotal'](this.quiz.id)
      return total - pressed
    },
    quizIsComplete() {
      return this.$store.getters['quiz/isQuizCompleted'](this.quiz.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.quiz {
  text-align: center;
  padding: 25px;
}

.header {
  background-color: white;
  border-radius: 5px;
  padding: 25px;
}

.header-title {
  color: var(--blue);
  font-size: 18px;
  font-weight: bold;
}
.header-body {
  font-size: 12px;
  color: var(--gray);
  margin: 0;
}

.incorrect-letters {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  box-shadow: 0px 3px 13px 2px #d6d6d6;
  border-radius: 50px;
  padding: 2px 12px;
  color: white;
  background: #ff2d2d99;
  margin: 0;
}
</style>