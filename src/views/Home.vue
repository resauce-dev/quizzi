<template>
  <div class="home">
    <img class="logo" alt="Quizzi logo" src="/img/logo.png">
    <div class="d-flex flex-column">
      <div>
        <router-link to="/quizzes" alt="Play Now" v-slot="{ href, route, navigate }">
          <q-button variant="neo" size="lg" :href="href" @click="navigate">
            Play Now
          </q-button>
        </router-link>
      </div>
      <btn-update-app />
    </div>
  </div>
</template>

<script>
import QButton from '@/components/QButton.vue'
import BtnUpdateApp from '@/components/buttons/BtnUpdateApp.vue'

export default {
  name: 'Home',
  components: { BtnUpdateApp, QButton },
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