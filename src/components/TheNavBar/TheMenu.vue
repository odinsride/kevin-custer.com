<template>
  <div class="navbar-start">
    <template v-for="(menuItem, index) in menuItems">
      <!-- <a class="navbar-item has-text-primary" :key="index" :href="menuItem.href" :target="menuItem.target ? menuItem.target : '_self'">
        {{ menuItem.name }}
      </a> -->
      <b-navbar-item class="has-text-primary" :key="index" :href="menuItem.href" :target="menuItem.target ? menuItem.target : '_self'">
        {{ menuItem.name }}
        <span v-if="menuItem.icon"></span>
        <b-icon v-if="menuItem.icon" :icon="menuItem.icon" size="is-small"></b-icon>
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
        name: 'Resume',
        href: '/resume'
      },
      // {
      //   name: 'Projects',
      //   href: '#projects'
      // },
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
  })
}
</script>

<style scoped lang="scss">
a.navbar-item {
  font-weight: 700;
  /* text-shadow: 0px 1px 1px #c9c9c9; */
  .icon {
    margin-left: 5px;
    font-size: 0.8em;
  }
}
</style>
