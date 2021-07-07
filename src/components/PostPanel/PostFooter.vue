<template>
  <nav class="flex mr-6 flex-wrap justify-between items-center">

    <!-- left -->
    <div class="w-full relative flex justify-between lg:w-auto  lg:static lg:block lg:justify-start">
      <PostMeta :post="post" />
    </div>

    <!-- right -->
    <div class=" hidden lg:block lg:flex lg:flex-grow items-center">
      <div class="flex flex-col lg:flex-row list-none ml-auto text-green-700 font-semibold">
        <g-link :to="post.path" aria-label="Read full article">
          <div>Read more <font-awesome-icon icon="long-arrow-alt-right" class="ml-2" /></div>
        </g-link>
      </div>
    </div>
      
  </nav>
</template>

<script>
import PostMeta from './PostMeta'

export default {
  data () {
    return {
      
    }
  },
  
  components: {
    PostMeta
  },

  props: {
    post: {
      required: true,
      type: Object
    }
  }
}
</script>
