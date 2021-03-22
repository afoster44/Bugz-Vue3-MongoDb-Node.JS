import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  constructor() {
    this.getAllBugs()
  }

  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async createBug(newBug) {
    logger.log(newBug)
    const res = await api.post('api/bugs', newBug)
    logger.log(res.data)
    AppState.bugs.push(res.data)
    // we are returning the res.data._id for the router.push when they create a new bug
    return res.data._id
  }

  async getBugById(bugId) {
    logger.log('getting bug Id', bugId)
    const res = await api.get('api/bugs/' + bugId)
    AppState.bug = res.data
  }

  async createNote(newNote) {
    logger.log(newNote)
    const res = await api.post('api/notes', newNote)
    logger.log(res.data)
    // I believe that pushing the notes here is messing with things...just let the get handle this
    // AppState.notes.push(res.data)
    this.getNoteByBugId(newNote.bug)
  }

  async getNoteByBugId(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
    logger.log('got the note!', AppState.notes)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
  }

  async editBug(bugId, editedBug) {
    logger.log(editedBug)
    const res = await api.put('api/bugs/' + bugId, editedBug)
    AppState.bug = res.data
  }

  getBugDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const bugDate = bug.createdAt
      const updatedDate = new Date(bugDate)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  getNoteDate(id) {
    const note = AppState.notes.find(b => b.id === id)
    if (note) {
      const noteDate = note.createdAt
      const updatedDate = new Date(noteDate)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}

export const bugsService = new BugsService()
