import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugsAll)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNotesById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.editBug)
  }

  async getNotesById(req, res, next) {
    try {
      const data = await bugsService.getNotesById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const data = await bugsService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const data = await bugsService.editBug(req.params.id, req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await bugsService.delete(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getBugsAll(req, res, next) {
    try {
      const data = await bugsService.find()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.create(req.body)
      // @ts-ignore this is a mongoose error...linter is reading the creator wrong
      data.creator = req.userInfo
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
