<template>
  <div class="content">
    <span :class="[color, size]" class="has-text-grey-dark is-size-7-mobile is-uppercase has-text-weight-semibold">
      <span class="is-lowercase">by</span> {{ post.author }} <span class="is-lowercase">on</span> {{ datePretty }}
    </span>
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
      default: 'has-text-grey'
    },
    size: {
      type: String,
      default: 'is-size-7'
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