<template>
  <aside>
    <div class="text-center">
      <p class="text-green-700 text-lg lg:text-xl font-semibold mb-2">
        Categories
      </p>
      <div>
        <div 
          :class="{ 'font-bold': active == 'All' }"
          class="text-green-700 text-sm lg:text-base py-1.5"
          v-on:click="filterPosts('All')"
          role="button"
          aria-label="All Categories"
        >
          All
        </div>
      </div>
      <div v-for="tag in $static.tags.edges" :key="tag.node.id">
        <div
          :class="{ 'font-bold': active == tag.node.title }"
          class="text-green-700 text-sm lg:text-base py-1.5"
          v-on:click="filterPosts(tag.node.title)"
          role="button"
          :aria-label="tag.node.title"
        >
          {{ tag.node.title }}
        </div>
      </div>
    </div>
  </aside>
</template>

<static-query>
query Tags {
  tags: allTag(sortBy: "title", order: ASC) {
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
  data: () => ({
    active: "All"
  }),

  methods: {
    filterPosts (tag) {
      this.active = tag
      this.$emit('filterPosts', tag)
    }
  }
}
</script>