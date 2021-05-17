<template>
  <Layout>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2-widescreen is-3-tablet is-12-mobile is-offset-1-mobile">
            <ResumeMenu />
          </div>
          <div class="column is-8-widescreen is-9-tablet is-12-mobile">
            <div id="intro" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">{{ title }}</h1>
            </div>
            <IntroPanel :intro="intro" />

            <div id="competencies" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">Core Competencies</h1>
            </div>
            <CompetencyPanel :competencies="competencies" />

            <div id="techskills" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">Technical Skills</h1>
            </div>
            <SkillPanel :skills="skills" />

            <div id="certifications" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">Certifications</h1>
            </div>
            <CertPanel :certifications="certifications" />

            <div id="education" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">Education</h1>
            </div>
            <EduPanel :education="education" />

            <div id="experience" class="resume-title column has-text-centered">
              <h1 class="title is-5 has-text-primary">Professional Experience</h1>
            </div>
            <JobList />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import ResumeMenu from '@/components/Resume/ResumeMenu'
import IntroPanel from '@/components/Resume/IntroPanel'
import CompetencyPanel from '@/components/Resume/CompetencyPanel'
import SkillPanel from '@/components/Resume/SkillPanel'
import CertPanel from '@/components/Resume/CertPanel'
import EduPanel from '@/components/Resume/EduPanel'
import JobList from '@/components/Resume/JobList'

export default {
  components: {
    ResumeMenu,
    IntroPanel,
    CompetencyPanel,
    SkillPanel,
    CertPanel,
    EduPanel,
    JobList
  },

  data () {
    return {
      title: "About Kevin Custer",
      intro: "Detail-oriented IT Specialist with experience working on a broad range of corporate IT solutions which \
              include planning, design, development, testing, and implementation of applications in direct support of \
              client business objectives",
      competencies: [
        "Fullstack Development",
        "Solution Architecture",
        "ITIL v4",
        "Incident Management",
        "Business Intelligence",
        "Data Warehousing",
        "Analytics and Reporting",
        "Data Modeling",
        "Documentation",
        "Configuration Management"
      ],
      skills: {
        platforms: [
          "Linux (Debian / Arch)",
          "macOS",
          "Windows"
        ],
        languages: [
          "JavaScript",
          "Ruby",
          "HTML",
          "CSS/SCSS",
          "SQL",
          "PL/SQL",
          "GraphQL",
          "C#",
          "Java",
          "Groovy",
          "Bash"
        ],
        frameworks: [
          "Vue",
          "Ruby on Rails",
          "Grails",
          "AngularJS",
          "Bootstrap",
          "Bulma / Buefy",
          "Vuetify",
          "Nuxt",
          "Vuex",
          "Gridsome"
        ],
        tools: [
          "ServiceNow (Quebec)",
          "Oracle E-Business Suite",
          "OBIEE",
          "Oracle BI Publisher",
          "Oracle Application Express",
          "Git",
          "VS Code",
          "Visual Studio",
          "VMware",
          "IntelliJ IDEA"
        ]
      },
      education: {
        degree: "B.S., Business Information Technology",
        year: "2004",
        concentration: "E-Business Technology",
        school: "Virginia Polytechnic Institute and State University",
        location: "Blacksburg, VA"
      },
      certifications: [
        {
          title: "ServiceNow Certified Application Developer",
          date: "October 2019"
        },
        {
          title: "Oracle PL/SQL Developer Certified Associate",
          date: "February 2009"
        }
      ]
    }
  },

  metaInfo: {
    title: 'Resume',
    meta: [
      {
        name: 'description',
        content: 'Kevin Custer is a software engineer with over 15 years real world experience, \
                  who writes about ServiceNow and other technologies including Ruby on Rails, Vue.js, \
                  Linux, open-source software, and more.'
      }
    ]
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.resume-title {
  text-transform: uppercase;
}

.resume-title:not(:first-of-type) {
  margin-top: 2.5em;
}
</style>
