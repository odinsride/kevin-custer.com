<template>
  <article class="hover:shadow-xl transition ease-in-out duration-500">
    <g-link :to="post.path" :aria-label="post.title">
      <div class="px-6 lg:px-8 py-8 lg:py-10 mb-4 lg:mb-8 shadow rounded bg-white">
        <PostTitle :post="post" />

        <p class="text-gray-700 lg:leading-relaxed">{{ post.excerpt }}</p>
        
        <TagList :tags="post.tags" />

        <PostFooter :post="post" />
      </div>
    </g-link>
  </article>
</template>

<script>
import PostTitle from './PostTitle'
import TagList from '@/components/Tags/TagList'
import PostFooter from './PostFooter'

export default {
  data () {
    return {
      
    }
  },
  
  components: {
    PostTitle,
    TagList,
    PostFooter,
  },

  props: {
    post: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(0,0,0,0.1), 0 0px 0 1px rgba(0,0,0,0.02);
  transition: transform .3s;
  border-radius: 5px;
  margin-top: 0;
  margin-bottom: 2em;
  line-height: 1.75;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 10px 30px 0 rgba(0,0,0,.1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 0;
  }
}
</style>