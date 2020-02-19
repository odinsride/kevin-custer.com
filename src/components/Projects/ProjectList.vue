<template>
  <section class="section" id="projects">
      <h1 class="title is-size-4 has-text-primary">Recent Projects</h1>
      <div class="columns is-multiline">
        <div 
          v-for="project in $static.projects.edges" 
          :key="project.node.id"
          class="column is-4"
        >
          <ProjectCard :project="project"/>
        </div>
      </div>
  </section>
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
