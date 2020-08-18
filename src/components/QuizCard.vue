<template>
  <div class="card neo-shadow">
    <router-link class="p-3" :to="`/quizzes/${quiz.slug}`" :alt="`Play ${quiz.name}`">
      <div class="content">
        <div>
          <h2 class="card-title">{{quiz.name}}</h2>
          <p class="card-subtitle">
            <template v-if="quiz.getStatus() === 'not-started'">Start this quiz</template>
            <template v-else-if="quiz.getStatus() === 'completed'">More coming soon</template>
            <template v-else-if="quiz.getStatus() === 'in-progress'">In progress</template>
          </p>
        </div>
        <b-badge pill class="ml-3" :variant="quiz.isCompleted() ? 'success' : 'danger'">{{correctCount}} / {{quizLength}} <span class="sr-only">unread messages</span></b-badge>
      </div>
      <b-progress height="0.4rem" :value="correctCount" :max="quizLength" variant="success"></b-progress>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'QuizCard',
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quizLength: this.quiz.getSymbolCount(),
      correctCount: this.quiz.getCorrectCount(),
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px 0;
  width: 100%;
  min-height: 80px;
  border: 1px solid transparent;
  color: var(--color-raisin)
}
.card:hover {
    transform: scale(1.02);
    color: var(--blue);
}
.card:focus {
  outline: 0;
}

.card,
.card:hover,
.card:focus,
.card:active {
  transition: all 0.28s;
}

a {
  text-decoration: none;
  color: inherit;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
}

.card-title {
  font-weight: bold;
  color: inherit;
  font-size: 14px;
  margin: 0;
}

.card-subtitle {
  color: var(--gray);
  margin: 0;
  font-size: 12px;
  margin-top: 5px;
}

.progress {
  box-shadow: inset -1px -1px 12px -12px black
}
</style>
