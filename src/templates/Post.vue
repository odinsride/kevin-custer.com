<template>
  <Layout>
    <div class="md:px-20 md:py-10 bg-gray-50">
      <article class="bg-white md:rounded-xl shadow-sm py-6 px-4 md:py-10 md:px-12 max-w-screen-lg mx-auto">
        <div class="text-center">
          <PostTitle :post="$page.post"/>
          <PostMeta :post="$page.post"/>
          <div class="tags-centered">
            <TagList :tags="$page.post.tags" />
          </div>
        </div>
        <div class="content mt-4">
          <div v-html="$page.post.content"></div>
        </div>
        <div class="content mt-12 pt-6 border-t-4 border-gray-200">
          <vue-disqus shortname="kevincuster" :identifier="$page.post.title"></vue-disqus>
        </div>
      </article>
    </div>
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
import PostTitle from '@/components/PostPanel/PostTitle'
import PostMeta from '@/components/PostPanel/PostMeta'
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

  // metaInfo () {
  //   return {
  //     title: this.$page.post.title,
  //     meta: [
  //       {
  //         name: 'description',
  //         content: this.$page.post.excerpt
  //       }
  //     ]
  //   }
  // }
}
</script>

<style lang="scss">
@layer components {
  .content {
    h1 { @apply text-2xl font-bold }
    h2 { @apply text-xl font-bold }
    h3 { @apply text-lg font-semibold }
    h4 { @apply text-base font-semibold }

    h1, h2, h3 {
      @apply text-gray-800 mt-6 mb-2
    }

    h4 {
      @apply text-gray-800 my-2
    }

    p, li {
      code {
        @apply bg-gray-100 rounded px-1.5 py-1 text-green-800 text-opacity-80
      }

      @apply text-gray-700 text-sm md:text-base mb-2 leading-relaxed
    }

    ul {
      @apply list-disc list-outside mx-6 my-4
    }

    blockquote {
      @apply px-4 py-2 shadow bg-green-200 bg-opacity-50 border-l-4 border-green-500 border-opacity-60 mb-4
    }

    pre {
      @apply rounded shadow
    }

  }
}



.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(0,0,0,0.1), 0 0px 0 1px rgba(0,0,0,0.02);
  border-radius: 5px;
  margin-top: 2em;

  .card-content > .content {
    h1, h2, h3 {
      // color: $grey-dark;
    }

    h4, h5, h6 {
      // color: $grey-dark;
    }

    a {
      // color: $primary;
    }

    blockquote {
      // background-color: lighten($link, 57%);
      // border-color: lighten($link, 30%);
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