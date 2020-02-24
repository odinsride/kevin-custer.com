<template>
  <div class="content">
    <b-taglist>
      <transition name="fade" appear>
        <b-tag rounded type="is-primary" v-for="tag in tags" :key="tag.id">
          <span class="has-text-weight-semibold">{{ tag.title }}</span>
        </b-tag>
      </transition>
    </b-taglist>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}

.tag:not(body) {
  font-size: 0.85em !important;
}
</style>