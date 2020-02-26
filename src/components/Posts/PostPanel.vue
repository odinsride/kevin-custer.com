<template>
  <transition name="fade" appear>
    <article>
      <g-link :to="post.path" :aria-label="post.title">
        <div class="card">
          <div class="card-content">
              <div class="content">
                <PostTitle :post="post" />
                <p>{{ post.excerpt }}</p>
                <TagList :tags="post.tags" />
                <nav class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <PostMeta :post="post" />
                    </div>
                  </div>

                  <div class="level-right is-hidden-mobile">
                    <div class="level-item">
                      <p class="has-text-right">
                        <g-link :to="post.path" aria-label="Read full article">
                          <b-button type="is-white is-rounded has-text-primary"
                                    icon-right="long-arrow-alt-right"
                                    role="button">
                                    Read full article
                          </b-button>
                        </g-link>
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
          </div>
        </div>
      </g-link>
    </article>
  </transition>
</template>

<script>
import PostMeta from './PostMeta'
import PostTitle from './PostTitle'
import TagList from '@/components/Tags/TagList'

export default {
  data () {
    return {
      
    }
  },
  
  components: {
    PostMeta,
    PostTitle,
    TagList
  },

  props: {
    post: {
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
  margin-bottom: 2em;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 10px 30px 0 rgba(0,0,0,.1);
  }
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