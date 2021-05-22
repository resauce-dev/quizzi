<template>
  <div>
    <navigation />
    <div class="question mt-3 mb-5">
      <b-badge class="question-badge shadow mb-2" pill variant="primary">Question {{$route.params.symbol}}</b-badge>
      <div class="image-box my-3" :class="question.hasPadding ? 'p-3' : ''">
        <img 
          :src="question.image ? `${$store.getters['app/apiUrl']}/assets/${question.image.id}` : './img/unknown.svg'" 
          alt="Questionable Image" 
          class="image"
        >
      </div>     
      <symbol-built-name :symbol="question" />
      <div v-if="questionIsCorrect" class="pt-4">
        <success-check-mark />
        <div v-if="$store.getters['quiz/isQuizCompleted'](quiz.id)" class="mt-5">
          <p class="text-muted">Quiz Completed!</p>
          <router-link to="/quizzes" alt="Start another quiz">
            <b-button class="mt-4" variant="neo">
              start another
            </b-button>
          </router-link>
        </div>
        <div v-else-if="canProceed" class="mt-5">
          <router-link :to="`/quizzes/${$route.params.quiz}/${nextQuestionId}`" alt="Go to next symbol" ref="next">
            <b-button class="mt-5" variant="neo">
              Next Question <b-icon icon="caret-right" aria-hidden="true"></b-icon>
            </b-button>
          </router-link>
        </div>
        <div v-else class="mt-5">
          <router-link :to="`/quizzes/${$route.params.quiz}`" class="View all questions" ref="next">
            <b-button class="mt-5" variant="neo">
              <b-icon icon="caret-left" aria-hidden="true"></b-icon> Go Back 
            </b-button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div class="letters m-3">
          <b-button 
            v-for="(letter, index) in question.getLetters()" 
            :key="`${index}_${letter}`"
            variant="transparent" 
            :disabled="question.activeLetters.includes(index)"
            class="letter neo-shadow"
            @click="question.clickLetterIndex(index)">
            {{letter}}
          </b-button>
        </div>
        <div class="action-bar">
          <b-button size="sm" variant="outline-secondary" @click="question.undo()">
            <b-icon icon="arrow-counterclockwise" aria-label="Undo Last Letter"></b-icon> Undo Letter
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import charList from '@/quizzes/charList'
import Navigation from '@/components/Navigation'
import SuccessCheckMark from '@/components/SuccessCheckMark'
import SymbolBuiltName from '@/components/SymbolBuiltName'
import { Question } from '@/quizzes/classes'
import { mapGetters } from 'vuex'

export default {
  name: 'Quiz-Symbol',
  components: { Navigation, SuccessCheckMark, SymbolBuiltName},
  data() { 
    const questionWithOffset = parseInt(this.$route.params.symbol) - 1
    return { 
      quiz: this.$store.getters['quiz/getQuiz'](this.$route.params.quiz),
      question: new Question(this.$store.getters['quiz/getQuestion'](this.$route.params.quiz, questionWithOffset)),
    }
  },
  computed: {
    ...mapGetters('quiz', ['getQuestionCount']),
    /**
     * If the next generated ID doesn't exist, don't allow proceeding.
     */
    canProceed(){ return this.nextQuestionId < this.questionCount },
    lastQuestionId(){ return parseInt(this.$route.params.symbol) + 1 },
    nextQuestionId(){ return parseInt(this.$route.params.symbol) + 1 },
    questionCount(){ return this.getQuestionCount(this.quiz.id) },
    questionIsCorrect() { 
      return this.$store.getters['quiz/isQuestionCorrect'](this.quiz.id, this.question.id, this.question.getBuiltName()) 
    }
  },
  methods: {
    keyHandler(e) {
      if(this.$store.getters['quiz/isQuizCompleted'](this.quiz.id)) { return }
      let key = e.key.toUpperCase()
      
      let isValidCharacter = charList.indexOf(key) !== -1 

      switch (key) {
        case 'ENTER':
          if(this.$store.getters['quiz/isQuestionCorrect'](this.quiz.id, this.question.id))
            this.$refs.next.$el.click()
          break
        case 'BACKSPACE':
          this.question.undo()
          break
        default:
          if(isValidCharacter)
            this.question.findAndClickLetter(key)
          break
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.keyHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler)
  },
}

</script>

<style lang="scss" scoped>
.question {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.question-badge {
  margin-top: -1.5rem;
}

.image-box {
  background: #fff;
  border-radius: 5px;
  max-width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
}

.image {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  border-radius:5px;
  pointer-events: none;
}

.built-name {
  font-weight: bold;
  margin-bottom: 15px;
  letter-spacing: 2px;
  font-size: 18px;
  margin: 20px 0;
  color: var(--gray);
}

.letters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.letter,
.letter:hover {
  color: var(--gray);
}

.letter {
  --margin: 8px;
  flex-basis: calc(20% - (var(--margin) * 2));
  margin: var(--margin);

  min-height: 46px;

  padding: 5px;

  border: 1px solid transparent;
  text-shadow: 1px 1px 4px #c2bfbfab;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
}

.action-bar {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  background: #ececec;
  box-shadow: 0 -10px 10px -14px #000000a6
}

.neo-shadow[disabled] {
  opacity: 0.3;
  cursor: default;
  box-shadow: none;
  pointer-events: none;
}
</style>