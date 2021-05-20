<template>
  <div class="flex my-4">
      <Tag v-for="tag in tags" :key="tag.id" :tagText="tag.title"/>
  </div>
</template>

<script>
import Tag from './Tag'

export default {
  components: {
    Tag,
  },

  props: {
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>