<template>
  <Layout>

    <section class="px-2 md:px-6 lg:px-8 py-2 mt-4 lg:mt-8 justify-center lg:flex lg:gap-10">
      <div class="lg:flex-1 lg:max-w-screen-lg">
        <ThePostList :filter="filter" />
      </div>
      <div class="lg:flex-initial max-w-xs text-center lg:text-left">
        <TheCategoryList :filter="filter" v-on:filterPosts="updatePostFilter($event)" />
      </div>
    </section>

  </Layout>
</template>

<script>
import TheHero from '@/components/TheHero'
import TheAuthor from '@/components/TheAuthor'
import TheCategoryList from '@/components/TheCategoryList'
import ThePostList from '@/components/ThePostList'

export default {
  components: {
    TheHero,
    TheAuthor,
    TheCategoryList,
    ThePostList
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
