<template>
  <section class="section" id="contactForm">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">

          <h3 class="title is-3 has-text-primary">Connect with me</h3>

          <form name="contact"
                method="POST"
                v-on:submit.prevent="handleSubmit"
                action="/success/"
                data-netlify="true"
                data-netlify-honeypot="bot-field">

            <input type="hidden" name="form-name" value="contact">
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div class="sender-info field">
              <div class="field">
                <label for="name" class="label has-text-primary">Name</label>
                <div class="control">
                  <input class="input" type="text" name="name" v-model="formData.name" placeholder="John Smith">
                </div>
              </div>

              <div class="field">
                <label for="email" class="label has-text-primary">Email</label>
                <div class="control">
                  <input class="input" type="email" name="email" v-model="formData.email" placeholder="johnsmith@gmail.com">
                </div>
              </div>
            </div>

            <div class="message-wrapper field">
              <label for="message" class="label has-text-primary">Message</label>
              <div class="control">
                <textarea class="textarea" name="message" v-model="formData.message" placeholder="Leave me a message!"></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-link">Send</button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
      .then(() => this.$router.push('/success'))
      .catch(error => alert(error))
    }
  }
}
</script>

<style>
</style>