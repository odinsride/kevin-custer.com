<template>
  <transition name="fade" appear>
    <article>
      <div class="lg:py-0 mb-6">
        <div class="">
          <JobMeta :job="job" />
          <p v-html=job.content></p>
        </div>
      </div>
    </article>
  </transition>
</template>

<script>
import JobMeta from '@/components/Resume/JobMeta'

export default {
  data () {
    return {
      
    }
  },
  
  components: {
    JobMeta
  },

  props: {
    job: {
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

@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 0;
  }
}
</style>