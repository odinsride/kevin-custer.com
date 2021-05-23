<template>
  <div class="text-xs flex-initial font-bold px-2 py-1 shadow border border-opacity-30 border-green-700 rounded-2xl text-green-800 bg-green-50">
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
