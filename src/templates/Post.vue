<template>
  <Layout>
    <article>
      <section class="section" id="post">
        <div class="container">
          <div class="columns">
            <div class="column 
                        is-12-mobile is-12-tablet
                        is-10-widescreen is-offset-1-widescreen">
              <div class="has-text-centered">
                <PostTitle :post="$page.post" :size="postTitleSize" />
                <PostMeta :post="$page.post" :size="postMetaSize" :color="postMetaColor" />
                <div class="tags-centered">
                  <TagList :tags="$page.post.tags" />
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div v-html="$page.post.content"></div>
                  </div>
                </div>
              </div>
              <div class="content" id="comments">
                <vue-disqus shortname="kevincuster" :identifier="$page.post.title"></vue-disqus>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </Layout>
</template>

<page-query>
query Post($path: String!) {
  post: post(path: $path) {
    title
    path
    date
    excerpt
    content
    tags {
        id
        title
    }
    author
  }
}
</page-query>

<script>
import PostTitle from '@/components/Posts/PostTitle'
import PostMeta from '@/components/Posts/PostMeta'
import TagList from '@/components/Tags/TagList'

export default {
  data () {
    return {
      postTitleSize: 'is-size-3',
      postMetaSize: 'is-size-6',
      postMetaColor: 'has-text-grey-dark'
    }
  },

  components: {
    PostTitle,
    PostMeta,
    TagList
  },

  metaInfo () {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.excerpt
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/index';

.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(0,0,0,0.1), 0 0px 0 1px rgba(0,0,0,0.02);
  border-radius: 5px;
  margin-top: 2em;

  .card-content > .content {
    h1, h2, h3 {
      color: $grey-dark;
    }

    h4, h5, h6 {
      color: $grey-dark;
    }

    a {
      color: $primary;
    }

    blockquote {
      background-color: lighten($link, 57%);
      border-color: lighten($link, 30%);
    }

    li {
      > p {
        margin-bottom: 0;
      }

      > ol {
        margin-top: 0.5em;
      }
    }

    pre {
      border-radius: 5px;

      .number, .tag {
        background-color: inherit;
        align-items: inherit;
        border-radius: 0;
        font-size: inherit;
        height: inherit;
        justify-content: inherit;
        margin-right: 0;
        min-width: inherit;
        padding: 0;
        text-align: inherit;
        vertical-align: inherit;
      }
    }
  }
}

.tags-centered {
  display: flex;
  justify-content: center;
}

#comments {
  margin-top: 3em;
}
</style>