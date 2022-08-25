<template>
  <div class="mb-1">
    <div class="lg:flex lg:justify-between mb-1">
      <div class="">
        <h1 class="lg:text-lg font-semibold">{{ job.title }}</h1>
      </div>
      <div class="font-semibold text-sm lg:text-base">
          {{ job.dateStart }} - {{ dateEnd }}
      </div>
    </div>
    <h2 class="font-semibold text-sm lg:text-base">{{ job.company }}</h2>
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