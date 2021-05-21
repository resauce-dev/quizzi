<template>
  <div>
    <navigation />
    <div class="symbol p-3 pb-5">
      <b-badge class="symbol-badge shadow mb-2" pill variant="primary">Symbol {{$route.params.symbol}}</b-badge>
      <div class="image-box my-3" :class="symbol.hasPadding ? 'p-3' : ''">
        <img :src="symbol.getImageUrl()" alt="Questionable Image" class="image">
      </div>     
      <symbol-built-name :symbol="symbol" />
      <div class="pt-4" v-if="symbol.isCorrect()">
        <success-check-mark />
        <div v-if="quiz.isCompleted()" class="mt-5">
          <p class="text-muted">Quiz Completed!</p>
          <router-link to="/quizzes" alt="Start another quiz">
            <b-button class="mt-4" variant="neo">
              start another
            </b-button>
          </router-link>
        </div>
        <div v-else-if="canProceed" class="mt-5">
          <router-link :to="`/quizzes/${$route.params.quiz}/${nextSymbolId}`" alt="Go to next symbol" ref="next">
            <b-button class="mt-5" variant="neo">
              Next Symbol <b-icon icon="caret-right" aria-hidden="true"></b-icon>
            </b-button>
          </router-link>
        </div>
        <div v-else class="mt-5">
          <router-link :to="`/quizzes/${$route.params.quiz}`" class="View all symbols" ref="next">
            <b-button class="mt-5" variant="neo">
              <b-icon icon="caret-left" aria-hidden="true"></b-icon> Go Back 
            </b-button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div class="letters m-3">
          <b-button 
            v-for="(letter, index) in symbol.getLetters()" 
            :key="`${index}_${letter}`"
            variant="transparent" 
            :disabled="symbol.activeLetters.includes(index)"
            class="letter neo-shadow"
            @click="symbol.clickLetterIndex(index)">
            {{letter}}
          </b-button>
        </div>
        <div class="action-bar">
          <b-button size="sm" variant="outline-secondary" @click="symbol.undo()">
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
export default {
  name: 'Quiz-Symbol',
  components: { Navigation, SuccessCheckMark, SymbolBuiltName},
  data() { 
    const symbolIdOffsetted = parseInt(this.$route.params.symbol) - 1
    return { 
      quiz: this.$store.getters.getQuiz(this.$route.params.quiz),
      symbol: this.$store.getters.getQuizSymbol(this.$route.params.quiz, symbolIdOffsetted),
    }
  },
  computed: {
    nextSymbolId() {
      return parseInt(this.$route.params.symbol) + 1
    },
    symbolCount() {
      return this.quiz.symbols.length + 1
    },
    /**
     * If the next generated ID doesn't exist, don't allow proceeding.
     */
    canProceed() {
      return this.nextSymbolId < this.symbolCount;
    }
  },
  methods: {
    keyHandler(e) {
      if(this.quiz.isCompleted()) { return }
      let key = e.key.toUpperCase()
      
      let isValidCharacter = charList.indexOf(key) !== -1 

      switch (key) {
        case 'ENTER':
          if(this.symbol.isCorrect())
            this.$refs.next.$el.click()
          break
        case 'BACKSPACE':
          this.symbol.undo()
          break
        default:
          if(isValidCharacter)
            this.symbol.findAndClickLetter(key)
          break
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.keyHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler);
  },
}

</script>

<style lang="scss" scoped>
.symbol {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.symbol-badge {
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