// Mulish Font
import '@fontsource/mulish'
import '@fontsource/open-sans'
import '@fontsource/inter'
import '@fontsource/roboto'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faPaperPlane,
  faInfoCircle,
  faGlobe,
  faLongArrowAltRight,
  faHashtag,
  faHome,
  faExternalLinkAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Helpers
import * as formatDate from '~/helpers/formatDate.js'

// PrismJS theme
import 'prismjs/themes/prism-tomorrow.css'

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Buefy
// import '~/assets/styles/index.scss';
// import Buefy from 'buefy';

// Disqus
import VueDisqus from 'vue-disqus'

export default function (Vue, { router, head, isClient }) {
  library.add(
    faPaperPlane,
    faInfoCircle,
    faGlobe,
    faGithub,
    faTwitter,
    faLinkedin,
    faLongArrowAltRight,
    faHashtag,
    faHome,
    faExternalLinkAlt,
    faBars
  )

  // Vue.use(Buefy, {
  //   defaultIconPack: 'fa',
  //   defaultIconComponent: 'font-awesome-icon'
  // }, formatDate)

  Vue.use(VueDisqus)

  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.component('Layout', DefaultLayout)
}
