<template>
  <Layout>

    <TheHero>
      <template v-slot:title>
        Hi, I'm <span class="border-b-4 border-secondary-300">Kevin</span>
      </template>
      <template v-slot:subtitle>
        I am a <span class="font-bold">ServiceNow</span> developer, full-stack web developer, and landscape photographer from Virginia.
      </template>
      <template v-slot:cta>
        <div class="mb-4 md:mb-0 md:mr-4">
          <BaseButton text="Read my blog" secondary url="/blog"></BaseButton>
        </div>
        <div>
          <BaseButton text="Connect with me" secondary light url="/contact"></BaseButton>
        </div>
      </template>
    </TheHero>

    <section class="px-2 md:px-6 py-2 mt-4 lg:mt-8 justify-center lg:flex" style="margin-top: -140px">
      <TheAuthor
        name="Kevin Custer"
        title="Software Engineer"
        location="Staunton, VA"
        github="odinsride"
        linkedin="kevin-custer-sn"
        twitter="kevincuster_"
      ></TheAuthor>
    </section>

  </Layout>
</template>

<script>
import TheHero from '@/components/TheHero'
import TheAuthor from '@/components/TheAuthor'
import BaseButton from '@/components/BaseButton'

export default {
  components: {
    TheHero,
    TheAuthor,
    BaseButton
  },

  metaInfo: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Kevin Custer is a software engineer with over 16 years real world experience, \
                  who writes about ServiceNow and other technologies including ServiceNow, Ruby on Rails, Vue.js, \
                  Linux, open-source software, and more.'
      }
    ]
  }
}
</script>

<style>

</style>
