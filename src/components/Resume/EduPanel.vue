<template>
  <transition name="fade" appear>
    <article>
      <div class="lg:py-0 lg:px-4 mb-6">
        <div class="">
          <div class="font-semibold">{{ education.degree }} ({{ education.year }})</div>
          <div class="">{{ education.school }}, {{ education.location }}</div>
        </div>
      </div>
    </article>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },

  props: {
    education: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(0,0,0,0.1), 0 0px 0 1px rgba(0,0,0,0.02);
  transition: transform .3s;
  border-radius: 5px;
  margin-top: 0;
  margin-bottom: 1em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.content ul {
  margin-top: 0;
}

@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 0;
  }
}
</style>