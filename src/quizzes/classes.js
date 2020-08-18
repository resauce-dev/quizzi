import { shuffleArray, getRandomString, stripSpaces } from './methods'

class Symbol {
  constructor(id, name, imgExtension, hasPadding = true) {
    name = name.toUpperCase();

    this.id = id
    this.name = {
      'original': name,
      'stripped': stripSpaces(name),
      'words': name.split(/[\s-]/)
    }
    this.imgExtension = imgExtension

    this.availableLetters = null
    this.activeLetters = [] // Indexes
    this.isPlayable = false;
    this.hasPadding = hasPadding;
  }
  enable() {
    this.isPlayable = true;
  }
  getLetters() {
    if(!this.availableLetters) {
      let name = this.name.stripped
      let string = getRandomString( name.length * 2 )
      let letterArray = (name + string).toUpperCase().split("")
      this.availableLetters = shuffleArray(letterArray)
    }
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
    if(this.getBuiltName().length === this.name.stripped.length) { return }
    this.activeLetters.push(letterIndex)
  }
  isCorrect() {
    let list = JSON.parse(localStorage.getItem('completedSymbols'))
    const isCorrect = this.name.stripped === this.getBuiltName()
    if(!list) {
      list = [];
      localStorage.setItem('completedSymbols', JSON.stringify(list));
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
  constructor(slug, quizName) {
    this.slug = slug
    this.name = quizName
    this.symbols = []
    this.availableSymbolIds = [];
  }
  addSymbol(id, name, imgExtension, hasPadding) {
    const symbol = new Symbol(id, name, imgExtension, hasPadding)
    this.symbols.push(symbol)
    /**
     * When adding a symbol, if it is the first symbol added,
     * enable the symbol.
     */
    if(this.symbols.length < 1) {
      this.availableSymbolIds.push(symbol.id)
    }
  }
  enableNextQuestion() {
    // find the last symbol by id,
    // add the next symbol id to the list of available
    // this should add the next question to the available list
  }
  questionIsAvailable(id) {
    return id
  }
  getSymbols() {
    return this.symbols.filter(s => s.isCompleted())
  }
  isCompleted() {
    const completedLength = this.symbols.filter(q => q.isCorrect()).length
    return this.symbols.length === completedLength
  }
  getSymbolCount() {
    return this.symbols.length
  }
  getCorrectCount() {
    return this.symbols.filter(s => s.isCorrect()).length
  }
  getStatus() {
    if(this.getCorrectCount() === 0) 
      return 'not-started'
    else if(this.getCorrectCount() === this.getSymbolCount())
      return 'completed'
    else
      return 'in-progress'
  }
}
  
export { Quiz }