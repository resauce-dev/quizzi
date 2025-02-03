<template>
  <QuizCard 
    :compact="true"
    title="Help Contribute"
    subtitle="We're open-source on Github"
    :icon="faCode"
    variant="dark"
    :link="{to: 'https://github.com/resauce-dev/quizzi?ref=Quizzi', alt: 'Github Repository'}"
  />
</template>

<script>
import QuizCard from '@/components/QuizCard.vue'
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default {
  components: { QuizCard },
  data() {
    return {
      faCode,
      notifyPermission: Notification.permission
    }
  }
}
</script>