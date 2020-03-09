<template>
  <transition name="fade" appear>
    <article>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile">
              <div class="column is-6 is-offset-1-desktop">
                <ul>
                  <li v-for="comp in competencies.slice(0, this.rows)" :key="comp">
                    {{ comp }}
                  </li>
                </ul>
              </div>
              <div class="column is-6">
                <ul>
                  <li v-for="comp in competencies.slice(this.rows, competencies.length)" :key="comp">
                    {{ comp }}
                  </li>
                </ul>
              </div>
            </div>
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
    competencies: {
      required: true,
      type: Array
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

.content ul {
  margin-top: 0;
}

@media screen and (max-width: 768px) {
  .card {
    margin-bottom: 0;
  }
}
</style>