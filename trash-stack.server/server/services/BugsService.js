import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getNotesById(id) {
    const notes = await dbContext.Note.find({ bug: id }).populate('creator', 'name picture')
    if (!notes) {
      throw new BadRequest(`I need the proper bug ID even though you are looking for notes...we find notes by bug ID. This is the ID you have provided ${id}`)
    }
    return notes
  }

  async editBug(id, body) {
    delete body.closed
    const foundBug = await dbContext.Bug.findById(id)
    if (foundBug && foundBug.closed) {
      throw new BadRequest('Bug has been closed, sorry no editing now.')
    }
    // findOne
    return await dbContext.Bug.findOneAndUpdate({ _id: id }, { description: body.description, title: body.title }, { new: true })
  }

  async delete(id) {
    // findOne
    const deletedBug = await dbContext.Bug.findOneAndUpdate({ _id: id }, { closed: true }, { new: true })
    return deletedBug
  }

  async create(body) {
    const bug = await dbContext.Bug.create(body)
    if (!bug) {
      throw new BadRequest('Need a body to create please')
    }
    return bug
  }

  async find(query = {}) {
    const bugs = await dbContext.Bug.find(query).populate('creator', 'name picture')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }
}

export const bugsService = new BugsService()
