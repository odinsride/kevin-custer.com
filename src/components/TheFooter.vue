<template>
  <div class="py-10 text-center bg-gray-50 border-t border-green-500 border-opacity-50">
    <p class="mb-2 text-gray-700">
      Copyright © {{ new Date().getFullYear() }} <a href="https://www.kevin-custer.com/" target="_blank" class="font-bold text-green-700 hover:text-green-800" rel="noopener">Kevin Custer</a>. All rights reserved.
    </p>
    <p class="text-sm text-gray-600">
      <a href="/rss.xml" class="has-text-primary" aria-label="RSS Feed">
        RSS
      </a>
        | 
      <a href="/sitemap.xml" class="has-text-primary" aria-label="Sitemap">
        Sitemap
      </a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    margin-bottom: 1.8em !important;
  }
</style>