import charList from './charList'

function getRandomString(length) {
  var result = ''
  for ( var i = 0; i < length; i++ ) {
    result += charList.charAt(Math.floor(Math.random() * charList.length))
  }
  return result
}

function shuffleArray(unshuffled) { 
  return unshuffled
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
}

const stripSpaces = str => str.replace(/[\s-]/g,'')

export { shuffleArray, getRandomString, stripSpaces }