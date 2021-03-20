<template>
  <div class="component col-8">
    <p>{{ bug.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Component',
  props: {
    bug: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
