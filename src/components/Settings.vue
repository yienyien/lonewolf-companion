<template>
  <div>
    <div>Wake lock: {{wakelock}}</div>
  </div>
</template>

<script>
import Vue from "vue";

const Settings = Vue.extend({
  data() {
    return {
      wakelock: null,
    }
  },

  async mounted() {
    try {
      await navigator.wakeLock.request('screen');
      this.wakelock = "OK";
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      this.wakelock = "KO";
    }
  }
});

export default Settings;
</script>
