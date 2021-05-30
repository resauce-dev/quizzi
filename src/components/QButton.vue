<template>
  <b-button v-bind="$attrs" v-on="$listeners" @click="handleClick">
    <slot />
  </b-button>
</template>

<script>
import vibrate from '@/mixins/vibrate'

export default {
  name: 'q-button',
  mixins: [vibrate],
  methods: {
    handleClick(e) {
      this.vibrate()
      this.$emit('click', e)
    }
  }
}
</script>

<style>

</style>