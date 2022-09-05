<template>
  <div v-if="techs.length > 0">
    <div class="mb-2 text-center font-semibold text-primary-700">
      Technologies
    </div>
    <div class="p-4 border-2 border-primary-700 border-opacity-30 rounded-lg">
      <div class="flex flex-wrap items-center">
        <Tag v-for="tech in techs" :key="tech" :tagText="tech"/>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '../Tags/Tag'

export default {
  props: {
    techs: {
      required: true,
      type: Array
    }
  },
  components: {
    Tag,
  }
}
</script>

<style lang="scss" scoped>

.tech-tags-container {
  padding: 8px;
  border: 2px solid rgba(38, 166, 154, 0.2);
  border-radius: 7px;

  .tags {
    justify-content: center;
  }

  .tag {
    text-transform: uppercase;
    font-weight: 500;
    box-shadow: 0px 2px 18px -5px rgba(0,0,0,0.4);

  }
}
</style>