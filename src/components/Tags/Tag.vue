<template>
  <div class="text-xs flex-initial font-bold px-3 py-1 rounded-2xl text-white bg-green-700">
    {{ tagText }}
  </div>
</template>

<script>
  export default {
    props: {
      tagText: {
        required: true,
        type: String
      }
    }
  }
</script>
