<template>
  <div>
    <navigation />
    <div class="px-5 mt-3 mb-5">
      <h1 class="mb-5">About Quizzi</h1>
      <h2 class="">Who, What, Where, When, Why...</h2>
      <p>
        Quizzi is developed as a side-project by <a href="https://twitter.com/sheahlavington" target="_blank">@sheahlavington</a>. 
        To learn the fundamentals of a Progressive Web-App, you've really got to get stuck-in, 
        and what better way than create something fun and interactive?
      </p>
      <p> 
        Interactive games test the limits of a developer as not only do you have to break the issues down to solutions,
        you also have to architecture the states of each interactive part and the challenge keeps it interesting. 
      </p>
      <p> 
        Most of the system was written in the evenings laid up in bed all comfy, surprising what you can do when you're 
        excited about reaching a goal! The first COVID-19 Lockdown in the United Kingdom started in March 2020, 
        I had some spare time and challenged myself to create something new while pushing my limits; thus, 
        the progressive web-app Quizzi was created.
      </p>

      <br>
      <h2>Disclaimer:</h2>
      <p>
        Many images on this web-app have been sourced from Google, if you own any of the images
        and would like it removed from this site, please do get in touch with some proof of ownership and 
        I'll be more than happy to make the required changes.
      </p>
      <p>
        This web-app doesn't have an income of any kind; factually, we're making a loss due to the cost 
        of hosting. Should you would like to sponsor future development of the app, please do get in touch to discuss options.
      </p>
      <p> If you need to contact me, you can do so through my Twitter or through Email at shea[at]lavington[dot]me. </p>
      <br>
      <btn-github />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import BtnGithub from '@/components/buttons/BtnGithub.vue'

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
  font-size: 14px;
  font-weight: bold;
}
p {
  font-size: 12px;
}
</style>