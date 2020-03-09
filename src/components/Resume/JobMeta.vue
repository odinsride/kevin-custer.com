<template>
  <div class="content">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="is-size-5 is-size-5-mobile title has-text-link">{{ job.company }}</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          {{ job.dateStart }} - {{ dateEnd }}
        </div>
      </div>
    </div>
    <h2 class="is-size-6 is-size-6-mobile subtitle">{{ job.title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      required: true,
      type: Object
    }
  },
  
  computed: {
    dateEnd () {
      if (this.job.dateEnd == undefined)
        return "Present"
      else
        return this.job.dateEnd
    }
  }
}
</script>

<style>
.title {
    margin-bottom: 0.3em;
}
</style>