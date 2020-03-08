<template>
  <section class="hero is-link is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-4 is-size-5-mobile has-text-centered kc-hero">
          {{ title }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  
  data: () => ({
    title: "A blog about software development, technology, and open source."
  })
}
</script>

<style>
.kc-hero {
  text-shadow: 1px 1px 10px #636363;
}
</style>
