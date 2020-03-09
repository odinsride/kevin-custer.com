<template>
  <transition name="fade" appear>
    <article>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h5 class="title is-5">Platforms</h5>
            <b-taglist><b-tag type="is-link has-text-weight-semibold" size="is-medium" v-for="plat in skills.platforms" :key="plat">{{plat}}</b-tag></b-taglist>
          
            <h5 class="title is-5">Languages</h5>
            <b-taglist><b-tag type="is-link has-text-weight-semibold" size="is-medium" v-for="lang in skills.languages" :key="lang">{{lang}}</b-tag></b-taglist>
          
            <h5 class="title is-5">Frameworks</h5>
            <b-taglist><b-tag type="is-link has-text-weight-semibold" size="is-medium" v-for="framework in skills.frameworks" :key="framework">{{framework}}</b-tag></b-taglist>
          
            <h5 class="title is-5">Tools</h5>
            <b-taglist><b-tag type="is-link has-text-weight-semibold" size="is-medium" v-for="tool in skills.tools" :key="tool">{{tool}}</b-tag></b-taglist>
          </div>
        </div>
      </div>
    </article>
  </transition>
</template>

<script>
export default {
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