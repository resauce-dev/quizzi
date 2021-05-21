<template>
  <QuizCard 
    :compact="true"
    title="Help Contribute"
    subtitle="We're open-source on Github"
    icon="controller"
    variant="warning"
    :link="{to: 'https://github.com/resauce-dev/quizzi?ref=Quizzi', alt: 'Github Repository'}"
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
  }
}
</script>