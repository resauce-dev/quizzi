<template>
  <div>
    <navigation />
    <div class="px-5 my-3">
      <h1>About Quizzi</h1>
      <h2>5W's... Who, What, Where, When, Why</h2>
      <p>
        Quizzi is developed as a side-project by <a href="https://twitter.com/sheahlavington" target="_blank">@sheahlavington</a>. 
        To learn the fundamentals of a Progressive Web-App, you've really got to get stuck-in, 
        and what better way than create something fun and interactive?
      </p>
      <p> More detail to be added... </p>
      <br>
      <p>
        Disclaimer: Many images on this web-app have been sourced from Google, if you own any of the images
        and would like it removed from this site, please do get in touch with some proof of ownership and 
        I'll be more than happy to make the required changes.
      </p>
      <p>
        This web-app doesn't have an income of any kind; factually, we're making a loss due to the cost 
        of hosting. Should you would like to sponsor future development of the app, please do get in touch to discuss options.
      </p>
      <p> If you need to contact me, you can do so thtough my Twitter or through Email at resauce[at]lavington[dot]me. </p>
      <br>
      <btn-github />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import BtnGithub from '../components/buttons/BtnGithub.vue'

export default {
  name: 'about',
  components: { Navigation, BtnGithub }
}
</script>

<style scoped>
h1 {
  color: var(--primary);
  margin-bottom: 0.2rem;
  font-size: 24px;
  font-weight: bold;
}
h2 {
  color: var(--secondary);
  margin-bottom: 2rem;
  font-size: 14px;
  font-weight: bold;
}
p {
  font-size: 12px;
}
</style>