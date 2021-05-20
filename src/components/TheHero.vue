<template>
  <div class="py-6 md:py-12 px-12 bg-gradient-to-br from-green-700 to-green-500 text-white text-center">
    <!-- left -->
    <div class="">
      <h2 class="lg:text-xl font-semibold text-shadow-md kc-hero">
        {{ title }}
      </h2>
    </div>
  </div>
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
