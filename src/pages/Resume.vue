<template>
  <Layout>

    <section class="px-2 md:px-6 lg:px-8 py-2 mt-4 lg:mt-8 justify-center lg:flex lg:gap-10">
      <div class="lg:flex-1 lg:max-w-screen-lg">
        <div id="intro" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">{{ title }}</h1>
        </div>
        <IntroPanel :intro="intro" />

        <div id="competencies" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">Core Competencies</h1>
        </div>
        <CompetencyPanel :competencies="competencies" />

        <div id="techskills" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">Technical Skills</h1>
        </div>
        <SkillPanel :skills="skills" />

        <div id="certifications" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">Certifications</h1>
        </div>
        <CertPanel :certifications="certifications" />

        <div id="education" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">Education</h1>
        </div>
        <EduPanel :education="education" />

        <div id="experience" class="resume-title">
          <h1 class="text-green-700 font-semibold mb-2 lg:mb-3 lg:text-xl">Professional Experience</h1>
        </div>
        <JobList />
      </div>
      <div class="hidden lg:block lg:flex-initial max-w-xs text-center lg:text-left">
        <ResumeMenu />
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
      intro: "ServiceNow architect with four years of experience building solutions and guiding clients on the platform, and over 16 years of professional software engineering experience. Key ServiceNow technical strengths include UX, SecOps, ITSM, and CSDM.  Excellent leadership, organization, and communication skills, with 2 years of experience managing and mentoring others.",
      competencies: [
        "Fullstack Development",
        "Solution Architecture",
        "ITIL v4",
        "Incident Management",
        "Security Operations",
        "Integrations",
        "Analytics and Reporting",
        "Data Modeling",
        "Documentation",
        "Configuration Management"
      ],
      skills: {
        platforms: [
          "Linux (Debian / Red Hat)",
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
          "Tailwind",
          "Gridsome"
        ],
        tools: [
          "ServiceNow",
          "Shopify",
          "Wordpress",
          "Oracle EBS R12",
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
          title: "ServiceNow Certified Implementation Specialist - ITSM",
          date: "April 2022"
        },
        {
          title: "ServiceNow Certified System Administrator",
          date: "July 2021"
        },
        {
          title: "ServiceNow Certified Application Developer",
          date: "October 2019"
        },
        {
          title: "ITIL 4 Foundation",
          date: "November 2019"
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
