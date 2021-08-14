<template>
  <div class="hero-container">
    <h2 class="hero-title">
      <slot name="title"></slot>
    </h2>
    <h3 class="hero-subtitle">
      <slot name="subtitle"></slot>
    </h3>
    <div class="hero-cta" v-if="ctaPresent">
      <slot name="cta"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  computed: {
    ctaPresent() {
      return !!this.$slots.cta
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .hero-container {
    @apply py-12 md:py-24 lg:py-32 px-4 md:px-24 bg-gradient-to-br from-primary-700 to-primary-500 text-gray-50 text-center shadow-lg;

    .hero-title {
      @apply lg:text-4xl text-xl font-semibold mb-6;
    }

    .hero-subtitle {
      @apply lg:text-xl;
    }

    .hero-cta {
      @apply mt-12 lg:mt-20 mb-24 md:mb-14 flex flex-col md:flex-row md:justify-center md:items-center;
    }
  }
}
</style>
