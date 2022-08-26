<template>
  <transition name="fade" appear>
    <article>
      <div class="lg:py-0 lg:px-4 mb-6 text-gray-700 lg:leading-relaxed">
        <div class="mb-4">
          <h5 class="font-semibold mb-2">Platforms</h5>
          <div class="flex flex-wrap items-center">
            <Tag v-for="tag in skills.platforms" :key="tag" :tagText="tag"/>
          </div>
        </div>
        <div class="mb-4">
          <h5 class="font-semibold mb-2">Languages</h5>
          <div class="flex flex-wrap items-center">
            <Tag v-for="tag in skills.languages" :key="tag" :tagText="tag"/>
          </div>
        </div>
        <div class="mb-4">
          <h5 class="font-semibold mb-2">Frameworks</h5>
          <div class="flex flex-wrap items-center">
            <Tag v-for="tag in skills.frameworks" :key="tag" :tagText="tag"/>
          </div>
        </div>
        <div class="mb-4">
          <h5 class="font-semibold mb-2">Tools</h5>
          <div class="flex flex-wrap items-center">
            <Tag v-for="tag in skills.tools" :key="tag" :tagText="tag"/>
          </div>
        </div>
      </div>
    </article>
  </transition>
</template>

<script>
import Tag from '@/components/Tags/Tag.vue'

export default {
  components: {
    Tag
  },

  data () {
    return {
      rows: 5
    }
  },

  props: {
    skills: {
      required: true,
      type: Object
    }
  },
  
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

.title {
  margin-bottom: 0.75em;
}

.title:not(:first-of-type){
  margin-top: 1.25em;
}
@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 0;
  }
}
</style>