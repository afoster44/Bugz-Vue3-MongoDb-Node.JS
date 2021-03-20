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
  }
}

export const bugsService = new BugsService()
