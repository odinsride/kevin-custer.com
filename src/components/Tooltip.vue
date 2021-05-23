<template>
  <div class="tooltip-box relative inline-block">
    <slot />
    <div
      class="tooltip z-10 text-center py-2 text-sm font-semibold text-gray-200 bg-gray-800 rounded"
    >
      <span
        class="triangle"
      >{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.tooltip-box:hover .tooltip{
  opacity: 1;
}

.tooltip { 
  width: 120px;
  top: 130%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: ease-in-out 0.1s;

  position: absolute;
}

.triangle::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  
  border-bottom: 5px solid rgba(39, 39, 42, 1);
}
</style>