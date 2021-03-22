<template>
  <div class="container-fluid">
    <div class="bug">
      <div class="row my-3">
        <form class="form-inline" @submit.prevent="editBug">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              name="title"
              id="title"
              aria-describedby="helpId"
              v-model="state.bug.title"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Description"
              name="description"
              id="description"
              aria-describedby="helpId"
              v-model="state.bug.description"
            />
          </div>
          <button class="btn btn-primary" type="submit">
            Edit Bug
          </button>
        </form>
      </div>
      <div class="row my-5">
        <div class="col-10 offset-1 border shadow">
          <div v-if="!state.bug.closed">
            <h1>
              {{ state.bug.title }} |
            </h1>
            <span> Note...if you close the bug this change will be irreversible, and you will no longer be able to make changes or add notes. <button type="button" class="btn btn-danger" @click.prevent="">              Close Bug
            </button> </span>
          </div>
          <h1 v-else>
            {{ state.bug.title }}
          </h1>
        </div>
        <div class="col-12">
          <div class="row my-5">
            <div class="col-12 border shadow" v-if="state.bug.creator">
              <p>{{ state.bug.description }} | Created By: {{ state.bug.creator.name }} | Last Updated: {{ getBugDate(state.bug._id) }}</p>

              <form class="form-inline" @submit.prevent="createNote" v-if="state.bug.closed === false">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    name="title"
                    id="title"
                    aria-describedby="helpId"
                    :v-model="state.newNote.body"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit your note
                </button>
              </form>
              <form class="form-inline" @submit.prevent="editNote" v-if="state.bug.closed === false">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title"
                    name="title"
                    id="title"
                    aria-describedby="helpId"
                    :v-model="state.newNote.body"
                  />
                </div>
                <button type="submit" class="btn btn-success my-2">
                  Edit your note
                </button>
              </form>
              <Note v-for="note in state.notes" :key="note._id" :note="note" :bug="bug" />
            <!-- we will end up injecting notes right below this line but not below the next div -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Note from '../components/Note'
export default {
  name: 'BugPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes
      // .filter(n => n.bug === state.bug.bug)
      ),
      newNote: {},
      newBug: {}
    })
    onMounted(async() => {
      AppState.bug = {}
      await bugsService.getBugById(route.params.id)
      await bugsService.getNoteByBugId(route.params.id)
    })
    return {
      state,
      async createNote() {
        const res = window.confirm('Are you sure you want to make a note?')
        if (res) {
          state.newNote.bug = route.params.id
          await bugsService.createNote(state.newNote)
        }
      },
      async editBug() {
        await bugsService.editBug(route.params.id, state.bug)
      },
      getBugDate(id) {
        return bugsService.getBugDate(id)
      }
    }
  },
  components: {
    Note
  }
}
</script>

<style scoped>
.col {
  width: 80vh;
  height: 80vh;
}
</style>
