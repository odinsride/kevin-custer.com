<template>
  <div class="mb-10 px-6 lg:px-8 divide-y-2 divide-secondary-300 divide-opacity-30">
    <div
      v-for="post in filteredPosts"
      :key="post.node.id"
    >
      <PostPanel :post="post.node"></PostPanel>
    </div>
</template>

<static-query>
query Posts {
  posts: allPost(filter: { publish: { eq: "yes" }}, sortBy: "date", order: DESC) {
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
        publish
        excerpt
      }
    }
  }
}
</static-query>

<script>
import PostPanel from '@/components/PostPanel/PostPanel'

export default {
  name: 'ThePostList',
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