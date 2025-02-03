<template>
  <p class="mt-5">
    <template v-if="isDevelopment">
      <span class="text-secondary">
        <b-icon :icon="faBug" scale="1.5" class="mr-2" variant="secondary" aria-hidden="true"></b-icon>
        Development Mode
      </span>
    </template>
    <template v-else-if="isUpdating">
      <span class="text-secondary">
        <b-icon :icon="faArrowRotateRight" scale="1.5" class="mr-2" variant="secondary" aria-hidden="true" animation="spin"></b-icon>
        Updating...
      </span>
    </template>
    <template v-else-if="isUpdateInstallable">
      <a href="#" @click="refreshApp">
        <b-icon :icon="faCloudArrowDown" scale="1.5" class="mr-2" variant="primary" aria-hidden="true"></b-icon>
        Install Updates
      </a>
    </template>
    <template v-else-if="isFetchingUpdateContent">
      <span class="text-secondary">
        <b-icon :icon="faWifi" scale="1.5" class="mr-2" variant="secondary" aria-hidden="true" animation="fade"></b-icon>
        Downloading Updates...
      </span>
    </template>
    <template v-else>
      <span class="text-success">
        <b-icon :icon="faCircleCheck" scale="1.5" class="mr-2" variant="success" aria-hidden="true"></b-icon>
        No Updates
      </span>
    </template>
  </p>
</template>

<script>
import { faBug, faArrowRotateRight, faCloudArrowDown, faWifi, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import update from '@/mixins/update'
export default {
  name: 'btn-update-app',
  data: () => ({
    faBug,
    faArrowRotateRight,
    faCloudArrowDown,
    faWifi,
    faCircleCheck,
  }),
  mixins: [update],
}
</script>