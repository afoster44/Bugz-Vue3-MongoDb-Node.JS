import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    const note = await dbContext.Note.create(body)

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
