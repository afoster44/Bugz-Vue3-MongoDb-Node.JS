<template>
  <div class="container">
    <div class="row my-3">
      <form class="form-inline" @submit.prevent="createBug">
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
          Submit Bug
        </button>
      </form>
    </div>
    <div class="row">
      <div class="col-10 offset-1 border shadow bg-light my-1">
        <Bug v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Bug from '../components/Bug'
import { logger } from '../utils/Logger'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      state,
      async createBug() {
        try {
          const bugId = await bugsService.createBug(state.newBug)
          // I don't know why right now but this router push is not working...moving on
          router.push({ to: 'BugPage', params: { id: bugId } })
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {
    Bug
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
