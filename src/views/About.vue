<template>
  <div>
    <navigation />
    <div class="px-5 my-3 text-center">
      <h2>About this site</h2>
      <p>
        Quizzi is just a little bit of fun, for you to play and for me to develop, 
        I hope you enjoy playing, created by <strong>@sheahlavington</strong> on Twitter.
      </p>
      <p>
        Some images on this site have been sourced from Google, if you are the owner 
        of an image and would like it removed, please get in touch with some proof of ownership
        and I'll be happy to get the image changed or removed.
      </p>
      <p>
        This site does not make any profit, in-fact, this site is making a loss at the cost 
        of hosting, if you would like to sponsor, please do get in touch. :P 
      </p>
      <p> Contact me at (admin[at]resauce[dot]dev) </p>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'about',
  components: { Navigation }
}
</script>

<style scoped>
h2 {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--blue);
  margin-bottom: 2rem;
  font-size: 24px;
  font-weight: bold;
}
p {
  text-transform: uppercase;
  font-size: 12px;
}
</style>