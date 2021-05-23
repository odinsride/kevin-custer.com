<template>
  <section class="py-8 px-10">
      <figure class="flex justify-center">
        <g-image alt="Author image: Kevin Custer" class="author__image rounded-full h-auto align-middle border-none" src="~/assets/images/author3.jpg" blur="5" width="128" />
      </figure>

      <div class="my-4 text-center text-gray-800">
        <h3 class="text-green-700 font-bold text-lg lg:text-xl">
          {{ $static.metadata.siteName }}
        </h3>

        <p class="leading-tight">
          <span class="font-bold">Software Engineer</span><br/>
          Staunton, VA
        </p>

        <p class="text-sm my-4 font-light">
          I write about ServiceNow, full-stack development, and more!
        </p>

        <div class="flex justify-center">
          <Tooltip text="Follow me on GitHub">
            <a href="https://www.github.com/odinsride" 
              target="_blank" 
              aria-label="Link to Kevin Custer on GitHub (New Window)"
              rel="noopener"
            >
              <font-awesome-icon :icon="['fab', 'github']" size="2x"></font-awesome-icon>
            </a>
          </Tooltip>
        </div>
      </div>
  </section>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Tooltip from '@/components/Tooltip'

export default {
  components: {
    Tooltip,
  }
}
</script>

<style lang="scss" scoped>
.author__image {
  box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.4);
}
</style>
