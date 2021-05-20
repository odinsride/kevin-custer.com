<template>
  <nav class="py-4 px-2 md:px-6 lg:px-12 flex flex-wrap justify-between items-center shadow border-t-8 border-green-600">

      <!-- left -->
      <div class="w-full relative flex justify-between lg:w-auto  lg:static lg:block lg:justify-start">
        <g-link to="/">
          <g-image alt="Kevin Custer: Full-stack developer" src="~/assets/images/logo.png" width="250" blur="5" quality="100" />
        </g-link>
        <button class="text-gray-500 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <font-awesome-icon icon="bars"></font-awesome-icon>
        </button>
      </div>
  
      <!-- right -->
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <TheMenu/>
      </div>
      
  </nav>
</template>

<script>
import TheMenu from "./TheMenu";

export default {
  name: "TheNavBar",

  components: {
    TheMenu
  },
  
  data() {
    return {
      showMenu: false
    }
  },

  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
