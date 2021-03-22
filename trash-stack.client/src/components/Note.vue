<template>
  <div class="component">
    <div class="col-12 border shadow" v-if="note.creator">
      <p>
        <span>{{ note.body }}</span>
      </p>
      <p>
        <span>Note made by: {{ note.creator.name }} | Last Update at: {{ getNoteDate(note._id) }} | <img :src="note.creator.picture" alt=""></span>
      </p>
      <button type="button" class="btn btn-danger" @click.prevent="deleteNote" v-if="note.creator.email === state.user.email">
        x
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    note: Object,
    bug: Object
  },
  setup(props) {
    const state = reactive({
      editedNote: {},
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteNote() {
        const alert = window.confirm('Are you sure you want to delete this note?')
        if (alert) {
          await bugsService.deleteNote(props.note._id)
          await bugsService.getNoteByBugId(props.note.bug)
        }
      },
      getNoteDate(id) {
        return bugsService.getNoteDate(id)
      },
      async editNote() {
        const alert = window.confirm('Are you sure you want to edit this note?')
        if (alert) {
          await bugsService.editNote(props.note._id, props.note)
          await bugsService.getNoteByBugId(props.note.bug)
          state.editedNote = {}
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
