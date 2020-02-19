<template>
  <aside>
    <div class="has-text-centered">
      <p class="title has-text-primary is-size-4">
        Categories
      </p>
      <p class="category">
        <b-button 
          type="is-text has-text-link"
          icon-left="hashtag"
          v-on:click="filterPosts('All')"
        >
          All
        </b-button>
      </p>
      <p class="category" v-for="tag in $static.tags.edges" :key="tag.node.id">
        <b-button
          type="is-text has-text-link"
          icon-left="hashtag"
          v-on:click="filterPosts(tag.node.title)"
        >
          {{ tag.node.title }}
        </b-button>
      </p>
    </div>
  </aside>
</template>

<static-query>
query Tags {
  tags: allTag(sortBy: "title") {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  methods: {
    filterPosts (tag) {
      this.$emit('filterPosts', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 1rem;
}
</style>