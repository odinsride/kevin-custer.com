<template>
  <section class="section">
    <b-taglist class="is-vcentered">
      <span class="tag is-white has-text-weight-semibold">Filter</span>
      <b-tag
        type="is-light has-text-primary"
        :class="{ 'has-text-weight-bold': active == 'All' }"
        @click.native="filterPosts('All')"
        aria-label="All Categories"
      >
        All
      </b-tag>
    <span v-for="tag in $static.tags.edges" :key="tag.node.id">
      <b-tag
        type="is-light has-text-primary"
        :class="{ 'has-text-weight-bold': active == tag.node.title }"
        @click.native="filterPosts(tag.node.title)"
        :aria-label="tag.node.title"
        role="button"
      >
        {{ tag.node.title }}
      </b-tag>
    </span>
    </b-taglist>
  </section>
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

<style lang="scss" scoped>
.tag {
  cursor: pointer;
}
</style>