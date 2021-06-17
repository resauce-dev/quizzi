<template>
  <div class="page">
    <p>
      Ooops! You've landed on a page that doesn't exist!
    </p>
    <div class="d-flex flex-column">
      <div>
        <router-link to="/quizzes" alt="Play Now" v-slot="{ href, route, navigate }">
          <q-button variant="neo" size="lg" :href="href" @click="navigate">
            Go Back
          </q-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QButton from '@/components/QButton'

export default {
  name: 'Error',
  components: { QButton },
}
</script>

<style lang="scss" scoped>
.page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
</style>