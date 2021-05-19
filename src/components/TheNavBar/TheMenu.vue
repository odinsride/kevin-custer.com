<template>
  <ul class="flex flex-col lg:flex-row list-none ml-auto">
    <li v-for="menuItem in menuItems" :key="menuItem.name">
      <a v-if="menuItem.target == '_blank'" 
         :href="menuItem.href" 
         :target="menuItem.target" 
         class="px-1 mx-3 py-1 my-2 flex items-center font-bold leading-snug text-green-700 hover:opacity-75"
      >
        <span class="mr-2">{{menuItem.name}}</span>
        <font-awesome-icon icon="external-link-alt" size="sm"></font-awesome-icon>
      </a>
      <g-link v-else 
              :to="menuItem.href"
              :class="setActiveClass(menuItem.href, currentRoute)" 
              class="px-1 mx-3 py-1 my-2 flex items-center font-bold leading-snug text-green-700 hover:opacity-75"
      >
        <span class="">{{menuItem.name}}</span>
      </g-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TheMenu',

    data: () => ({
      menuItems: [
        {
          name: 'Blog',
          href: '/'
        },
        {
          name: 'Portfolio',
          href: '/portfolio'
        },
        {
          name: 'Resume',
          href: '/resume'
        },
        // {
        //   name: 'Skills',
        //   href: '#skills',
        // },
        {
          name: 'Photography',
          href: 'https://photos.kevin-custer.com',
          target: '_blank',
        },
      ]
    }),

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

<style>
  @layer components {
    .is-active {
      @apply text-green-800 border-b-4 border-gray-200
    }
  }
</style>