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
      <div class="sym-container mt-3" v-if="quiz.questions">
        <router-link
          v-for="(question, index) in quiz.questions" 
          :key="`question_${index}`" 
          :to="`/quizzes/${id}/${index + 1}`"
          :alt="`Attempt question ${index + 1}`"
          v-slot="{ href, route, navigate }">
          <q-button 
            class="question-button" 
            :class="$store.getters['questions/isQuestionCorrect'](id, question.id) ? 'text-success' : ''" 
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
import Navigation from '@/components/Navigation'
import QButton from '@/components/QButton'

export default {
  name: 'Quiz',
  components: { Navigation, QButton },
  data() { 
    return {
      id: this.$route.params.quiz,
      quiz: this.$store.getters['quiz/getQuiz'](this.$route.params.quiz),
    }
  },
  watch: {
    quiz (newQuizData) {
      this.quiz = newQuizData
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

.sym-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.question-button {
    --margin: 0.5rem;
    --font-size: 16px;
    flex-basis: calc(25% - (var(--margin) * 2));
    margin: var(--margin);
    font-size: var(--font-size) !important;
    height: calc(50px + var(--font-size));
    width: calc(25% - (var(--margin) * 2));
    padding: 0!important;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>