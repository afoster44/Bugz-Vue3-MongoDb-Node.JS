import mongoose from 'mongoose'
import BugSchema from '../models/Bug'
import AccountSchema from '../models/Account'
import NoteSchema from '../models/Note'

class DbContext {
  Bug = mongoose.model('Bug', BugSchema);
  Account = mongoose.model('Account', AccountSchema);

  Note = mongoose.model('Note', NoteSchema)
}

export const dbContext = new DbContext()
