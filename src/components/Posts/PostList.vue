<template>
      <div class="columns is-multiline">
        <div
          v-for="post in filteredPosts"
          :key="post.node.id"
          class="column is-12"
        >
          <PostPanel :post="post.node"/>
        </div>
      </div>
</template>

<static-query>
query Posts {
  posts: allPost(sortBy: "date", order: DESC) {
    edges {
      node {
        id
        title
        author
        tags {
          id
          title
        }
        path
        date
        excerpt
      }
    }
  }
}
</static-query>

<script>
import PostPanel from './PostPanel'

export default {
  components: {
    PostPanel
  },

  props: {
    filter: {
      type: String,
      required: true
    }
  },
  
  computed: {
    filteredPosts () {
      return this.$static.posts.edges.filter(edge => {
        return this.filter === 'All' ? edge : edge.node.tags.some(e => e.title === this.filter)
      })
    }
  }
}
</script>

<style lang="scss">
</style>