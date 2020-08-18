<template>
  <p class="mt-5">
    <template v-if="updateExists">
      <a href="#" @click="refreshApp">
        <b-icon icon="cloud-download" scale="1.5" class="mr-2" variant="primary" aria-hidden="true"></b-icon>
        Download update
      </a>
    </template>
    <template v-else-if="isUpdatingApp">
      <span class="text-primary">
        <b-icon icon="arrow-clockwise" animation="spin" scale="1.5" class="mr-2" variant="primary" aria-hidden="true"></b-icon>
        Updating...
      </span>
    </template>
    <template v-else>
      <span class="text-success">
        <b-icon icon="check-circle" scale="1.5" class="mr-2" variant="success" aria-hidden="true"></b-icon>
        No updates
      </span>
    </template>
  </p>
</template>

<script>
import update from '@/mixins/update'
export default {
  name: 'update-app-btn',
  mixins: [update],
}
</script>

<style>

</style>