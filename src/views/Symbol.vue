<template>
  <div>
    <navigation />
    <div class="question mt-3 mb-5">
      <b-badge class="question-badge shadow mb-2" pill variant="primary">Question {{$route.params.question}}</b-badge>
      <div class="image-box my-3" :class="question.hasPadding ? 'p-3' : ''">
        <img 
          :src="question.image ? `${$store.getters['app/apiUrl']}/assets/${question.image.id}` : './img/unknown.svg'" 
          alt="Questionable Image" 
          class="image"
        >
      </div>     
      <small class="text-muted" v-if="isDevelopment">{{question.name}}</small>
      <template>
        <div class="word-container">
          <div class="d-flex word" v-for="(word, wordi) in getQuestionNames().words" :key="word">
            <div v-for="(letter, letteri) in word" :key="`${letteri}_${letter}`" class="letter" :class="letter === ' ' ? 'space' : ''"> 
              {{ getLetter(wordi, letteri) }}
            </div>
          </div>
        </div>
      </template>
      <div v-if="isActiveQuestionCorrect" class="pt-4">
        <success-check-mark />
        <div v-if="quizIsCompleted" class="mt-5">
          <p class="text-muted">Quiz Completed!</p>
          <router-link to="/quizzes" alt="Start another quiz" ref="next">
            <b-button class="mt-4" variant="neo">
              start another
            </b-button>
          </router-link>
        </div>
        <div v-else-if="canProceed" class="mt-5">
          <router-link :to="`/quizzes/${$route.params.quiz}/${nextQuestionId}`" alt="Go to next question" ref="next">
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
            v-for="(letter, index) in getQuestionLetters()" 
            :key="`${index}_${letter}`"
            variant="transparent" 
            :disabled="activeLetters.includes(index)"
            class="letter neo-shadow"
            @click="letterClickIndex(index)">
            {{letter}}
          </b-button>
        </div>
        <div class="action-bar">
          <b-button size="sm" variant="outline-secondary" @click="letterUndo()">
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
import { mapGetters } from 'vuex'
import { shuffleArray, getRandomString, stripSpaces } from '@/quizzes/methods'

export default {
  name: 'Quiz-Question',
  components: { Navigation, SuccessCheckMark },
  data() { 
    const questionWithOffset = parseInt(this.$route.params.question) - 1
    return { 
      isDevelopment:process.env.NODE_ENV === 'development',
      quiz: this.$store.getters['quiz/getQuiz'](this.$route.params.quiz),
      question: this.$store.getters['quiz/getQuestion'](this.$route.params.quiz, questionWithOffset),
      availableLetters: null,
      activeLetters: [], // Indexes
    }
  },
  computed: {
    ...mapGetters('quiz', ['getQuestionCount']),
    ...mapGetters('questions', ['isActiveQuestionCorrect']),
    /**
     * If the next generated ID doesn't exist, don't allow proceeding.
     */
    canProceed(){ return this.nextQuestionId <= this.questionCount },
    lastQuestionId(){ return parseInt(this.$route.params.question) + 1 },
    nextQuestionId(){ return parseInt(this.$route.params.question) + 1 },
    questionCount(){ return this.getQuestionCount(this.quiz.id) },
    quizIsCompleted() { return this.$store.getters['quiz/isQuizCompleted'](this.quiz.id) },
    userAnswer() {
      let builtName = ""
      this.activeLetters.forEach(letterIndex => {
        builtName = builtName + this.availableLetters[letterIndex]
      })
      return builtName
    },
  },
  methods: {
    keyHandler(e) {
      // Only use the last letter input
      const key = e.key.toUpperCase()

      // Process the key-press
      let isValidCharacter = charList.indexOf(key) !== -1 
      switch (key) {
        case 'ENTER':
          // Only proceed if the quesiton is correct
          if(this.isActiveQuestionCorrect)
            this.$refs.next.$el.click()
          if(this.isActiveQuestionCorrect)
            this.$refs.next.$el.click()
          break
        case 'BACKSPACE':
          // Only undo if the question is not already completed
          if(!this.isActiveQuestionCorrect)
            this.letterUndo()
          break
        default:
          // Only process if the question is not already completed
          if(isValidCharacter && !this.isActiveQuestionCorrect)
            this.findAndClickLetter(key)
          break
      }
    },
    getQuestionLetters() {
      if(this.availableLetters) return this.availableLetters
      let name = this.getQuestionNames().stripped
      let string = getRandomString( name.length * 2 )
      let letterArray = (name + string).toUpperCase().split("")
      this.availableLetters = shuffleArray(letterArray)
      return this.availableLetters
    },
    getQuestionNames() {
      return {
        'stripped': stripSpaces(this.question.name.toUpperCase()),
        'words': this.question.name.toUpperCase().split(/[\s-]/)
      }
    },
    letterClickIndex(letterIndex) {
      if(!this.availableLetters[letterIndex]) { throw `The selected letter doesn't exist`  }
      if(this.userAnswer.length === this.getQuestionNames().stripped.length) return
      this.activeLetters.push(letterIndex)

      // Log a key-press increment
      this.$store.commit('questions/incrementKeyPress')

      // Play a key-press sound
      if(this.$store.getters['settings/canPlayAudio']) {
        (new Audio("/audio/key_press.wav")).play()
      }

      // Check to see if new interaction is correct.
      if(this.userAnswer.length === this.getQuestionNames().stripped.length) {
        this.$store.dispatch('questions/checkAnswer', this.userAnswer)
      }
    },
    letterUndo() {
      if(this.isActiveQuestionCorrect) return
      this.activeLetters = this.activeLetters.slice(0, -1)
    },


    findAndClickLetter(letter) {
      if(this.isActiveQuestionCorrect) return
      let letterIndex = this.getLetterIndex(letter)
      this.letterClickIndex(letterIndex)
    },
    getLetterIndex(letter, start = 0) {
      let index = this.getQuestionLetters().indexOf(letter, start)
      if(this.activeLetters.includes(index)) {
        index = this.getLetterIndex(letter, index + 1)
      }
      return index
    },

    // For built-name-question
    getLetter(wordi, letteri) {
      let offsetCount = 0
      this.getQuestionNames().words.forEach((word, i) => {
        if(i >= wordi) return
        offsetCount = offsetCount + word.length
      })
      let letterIndex = offsetCount ? offsetCount + letteri : letteri

      if(this.isActiveQuestionCorrect) return this.getQuestionNames().stripped[letterIndex]

      return this.userAnswer[letterIndex]
    },

  },
  created() {
    this.$store.commit('questions/setActiveQuizId', this.$route.params.quiz)
    this.$store.commit('questions/setActiveQuestionId', this.question.id)

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

//built-name
.word-container {
  display: flex !important;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 375px;
}

.word {
  margin: 0.2em 0.5em;
}

.letter {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1.8em;
  min-height: 1.8em;
  margin: 2px;
  color: var(--gray);
  background: white;
  border-radius: 5px;
  text-shadow: 1px 1px 2px #cfcfcf;
}

.letter.space {
  background: transparent;
}
</style>