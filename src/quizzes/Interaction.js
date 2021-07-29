export default class Interaction {
  constructor(i = {}) {
    this.isCorrect = i.isCorrect || false
    this.key_presses = i.key_presses || 0 // count
  }
}