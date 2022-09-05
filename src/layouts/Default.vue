<template>
  <div id="app" class="flex flex-col min-h-screen">
    <header>
      <TheNavBar :menuItems="menuItems"></TheNavBar>
    </header>

    <main class="flex-grow h-full">
      <slot />
    </main>

    <footer>
      <TheFooter :footerLinks="footerLinks">
        Copyright © {{ new Date().getFullYear() }} <a :href="$static.metadata.siteUrl" target="_blank" class="font-bold text-green-700 hover:text-green-800" rel="noopener">{{ $static.metadata.siteName }}</a>. All rights reserved.
      </TheFooter>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteUrl
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

    data: () => ({
      menuItems: [
        {
          name: 'Home',
          href: '/'
        },
        {
          name: 'Blog',
          href: '/blog'
        },
        {
          name: 'Portfolio',
          href: '/portfolio'
        },
        {
          name: 'Resume',
          href: '/resume'
        },
        {
          name: 'Photography',
          href: 'https://photos.kevin-custer.com',
          target: '_blank',
        },
      ],
      footerLinks: [
        {
          name: 'RSS',
          href: '/rss.xml'
        },
        {
          name: 'Sitemap',
          href: '/sitemap.xml'
        }
      ]
    }),
  }
</script>

<style lang="scss">
</style>
