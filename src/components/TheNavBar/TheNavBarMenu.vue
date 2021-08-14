<template>
  <ul class="menu">
    <li v-for="menuItem in menuItems" :key="menuItem.name">
      <a v-if="menuItem.target == '_blank'" 
         :href="menuItem.href" 
         :target="menuItem.target" 
         class="menu-item"
      >
        <span class="mr-2">{{menuItem.name}}</span>
        <font-awesome-icon icon="external-link-alt" size="sm"></font-awesome-icon>
      </a>
      <g-link v-else 
              :to="menuItem.href"
              class="menu-item"
              :class="setActiveClass(menuItem.href, currentRoute)"
      >
        <div>{{menuItem.name}}</div>
      </g-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TheNavBarMenu',

    props: {
      menuItems: {
        required: true,
        type: Array
      }
    },

    computed: {
      currentRoute() {
        return this.$route.path;
      }
    },
    
    methods: {
      setActiveClass (href, curr) {
        return href == curr ? 'is-active' : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
@layer components {
  .menu {
    @apply flex flex-col mt-2 lg:flex-row list-none ml-auto;

    .menu-item {
      @apply px-1 mx-3 py-1 my-2 flex items-center font-bold leading-snug text-primary-700 hover:opacity-75;
    }

    .is-active {
      @apply text-primary-700 border-b-2 border-secondary-300;
    }
  }
}
</style>