<template>
  <nav class="navbar">

      <!-- left -->
      <div class="navbar-left">
        <g-link to="/">
          <g-image alt="Kevin Custer: Full-stack developer" src="~/assets/images/logo.png" width="250" blur="5" quality="100" />
        </g-link>
        <button class="navbar-menu-button" type="button" v-on:click="toggleNavbar()" aria-label="Navigation">
          <font-awesome-icon icon="bars"></font-awesome-icon>
        </button>
      </div>
  
      <!-- right -->
      <div :class="{'hidden': !showMenu, 'flex': showMenu}" class="navbar-right">
        <TheNavBarMenu :menuItems="menuItems"></TheNavBarMenu>
      </div>
      
  </nav>
</template>

<script>
import TheNavBarMenu from "./TheNavBarMenu";

export default {
  name: "TheNavBar",

  components: {
    TheNavBarMenu
  },
  
  data() {
    return {
      showMenu: false
    }
  },

  props: {
    menuItems: {
      required: true,
      type: Array
    }
  },

  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .navbar {
    @apply py-4 px-2 md:px-6 lg:px-12 xl:px-48 flex flex-wrap justify-between items-center border-t-8 border-primary-600 bg-white;

    .navbar-left {
      @apply w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start;

      .navbar-menu-button {
        @apply text-gray-500 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none;
      }
    }

    .navbar-right {
      @apply lg:flex lg:flex-grow lg:items-center;
    }
  }
}
</style>