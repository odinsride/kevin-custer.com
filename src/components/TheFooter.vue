<template>
  <div class="footer">
    <p class="footer-text">
      <slot></slot>
    </p>
    <p class="footer-links" v-if="footerLinks">
      <span v-for="footerLink in footerLinks" :key="footerLink.name">
        <a :href="footerLink.href" class="footer-link" :aria-label="footerLink.name">
          {{ footerLink.name }}
        </a>
        <span v-if="footerLink != lastFooterLink"> | </span>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  props: {
    footerLinks: {
      required: false,
      type: Array
    }
  },
  computed: {
    lastFooterLink() {
      return this.footerLinks.slice(-1)[0]
    }
  }
}
</script>


<style lang="scss" scoped>
@layer components {
  .footer {
    @apply py-10 text-center border-t-2 border-green-500 border-opacity-30;

    .footer-text {
      @apply mb-2 text-gray-700;
    }

    .footer-links {
      @apply text-sm text-gray-600;

      .footer-link {
        @apply text-primary-700;
      }
    }
  }
}
</style>