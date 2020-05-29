<template>
  <div class="navbar-start">
    <template v-for="(menuItem, index) in menuItems">
      <b-navbar-item 
        class="has-text-primary" 
        :key="index" 
        :href="menuItem.href" 
        :target="menuItem.target ? menuItem.target : '_self'"
      >
        <b-button 
          type="is-text has-text-primary has-text-weight-medium" 
          :class="setActiveClass(menuItem.href, currentRoute)" 
          role="button" size="" 
          :icon-right="menuItem.icon ? menuItem.icon : ''" rounded
        >
          {{menuItem.name}}
        </b-button>
      </b-navbar-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TheMenu',

  data: () => ({
    menuItems: [
      {
        name: 'Home',
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
         icon: 'external-link-alt'
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

<style scoped lang="scss">
a.navbar-item {
  .button {
    text-decoration: none;
    //text-transform: uppercase;
  }
  
  .is-active {
    text-decoration: underline;
    background-color: inherit;
  }
}
</style>
