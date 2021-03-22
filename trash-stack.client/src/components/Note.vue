<template>
  <div class="component">
    <div class="col-12 border shadow">
      <p>
        <span>{{ note.body }}</span>
      </p>
      <p>
        <span>Note made by: {{ note.creator.name }} | Last Update at: {{ getNoteDate(note._id) }} </span>
      </p>
      <button type="button" class="btn btn-danger" @click.prevent="deleteNote">
        x
      </button>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
export default {
  name: 'Note',
  props: {
    note: Object,
    bug: Object
  },
  setup(props) {
    return {
      async deleteNote() {
        const alert = window.confirm('Are you sure you want to delete this note?')
        if (alert) {
          await bugsService.deleteNote(props.note._id)
          await bugsService.getNoteByBugId(props.note.bug)
        }
      },
      getNoteDate(id) {
        return bugsService.getNoteDate(id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
