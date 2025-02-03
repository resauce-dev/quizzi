/**
 * Quiz and symbols data model
 */
class Quiz {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.questions = []
  }
  addSymbol(imageId, name, extension, has_padding) {
    this.questions.push({
      id: imageId,
      name: name,
      image: {
        id: imageId,
        extension: extension,
        has_padding: has_padding,
      }
    })
  }
}

export { Quiz }