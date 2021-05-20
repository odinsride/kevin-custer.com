<template>
  <div id="app" class="flex flex-col min-h-screen">
    <header>
      <TheNavBar/>
    </header>

    <main class="flex-grow h-full bg-gray-100">
      <slot />
    </main>

    <footer>
      <TheFooter/>
    </footer>
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
// body {
//   font-family: 'Mulish';
// }

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
