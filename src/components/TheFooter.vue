<template>
  <footer class="footer has-background-primary">
    <div class="container">
    <div class="content">
      <p class="title is-6 has-text-grey-lighter">
        Copyright © {{ new Date().getFullYear() }} Kevin Custer. All rights reserved.
      </p>
      <p class="subtitle is-6 has-text-grey-lighter">
        <a href="rss.xml" class="has-text-twitter" aria-label="RSS Feed">
          RSS
        </a>
         | 
        <a href="sitemap.xml" class="has-text-twitter" aria-label="Sitemap">
          Sitemap
        </a>
      </p>
    </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 1.8em !important;
}
</style>