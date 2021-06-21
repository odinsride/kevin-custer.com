<template>
  <Layout>
    <div class="container is-max-widescreen">
      <div class="column is-10 is-offset-1">
        <div class="is-hidden-mobile">
          <TheCategoryList :filter="filter" v-on:filterPosts="updatePostFilter($event)" />
        </div>
        <PostList :filter="filter" />
      </div>
    </div>
  </Layout>
</template>

<script>
import TheHero from '@/components/TheHero'
import TheAuthor from '@/components/TheAuthor'
import TheCategoryList from '@/components/TheCategoryList'
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    TheHero,
    TheAuthor,
    TheCategoryList,
    PostList
  },

  data () {
    return {
      filter: 'All'
    }
  },

  methods: {
    updatePostFilter(filter) {
      this.filter = filter
    }
  },

  metaInfo: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Kevin Custer is a software engineer with over 15 years real world experience, \
                  who writes about ServiceNow and other technologies including Ruby on Rails, Vue.js, \
                  Linux, open-source software, and more.'
      }
    ]
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
