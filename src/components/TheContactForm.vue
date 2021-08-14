<template>
  <div class="flex justify-center sm:py-12" id="contactForm">
    <div class="w-full max-w-xl">
      <form name="contact"
            method="POST"
            v-on:submit.prevent="handleSubmit"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            class="bg-white rounded px-8 pt-6 pb-8 mb-4">

            
        <input type="hidden" name="form-name" value="contact">
        <p hidden>
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>
        <h3 class="text-2xl font-bold text-primary-600 mb-6">Contact me</h3>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-secondary-200" id="name" type="text" v-model="formData.name" placeholder="Homer Simpson">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-secondary-200" id="email" type="email" v-model="formData.email" placeholder="homer@simpsons.com">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
            Message
          </label>
          <textarea class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-secondary-200" id="message" v-model="formData.message" placeholder="Leave me a message!"></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-secondary-200" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
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