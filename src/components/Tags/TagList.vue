<template>
  <div class="flex items-center my-4 lg:my-6">
    <span class="mr-2 uppercase font-semibold text-xs text-gray-700" :v-if="showLabel">Tags:</span>
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
    showLabel: {
      type: Boolean,
      default: true,
    },
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>