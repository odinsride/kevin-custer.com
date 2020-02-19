<template>
  <section class="section">
    <div class="content has-text-centered">
      <figure class="image is-128x128" style="margin: auto">
        <g-image alt="Author image" class="is-rounded author__image" src="~/assets/images/author.jpg" width="180" height="180" blur="5" />
      </figure>

      <h1 class="title is-4 has-text-primary">
        {{ $static.metadata.siteName }}
      </h1>

      <p class="subtitle is-6 has-text-grey-dark">
        Full-stack web developer
      </p>

      <p class="buttons is-centered">
        <b-tooltip type="is-black" 
                  label="Follow me on GitHub"
                  position="is-bottom">
          <g-link to="https://www.github.com/odinsride">
            <b-icon
              pack="fab"
              icon="github"
              size="is-large"
              type="is-dark">
            </b-icon>
          </g-link>
        </b-tooltip>
      </p>
    </div>
  </section>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.author__image {
  box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.4);
}

.buttons {
  margin-top: -1em;
}
</style>
