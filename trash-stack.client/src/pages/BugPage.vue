<template>
  <div class="container-fluid">
    <div class="bug">
      <div class="row my-3" v-if="state.bug.creator">
        <div v-if="!state.bug.closed">
          <form class="form-inline" @submit.prevent="editBug" v-if="state.bug.creator.email === state.user.email">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Title"
                name="title"
                id="title"
                aria-describedby="helpId"
                v-model="state.newBug.title"
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
                v-model="state.newBug.description"
              />
            </div>
            <button class="btn btn-primary" type="submit">
              Edit Bug
            </button>
          </form>
        </div>
        <div v-if="state.bug">
          <div v-if="state.bug.closed" class="card-body">
            <h3>
              <p>Status: <span class="text-danger">CLOSED</span></p>
            </h3>
          </div>
          <div v-else class="card-body">
            <h3>
              <p>Status: <span class="text-success">OPEN</span></p>
            </h3>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-10 border shadow">
          <div v-if="!state.bug.closed">
            <h1>
              {{ state.bug.title }} |
            </h1>
            <span v-if="state.bug.creator"> Note...if you close the bug this change will be irreversible, and you will no longer be able to make changes or add notes.

              <button type="button" class="btn btn-danger" @click.prevent="closeBug" v-if="state.bug.creator.email === state.user.email">Close Bug</button>

            </span>
          </div>
          <h1 v-else>
            {{ state.bug.title }}
          </h1>
        </div>
        <div class="col-2" v-if="state.bug.creator">
          <img :src="state.bug.creator.picture" alt="">
        </div>
        <div class="col-12">
          <div class="row my-5">
            <div class="col-12 border shadow" v-if="state.bug.creator">
              <div v-if="!state.bug.closed">
                <p class="my-2">
                  {{ state.bug.description }}
                </p>
                <p class="my-2">
                  Created By: {{ state.bug.creator.name }} | Last Updated: {{ getBugDate(state.bug._id) }}
                </p>

                <form class="form-inline my-3" @submit.prevent="createNote">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Title"
                      :name="state.newNote.body"
                      id="title"
                      aria-describedby="helpId"
                      v-model="state.newNote.body"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit your note
                  </button>
                </form>
              </div>

              <div v-if="state.bug.closed">
                <p class="my-2">
                  {{ state.bug.description }}
                </p>
                <p class="my-2">
                  Created By: {{ state.bug.creator.name }} | Last Updated: {{ getBugDate(state.bug._id) }}
                </p>
              </div>
              <div>
                <Note v-for="note in state.notes" :key="note._id" :note="note" :bug="state.bug" />
              </div>
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
      user: computed(() => AppState.user),
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
        await bugsService.editBug(route.params.id, state.newBug)
      },
      getBugDate(id) {
        return bugsService.getBugDate(id)
      },
      async closeBug() {
        const res = window.confirm('Once this bug is closed, there is no going back. You will no longer be able to edit the Bug or add Notes.')
        if (res) {
          await bugsService.closeBug(route.params.id)
        }
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
