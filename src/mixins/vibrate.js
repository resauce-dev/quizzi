import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('settings', ['canVibrate']),
  },
  methods: {
    vibrate() {
      if(this.canVibrate) window.navigator.vibrate([50,30,50]);
    }
  }
}