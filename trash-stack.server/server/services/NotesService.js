import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async updateNote(id, body) {
    const updatedNote = await dbContext.Note.findOneAndUpdate(id, body)
    if (!updatedNote) {
      throw new BadRequest('Need a different Id you gave me' + `${id}` + 'or you gave the wrong body info' + `${body}`)
    }
    return updatedNote
  }

  async delete(id, cId) {
    const deletedNote = await dbContext.Note.findOneAndDelete({ _id: id, creatorId: cId })
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
