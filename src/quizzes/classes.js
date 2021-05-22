import { shuffleArray, getRandomString, stripSpaces } from './methods'

class Question {
  /**
   * Question database model to be provided
   * 
   * @param {*} question 
   */
  constructor(question) {
    this.id = question.id
    this.name = question.name.toUpperCase()
    this.image = question.image
    this.hasPadding = question.has_padding

    this.availableLetters = null
    this.activeLetters = [] // Indexes
    this.isPlayable = false
  }
  enable() {
    this.isPlayable = true
  }
  getNames() {
    return {
      'stripped': stripSpaces(this.name),
      'words': this.name.split(/[\s-]/)
    }
  }
  getLetters() {
    if(this.availableLetters) return this.availableLetters
    let name = this.getNames().stripped
    let string = getRandomString( name.length * 2 )
    let letterArray = (name + string).toUpperCase().split("")
    this.availableLetters = shuffleArray(letterArray)
    return this.availableLetters
  }
  getBuiltName() {
    let builtName = ""
    this.activeLetters.forEach(letterIndex => {
      builtName = builtName + this.availableLetters[letterIndex]
    })
    return builtName
  }
  findAndClickLetter(letter) {
    if(this.isCorrect()) { return }
    let letterIndex = this.getLetterIndex(letter)
    this.clickLetterIndex(letterIndex)
  }
  getLetterIndex(letter, start = 0) {
    let index = this.getLetters().indexOf(letter, start)
    if(this.activeLetters.includes(index)) {
      index = this.getLetterIndex(letter, index + 1)
    }
    return index
  }
  clickLetterIndex(letterIndex) {
    if(!this.availableLetters[letterIndex]) { throw `The selected letter doesn't exist`  }
    if(this.getBuiltName().length === this.getNames().stripped.length) { return }
    this.activeLetters.push(letterIndex)
  }
  isCorrect() {
    let list = JSON.parse(localStorage.getItem('completedSymbols'))
    const isCorrect = this.getNames().stripped === this.getBuiltName()
    if(!list) {
      list = []
      localStorage.setItem('completedSymbols', JSON.stringify(list))
    }

    if(isCorrect && !list.includes(this.id)) {
      list.push(this.id)
      localStorage.setItem('completedSymbols', JSON.stringify(list))
    }

    return list.includes(this.id)
  }
  undo() {
    if(this.isCorrect()) { return }
    this.activeLetters = this.activeLetters.slice(0, -1)
  }
}
  
class Quiz {
  /**
   * Quiz database model to be provided
   * 
   * @param {*} quiz 
   */
  constructor(quiz) {
    this.id = quiz.id
    this.name = quiz.name
    this.questions = quiz.questions || []

    if('questions' in quiz && quiz.questions.length > 0) {
      quiz.questions.forEach(s => this.addSymbol(s))
    }
  }
  addSymbol(question_data) {
    this.questions.push(question_data)
  }
}

export { Quiz, Question }