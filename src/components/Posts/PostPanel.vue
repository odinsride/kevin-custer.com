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
import PostTitle from '@/components/Posts/PostTitle'
import TagList from '@/components/Tags/TagList'
import PostFooter from '@/components/Posts/PostFooter'

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