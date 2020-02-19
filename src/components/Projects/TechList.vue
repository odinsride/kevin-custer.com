<template>
  <div v-if="techs.length > 0">
    <div class="tech-title has-text-centered has-text-primary">
      Technologies
    </div>
    <div class="tech-tags-container">
      <b-taglist class="has-text-centered">
        <b-tag v-for="tech in techs" :key="tech" class="is-link">
          {{ tech }}
        </b-tag>
      </b-taglist>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    techs: {
      required: true,
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
.tech-title {
  font-weight: 400;
  margin-bottom: 5px;
}

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