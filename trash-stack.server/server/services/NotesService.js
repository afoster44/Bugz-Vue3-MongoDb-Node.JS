import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async delete(id) {
    const deletedNote = await dbContext.Note.findOneAndDelete(id)
    if (!deletedNote) {
      throw new BadRequest('You may have the wrong Id' + `${id}`)
    }
    return deletedNote
  }

  async create(body) {
    const note = await (await dbContext.Note.create(body)).populate('creator', 'name creator')

    if (!note) {
      throw new BadRequest('I am not quite sure what happened.' + `${body}`)
    }
    return note
  }

  async findNote(query = {}) {
    const notes = await dbContext.Note.find(query)
    if (!notes) {
      throw new BadRequest('You may be sending a bad query search')
    }
    return notes
  }
}

export const notesService = new NotesService()
