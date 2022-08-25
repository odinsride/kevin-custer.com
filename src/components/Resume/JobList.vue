<template>
    <div>
      <div
        v-for="job in $static.jobs.edges"
        :key="job.node.id"
        class=""
      >
        <JobPanel :job="job.node"/>
      </div>
    </div>
</template>

<static-query>
query Jobs {
  jobs: allJob(sortBy: "dateStart", order: DESC) {
    edges {
      node {
        id
        title
        company
        location
        dateStart (format: "MMMM YYYY")
        dateEnd (format: "MMMM YYYY")
        content
      }
    }
  }
}
</static-query>

<script>
import JobPanel from '@/components/Resume/JobPanel'

export default {
  components: {
    JobPanel
  }
}
</script>

<style>

</style>