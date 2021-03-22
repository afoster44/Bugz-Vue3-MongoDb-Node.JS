import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:id', this.deleteNote)
      .put('/:id', this.editNote)
  }

  async editNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await notesService.updateNote(req.params.id, req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const data = await notesService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await notesService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
