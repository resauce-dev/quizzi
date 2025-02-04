<template>
  <nav class="nav">
    <router-link class="link-icon" :to="parentUrl" alt="Go Back" :disabled="hideBack">
      <span class="sr-only">Go Back</span>
      <b-icon :icon="faCaretLeft" aria-hidden="true"></b-icon>
    </router-link>
    <h1 class="app-title text-gray-700 ml-4">Quizzi</h1>
    <router-link class="link-icon" to="/settings" alt="Settings" v-if="showSettings">
      <span class="sr-only">Settings</span>
      <b-icon :icon="faSliders" aria-hidden="true"></b-icon>
    </router-link>
    <router-link class="link-icon" to="/quizzes" alt="View all Quizzes" v-else>
      <span class="sr-only">Home</span>
      <b-icon :icon="faHouse" aria-hidden="true"></b-icon>
    </router-link>
  </nav>
</template>

<script>
import { faCaretLeft, faSliders, faHouse } from '@fortawesome/free-solid-svg-icons';

export default {
  data: () => ({
    faCaretLeft,
    faSliders,
    faHouse,
  }),
  props: {
    showSettings: {
      type: Boolean,
      default: false
    },
    hideBack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parentUrl() {
      let splitUrl = this.$route.fullPath.split('/')
      splitUrl.pop()
      let parentUrl = splitUrl.join('/')
      if(!parentUrl) return '/quizzes'
      return parentUrl ? parentUrl : '/'
    }
  }
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  color: var(--gray);
}

.link-icon {
  color: var(--gray);
  margin: 5px 20px;
  font-size: 26px;
}

.link-icon:hover {
  color: var(--blue);
}

.link-icon[disabled="true"] {
  pointer-events: none;
  opacity: 0.25;
}

.app-title {
  text-transform: uppercase;
  letter-spacing: 16px;
  font-size: 16px;
  margin: 0;
  align-self: center;
}
</style>