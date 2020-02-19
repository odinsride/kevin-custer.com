<template>
  <div class="content">
    <h1 :class="size" class="is-size-5-mobile title has-text-link">{{ post.title }}</h1>
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
      default: 'is-size-4'
    }
  }
}
</script>

<style>
.title {
    margin-bottom: 0.3em;
}
</style>