<template>
  <div class="kc-card">
    <div class="kc-card-front">
      <div class="kc-card-img">
        <g-image v-if="project.node.image" :src="project.node.image" />
        <g-image v-else src="https://via.placeholder.com/500x285.png" />
      </div>
      <div class="kc-card-content">
        <div class="kc-card-title has-text-primary">
          {{ project.node.title }}
        </div>
        <div class="kc-card-desc" v-html="project.node.tagline"></div>
      </div>
    </div>
    <div class="kc-card-back">
      <div class="kc-card-back-header has-background-link">
        <div class="kc-card-back-title has-text-white">
          <font-awesome-icon icon="info-circle" size="sm"></font-awesome-icon>&nbsp;
          {{ project.node.title }}
        </div>
      </div>
      <div class="kc-card-content">
        <TechList :techs="techs"/>
        <!-- <p class="kc-learn-more">
          <a class="button is-link is-outlined">
            Learn More
          </a>
        </p> -->
      </div>
      <div class="kc-card-footer text-right"
           v-if="project.node.github || project.node.url">
        <BaseTooltip text="View on GitHub" v-if="project.node.github">
          <a class="kc-link-button text-primary-700 hover:text-gray-800"
             :href="project.node.github"
             target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" size="lg"></font-awesome-icon>  
          </a>
        </BaseTooltip>
        <BaseTooltip text="View Website" v-if="project.node.url">
          <a class="kc-link-button text-primary-700 hover:text-gray-800"
             :href="project.node.url"
             target="_blank">
            <font-awesome-icon icon="globe" size="lg"></font-awesome-icon>  
          </a>
        </BaseTooltip>
      </div>
    </div>
  </div>
</template>

<script>
import TechList from './TechList'
import BaseTooltip from '../BaseTooltip'

export default {
  data () {
    return {
      techs: this.project.node.tech ? this.project.node.tech.split(',') : 0
    }
  },

  components: {
    TechList,
    BaseTooltip,
    BaseTooltip
},

  props: {
    project: {
      required: true,
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
.kc-card {
  //background-color: transparent;
  //width: 100%;
  @apply flex flex-wrap relative;
  min-height: 300px;
  -webkit-perspective: 1000px;
          perspective: 1000px;

  &:hover {
    .kc-card-back {
      transform: rotateY(0deg);
      transform-style: preserve-3d;
      z-index: 10;
    }

    .kc-card-front {
      transform: rotateY(-180deg);
      transform-style: preserve-3d;
      z-index: -1;
    }
  }

  .kc-card-back, .kc-card-front {
    background: rgb(255,255,255); /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover,  rgb(255,255,255) 0%, rgb(224,242,241) 100%); /* FF3.6-15 */
    background: -webkit-radial-gradient(center, ellipse cover,  rgb(255,255,255) 0%,rgb(224,242,241) 100%); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(ellipse at center,  rgb(255,255,255) 0%,rgb(224,242,241) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e0f2f1',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
    -webkit-transition: all 0.6s cubic-bezier(.5,1,.5,1);
    transition: all 0.6s cubic-bezier(.5,1.3,.5,1.3);
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .kc-card-back {
    @apply rounded-lg;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    transform: rotateY(180deg);
    box-shadow: 4px 16px 18px -8px rgba(0,0,0,0.4);

    &:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
    }
  }

  .kc-card-front {
    z-index: 10;
    box-shadow: 0px 2px 18px -8px rgba(0,0,0,0.4);
    // @apply shadow-xl rounded border-2 border-opacity-40 border-primary-600;
    @apply rounded-lg pb-4;

    &:after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
    }
  }

  .kc-card-img {
    img {
      //box-shadow: 0px 2px 16px -8px rgba(0,0,0,0.4);
      @apply rounded-t-lg border-b-4 border-primary-700 border-opacity-40;
      min-height: 292px;
    }
  }
    
  .kc-card-content {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 15px;
    padding-top: 10px;

    .kc-card-title {
      font-weight: 600;
      font-size: 1.3em;
      margin-bottom: 5px;
      @apply text-primary-800;
    }
    .kc-learn-more {
      position: relative;
      min-height: 70px;

      a {
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
        overflow: auto;
      }
    }
  }

  .kc-card-back-header {
    @apply bg-primary-700 text-white rounded-t-lg;
    margin: 0;
    margin-bottom: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    -webkit-box-shadow: 0 4px 6px -6px #999;
    -moz-box-shadow: 0 4px 6px -6px #999;
    box-shadow: 0 4px 6px -6px #999;

    .kc-card-back-title {
      font-weight: 400;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      text-shadow: 1px 1px 10px #636363;
    }
  }


}



.kc-card-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dbdbdb;
  padding: 15px;
}

.kc-link-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  box-shadow: 0px 4px 18px -8px rgba(0,0,0,0.4);
}
</style>
