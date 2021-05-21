<template>
  <QuizCard 
    :disabled="false"
    :show-progress-bar="false"
    :compact="true"
    title="Install Quizzi"
    subtitle="Easy Access & Saved Progression"
    icon="app-indicator"
    variant="info"
    @click="$emit('click')"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'

export default {
  components: { QuizCard },
  data() {
    return {
      notifyPermission: Notification.permission
    }
  },
  created() {
    window.addEventListener('appinstalled', (evt) => {
      console.log('App Installed: BtnInstall', evt);
    });
  }
}
</script>