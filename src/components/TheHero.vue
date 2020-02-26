<template>
  <section class="hero is-medium is-link">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-4 is-size-5-mobile has-text-centered kc-hero">
          {{ title }}
        </h1>
        <!-- <h2 class="subtitle is-size-4 is-size-6-mobile has-text-centered kc-hero">
          {{ subtitle }}
        </h2> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  
  data: () => ({
    title: "A blog about software development, technology, and open source.",
    subtitle: "Rails, Vue, ServiceNow",
  })
}
</script>

<style>
.kc-hero {
  text-shadow: 1px 1px 10px #636363;
}
</style>
