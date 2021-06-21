<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main-navigation">
    <div class="container">
      <div class="navbar-brand">
        <g-link class="navbar-item" to="/">
          <g-image alt="Kevin Custer: Full-stack developer" src="~/assets/images/logo.png" width="200" blur="5" quality="100" />
        </g-link>
        <a 
          :class="{ 'is-active': menuActive }"
          role="button" 
          class="navbar-burger burger" 
          aria-label="menu" 
          aria-expanded="false" 
          @click="menuActive = !menuActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="{ 'is-active': menuActive }" id="kcNav" class="navbar-menu">

        <div class="navbar-end">
          <TheMenu/>
          <div class="navbar-item">
            <div class="buttons">
              
              <g-link to="/contact">
                <b-button 
                  rounded 
                  icon-left="paper-plane"
                  size="is-small" 
                  class="is-primary"
                  role="button"
                >
                  CONNECT
                </b-button>
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TheMenu from "./TheMenu";

  export default {
    name: 'TheNavBar',

    components: {
      TheMenu
    },

    data () {
      return {
        menuActive: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
.navbar {
    // -webkit-box-shadow: 0 4px 6px -6px #999;
    // -moz-box-shadow: 0 4px 6px -6px #999;
    // box-shadow: 0 4px 6px -6px #999;

  border-top: 6px solid #228b81;

  // .navbar-brand {
  //   margin-left: 8em;
  // }
  // .navbar-end {
  //   margin-right: 8em;
  // }
    /* the rest of your styling */
}
</style>