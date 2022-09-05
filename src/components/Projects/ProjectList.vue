<template>
  <div>
      <h1 class="text-primary-700 uppercase font-semibold lg:text-xl mb-4 lg:mb-10">My Work</h1>
      <div class="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-10 lg:px-6 xl:grid-cols-3 xl:gap-10 xl:px-6">
        <div 
          v-for="project in $static.projects.edges" 
          :key="project.node.id"
          class="column is-12-mobile is-6-tablet is-4-widescreen"
        >
          <ProjectCard :project="project"/>
        </div>
      </div>
  </div>
</template>

<static-query>
query Project {
  projects: allProject(sortBy: "order", order: ASC) {
    edges {
      node {
        id,
        title,
        slug,
        image,
        tagline,
        github,
        url,
        tech,
        content
      }
    }
  }
}
</static-query>

<script>
import ProjectCard from './ProjectCard'

export default {
  components: {
    ProjectCard,
  },

}
</script>

<style scoped lang="scss">
.title {
  text-transform: uppercase;
  font-weight: 400;
}

.columns {
  flex-wrap: wrap;
  align-items: stretch;
}

.column {
  display: flex;
}
</style>
