<template>
  <b-button v-bind="$attrs" @click="handleClick">
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'q-button',
  emits: ['click'],
  methods: {
    async handleClick(e) {
      await this.$store.dispatch('app/playSound', 'click')
      await this.$store.dispatch('app/vibrate')
      this.$emit('click', e)
    }
  }
}
</script>

<style>

</style>