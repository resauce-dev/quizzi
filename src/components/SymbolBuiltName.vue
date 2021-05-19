<template>
  <div class="word-container">
    <div class="d-flex word" v-for="(word, wordi) in symbol.getNames().words" :key="word">
      <div v-for="(letter, letteri) in word" :key="`${letteri}_${letter}`" class="letter" :class="letter === ' ' ? 'space' : ''"> 
        {{ getLetter(wordi, letteri) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'symbol-built-name',
  props: {
    symbol: {
      type: Object,
      required: true
    }
  },
  methods: {
    getLetter(wordi, letteri) {
      let offsetCount = 0;
      this.symbol.getNames().words.forEach((word, i) => {
        if(i >= wordi) { return }
        offsetCount = offsetCount + word.length
      })
      let letterIndex = offsetCount ? offsetCount + letteri : letteri

      if(this.symbol.isCorrect()) {
        return this.symbol.getNames().stripped[letterIndex]
      }
      return this.symbol.getBuiltName()[letterIndex]
    }
  }
}
</script>

<style scoped>
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