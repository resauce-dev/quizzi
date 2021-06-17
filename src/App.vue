<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import appClosedNotifications from '@/mixins/appClosedNotifications'

export default {
  name: 'App',
  mixins: [appClosedNotifications]
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;500;700&display=swap');

:root {
  --color-cultured: #ececec;
  --color-raisin: #191923;
}

html,
body {
  background-color: var(--color-raisin)!important;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Montserrat', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  transition: all 0.2s;
  
  overflow-y: auto;
  overflow-x: hidden;

  background: var(--color-cultured);
  color: var(--color-raisin);
  
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  touch-action: manipulation; /* Disables double-tap to zoom */
}

@media screen and (min-width: 480px) {
  #app {
    height: 80vh;
    max-height: 800px;
    width: 450px;
    border-radius: 5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.btn-neo,
.btn-neo:hover,
.btn-neo:focus,
.btn-neo:active {
  color: var(--gray);
  font-size: 14px!important;
  padding: 20px 30px!important;
  border: 1px solid transparent!important;

  outline: 0;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-radius: 5px;
}

.btn-neo,
.neo-shadow {
  background: linear-gradient(135deg, var(--color-cultured), #ffffffa1);
  box-shadow: 6px 6px 13px rgba(196, 196, 196, 0.6),
              -6px -6px 13px rgba(255, 255, 255, 0.5)
}

a.btn-neo:hover,
button.btn-neo:hover,
a.neo-shadow:hover,
button.neo-shadow:hover {
  background: linear-gradient(-20deg, var(--color-cultured), #ffffffa1);
  box-shadow: 6px 6px 13px rgba(196, 196, 196, 0.6), 
              -6px -6px 13px rgba(255, 255, 255, 0.5)
}

</style>
