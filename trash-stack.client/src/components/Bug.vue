<template>
  <!-- NOTE figure out why the ternary doesn't work in the v-if -->
  <!-- if you are having issues with route params double check the property here at bug.id -->
  <router-link :to="{name: 'BugPage', params: {id: bug.id}}">
    <div class="component col-10 offset-1 border shadow bg-light my-2">
      <div v-if="bug">
        <div v-if="bug.closed" class="card-body">
          <h3>
            <span>{{ bug.title }}       |</span>
            <span>{{ getBugDate(bug._id) }}       |</span>
            <span class="text-danger">CLOSED</span>
          </h3>
        </div>
        <div v-else class="card-body">
          <h3>
            <span>{{ bug.title }}       |</span>
            <span>{{ getBugDate(bug._id) }}       |</span>
            <span class="text-success">OPEN</span>
          </h3>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { bugsService } from '../services/BugsService'
export default {
  name: 'Component',
  props: {
    bug: Object
  },
  setup() {
    return {
      getBugDate(id) {
        return bugsService.getBugDate(id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
