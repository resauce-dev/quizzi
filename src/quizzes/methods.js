import charList from './charList'

function getRandomString(length) {
  var result = ''
  for ( var i = 0; i < length; i++ ) {
    result += charList.charAt(Math.floor(Math.random() * charList.length))
  }
  return result
}

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

const stripSpaces = str => str.replace(/[\s-]/g,'')

export { shuffleArray, getRandomString, stripSpaces }