<template>
  <div :class="[color, size]" class="uppercase font-semibold">
    <span class="lowercase">by</span> {{ post.author }} <span class="lowercase">on</span> {{ datePretty }}
  </div>
</template>

<script>
import { getFormattedDate } from '~/helpers/formatDate.js'

export default {
  data () {
    return {
      
    }
  },
  components: {
  },

  props: {
    post: {
      required: true,
      type: Object
    },
    color: {
      type: String,
      default: 'text-gray-600'
    },
    size: {
      type: String,
      default: 'text-xs'
    }
  },
  computed: {
    datePretty () {
      return getFormattedDate(this.post.date)
    }
  }
}
</script>

<style lang="scss" scoped>
.level-item {
  margin-right: 2em !important;
}
</style>