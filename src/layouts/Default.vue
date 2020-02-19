<template>
  <div id="app">
    <header class="header">
      <TheNavBar/>
    </header>
    <transition name="slide-fade" appear>
      <main class="site-content">
        <slot />
      </main>
    </transition>
    <TheFooter />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
  import TheNavBar from '@/components/TheNavBar/TheNavBar'
  import TheFooter from '@/components/TheFooter'

  export default {
    components: {
      TheNavBar,
      TheFooter
    },
  }
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
