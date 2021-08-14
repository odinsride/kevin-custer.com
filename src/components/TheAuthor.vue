<template>
  <div class="author">
    <figure class="author-image-container">
      <g-image :alt="'Author image: ' + name" class="author-image" src="~/assets/images/author.jpg" blur="5" width="200" />
    </figure>

    <div class="author-info-container">
      <h3 class="author-info-name">
        {{ name }}
      </h3>

      <p class="author-info-title">
        <span class="font-bold">{{ title }}</span><br/>
        {{ location }}
      </p>

      <div class="author-info-links">
        <BaseTooltip text="Follow me on GitHub" v-if="github">
          <a :href="githubURL" 
            target="_blank" 
            :aria-label="'Link to ' + name + ' on GitHub (New Window)'"
            rel="noopener"
            class="text-gray-700 hover:text-black"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="2x"></font-awesome-icon>
          </a>
        </BaseTooltip>

        <BaseTooltip text="Follow me on LinkedIn" v-if="linkedin">
          <a :href="linkedinURL" 
            target="_blank" 
            :aria-label="'Link to ' + name + ' on LinkedIn (New Window)'"
            rel="noopener"
            class="text-gray-700 hover:text-blue-700"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="2x"></font-awesome-icon>
          </a>
        </BaseTooltip>

        <BaseTooltip text="Follow me on Twitter" v-if="twitter">
          <a :href="twitterURL" 
            target="_blank" 
            :aria-label="'Link to ' + name + ' on Twitter (New Window)'"
            rel="noopener"
            class="text-gray-700 hover:text-blue-400"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" size="2x"></font-awesome-icon>
          </a>
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>



<script>
import BaseTooltip from '@/components/BaseTooltip'

export default {
  name: 'TheAuthor',
  components: {
    BaseTooltip,
  },
  props: {
    name: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    location: {
      required: true,
      type: String
    },
    github: {
      required: false,
      type: String
    },
    linkedin: {
      required: false,
      type: String
    },
    twitter: {
      required: false,
      type: String
    }
  },
  computed: {
    githubURL: function() {
      return this.github && 'https://www.github.com/' + this.github
    },
    linkedinURL: function() {
      return this.linkedin && 'https://www.linkedin.com/in/' + this.linkedin
    },
    twitterURL: function() {
      return this.twitter && 'https://www.twitter.com/' + this.twitter
    }
  }
}
</script>

<style lang="scss" scoped>
@layer components {
  .author {
    @apply py-8 px-16;

    .author-image-container {
      @apply flex justify-center;

      .author-image {
        @apply rounded-full h-auto align-middle border-secondary-300 border-4 border-opacity-80;
        box-shadow: 0px 2px 28px 2px rgba(0,0,0,0.4);
      }
    }

    .author-info-container {
      @apply my-6 text-center text-gray-800;

      .author-info-name {
        @apply text-green-700 font-bold text-lg lg:text-xl;
      }

      .author-info-title {
        @apply leading-relaxed mb-4 text-gray-800;
      }

      .author-info-links {
        @apply flex flex-nowrap gap-4 justify-center;
      }
    }
  }
}
</style>
