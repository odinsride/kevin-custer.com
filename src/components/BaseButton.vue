<template>
  <span>
    <a v-if="url" :href="url" :target="urlTarget">
      <button class="base-btn base-btn--sfx" :class="buttonStyle">
        {{ text }}
      </button>
    </a>
    <button v-else class="base-btn base-btn--sfx" :class="buttonStyle">
      {{ text }}
    </button>
  </span>
</template>

<script>
  export default {
    name: 'BaseButton',
    props: {
      text: {
        required: true,
        type: String
      },
      primary: {
        required: false,
        type: Boolean
      },
      secondary: {
        required: false,
        type: Boolean
      },
      light: {
        required: false,
        type: Boolean
      },
      url: {
        required: false,
        type: String
      },
      urlTarget: {
        required: false,
        type: String
      }
    },
    computed: {
      buttonStyle: function () {
        if (this.primary)
          return this.light ? 'base-btn--primary-light' : 'base-btn--primary'
        if (this.secondary)
          return this.light ? 'base-btn--secondary-light' : 'base-btn--secondary'
      }
    }
  }
</script>

<style scoped>
@layer components {
  .base-btn {
    @apply py-1.5 px-4 border-2 border-transparent shadow hover:shadow-lg focus:shadow-sm text-gray-800 bg-gray-100 rounded-full font-semibold focus:outline-none transition ease-in duration-100;
  }

  .base-btn--sfx {
    @apply transition duration-150 ease-in-out transform hover:scale-110;
  }

  .base-btn--primary {
    @apply text-primary-50 bg-primary-700 bg-opacity-70 hover:bg-primary-800 hover:bg-opacity-70 border-opacity-50 border-primary-100;
  }

  .base-btn--primary-light {
    @apply text-primary-700 bg-primary-50 border-opacity-30 border-primary-600 hover:bg-primary-100 hover:text-primary-800;
  }

  .base-btn--secondary {
    @apply text-secondary-50 bg-secondary-700 hover:bg-secondary-600 border-opacity-50 border-secondary-100;
  }

  .base-btn--secondary-light {
    @apply text-secondary-500 bg-secondary-50 border-opacity-40 border-secondary-600 hover:bg-secondary-100 hover:text-secondary-600;
  }
}
</style>