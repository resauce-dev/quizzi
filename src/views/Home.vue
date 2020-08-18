<template>
  <div class="home">
    <img class="logo" alt="Quizzi logo" src="../assets/logo.png">
    <div class="d-flex flex-column">
      <div>
        <router-link to="/quizzes" alt="Play Now" v-slot="{ href, route, navigate }">
          <b-button variant="neo" size="lg" :href="href" @click="navigate">
            Play Now
          </b-button>
        </router-link>
      </div>
      <update-app-btn />
    </div>
  </div>
</template>

<script>
import UpdateAppBtn from '@/components/UpdateAppBtn'
export default {
  name: 'Home',
  components: { UpdateAppBtn }
}
</script>

<style lang="scss" scoped>
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
.logo {
  max-width: 275px;
}
</style>