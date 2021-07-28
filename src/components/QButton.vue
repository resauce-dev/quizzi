<template>
  <b-button v-bind="$attrs" v-on="$listeners" @click="handleClick">
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'q-button',
  methods: {
    handleClick(e) {
      this.$store.dispatch('app/playSound', 'click')
      this.$store.dispatch('app/vibrate')
      this.$emit('click', e)
    }
  }
}
</script>

<style>

</style>