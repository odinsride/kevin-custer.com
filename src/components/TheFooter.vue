<template>
  <footer class="footer has-background-primary">
    <div class="container">
    <div class="content">
      <p class="title is-6 has-text-grey-lighter">
        Copyright © {{ new Date().getFullYear() }} Kevin Custer. All rights reserved. | Staunton, VA
      </p>
      <p class="subtitle is-6 has-text-grey-lighter">
        <g-link to="/rss.xml" class="has-text-twitter">
          RSS
        </g-link>
         | 
        <g-link to="/sitemap.xml" class="has-text-twitter">
          Sitemap
        </g-link>
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