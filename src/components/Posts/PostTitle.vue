<template>
  <div>
    <h1 :class="size" class="text-green-700 font-semibold mb-4">{{ post.title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    },
    size: {
      type: String,
      default: 'text-lg'
    }
  }
}
</script>
