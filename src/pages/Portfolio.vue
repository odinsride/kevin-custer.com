<template>
  <Layout>
    <section class="px-4 md:px-8 md:py-10 xl:px-48 bg-gray-50">
      <ProjectList/>
    </section>
  </Layout>
</template>

<script>
import ProjectList from '@/components/Projects/ProjectList'

export default {
  components: {
    ProjectList
  },

  metaInfo: {
    title: 'Portfolio',
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

<style lang="scss">

</style>
