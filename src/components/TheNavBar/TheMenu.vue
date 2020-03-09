<template>
  <div class="navbar-start">
    <template v-for="(menuItem, index) in menuItems">
      <a class="navbar-item has-text-primary" :key="index" :href="menuItem.target">
        {{ menuItem.name }}
      </a>
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
        target: '/'
      },
      {
        name: 'Resume',
        target: '/resume'
      }
      // {
      //   name: 'Blog',
      //   target: '#blog'
      // },
      // {
      //   name: 'Projects',
      //   target: '#projects'
      // },
      // {
      //   name: 'Skills',
      //   target: '#skills',
      // },
      // {
      //   name: 'Photography',
      //   target: '#photography'
      // },
    ]
  })
}
</script>

<style scoped>
a.navbar-item {
  font-weight: 700;
  /* text-shadow: 0px 1px 1px #c9c9c9; */
}
</style>
