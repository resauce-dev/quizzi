import charList from './charList'

function getRandomString(length) {
  var result = ''
  for ( var i = 0; i < length; i++ ) {
    result += charList.charAt(Math.floor(Math.random() * charList.length))
  }
  return result
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
 function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const stripSpaces = str => str.replace(/[\s-]/g,'')

export { shuffleArray, getRandomString, stripSpaces }