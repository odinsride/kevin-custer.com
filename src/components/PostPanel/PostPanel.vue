<template>
  <article class="transition ease-in-out duration-500">
    <g-link :to="post.path" :aria-label="post.title">
      <div class="py-8 lg:py-0 my-6">
        <PostTitle :post="post" />

        <p class="text-gray-700 lg:leading-relaxed">{{ post.excerpt }}</p>
        
        <TagList :tags="post.tags" />

        <PostFooter :post="post" />
      </div>
    </g-link>
  </article>
</template>

<script>
import PostTitle from '@/components/PostPanel/PostTitle'
import TagList from '@/components/Tags/TagList'
import PostFooter from '@/components/PostPanel/PostFooter'

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